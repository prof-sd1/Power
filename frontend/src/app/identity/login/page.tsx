"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would handle the RS256 JWT token exchange
      alert('Login logic would execute here');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen"></div>

      <div className="max-w-md w-full space-y-8 glass-panel p-10 z-10 animate-fade-in">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-white tracking-tight font-display">
            Welcome to <span className="gradient-text">Power College</span>
          </h2>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Academic Management System Login
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="input-group">
              <label htmlFor="email-address" className="input-label">
                Student / Staff ID or Email
              </label>
              <input
                id="email-address"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="form-input"
                placeholder="PC/MIS/001/2026"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)] border-gray-300 rounded bg-[var(--bg-secondary)]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--text-secondary)]">
                Remember my device
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)]">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex justify-center py-3 text-lg relative"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                'Sign in to Dashboard'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            New Applicant?{' '}
            <Link href="/identity/register" className="font-medium text-[var(--accent-secondary)] hover:text-[var(--accent-secondary-hover)]">
              Begin Registration
            </Link>
          </p>
        </div>
        
        {/* Compliance Note */}
        <div className="mt-8 border-t border-[var(--glass-border)] pt-6 text-center">
           <p className="text-xs text-[var(--text-muted)]">
             Access implies consent to the ETA Directive 806/2013 monitoring protocols.
             Device fingerprinting is active.
           </p>
        </div>
      </div>
    </div>
  );
}
