"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LiveRoomPage({ params }: { params: { id: string } }) {
  const [isJoined, setIsJoined] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [camEnabled, setCamEnabled] = useState(true);
  const [messages, setMessages] = useState<{user: string, text: string, time: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  
  const courseId = params.id || "MIS2011";

  // Simulate WebRTC LiveKit connection
  useEffect(() => {
    if (isJoined) {
      const msgTimer = setInterval(() => {
        setMessages(prev => [...prev, {
          user: Math.random() > 0.5 ? "Abebe K." : "Dr. Tilahun",
          text: "System: Local WebRTC SFU ping ~" + Math.floor(Math.random() * 50 + 10) + "ms",
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      }, 15000);
      return () => clearInterval(msgTimer);
    }
  }, [isJoined]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, {
      user: "You",
      text: chatInput,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }]);
    setChatInput('');
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full premium-card text-center animate-fade-in">
          <div className="w-20 h-20 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">LiveKit Classroom</h2>
          <p className="text-[var(--text-secondary)] mb-6">Course: {courseId} (Section A)</p>
          
          <div className="bg-[var(--bg-tertiary)]/30 p-4 rounded-lg mb-8 border border-[var(--glass-border)] text-sm">
            <p className="text-[var(--text-primary)] font-medium mb-1">Attendance Tracking Active</p>
            <p className="text-[var(--text-muted)]">Per Art 9.5.8, your connection duration is actively logged via WebSocket heartbeats.</p>
          </div>

          <button onClick={() => setIsJoined(true)} className="w-full btn-primary py-3 text-lg">
            Join Synchronous Session
          </button>
          
          <div className="mt-4">
             <Link href={`/curriculum/course/${courseId}`} className="text-sm text-[var(--text-secondary)] hover:text-white">Cancel and Return to Course</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden animate-fade-in">
      
      {/* Top Bar */}
      <div className="h-14 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 mr-4 bg-black/50 px-3 py-1 rounded border border-[var(--border-color)]">
             <span className="w-2 h-2 rounded-full bg-[var(--error)] animate-pulse"></span>
             <span className="text-sm font-mono text-white">LIVE</span>
          </div>
          <h1 className="font-semibold text-white">{courseId} - Database Systems</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1 text-xs text-[var(--success)] font-mono">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
            <span>SFU Latency: 24ms</span>
          </div>
          <button onClick={() => setIsJoined(false)} className="bg-[var(--error)] hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors">
            Leave Session
          </button>
        </div>
      </div>

      {/* Main Classroom Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Video Grid */}
        <div className="flex-1 p-4 flex flex-col space-y-4">
          
          {/* Instructor Primary Feed */}
          <div className="flex-1 bg-gray-900 rounded-xl border border-[var(--border-color)] relative overflow-hidden flex items-center justify-center group">
            <div className="text-center opacity-50">
               <svg className="w-24 h-24 text-[var(--text-muted)] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
               <p className="text-[var(--text-secondary)] font-mono">Instructor Camera Feed (1080p)</p>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded backdrop-blur-sm text-sm text-white font-medium border border-[var(--glass-border)]">
              Prof. Tilahun (Host)
            </div>
          </div>

          {/* Student Grid (Simulated) */}
          <div className="h-48 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-800 rounded-lg border border-[var(--border-color)] relative flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-xs text-white border border-[var(--glass-border)]">
                  Student {i}
                </div>
              </div>
            ))}
            
            {/* Self View */}
            <div className="bg-gray-800 rounded-lg border-2 border-[var(--accent-primary)]/50 relative flex items-center justify-center overflow-hidden">
               {camEnabled ? (
                 <div className="w-full h-full bg-slate-700"></div> // Simulated webcam
               ) : (
                 <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
               )}
               <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-xs text-[var(--accent-primary)] font-medium border border-[var(--glass-border)]">
                  You
               </div>
               
               {/* Overlay Controls */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-2 space-x-2">
                 <button onClick={() => setMicEnabled(!micEnabled)} className={`p-1.5 rounded-full ${micEnabled ? 'bg-white/20 text-white' : 'bg-[var(--error)]/80 text-white'}`}>
                   {micEnabled ? 
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg> : 
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                   }
                 </button>
                 <button onClick={() => setCamEnabled(!camEnabled)} className={`p-1.5 rounded-full ${camEnabled ? 'bg-white/20 text-white' : 'bg-[var(--error)]/80 text-white'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Chat & Attendees */}
        <div className="w-full lg:w-80 bg-[var(--bg-secondary)] border-l border-[var(--border-color)] flex flex-col">
          <div className="flex border-b border-[var(--border-color)]">
            <button className="flex-1 py-3 text-sm font-medium text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]">Chat</button>
            <button className="flex-1 py-3 text-sm font-medium text-[var(--text-secondary)] hover:text-white">Attendees (45)</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className={`text-xs font-semibold ${msg.user === 'You' ? 'text-[var(--accent-secondary)]' : 'text-[var(--accent-primary)]'}`}>{msg.user}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{msg.time}</span>
                </div>
                <div className={`p-2 rounded-lg text-sm max-w-[90%] ${msg.user === 'You' ? 'bg-[var(--accent-secondary)]/20 text-white rounded-tr-none' : 'bg-[var(--bg-tertiary)]/50 text-white rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
            <form onSubmit={handleSendMessage} className="flex">
              <input 
                type="text" 
                placeholder="Message classroom..." 
                className="flex-1 bg-[var(--bg-tertiary)]/30 border border-[var(--border-color)] rounded-l-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--accent-primary)]"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
              />
              <button type="submit" className="bg-[var(--accent-primary)] text-white px-3 py-2 rounded-r-md hover:bg-[var(--accent-primary-hover)] transition-colors">
                <svg className="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
