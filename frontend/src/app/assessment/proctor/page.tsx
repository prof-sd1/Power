"use client";

import React, { useState } from 'react';

// Mock Data for AI Proctoring Engine
const flaggedIncidents = [
  { id: "INC-8891", student: "PC/MIS/0142/2026", name: "Abebe Kebede", exam: "MIS2011 Final", type: "MULTIPLE_FACES", confidence: 92, time: "10:15 AM", status: "PENDING" },
  { id: "INC-8892", student: "PC/MIS/0055/2026", name: "Sara Alemu", exam: "MIS2011 Final", type: "NO_FACE_DETECTED", confidence: 85, time: "10:45 AM", status: "REVIEWED" },
  { id: "INC-8893", student: "PC/MIS/0099/2026", name: "Betelhem Tadesse", exam: "MIS2011 Final", type: "BROWSER_BLUR", confidence: 100, time: "11:02 AM", status: "PENDING" }
];

export default function ProctorDashboardPage() {
  const [selectedIncident, setSelectedIncident] = useState(flaggedIncidents[0]);

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col h-screen overflow-hidden">
      
      <header className="flex justify-between items-center mb-6 border-b border-[var(--border-color)] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold">AI Proctoring <span className="gradient-text">Dashboard</span></h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Real-time Anomaly Review (Art. 9.5.4)</p>
        </div>
        <div className="flex space-x-3">
          <div className="badge badge-error py-1.5 px-3">2 Pending Flags</div>
          <button className="btn-secondary py-1 text-sm">Download Audit Report</button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Left Column: Incident List */}
        <div className="premium-card p-0 flex flex-col overflow-hidden border border-[var(--glass-border)]">
          <div className="bg-[var(--bg-tertiary)]/50 p-4 border-b border-[var(--border-color)]">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[var(--text-secondary)]">Flagged Incidents</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {flaggedIncidents.map((incident) => (
              <div 
                key={incident.id}
                onClick={() => setSelectedIncident(incident)}
                className={`p-4 border-b border-[var(--border-color)] cursor-pointer transition-colors ${selectedIncident.id === incident.id ? 'bg-[var(--bg-tertiary)]/40 border-l-4 border-l-[var(--accent-primary)]' : 'hover:bg-[var(--bg-tertiary)]/20'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-[var(--text-primary)]">{incident.name}</span>
                  <span className="text-xs text-[var(--text-muted)]">{incident.time}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded bg-black/50 ${incident.type === 'MULTIPLE_FACES' ? 'text-[var(--error)]' : incident.type === 'NO_FACE_DETECTED' ? 'text-[var(--warning)]' : 'text-[var(--accent-primary)]'}`}>
                    {incident.type}
                  </span>
                  {incident.status === 'PENDING' ? (
                    <span className="w-2 h-2 rounded-full bg-[var(--error)] animate-pulse"></span>
                  ) : (
                    <span className="text-xs text-[var(--success)]">Reviewed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Incident Details */}
        <div className="lg:col-span-2 flex flex-col h-full space-y-6 min-h-0 overflow-y-auto pr-2">
          
          <div className="premium-card p-6 border-t-4 border-t-[var(--accent-secondary)]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-display font-bold mb-1">Incident Report: {selectedIncident.id}</h2>
                <p className="text-[var(--text-secondary)]">Student: {selectedIncident.student} ({selectedIncident.name})</p>
                <p className="text-[var(--text-secondary)]">Exam: {selectedIncident.exam}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">AI Confidence Score</p>
                <div className="text-3xl font-display font-bold text-[var(--error)]">{selectedIncident.confidence}%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
               <div>
                 <p className="text-sm font-medium mb-2">Reference ID Photo (Baseline)</p>
                 <div className="h-48 bg-black/50 rounded-lg border border-[var(--border-color)] flex items-center justify-center">
                   <svg className="w-12 h-12 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                 </div>
               </div>
               <div>
                 <p className="text-sm font-medium mb-2">Webcam Snapshot (Flagged)</p>
                 <div className="h-48 bg-black/50 rounded-lg border-2 border-[var(--error)]/50 relative overflow-hidden flex items-center justify-center">
                    <svg className="w-12 h-12 text-[var(--error)] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    
                    {/* Bounding box simulation for MULTIPLE_FACES */}
                    {selectedIncident.type === 'MULTIPLE_FACES' && (
                      <>
                        <div className="absolute top-8 left-10 w-20 h-24 border border-[var(--success)]"></div>
                        <div className="absolute top-12 right-12 w-24 h-28 border border-[var(--error)]"></div>
                      </>
                    )}
                 </div>
               </div>
            </div>

            <div className="bg-[var(--bg-tertiary)]/30 p-5 rounded-xl border border-[var(--glass-border)]">
              <h3 className="font-semibold mb-4 text-[var(--text-primary)]">Human Review Actions</h3>
              
              <div className="flex space-x-4 mb-4">
                <button className="flex-1 btn-secondary border-[var(--success)] text-[var(--success)] hover:bg-[var(--success)]/10">
                  Dismiss (False Positive)
                </button>
                <button className="flex-1 btn-secondary border-[var(--warning)] text-[var(--warning)] hover:bg-[var(--warning)]/10">
                  Issue Warning
                </button>
                <button className="flex-1 btn-secondary border-[var(--error)] text-[var(--error)] hover:bg-[var(--error)]/10">
                  Invalidate Exam
                </button>
              </div>
              
              <div className="input-group mb-0">
                <label className="input-label">Audit Note (Written to schema_audit)</label>
                <input type="text" className="form-input" placeholder="e.g., Confirmed second person in frame." />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
