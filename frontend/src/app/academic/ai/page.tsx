"use client";

import React, { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
};

export default function AIStudyAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I am your Local AI Study Assistant powered by Ollama. I have access to your enrolled course materials (MIS2011). How can I help you study today?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate RAG Ollama backend delay and stream
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: "Based on Chapter 3 of 'Database Systems: The Complete Book', the primary difference is that 3NF allows transitive dependencies if the dependent attribute is part of a candidate key (prime attribute), whereas BCNF strictly requires that every determinant must be a candidate key.",
          sources: ["Database Systems (9th Ed) - Page 84", "MIS2011 Module 2 Lecture Transcript"]
        }
      ]);
      setIsTyping(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col h-screen overflow-hidden">
      
      <header className="flex justify-between items-center mb-6 border-b border-[var(--border-color)] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold">AI <span className="gradient-text">Study Assistant</span></h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Local RAG Knowledge Base (Data Sovereignty Ensured)</p>
        </div>
        <div className="flex items-center space-x-2 bg-[var(--bg-tertiary)]/50 px-3 py-1.5 rounded-full border border-[var(--border-color)]">
          <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></span>
          <span className="text-xs font-mono text-[var(--text-secondary)]">Llama3 (Local Ollama Node) Active</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col premium-card p-0 overflow-hidden border border-[var(--glass-border)]">
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[var(--bg-primary)]/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] lg:max-w-[60%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                
                <div className="flex items-center mb-1 px-1">
                  {msg.role === 'assistant' && (
                    <div className="w-5 h-5 rounded bg-[var(--accent-primary)] flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                  )}
                  <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    {msg.role === 'user' ? 'You' : 'Study AI'}
                  </span>
                </div>
                
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-[var(--accent-primary)]/20 text-white border border-[var(--accent-primary)]/30 rounded-tr-sm' : 'bg-[var(--bg-tertiary)]/60 text-[var(--text-primary)] border border-[var(--border-color)] rounded-tl-sm'}`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>

                {msg.sources && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.sources.map((src, i) => (
                      <span key={i} className="text-[10px] font-mono text-[var(--accent-secondary)] bg-[var(--accent-secondary)]/10 px-2 py-1 rounded border border-[var(--accent-secondary)]/20 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        {src}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[var(--bg-tertiary)]/60 border border-[var(--border-color)] rounded-2xl rounded-tl-sm p-4 flex space-x-2">
                <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
          <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your course materials..."
              disabled={isTyping}
              className="w-full bg-[var(--bg-tertiary)]/50 border border-[var(--border-color)] text-white rounded-xl py-4 pl-4 pr-16 focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 bottom-2 bg-[var(--accent-primary)] text-white px-4 rounded-lg hover:bg-[var(--accent-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
          <p className="text-center text-[10px] text-[var(--text-muted)] mt-2">
            AI responses are generated locally via Ollama. No data is sent to external APIs (OpenAI/Anthropic) to maintain privacy and offline capability.
          </p>
        </div>
      </div>
    </div>
  );
}
