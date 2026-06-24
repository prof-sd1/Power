"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: 'MIS',
    nationalIdFile: null as File | null,
    transcriptFile: null as File | null,
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API upload & validation
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Success step
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[var(--accent-secondary)] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[var(--accent-primary)] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto z-10 relative">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Admissions <span className="gradient-text">Portal</span>
          </h1>
          <p className="text-[var(--text-secondary)]">Begin your 100% online academic journey at Power College</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 premium-card animate-fade-in delay-100">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-[var(--border-color)] -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] -z-10 transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
            
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  step >= i 
                    ? 'bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                }`}
              >
                {step > i ? '✓' : i}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs font-medium text-[var(--text-muted)] px-2">
            <span className={step >= 1 ? 'text-[var(--text-primary)]' : ''}>Personal Info</span>
            <span className={step >= 2 ? 'text-[var(--text-primary)]' : ''}>Program</span>
            <span className={step >= 3 ? 'text-[var(--text-primary)]' : ''}>KYC Upload</span>
            <span className={step >= 4 ? 'text-[var(--text-primary)]' : ''}>Complete</span>
          </div>
        </div>

        <div className="premium-card animate-fade-in delay-200 shadow-2xl border border-[var(--glass-border)] relative overflow-hidden">
          {/* Glassmorphic overlay effect for the card */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
          
          {step === 1 && (
            <div className="space-y-6 relative z-10">
              <h3 className="text-2xl font-display font-semibold mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="input-group">
                  <label className="input-label">Legal First Name</label>
                  <input type="text" className="form-input" placeholder="Abebe" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Legal Last Name</label>
                  <input type="text" className="form-input" placeholder="Kebede" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input type="email" className="form-input" placeholder="abebe@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Phone Number (EthioTelecom)</label>
                  <input type="tel" className="form-input" placeholder="+251 911 000000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button type="button" onClick={handleNext} className="btn-primary">Continue to Program Selection</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 relative z-10">
              <h3 className="text-2xl font-display font-semibold mb-6">Select Program</h3>
              <div className="space-y-4">
                {['MIS', 'Accounting and Finance', 'Management'].map((prog) => (
                  <label 
                    key={prog} 
                    className={`block p-5 border rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.program === prog 
                        ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)] shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                        : 'border-[var(--border-color)] bg-[var(--bg-tertiary)]/30 hover:border-[var(--text-muted)]'
                    }`}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="program" 
                        className="h-5 w-5 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)] bg-[var(--bg-primary)] border-[var(--border-color)]"
                        checked={formData.program === prog}
                        onChange={() => setFormData({...formData, program: prog})}
                      />
                      <div className="ml-4">
                        <span className="block text-lg font-semibold text-white">Bachelor of Arts (BA) in {prog}</span>
                        <span className="block text-sm text-[var(--text-secondary)] mt-1">100% Online Delivery • 160 Credit Hours</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <button type="button" onClick={handlePrev} className="btn-secondary">Back</button>
                <button type="button" onClick={handleNext} className="btn-primary">Continue to KYC Upload</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <h3 className="text-2xl font-display font-semibold mb-2">Identity Verification (KYC)</h3>
              <p className="text-[var(--text-secondary)] mb-6 text-sm">
                Per Directive 806/2013, please upload your official National ID. Files are scanned via ClamAV upon upload.
              </p>
              
              <div className="space-y-6">
                <div className="border-2 border-dashed border-[var(--glass-border)] rounded-xl p-8 text-center hover:bg-[var(--bg-tertiary)]/20 transition-colors">
                  <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                  </div>
                  <label className="block text-lg font-medium text-white mb-2 cursor-pointer">
                    Upload National ID (Kebele / Passport)
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFormData({...formData, nationalIdFile: e.target.files?.[0] || null})} />
                  </label>
                  <p className="text-sm text-[var(--text-muted)]">Max file size: 5MB. Formats: PDF, JPEG, PNG.</p>
                  {formData.nationalIdFile && (
                    <div className="mt-4 inline-flex items-center px-4 py-2 bg-[var(--success)]/10 text-[var(--success)] rounded-full text-sm font-medium border border-[var(--success)]/20">
                      ✓ {formData.nationalIdFile.name}
                    </div>
                  )}
                </div>
                
                <div className="border-2 border-dashed border-[var(--glass-border)] rounded-xl p-8 text-center hover:bg-[var(--bg-tertiary)]/20 transition-colors">
                  <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[var(--accent-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <label className="block text-lg font-medium text-white mb-2 cursor-pointer">
                    Upload Prior Transcript / Entrance Exam
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFormData({...formData, transcriptFile: e.target.files?.[0] || null})} />
                  </label>
                  <p className="text-sm text-[var(--text-muted)]">Mandatory for BA programs.</p>
                  {formData.transcriptFile && (
                    <div className="mt-4 inline-flex items-center px-4 py-2 bg-[var(--success)]/10 text-[var(--success)] rounded-full text-sm font-medium border border-[var(--success)]/20">
                      ✓ {formData.transcriptFile.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button type="button" onClick={handlePrev} className="btn-secondary">Back</button>
                <button type="submit" disabled={isSubmitting || !formData.nationalIdFile} className="btn-primary relative">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing via ClamAV & Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-10 relative z-10 animate-fade-in">
              <div className="w-24 h-24 bg-gradient-to-br from-[var(--success)] to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Application Submitted!</h2>
              <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                Your application and KYC documents have been securely transmitted to the Registrar's office for side-by-side verification. You will receive an email update within 48 hours.
              </p>
              <div className="bg-[var(--bg-tertiary)]/30 rounded-lg p-4 inline-block border border-[var(--glass-border)]">
                <p className="text-sm font-medium text-[var(--text-primary)]">Application Reference ID:</p>
                <p className="text-lg font-mono text-[var(--accent-primary)] mt-1">APP-2026-X9V2K</p>
              </div>
              <div className="mt-10">
                <Link href="/" className="btn-secondary">Return to Home</Link>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-sm text-[var(--text-muted)]">
          Already have an account? <Link href="/identity/login" className="text-[var(--accent-primary)] hover:underline font-medium">Log in here</Link>
        </div>
      </div>
    </div>
  );
}
