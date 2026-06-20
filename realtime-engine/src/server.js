/**
 * POC-AMS Real-Time Engine
 * 
 * Node.js 20 + Socket.io + LiveKit SDK
 * FRD Section 4.4: Live Classroom (WebRTC), Real-time Chat, System Notifications.
 * 
 * This service handles:
 * - WebSocket connections for real-time notifications and chat
 * - LiveKit room management for live classroom sessions
 * - Redis Pub/Sub for cross-domain event consumption
 */

require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { RoomServiceClient, AccessToken, VideoGrant } = require('livekit-server-sdk');
const Redis = require('ioredis');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// --- Configuration ---
const PORT = process.env.RT_PORT || 3001;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || '';
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || 'devkey';
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || 'devsecret';
const LIVEKIT_HOST = process.env.LIVEKIT_HOST || 'http://localhost:7880';

// --- Express + HTTP Server ---
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// --- Socket.io Server ---
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  // Fallback transports for clients behind strict firewalls (FRD Section 4.4)
  transports: ['websocket', 'polling'],
});

// --- Redis Pub/Sub ---
const redisSub = new Redis(REDIS_URL);
const redisPub = new Redis(REDIS_URL);

// Subscribe to cross-domain events from Academic Core and Finance Vault
const CHANNELS = [
  'finance.payment.success',
  'finance.refund.processed',
  'sis.course_unlock.failed',
  'system.notifications',
];

redisSub.subscribe(...CHANNELS, (err, count) => {
  if (err) {
    console.error('[Redis] Failed to subscribe:', err);
    return;
  }
  console.log(`[Redis] Subscribed to ${count} channels`);
});

redisSub.on('message', (channel, message) => {
  try {
    const payload = JSON.parse(message);
    console.log(`[Redis] Event on ${channel}:`, payload);

    // Route event to the appropriate student/user room via Socket.io
    if (payload.student_id) {
      io.to(`user:${payload.student_id}`).emit(channel, payload);
    }

    // Broadcast system-wide notifications
    if (channel === 'system.notifications') {
      io.emit('system.notification', payload);
    }
  } catch (e) {
    console.error('[Redis] Failed to parse message:', e);
  }
});

// --- Socket.io Authentication Middleware ---
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error('Authentication required'));
  }

  try {
    // Verify RS256 JWT using the public key (FRD Section 5.3)
    const decoded = jwt.verify(token, JWT_PUBLIC_KEY, { algorithms: ['RS256'] });
    socket.data.user = decoded;
    next();
  } catch (err) {
    return next(new Error('Invalid or expired token'));
  }
});

// --- Socket.io Connection Handler ---
io.on('connection', (socket) => {
  const userId = socket.data.user?.sub || socket.data.user?.id;
  console.log(`[Socket.io] User connected: ${userId}`);

  // Join user-specific room for targeted notifications
  if (userId) {
    socket.join(`user:${userId}`);
  }

  // Join role-based rooms
  const role = socket.data.user?.role;
  if (role) {
    socket.join(`role:${role}`);
  }

  socket.on('disconnect', () => {
    console.log(`[Socket.io] User disconnected: ${userId}`);
  });
});

// --- LiveKit Room Management API ---
const livekitService = new RoomServiceClient(LIVEKIT_HOST, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);

// Generate LiveKit access token for a user to join a live classroom
app.post('/api/live/token', (req, res) => {
  try {
    const { roomName, participantName, identity } = req.body;

    if (!roomName || !participantName || !identity) {
      return res.status(400).json({ error: 'roomName, participantName, and identity are required' });
    }

    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity,
      name: participantName,
    });

    const grant = new VideoGrant({
      roomJoin: true,
      room: roomName,
    });
    at.addGrant(grant);

    const token = at.toJwt();
    res.json({ token });
  } catch (err) {
    console.error('[LiveKit] Token generation error:', err);
    res.status(500).json({ error: 'Failed to generate LiveKit token' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'realtime-engine', uptime: process.uptime() });
});

// --- Start Server ---
server.listen(PORT, () => {
  console.log(`[Real-Time Engine] Running on port ${PORT}`);
  console.log(`[Real-Time Engine] LiveKit host: ${LIVEKIT_HOST}`);
  console.log(`[Real-Time Engine] Redis: ${REDIS_URL}`);
});
