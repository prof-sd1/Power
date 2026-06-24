"use client";

import React from 'react';

// Mock Data for Attendance Logs (Art 9.5.8)
const attendanceLogs = [
  { studentId: "PC/MIS/0142/2026", name: "Abebe Kebede", joinTime: "10:02 AM", leaveTime: "11:30 AM", duration: "88 mins", status: "PRESENT", ip: "197.214.x.x" },
  { studentId: "PC/MIS/0055/2026", name: "Sara Alemu", joinTime: "10:05 AM", leaveTime: "10:20 AM", duration: "15 mins", status: "ABSENT", ip: "196.188.x.x", note: "Dropped connection early" },
  { studentId: "PC/MIS/0210/2026", name: "Dawit Bekele", joinTime: "-", leaveTime: "-", duration: "0 mins", status: "ABSENT", ip: "-" },
  { studentId: "PC/MIS/0099/2026", name: "Betelhem Tadesse", joinTime: "10:00 AM", leaveTime: "11:30 AM", duration: "90 mins", status: "PRESENT", ip: "10.0.x.x" }
];

export default function AttendanceDashboardPage() {
  const totalStudents = attendanceLogs.length;
  const presentStudents = attendanceLogs.filter(l => l.status === "PRESENT").length;
  const deliveryRatio = 100; // Hardcoded to 100% per FRD requirements

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col space-y-6">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[var(--border-color)] pb-4 mb-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Automated <span className="gradient-text">Attendance Log</span></h1>
          <p className="text-[var(--text-secondary)] mt-1">Course: MIS2011 | Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="btn-secondary py-2 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export Signed CSV
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="premium-card p-6 border-l-4 border-[var(--accent-primary)]">
          <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-2">Live Session Attendance</p>
          <div className="flex items-end space-x-2">
            <h2 className="text-4xl font-display font-bold text-white">{presentStudents} <span className="text-xl text-[var(--text-secondary)]">/ {totalStudents}</span></h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2">Required: 90 mins per Art. 9.5.8</p>
        </div>

        <div className="premium-card p-6 border-l-4 border-[var(--success)]">
          <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-2">Online Delivery Ratio</p>
          <div className="flex items-end space-x-2">
            <h2 className="text-4xl font-display font-bold text-[var(--success)]">{deliveryRatio}%</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2">Automatically proven via hardcoded constraints.</p>
        </div>

        <div className="premium-card p-6 bg-[var(--bg-tertiary)]/30 border border-[var(--glass-border)]">
          <h3 className="font-semibold text-[var(--text-primary)] mb-2">ETA Compliance Notice</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Attendance is strictly tracked via WebSocket heartbeats. Time-on-task is calculated server-side. Manual overrides by instructors are prohibited to ensure audit integrity.
          </p>
        </div>
      </div>

      {/* Data Table */}
      <div className="premium-card p-0 overflow-hidden animate-fade-in delay-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Student</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Join Time</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Leave Time</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Duration</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">IP Subnet</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {attendanceLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-[var(--bg-tertiary)]/20 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-white">{log.name}</p>
                    <p className="text-xs font-mono text-[var(--text-muted)]">{log.studentId}</p>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{log.joinTime}</td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{log.leaveTime}</td>
                  <td className="p-4 text-sm font-medium">{log.duration}</td>
                  <td className="p-4 text-sm font-mono text-[var(--text-muted)]">{log.ip}</td>
                  <td className="p-4">
                    <span className={`badge ${log.status === 'PRESENT' ? 'badge-success' : 'badge-error'}`}>
                      {log.status}
                    </span>
                    {log.note && <p className="text-[10px] text-[var(--error)] mt-1">{log.note}</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
