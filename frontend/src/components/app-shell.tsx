"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { navItems, canAccessPage, type PageRoute } from "@/lib/rbac";
import { NetworkBadge, DataSovereigntyFooter } from "./network-badge";
import { ShieldCheck, Menu, X } from "lucide-react";
import type { ReactNode } from "react";

type AppShellProps = {
  classification: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AppShell({
  classification,
  title,
  subtitle,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter nav items based on user role
  const visibleNavItems = navItems.filter((item) => {
    if (!user) return false;
    return canAccessPage(user.role, item.href as PageRoute);
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[280px] border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-slate-200 px-5 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Power College
                  </p>
                  <h1 className="mt-1 text-lg font-semibold">POC-AMS</h1>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-slate-500 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                {classification}
              </p>
            </div>

            <nav className="grid max-h-[calc(100vh-320px)] gap-1 overflow-y-auto px-3 py-4">
              {visibleNavItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex h-11 items-center justify-between rounded-md px-3 text-sm font-medium transition ${
                      active
                        ? "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active ? (
                      <span className="text-xs uppercase">Current</span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-slate-200 p-4">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Access Policy
                  </span>
                  <ShieldCheck className="text-emerald-600" size={18} />
                </div>
                <p className="text-sm font-semibold">PoLP and SoD enforced</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  RS256 identity boundary. Hash-chained audit trail.
                </p>
              </div>

              {/* User info & logout */}
              {user && (
                <div className="mt-3 flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role.replace(/_/g, " ")}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs font-medium text-slate-500 hover:text-rose-600 ml-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <section className="flex min-w-0 flex-col">
          {/* Top bar with hamburger menu */}
          <header className="border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-slate-500 hover:text-slate-700"
                >
                  <Menu size={24} />
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {classification}
                  </p>
                  <div className="mt-1 flex flex-col gap-1 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        {title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <NetworkBadge />
              </div>
            </div>
          </header>

          <div className="grid gap-4 p-4 md:p-6">{children}</div>

          <DataSovereigntyFooter />
        </section>
      </div>
    </main>
  );
}