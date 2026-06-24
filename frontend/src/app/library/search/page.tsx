"use client";

import React, { useState } from 'react';

// Mock Library Data (Meilisearch Simulation)
const libraryDatabase = [
  { id: "LIB-991", title: "Database Systems: The Complete Book (9th Ed)", author: "Hector Garcia-Molina", type: "PDF", size: "45 MB", status: "AVAILABLE", category: "Computer Science" },
  { id: "LIB-992", title: "Modern Operating Systems (5th Ed)", author: "Andrew S. Tanenbaum", type: "EPUB", size: "12 MB", status: "WAITLIST", category: "Computer Science", queue: 4 },
  { id: "LIB-993", title: "Principles of Information Security", author: "Michael E. Whitman", type: "PDF", size: "30 MB", status: "AVAILABLE", category: "Cybersecurity" },
  { id: "LIB-994", title: "Introduction to Algorithms (4th Ed)", author: "Thomas H. Cormen", type: "PDF", size: "85 MB", status: "AVAILABLE", category: "Computer Science" },
];

export default function LibrarySearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(libraryDatabase);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate Meilisearch latency
    setTimeout(() => {
      const q = query.toLowerCase();
      const filtered = libraryDatabase.filter(book => 
        book.title.toLowerCase().includes(q) || 
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q)
      );
      setResults(filtered);
      setIsSearching(false);
    }, 400);
  };

  const handleCheckout = (bookId: string) => {
    alert(`DRM Lease requested for ${bookId}. The system has tied the decryption key to your session. Access expires in 14 days.`);
  };

  const handleWaitlist = (bookId: string) => {
    alert(`Added to FIFO Waitlist for ${bookId}. You will be notified when a DRM lease becomes available.`);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col space-y-6">
      
      <header className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold mb-3">Digital <span className="gradient-text">Library</span></h1>
        <p className="text-[var(--text-secondary)]">Lightning-fast full-text search powered by Meilisearch.</p>
      </header>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto w-full mb-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-24 py-4 bg-[var(--bg-tertiary)]/50 border border-[var(--border-color)] rounded-full text-lg text-white focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            placeholder="Search by title, author, or category (e.g. Database)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button 
              type="submit" 
              className="btn-primary py-2 px-6 rounded-full text-sm font-bold"
              disabled={isSearching}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
        <div className="flex justify-center space-x-4 mt-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-[var(--success)]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Zero-Knowledge DRM</span>
          <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-[var(--accent-primary)]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Instant Delivery</span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-xl font-display font-semibold mb-6 border-b border-[var(--border-color)] pb-2">
          {results.length} {results.length === 1 ? 'Result' : 'Results'} Found
        </h2>
        
        {results.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">
            No resources found matching your query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {results.map((book) => (
              <div key={book.id} className="premium-card p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--accent-primary)] font-bold">{book.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1 leading-tight">{book.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{book.author}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-bold ${book.type === 'PDF' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    {book.type}
                  </div>
                </div>
                
                <div className="flex-1"></div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center space-x-3 text-sm text-[var(--text-muted)]">
                    <span className="font-mono">{book.size}</span>
                    <span>•</span>
                    <span className="font-mono">{book.id}</span>
                  </div>
                  
                  <div>
                    {book.status === 'AVAILABLE' ? (
                      <button onClick={() => handleCheckout(book.id)} className="btn-secondary py-1.5 px-4 text-sm font-medium border-[var(--success)] text-[var(--success)] hover:bg-[var(--success)]/10">
                        Lease DRM Copy
                      </button>
                    ) : (
                      <button onClick={() => handleWaitlist(book.id)} className="btn-secondary py-1.5 px-4 text-sm font-medium border-[var(--warning)] text-[var(--warning)] hover:bg-[var(--warning)]/10">
                        Join Waitlist ({book.queue})
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
