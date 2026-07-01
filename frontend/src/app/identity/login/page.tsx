"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      addToast({
        type: "success",
        title: "Login successful",
        message: "Welcome to Power College POC-AMS",
      });
      window.location.href = "/";
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Invalid credentials. Please try again.";
      setError(message);
      addToast({
        type: "error",
        title: "Login failed",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full space-y-8 glass-panel p-10 z-10 animate-fade-in">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Welcome to <span className="gradient-text">Power College</span>
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Academic Management System Login
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Student / Staff ID or Email"
              id="email-address"
              name="email"
              type="text"
              autoComplete="email"
              required
              placeholder="PC/MIS/001/2026"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="rounded-md bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-slate-600"
              >
                Remember my device
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full flex justify-center py-3 text-lg"
            >
              Sign in to Dashboard
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            New Applicant?{" "}
            <Link
              href="/identity/register"
              className="font-medium text-violet-600 hover:text-violet-500"
            >
              Begin Registration
            </Link>
          </p>
        </div>

        {/* Compliance Note */}
        <div className="mt-8 border-t border-slate-200 pt-6 text-center">
          <p className="text-xs text-slate-400">
            Access implies consent to the ETA Directive 806/2013 monitoring
            protocols. Device fingerprinting is active.
          </p>
        </div>
      </div>
    </div>
  );
}