"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ManualReceiptPage() {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-xl w-full">
        
        <div className="mb-6 flex items-center">
          <Link href="/finance/wallet" className="text-[var(--accent-primary)] hover:underline flex items-center text-sm font-medium">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Wallet
          </Link>
        </div>

        {success ? (
          <div className="premium-card text-center py-12 animate-fade-in border-t-4 border-t-[var(--warning)]">
             <div className="w-20 h-20 bg-[var(--warning)]/20 text-[var(--warning)] rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h2 className="text-3xl font-display font-bold mb-2">Receipt Uploaded</h2>
             <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
               Your bank deposit slip has been securely uploaded to the Finance Vault. It is currently pending maker-checker verification by the Finance Officer.
             </p>
             <p className="text-sm text-[var(--text-muted)] mb-8">
               Note: Manual verification may take up to 48 hours. Holds will not be lifted until verified.
             </p>
             <div>
               <Link href="/finance/wallet" className="btn-secondary">Return to Wallet</Link>
             </div>
          </div>
        ) : (
          <div className="premium-card animate-fade-in">
            <h2 className="text-2xl font-display font-bold mb-2">Upload <span className="gradient-text">Bank Receipt</span></h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8">
              Use this fallback only if E-Payment gateways are inaccessible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-2 border-dashed border-[var(--glass-border)] rounded-xl p-8 text-center hover:bg-[var(--bg-tertiary)]/20 transition-colors">
                <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </div>
                <label className="block text-lg font-medium text-white mb-2 cursor-pointer">
                  Upload Stamped Deposit Slip
                  <input type="file" required className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
                <p className="text-sm text-[var(--text-muted)]">Max file size: 5MB.</p>
                {file && (
                  <div className="mt-4 inline-flex items-center px-4 py-2 bg-[var(--success)]/10 text-[var(--success)] rounded-full text-sm font-medium border border-[var(--success)]/20">
                    ✓ {file.name}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="input-group">
                  <label className="input-label">Deposit Amount (ETB)</label>
                  <input 
                    type="number" 
                    required 
                    min="1"
                    className="form-input" 
                    placeholder="2500.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Bank Reference Number</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="e.g. FT26..."
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-[var(--warning)]/10 border-l-4 border-[var(--warning)] p-4 rounded-md">
                <p className="text-sm text-[var(--warning)] font-medium">Four-Eyes Verification Notice</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Deposits exceeding 5,000 ETB require multi-sig approval by the CFO per Art. 9.7 protocols.
                </p>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !file || !amount || !reference}
                className="w-full btn-primary py-3"
              >
                {isSubmitting ? 'Uploading to MinIO Vault...' : 'Submit for Verification'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
