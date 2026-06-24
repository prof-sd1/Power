<?php

/**
 * POC-AMS JWT Configuration
 * FRD Section 5.3 — Inter-Service Authentication (RS256 JWT)
 *
 * Asymmetric RS256 signing:
 * - Private key is held ONLY by the Auth Service
 * - Public key is distributed to Academic Core, Finance Vault, Real-Time Engine, AI Satellite
 */

return [
    /*
    |--------------------------------------------------------------------------
    | JWT Algorithm
    |--------------------------------------------------------------------------
    | RS256 is mandatory per FRD Section 5.3. Symmetric keys (HS256) are
    | explicitly prohibited to prevent shared-secret vulnerabilities.
    */
    'algorithm' => 'RS256',

    /*
    |--------------------------------------------------------------------------
    | Keys
    |--------------------------------------------------------------------------
    | Generate with:
    |   openssl genrsa -out keys/private.pem 2048
    |   openssl rsa -in keys/private.pem -pubout -out keys/public.pem
    */
    'private_key' => env('JWT_PRIVATE_KEY_PATH', base_path('keys/private.pem')),
    'public_key' => env('JWT_PUBLIC_KEY_PATH', base_path('keys/public.pem')),

    /*
    |--------------------------------------------------------------------------
    | Token Lifetimes
    |--------------------------------------------------------------------------
    | Access tokens: 15 minutes (strict per FRD 5.3)
    | Refresh tokens: 7 days, rotated on every use, tracked in Redis
    */
    'access_ttl' => env('JWT_ACCESS_TOKEN_TTL', 15),  // minutes
    'refresh_ttl' => env('JWT_REFRESH_TOKEN_TTL', 10080),  // minutes (7 days)

    /*
    |--------------------------------------------------------------------------
    | Issuer & Audience
    |--------------------------------------------------------------------------
    */
    'issuer' => env('JWT_ISSUER', 'poc-ams-auth'),
    'audience' => env('JWT_AUDIENCE', 'poc-ams'),
];
