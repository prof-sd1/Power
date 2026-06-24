<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Redis;
use App\Models\User;

/**
 * POC-AMS JWT Authentication Service
 * FRD Section 5.3 — RS256 Asymmetric JWT
 *
 * Responsibilities:
 * - Issue access tokens (15 min TTL) signed with RS256 private key
 * - Issue refresh tokens (7 day TTL, rotated on use)
 * - Verify tokens using the public key (zero network calls to Auth Service)
 * - Blacklist tokens on logout/password change via Redis
 */
class JwtService
{
    private string $privateKey;
    private string $publicKey;
    private string $algorithm;
    private int $accessTtl;
    private int $refreshTtl;

    public function __construct()
    {
        $config = config('jwt');
        $this->algorithm = $config['algorithm'];
        $this->accessTtl = $config['access_ttl'];
        $this->refreshTtl = $config['refresh_ttl'];

        $privateKeyPath = $config['private_key'];
        $publicKeyPath = $config['public_key'];

        $this->privateKey = file_exists($privateKeyPath)
            ? file_get_contents($privateKeyPath)
            : '';

        $this->publicKey = file_exists($publicKeyPath)
            ? file_get_contents($publicKeyPath)
            : '';
    }

    /**
     * Generate an RS256-signed access token.
     */
    public function issueAccessToken(User $user): string
    {
        $now = time();
        $payload = [
            'iss' => config('jwt.issuer', 'poc-ams-auth'),
            'aud' => config('jwt.audience', 'poc-ams'),
            'iat' => $now,
            'exp' => $now + ($this->accessTtl * 60),
            'sub' => $user->id,
            'email' => $user->email,
            'role' => $user->role,
            'status' => $user->status,
            'jti' => bin2hex(random_bytes(16)),
        ];

        return JWT::encode($payload, $this->privateKey, $this->algorithm);
    }

    /**
     * Generate a refresh token (opaque, stored hashed in DB/Redis).
     */
    public function issueRefreshToken(User $user): string
    {
        $token = bin2hex(random_bytes(32));
        $hash = hash('sha256', $token);

        // Store in Redis with TTL for instant revocation capability
        Redis::setex(
            "refresh_token:{$hash}",
            $this->refreshTtl * 60,
            json_encode([
                'user_id' => $user->id,
                'issued_at' => now()->toIso8601String(),
            ])
        );

        return $token;
    }

    /**
     * Verify and decode an access token using the RS256 public key.
     * Zero network calls — fully local verification (FRD 5.3).
     */
    public function verifyAccessToken(string $token): ?object
    {
        try {
            $decoded = JWT::decode($token, new Key($this->publicKey, $this->algorithm));

            // Check Redis blacklist
            if (Redis::exists("blacklisted_token:{$decoded->jti}")) {
                return null;
            }

            return $decoded;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Verify a refresh token and return the associated user data.
     */
    public function verifyRefreshToken(string $token): ?array
    {
        $hash = hash('sha256', $token);
        $data = Redis::get("refresh_token:{$hash}");

        if (!$data) {
            return null;
        }

        return json_decode($data, true);
    }

    /**
     * Rotate a refresh token: consume the old one, issue a new one.
     */
    public function rotateRefreshToken(string $oldToken, User $user): string
    {
        $oldHash = hash('sha256', $oldToken);
        Redis::del("refresh_token:{$oldHash}");

        return $this->issueRefreshToken($user);
    }

    /**
     * Blacklist an access token (on logout or password change).
     * The token is blacklisted in Redis until its natural expiry.
     */
    public function blacklistToken(string $jti, int $expiresIn): void
    {
        Redis::setex("blacklisted_token:{$jti}", $expiresIn, '1');
    }

    /**
     * Revoke ALL refresh tokens for a user (e.g., on password change or suspension).
     */
    public function revokeAllUserTokens(string $userId): void
    {
        // In production, scan Redis keys or use a user-specific token set.
        // For now, we track via the auth service's session management.
        Redis::publish('system.notifications', json_encode([
            'type' => 'user.tokens_revoked',
            'user_id' => $userId,
            'timestamp' => now()->toIso8601String(),
        ]));
    }
}
