"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function PayPage() {
  const [amount, setAmount] = useState('2500.00');
  const [paymentMethod, setPaymentMethod] = useState<'TELEBIRR' | 'CBE'>('TELEBIRR');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate webhook idempotency and API orchestration
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 3000);
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

        {step === 1 ? (
          <div className="premium-card relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <h2 className="text-2xl font-display font-bold mb-2">Settle Balance via <span className="gradient-text">E-Payment</span></h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8">
              Integrated directly with national gateways per Directive 806/2013 Art. 8.2.12. Holds are lifted instantly upon successful webhook receipt.
            </p>

            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              
              <div className="bg-[var(--bg-primary)]/50 p-4 rounded-xl border border-[var(--border-color)] flex justify-between items-center mb-6">
                <span className="font-medium text-[var(--text-secondary)]">Outstanding Balance:</span>
                <span className="text-2xl font-bold font-mono text-[var(--error)]">2,500.00 ETB</span>
              </div>

              <div className="input-group">
                <label className="input-label">Payment Amount (ETB)</label>
                <input 
                  type="number" 
                  min="1" 
                  step="0.01"
                  required
                  className="form-input text-lg font-mono font-bold"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <label className="input-label">Select Payment Gateway</label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`border rounded-xl p-4 cursor-pointer text-center transition-all ${paymentMethod === 'TELEBIRR' ? 'border-[#8bc34a] bg-[#8bc34a]/10' : 'border-[var(--border-color)] hover:bg-[var(--bg-tertiary)]/20'}`}
                    onClick={() => setPaymentMethod('TELEBIRR')}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#8bc34a] mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">T</span>
                    </div>
                    <p className="font-semibold text-white">Telebirr</p>
                  </div>
                  
                  <div 
                    className={`border rounded-xl p-4 cursor-pointer text-center transition-all ${paymentMethod === 'CBE' ? 'border-[#673ab7] bg-[#673ab7]/10' : 'border-[var(--border-color)] hover:bg-[var(--bg-tertiary)]/20'}`}
                    onClick={() => setPaymentMethod('CBE')}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#673ab7] mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">CBE</span>
                    </div>
                    <p className="font-semibold text-white">CBE Birr</p>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">{paymentMethod === 'TELEBIRR' ? 'Telebirr Mobile Number' : 'CBE Account / Phone'}</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+251 9XX XXX XXX"
                  className="form-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={isProcessing || !amount || !phoneNumber}
                className="w-full btn-primary py-4 text-lg mt-4"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Awaiting API Webhook...
                  </span>
                ) : (
                  `Push USSD Prompt (${amount} ETB)`
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="premium-card text-center py-12 animate-fade-in border-t-4 border-t-[var(--success)]">
             <div className="w-20 h-20 bg-[var(--success)]/20 text-[var(--success)] rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
             </div>
             <h2 className="text-3xl font-display font-bold mb-2">Payment Verified</h2>
             <p className="text-[var(--text-secondary)] mb-6">Webhook received and processed. Financial hold lifted.</p>
             
             <div className="bg-[var(--bg-primary)] p-4 rounded-xl inline-block text-left mb-8 border border-[var(--glass-border)]">
               <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-1">Transaction ID</p>
               <p className="font-mono text-white text-lg">TXN-{Math.floor(100000 + Math.random() * 900000)}</p>
             </div>

             <div>
               <Link href="/finance/wallet" className="btn-secondary">View Updated Wallet</Link>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
