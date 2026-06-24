"use client";

import React from 'react';
import Link from 'next/link';

// Mock Ledger Data
const ledgerEntries = [
  { id: "TXN-998877", date: "2026-06-20", description: "Tuition Invoice (Year 2, Sem 1)", type: "DEBIT", amount: 5000.00, balance: -5000.00 },
  { id: "TXN-998878", date: "2026-06-20", description: "Technology Fee", type: "DEBIT", amount: 1500.00, balance: -6500.00 },
  { id: "TXN-998879", date: "2026-06-21", description: "Telebirr Payment Received", type: "CREDIT", amount: 4000.00, balance: -2500.00 },
];

export default function WalletPage() {
  const currentBalance = ledgerEntries[ledgerEntries.length - 1].balance;
  const isHoldActive = currentBalance < 0;

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-display font-bold">Finance <span className="gradient-text">Vault</span></h1>
        <p className="text-[var(--text-secondary)] mt-1">Immutable Double-Entry Ledger System</p>
      </header>

      {/* Main Status & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card p-8 bg-gradient-to-br from-[var(--bg-secondary)] to-[#0f172a] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-4">
            <span className={`badge ${isHoldActive ? 'badge-error' : 'badge-success'} text-xs font-mono uppercase tracking-widest px-3 py-1`}>
              {isHoldActive ? 'ACTIVE FINANCIAL HOLD' : 'ACCOUNT CLEARED'}
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end">
            <div>
              <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-2 font-bold">Current Wallet Balance</p>
              <div className="flex items-end">
                <h2 className={`text-6xl font-display font-bold ${isHoldActive ? 'text-[var(--error)]' : 'text-[var(--success)]'}`}>
                  {currentBalance.toFixed(2)}
                </h2>
                <span className="text-2xl text-[var(--text-secondary)] mb-1 ml-3 font-mono">ETB</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-4 max-w-md">
                All balances are calculated dynamically from the immutable ledger entries. Direct balance manipulation is blocked at the database level.
              </p>
            </div>

            <div className="flex space-x-3 mt-6 md:mt-0">
               {isHoldActive && (
                 <Link href="/finance/pay" className="btn-primary">
                    Pay via Telebirr / CBE
                 </Link>
               )}
               <Link href="/finance/manual-receipt" className="btn-secondary">
                  Upload Bank Slip
               </Link>
            </div>
          </div>
        </div>

        <div className="premium-card p-6 flex flex-col justify-center border-l-4 border-l-[var(--accent-primary)]">
          <h3 className="font-display font-semibold mb-4 text-lg">Financial Holds (Art. 9.7)</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            If your balance is negative, a systemic hold is placed on your account. This instantly blocks:
          </p>
          <ul className="text-sm space-y-2 text-[var(--text-muted)] list-disc list-inside">
            <li>Course Registration</li>
            <li>DRM Content Downloads</li>
            <li>LiveKit Assessment Access</li>
            <li>Transcript Requests</li>
          </ul>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="premium-card p-0 overflow-hidden">
        <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-tertiary)]/30">
          <h3 className="text-xl font-display font-semibold">Ledger Entries</h3>
          <button className="text-sm text-[var(--accent-primary)] hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export to PDF
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Txn ID</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Description</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider text-right">Debit</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider text-right">Credit</th>
                <th className="p-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider text-right">Running Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {ledgerEntries.map((entry, idx) => (
                <tr key={idx} className="hover:bg-[var(--bg-tertiary)]/20 transition-colors">
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{entry.date}</td>
                  <td className="p-4 text-sm font-mono text-[var(--text-muted)]">{entry.id}</td>
                  <td className="p-4 text-sm font-medium text-white">{entry.description}</td>
                  <td className="p-4 text-sm text-right text-[var(--error)] font-mono">{entry.type === 'DEBIT' ? entry.amount.toFixed(2) : '-'}</td>
                  <td className="p-4 text-sm text-right text-[var(--success)] font-mono">{entry.type === 'CREDIT' ? entry.amount.toFixed(2) : '-'}</td>
                  <td className={`p-4 text-sm text-right font-bold font-mono ${entry.balance < 0 ? 'text-[var(--error)]' : 'text-[var(--success)]'}`}>
                    {entry.balance.toFixed(2)}
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
