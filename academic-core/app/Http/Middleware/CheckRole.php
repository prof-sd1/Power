<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Role-Based Access Control Middleware
 * FRD Section 7 — RBAC Architecture
 *
 * Checks if the authenticated user's role matches the required role(s).
 * Usage in routes: ->middleware('role:registrar,dean')
 */
class CheckRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $userRole = $request->input('auth_user_role');

        if (!$userRole || !in_array($userRole, $roles)) {
            return response()->json([
                'error' => 'Forbidden',
                'message' => 'You do not have the required role to access this resource.',
                'required_roles' => $roles,
                'your_role' => $userRole,
            ], 403);
        }

        return $next($request);
    }
}
