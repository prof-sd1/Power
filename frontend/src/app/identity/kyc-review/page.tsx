"use client";

import React, { useState } from 'react';

// Mock data for the review queue
const mockApplicants = [
  {
    id: "APP-2026-X9V2K",
    firstName: "Abebe",
    lastName: "Kebede",
    program: "Bachelor of Arts (BA) in MIS",
    submittedAt: "2026-06-24T10:30:00Z",
    email: "abebe@example.com",
    phone: "+251 911 000000",
    nationalIdUrl: "https://via.placeholder.com/600x400.png?text=National+ID+Scan",
    selfieUrl: "https://via.placeholder.com/300x300.png?text=Selfie+Capture",
    clamAvStatus: "CLEAN",
  }
];

export default function KycReviewPage() {
  const [currentApplicantIndex, setCurrentApplicantIndex] = useState(0);
  const [decision, setDecision] = useState<'PENDING' | 'APPROVE' | 'REJECT'>('PENDING');
  const [rejectReason, setRejectReason] = useState('');
  const [notes, setNotes] = useState('');

  const currentApplicant = mockApplicants[currentApplicantIndex];

  if (!currentApplicant) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="premium-card text-center max-w-md">
          <div className="w-16 h-16 bg-[var(--success)]/20 text-[var(--success)] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">Queue Empty</h2>
          <p className="text-[var(--text-secondary)]">All KYC verifications are complete. Great job!</p>
        </div>
      </div>
    );
  }

  const handleAction = (type: 'APPROVE' | 'REJECT') => {
    // In a real app, this would dispatch an API call with the RS256 token to write to schema_audit
    alert(`Applicant ${type}D. Moving to next in queue.`);
    setCurrentApplicantIndex(currentApplicantIndex + 1);
    setDecision('PENDING');
    setRejectReason('');
    setNotes('');
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col h-screen overflow-hidden">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-2xl font-display font-bold">Registrar Desk: <span className="gradient-text">KYC Verification</span></h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Reviewing application {currentApplicantIndex + 1} of {mockApplicants.length}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="badge badge-neutral">ETA Art. 8.2 Protocol</div>
          <div className="badge badge-success">ClamAV: {currentApplicant.clamAvStatus}</div>
        </div>
      </header>

      {/* Main Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
        {/* Left Column: Documents */}
        <div className="premium-card flex flex-col h-full overflow-hidden p-0 rounded-xl border border-[var(--glass-border)] relative">
          <div className="bg-[var(--bg-tertiary)]/50 p-3 border-b border-[var(--border-color)] flex justify-between items-center">
            <h3 className="font-medium text-sm text-[var(--text-secondary)] uppercase tracking-wider">Uploaded Documents</h3>
            <span className="text-xs text-[var(--accent-primary)] cursor-pointer hover:underline">View Full Screen</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[var(--bg-primary)]/50">
            <div>
              <p className="text-sm font-medium mb-2">National ID (Primary)</p>
              <div className="border border-[var(--border-color)] rounded-lg overflow-hidden relative group">
                <img src={currentApplicant.nationalIdUrl} alt="National ID" className="w-full h-auto object-contain bg-black/50" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="btn-secondary bg-white/10 backdrop-blur-md">Magnify</button>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Live Capture (Selfie)</p>
              <div className="border border-[var(--border-color)] rounded-lg overflow-hidden w-48 h-48 mx-auto">
                <img src={currentApplicant.selfieUrl} alt="Selfie" className="w-full h-full object-cover bg-black/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Applicant Data & Decision */}
        <div className="flex flex-col h-full space-y-6 overflow-y-auto pr-2">
          
          {/* Form Data Review */}
          <div className="premium-card p-6">
             <h3 className="font-display font-semibold text-lg border-b border-[var(--border-color)] pb-3 mb-4">Applicant Data</h3>
             <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Application ID</p>
                  <p className="font-mono text-[var(--text-primary)] mt-1">{currentApplicant.id}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Program</p>
                  <p className="text-[var(--text-primary)] mt-1">{currentApplicant.program}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Full Legal Name</p>
                  <p className="text-lg font-medium text-[var(--accent-primary)] mt-1">{currentApplicant.firstName} {currentApplicant.lastName}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Contact Info</p>
                  <p className="text-[var(--text-primary)] mt-1 text-sm">{currentApplicant.email}<br/>{currentApplicant.phone}</p>
                </div>
             </div>
          </div>

          {/* Decision Box */}
          <div className="premium-card p-6 border-l-4 border-l-[var(--accent-secondary)]">
            <h3 className="font-display font-semibold text-lg mb-4">Adjudication</h3>
            
            <div className="flex space-x-4 mb-6">
              <button 
                className={`flex-1 py-3 rounded-lg border text-center transition-all ${decision === 'APPROVE' ? 'bg-[var(--success)]/20 border-[var(--success)] text-[var(--success)]' : 'border-[var(--border-color)] hover:border-[var(--text-muted)] text-[var(--text-secondary)]'}`}
                onClick={() => setDecision('APPROVE')}
              >
                <div className="text-xl mb-1">✓</div>
                <div className="font-medium">Approve Identity</div>
              </button>
              <button 
                className={`flex-1 py-3 rounded-lg border text-center transition-all ${decision === 'REJECT' ? 'bg-[var(--error)]/20 border-[var(--error)] text-[var(--error)]' : 'border-[var(--border-color)] hover:border-[var(--text-muted)] text-[var(--text-secondary)]'}`}
                onClick={() => setDecision('REJECT')}
              >
                <div className="text-xl mb-1">✗</div>
                <div className="font-medium">Reject / Flag</div>
              </button>
            </div>

            {decision === 'REJECT' && (
              <div className="space-y-4 mb-6 animate-fade-in">
                <div className="input-group">
                  <label className="input-label text-[var(--error)]">Mandatory Reason Code</label>
                  <select 
                    className="form-input border-[var(--error)]/50 focus:border-[var(--error)]"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  >
                    <option value="">-- Select Reason --</option>
                    <option value="BLURRY">Blurry / Illegible Image</option>
                    <option value="NAME_MISMATCH">Name Mismatch</option>
                    <option value="SUSPECTED_FRAUD">Suspected Fraud / Forgery</option>
                    <option value="EXPIRED_ID">Expired ID Document</option>
                  </select>
                </div>
              </div>
            )}

            <div className="input-group mb-6">
              <label className="input-label">Audit Notes (Optional)</label>
              <textarea 
                className="form-input resize-none h-20" 
                placeholder="Internal notes written to schema_audit..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <button 
              className={`w-full py-3 rounded-md font-bold transition-all ${
                decision === 'APPROVE' 
                  ? 'bg-[var(--success)] text-white hover:bg-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.4)]' 
                  : decision === 'REJECT' && rejectReason
                    ? 'bg-[var(--error)] text-white hover:bg-red-600 shadow-[0_4px_14px_rgba(239,68,68,0.4)]'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed'
              }`}
              disabled={decision === 'PENDING' || (decision === 'REJECT' && !rejectReason)}
              onClick={() => handleAction(decision)}
            >
              Confirm {decision === 'PENDING' ? 'Decision' : decision} & Hash Log
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
