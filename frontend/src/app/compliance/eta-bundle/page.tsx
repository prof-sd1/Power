"use client";

import React, { useState } from 'react';

export default function ETABundlePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bundleReady, setBundleReady] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    setBundleReady(false);

    const stages = [
      { p: 15, delay: 500 },
      { p: 40, delay: 1500 },
      { p: 75, delay: 3000 },
      { p: 100, delay: 4500 }
    ];

    stages.forEach(({ p, delay }) => {
      setTimeout(() => setProgress(p), delay);
    });

    setTimeout(() => {
      setIsGenerating(false);
      setBundleReady(true);
    }, 5000);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--accent-primary)]/30">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <h1 className="text-4xl font-display font-bold mb-2">ETA Compliance <span className="gradient-text">Bundle</span></h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Generate the consolidated cryptographic bundle required for the bi-annual Education and Training Authority (ETA) license renewal.
          </p>
        </div>

        <div className="premium-card p-8 border-t-4 border-[var(--accent-secondary)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             <div>
               <h3 className="font-semibold text-lg mb-3">Included Data Scopes</h3>
               <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                 <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> schema_identity (KYC Validations)</li>
                 <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> schema_academic (Attendance Logs)</li>
                 <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> schema_finance (Wallet & Ledgers)</li>
                 <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> schema_audit (Immutable Hashes)</li>
               </ul>
             </div>
             <div>
               <h3 className="font-semibold text-lg mb-3">Output Format</h3>
               <p className="text-sm text-[var(--text-secondary)] mb-4">
                 The generated bundle will be a highly compressed, password-protected `.tar.gz` archive containing JSON exports and their corresponding RS256 signatures.
               </p>
               <div className="bg-[var(--bg-tertiary)]/50 p-3 rounded border border-[var(--border-color)]">
                  <p className="text-xs font-mono text-[var(--text-muted)]">Target DB Node: postgres-master-01</p>
                  <p className="text-xs font-mono text-[var(--text-muted)]">Signing Key: ETA_PRIVATE_KEY_2026</p>
               </div>
             </div>
          </div>

          {isGenerating ? (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--accent-primary)] font-medium">
                  {progress < 40 ? 'Extracting Academic Logs...' : progress < 75 ? 'Hashing Audit Trails...' : progress < 100 ? 'Compressing Bundle...' : 'Finalizing Signature...'}
                </span>
                <span className="font-mono text-[var(--text-muted)]">{progress}%</span>
              </div>
              <div className="h-3 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : bundleReady ? (
            <div className="mb-6 p-4 bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg flex items-center justify-between animate-fade-in">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-[var(--success)] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <p className="font-bold text-[var(--success)]">Bundle Generated Successfully</p>
                  <p className="text-xs font-mono text-[var(--text-muted)] mt-1">SHA256: 8f4e9a...b7c2 (1.4 GB)</p>
                </div>
              </div>
              <button className="btn-secondary py-1.5 border-[var(--success)] text-[var(--success)] hover:bg-[var(--success)]/10">
                Download .tar.gz
              </button>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-[var(--bg-tertiary)]/30 rounded-lg text-sm text-[var(--text-secondary)] text-center border border-[var(--border-color)]">
              This process may take several minutes depending on the volume of audit logs. Do not close this window.
            </div>
          )}

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full btn-primary py-4 text-lg"
          >
            {isGenerating ? 'Compiling Cryptographic Bundle...' : bundleReady ? 'Regenerate Bundle' : 'Generate Compliance Bundle'}
          </button>
        </div>
      </div>
    </div>
  );
}
