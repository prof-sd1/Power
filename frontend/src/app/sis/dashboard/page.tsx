"use client";

import React from 'react';
import Link from 'next/link';

export default function SisDashboardPage() {
  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col space-y-8 animate-fade-in">
      
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Student <span className="gradient-text">Dashboard</span></h1>
          <p className="text-[var(--text-secondary)] mt-1">Welcome back, Abebe. Here is your academic overview.</p>
        </div>
        <div className="flex items-center space-x-3 bg-[var(--bg-tertiary)]/40 p-2 border border-[var(--border-color)] rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] font-bold">
            AK
          </div>
          <div className="text-sm pr-2">
            <p className="font-semibold text-white">PC/MIS/0142/2026</p>
            <p className="text-[var(--text-muted)]">Active • Good Standing</p>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="premium-card p-6 flex flex-col justify-center">
          <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-1">Cumulative GPA</p>
          <div className="flex items-end space-x-2">
            <h2 className="text-4xl font-display font-bold text-white">3.85</h2>
            <span className="text-[var(--text-secondary)] pb-1">/ 4.0</span>
          </div>
        </div>
        
        <div className="premium-card p-6 flex flex-col justify-center">
          <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-1">Earned Credits</p>
          <div className="flex items-end space-x-2">
            <h2 className="text-4xl font-display font-bold text-[var(--accent-secondary)]">45</h2>
            <span className="text-[var(--text-secondary)] pb-1">/ 160 required</span>
          </div>
        </div>

        <div className="premium-card p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[var(--warning)]/5 blur-xl"></div>
          <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-1">Financial Status</p>
          <h2 className="text-xl font-display font-bold text-[var(--warning)] mb-2">Invoice Pending</h2>
          <Link href="/finance/wallet" className="text-sm text-[var(--accent-primary)] hover:underline">View details &rarr;</Link>
        </div>

        <div className="premium-card p-6 flex flex-col justify-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
          <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-2">Quick Actions</p>
          <div className="flex flex-col space-y-2">
            <Link href="/sis/registration" className="btn-secondary py-2 text-sm">Course Registration</Link>
            <Link href="/sis/transcript" className="btn-secondary py-2 text-sm">Request Transcript</Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Current Semester Courses */}
        <div className="lg:col-span-2 premium-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-display font-semibold">Current Semester <span className="text-sm font-normal text-[var(--text-muted)] ml-2">(Year 2, Sem 1)</span></h3>
            <span className="badge badge-success">ETA Delivery: 100% Online</span>
          </div>
          
          <div className="space-y-4">
            {/* Course Item */}
            <div className="border border-[var(--border-color)] rounded-xl p-4 hover:bg-[var(--bg-tertiary)]/20 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg text-white">Database Systems (MIS2011)</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Prof. Tilahun • 3 Credits • Section A</p>
                </div>
                <div className="bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] px-3 py-1 rounded-md text-sm font-medium">
                  In Progress
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Live Session: Mon & Wed 10:00 AM (EAT)</span>
                <Link href="#" className="text-[var(--accent-secondary)] hover:underline">Go to Classroom</Link>
              </div>
            </div>

            {/* Course Item */}
            <div className="border border-[var(--border-color)] rounded-xl p-4 hover:bg-[var(--bg-tertiary)]/20 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg text-white">System Analysis & Design (MIS2021)</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Dr. Almaz • 4 Credits • Section B</p>
                </div>
                <div className="bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] px-3 py-1 rounded-md text-sm font-medium">
                  In Progress
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Live Session: Tue & Thu 2:00 PM (EAT)</span>
                <Link href="#" className="text-[var(--accent-secondary)] hover:underline">Go to Classroom</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Alerts */}
        <div className="premium-card p-6 border-t-4 border-t-[var(--accent-secondary)]">
          <h3 className="text-xl font-display font-semibold mb-6">Notifications & Alerts</h3>
          <div className="space-y-4">
            <div className="p-3 bg-[var(--bg-tertiary)]/30 rounded-lg border-l-2 border-l-[var(--warning)]">
              <p className="text-sm text-[var(--text-primary)] font-medium">Add/Drop Window Closing</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">The 14-day add/drop window closes in 2 days. No refunds will be issued after this date per Art. 9.7.4.</p>
            </div>
            <div className="p-3 bg-[var(--bg-tertiary)]/30 rounded-lg border-l-2 border-l-[var(--accent-primary)]">
              <p className="text-sm text-[var(--text-primary)] font-medium">New Grade Posted</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Your final grade for Intro to Programming (MIS1011) has been Registrar Locked.</p>
            </div>
            <div className="p-3 bg-[var(--bg-tertiary)]/30 rounded-lg border-l-2 border-l-[var(--text-muted)]">
              <p className="text-sm text-[var(--text-primary)] font-medium">Library Notice</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Your DRM lease for "Database Design 9th Ed." expires in 5 days.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
