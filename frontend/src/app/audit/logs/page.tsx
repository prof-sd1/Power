"use client";

import React, { useState } from 'react';

// Mock Audit Logs
const auditLogs = [
  { id: 98112, hash: "a3f9b2...e1c4", timestamp: "2026-06-24 10:45:12", user: "Proctor_Engine_v1", action: "FLAG_INCIDENT", details: "INC-8891: MULTIPLE_FACES detected in MIS2011 Final.", severity: "HIGH" },
  { id: 98111, hash: "b7e2c1...9a8d", timestamp: "2026-06-24 10:42:05", user: "PC/MIS/0142/2026", action: "EXAM_BLUR_EVENT", details: "User navigated away from secure exam window.", severity: "MEDIUM" },
  { id: 98110, hash: "f1a5d9...2b3c", timestamp: "2026-06-24 10:30:00", user: "System", action: "QUEUE_VIDEO_TRANSCODE", details: "MIS2011 Module 1 Video sent to FFmpeg worker.", severity: "INFO" },
  { id: 98109, hash: "c4d8e7...1f2a", timestamp: "2026-06-24 09:15:33", user: "Finance_Webhook", action: "LIFT_HOLD", details: "Telebirr webhook received. Negative balance cleared for PC/MIS/0142/2026.", severity: "INFO" },
  { id: 98108, hash: "e9f1a2...c4d8", timestamp: "2026-06-24 08:05:11", user: "Registrar_Admin", action: "KYC_VERIFIED", details: "Identity verified manually. Reason: Passed National ID Check.", severity: "HIGH" },
];

export default function AuditLogsPage() {
  const [filter, setFilter] = useState('ALL');

  const filteredLogs = filter === 'ALL' ? auditLogs : auditLogs.filter(log => log.severity === filter);

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col h-screen overflow-hidden">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-[var(--border-color)] pb-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Immutable <span className="gradient-text">Audit Trail</span></h1>
          <p className="text-[var(--text-secondary)] mt-1">Viewing schema_audit (Cryptographically Hash-Chained)</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
           <select 
             className="form-input py-1.5 px-3 text-sm"
             value={filter}
             onChange={(e) => setFilter(e.target.value)}
           >
             <option value="ALL">All Severities</option>
             <option value="INFO">Info Logs Only</option>
             <option value="MEDIUM">Medium Alerts Only</option>
             <option value="HIGH">High Critical Logs Only</option>
           </select>
        </div>
      </header>

      <div className="flex-1 premium-card p-0 overflow-hidden flex flex-col">
        
        <div className="bg-[var(--bg-tertiary)]/50 p-4 border-b border-[var(--border-color)] flex justify-between items-center">
          <div className="flex items-center text-sm text-[var(--success)] font-medium">
             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
             Hash Chain Verified Intact
          </div>
          <span className="text-xs text-[var(--text-muted)] font-mono">Current Block: 98112</span>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="sticky top-0 bg-[var(--bg-secondary)] shadow-md z-10 border-b border-[var(--border-color)]">
              <tr>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Log ID</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Timestamp</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Severity</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Actor / User</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Action</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider w-full">Details & Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[var(--bg-tertiary)]/30 transition-colors group">
                  <td className="p-4 text-sm font-mono text-[var(--text-muted)]">{log.id}</td>
                  <td className="p-4 text-sm text-[var(--text-secondary)] font-mono">{log.timestamp}</td>
                  <td className="p-4">
                    <span className={`badge text-[10px] ${log.severity === 'HIGH' ? 'badge-error' : log.severity === 'MEDIUM' ? 'badge-warning' : 'badge-neutral text-gray-400'}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium text-white">{log.user}</td>
                  <td className="p-4 text-sm font-mono text-[var(--accent-primary)]">{log.action}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-[var(--text-primary)] truncate max-w-lg" title={log.details}>{log.details}</span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] mt-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                         Prev Hash: {log.hash}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-12 text-[var(--text-muted)]">
               No audit logs found for the selected filter.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
