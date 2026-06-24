<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\JwtService;
use Symfony\Component\HttpFoundation\Response;

/**
 * RS256 JWT Authentication Middleware
 * FRD Section 5.3 — Verifies access tokens using the public key.
 *
 * This middleware:
 * 1. Extracts the Bearer token from the Authorization header
 * 2. Verifies the RS256 signature using the public key (zero network calls)
 * 3. Checks the Redis blacklist for revoked tokens
 * 4. Injects the authenticated user payload into the request
 */
class JwtAuthenticate
{
    public function __construct(
        private JwtService $jwtService
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'error' => 'Authentication required',
                'message' => 'No Bearer token provided in Authorization header.',
            ], 401);
        }

        $decoded = $this->jwtService->verifyAccessToken($token);

        if (!$decoded) {
            return response()->json([
                'error' => 'Invalid or expired token',
                'message' => 'The provided JWT is invalid, expired, or has been revoked.',
            ], 401);
        }

        // Inject authenticated user data into the request for downstream use
        $request->merge([
            'auth_user_id' => $decoded->sub,
            'auth_user_email' => $decoded->email ?? null,
            'auth_user_role' => $decoded->role ?? null,
            'auth_user_status' => $decoded->status ?? null,
            'auth_token_jti' => $decoded->jti ?? null,
        ]);

        // Also set as request attributes for controller access
        $request->attributes->set('jwt_payload', $decoded);

        return $next($request);
    }
}
