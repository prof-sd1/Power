"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ExamSessionPage({ params }: { params: { id: string } }) {
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours
  const [snapshotFlash, setSnapshotFlash] = useState(false);
  const [warnings, setWarnings] = useState(0);

  const examId = params.id || "EX-MIS2011-FINAL";

  // Lockdown simulation
  useEffect(() => {
    if (examStarted) {
      const handleBlur = () => {
        setWarnings(prev => prev + 1);
        alert("SECURITY WARNING: You have left the exam window. This event has been logged to schema_audit.");
      };
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v')) {
          e.preventDefault();
          alert("SECURITY WARNING: Copy/Paste is disabled during this exam.");
        }
      };

      window.addEventListener('blur', handleBlur);
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        window.removeEventListener('blur', handleBlur);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [examStarted]);

  // Exam Timer & Periodic Snapshot
  useEffect(() => {
    if (examStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        
        // Simulate random AI proctoring snapshot
        if (Math.random() < 0.05) {
          setSnapshotFlash(true);
          setTimeout(() => setSnapshotFlash(false), 300);
        }
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && examStarted) {
       alert("Time is up! Exam auto-submitted.");
       setExamStarted(false);
    }
  }, [examStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-xl w-full premium-card animate-fade-in border-t-4 border-[var(--error)]">
          <div className="text-center mb-6">
            <svg className="w-16 h-16 text-[var(--error)] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <h2 className="text-2xl font-display font-bold">Secure Exam Environment</h2>
            <p className="text-[var(--text-secondary)]">Database Systems - Final Exam ({examId})</p>
          </div>
          
          <div className="bg-[var(--bg-tertiary)]/30 p-4 rounded-lg mb-6 border border-[var(--glass-border)] text-sm space-y-2">
            <p className="text-white font-bold">Proctoring Rules (Art. 9.5):</p>
            <ul className="list-disc list-inside text-[var(--text-muted)]">
              <li>Webcam will randomly capture snapshots throughout the exam.</li>
              <li>Navigating away from this tab will trigger an automatic audit flag.</li>
              <li>Copy, paste, and right-click functions are disabled.</li>
              <li>Ensure you have a stable connection. Answers are auto-saved every 30s.</li>
            </ul>
          </div>

          <div className="flex justify-between items-center mb-6 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded">
             <span className="text-sm font-medium">Camera Status:</span>
             <span className="text-[var(--success)] font-bold flex items-center">
               <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse mr-2"></span> Active
             </span>
          </div>

          <button onClick={() => setExamStarted(true)} className="w-full btn-primary py-3 text-lg bg-[var(--error)] hover:bg-red-700 shadow-none hover:shadow-none border border-red-800">
            I Understand. Start Exam.
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-75 ${snapshotFlash ? 'bg-white' : 'bg-black'}`}>
      
      {/* Lockdown Header */}
      <div className="h-14 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6 z-10">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-[var(--error)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          <span className="text-white font-medium">{examId}</span>
        </div>
        
        <div className="flex items-center space-x-6">
           <div className="flex items-center bg-gray-800 px-3 py-1 rounded">
             <span className="text-xs text-gray-400 mr-2">Audit Flags:</span>
             <span className={`font-mono font-bold ${warnings > 0 ? 'text-[var(--error)]' : 'text-[var(--success)]'}`}>{warnings}</span>
           </div>
           
           <div className="flex items-center text-xl font-mono font-bold text-white">
             <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <span className={timeLeft < 600 ? 'text-[var(--error)] animate-pulse' : ''}>
               {formatTime(timeLeft)}
             </span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-6 gap-6 bg-[#111827]">
        
        {/* Questions Area */}
        <div className="flex-1 bg-gray-800 rounded-xl border border-gray-700 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-12">
            
            {/* Q1 */}
            <div>
              <div className="flex justify-between mb-4">
                 <h3 className="text-lg font-bold text-white">Question 1</h3>
                 <span className="text-sm font-medium text-[var(--accent-primary)]">2 Points</span>
              </div>
              <p className="text-gray-300 mb-4">Which of the following normal forms deals directly with multi-valued dependencies?</p>
              <div className="space-y-3">
                {['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Fourth Normal Form (4NF)'].map((opt, i) => (
                  <label key={i} className="flex items-center p-3 border border-gray-600 rounded cursor-pointer hover:bg-gray-700 transition-colors">
                    <input type="radio" name="q1" className="h-4 w-4 text-[var(--accent-primary)] bg-gray-900 border-gray-500 focus:ring-[var(--accent-primary)]" />
                    <span className="ml-3 text-gray-300">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div>
              <div className="flex justify-between mb-4">
                 <h3 className="text-lg font-bold text-white">Question 2</h3>
                 <span className="text-sm font-medium text-[var(--accent-primary)]">5 Points</span>
              </div>
              <p className="text-gray-300 mb-4">Write a SQL query to find the second highest salary from the Employee table without using the TOP or LIMIT keywords.</p>
              <textarea 
                className="w-full bg-gray-900 border border-gray-600 rounded p-4 text-gray-300 font-mono focus:border-[var(--accent-primary)] focus:outline-none h-40 resize-none"
                placeholder="-- Write query here..."
                spellCheck="false"
              ></textarea>
            </div>

          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-64 flex flex-col space-y-6">
           {/* Webcam Feed Placeholder */}
           <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden relative">
             <div className="h-48 bg-gray-900 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
             </div>
             <div className="p-3 text-xs text-center border-t border-gray-700 bg-gray-800">
               <span className="flex items-center justify-center text-gray-400">
                 <span className="w-2 h-2 rounded-full bg-[var(--success)] mr-2"></span> AI Proctoring Active
               </span>
             </div>
           </div>

           <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 flex-1">
             <h4 className="text-sm font-bold text-white mb-4">Question Navigator</h4>
             <div className="grid grid-cols-4 gap-2">
               {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                 <button key={i} className={`h-8 rounded text-xs font-medium ${i === 1 || i === 2 ? 'bg-[var(--accent-primary)] text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
                   {i}
                 </button>
               ))}
             </div>
           </div>

           <button 
             onClick={() => {
               if(confirm("Are you sure you want to submit? You cannot return to the exam.")) {
                 setExamStarted(false);
                 alert("Exam submitted successfully. Hash verified in schema_audit.");
               }
             }}
             className="w-full btn-primary py-4 bg-[var(--success)] hover:bg-emerald-600 shadow-none hover:shadow-none"
           >
             Submit Exam
           </button>
        </div>

      </div>
    </div>
  );
}
