"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CourseViewerPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'CONTENT' | 'SYLLABUS' | 'DISCUSSIONS'>('CONTENT');
  const [selectedVideo, setSelectedVideo] = useState<string | null>("vid_101");
  const [drmOverlayPosition, setDrmOverlayPosition] = useState({ top: '10%', left: '10%' });
  const [videoProgress, setVideoProgress] = useState(0);

  // Dynamic DRM Overlay simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDrmOverlayPosition({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate required viewing time (scrubbing disabled)
  useEffect(() => {
    if (videoProgress < 100) {
      const timer = setInterval(() => {
        setVideoProgress(prev => Math.min(prev + 1, 100));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [videoProgress]);

  const courseId = params.id || "MIS2011";

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col h-screen overflow-hidden">
      
      <header className="flex items-center justify-between mb-4 border-b border-[var(--border-color)] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Database Systems <span className="text-[var(--text-secondary)] font-normal ml-2">({courseId})</span></h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Prof. Tilahun • Section A</p>
        </div>
        <div className="flex space-x-3">
          <Link href={`/live/room/${courseId}`} className="btn-primary py-2 text-sm flex items-center">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse mr-2"></span>
            Join LiveKit Session
          </Link>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        
        {/* Left Sidebar: Modules */}
        <div className="lg:col-span-1 premium-card p-0 flex flex-col overflow-hidden border border-[var(--glass-border)]">
          <div className="bg-[var(--bg-tertiary)]/50 p-4 border-b border-[var(--border-color)]">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[var(--text-secondary)]">Course Modules</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            
            <div className="border-b border-[var(--border-color)]">
              <button className="w-full text-left p-4 bg-[var(--bg-secondary)] font-medium text-white flex justify-between items-center hover:bg-[var(--bg-tertiary)]/20 transition-colors">
                Module 1: Intro to SQL
                <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="bg-[var(--bg-primary)] p-2">
                <div 
                  className={`p-2 rounded-md cursor-pointer text-sm mb-1 transition-colors ${selectedVideo === 'vid_101' ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-medium border-l-2 border-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/20 hover:text-white'}`}
                  onClick={() => setSelectedVideo('vid_101')}
                >
                  <span className="inline-block w-4 mr-2">▶</span> 1.1 Relational Algebra
                </div>
                <div 
                  className={`p-2 rounded-md cursor-pointer text-sm mb-1 transition-colors ${selectedVideo === 'vid_102' ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-medium border-l-2 border-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/20 hover:text-white'}`}
                  onClick={() => setSelectedVideo('vid_102')}
                >
                  <span className="inline-block w-4 mr-2">▶</span> 1.2 Basic Queries
                </div>
                <div className="p-2 rounded-md cursor-pointer text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/20 hover:text-white flex items-center">
                  <span className="inline-block w-4 mr-2">📄</span> Reading: Ch 3 (DRM Protected)
                </div>
              </div>
            </div>

            <div className="border-b border-[var(--border-color)]">
              <button className="w-full text-left p-4 bg-[var(--bg-primary)] font-medium text-[var(--text-secondary)] flex justify-between items-center hover:bg-[var(--bg-tertiary)]/20 transition-colors">
                Module 2: Normalization
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>

          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 flex flex-col h-full space-y-4 min-h-0">
          
          {/* Tabs */}
          <div className="flex border-b border-[var(--border-color)] space-x-6 px-2">
            <button 
              className={`pb-3 font-medium transition-colors ${activeTab === 'CONTENT' ? 'text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-white'}`}
              onClick={() => setActiveTab('CONTENT')}
            >
              Content Viewer
            </button>
            <button 
              className={`pb-3 font-medium transition-colors ${activeTab === 'SYLLABUS' ? 'text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-white'}`}
              onClick={() => setActiveTab('SYLLABUS')}
            >
              Syllabus (v1.2)
            </button>
          </div>

          {activeTab === 'CONTENT' && (
            <div className="flex-1 premium-card p-0 overflow-hidden flex flex-col bg-black relative">
              {/* Simulated HLS Video Player */}
              <div className="flex-1 relative bg-gray-900 overflow-hidden group">
                
                {/* DRM Overlay */}
                <div 
                  className="absolute z-10 pointer-events-none text-white/20 text-xs font-mono font-bold rotate-[-15deg] transition-all duration-[5000ms] ease-linear whitespace-pre"
                  style={{ top: drmOverlayPosition.top, left: drmOverlayPosition.left }}
                >
                  PC/MIS/0142/2026<br/>
                  {new Date().toISOString()}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-[var(--text-secondary)] font-mono text-sm">Adaptive HLS Stream (720p)</p>
                  </div>
                </div>

                {/* Video Controls (Scrubbing disabled per Art. 9.3.3) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-[var(--accent-primary)]">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    </button>
                    
                    {/* Locked Progress Bar */}
                    <div className="flex-1 h-1.5 bg-gray-600 rounded-full overflow-hidden relative cursor-not-allowed" title="Seeking disabled for attendance compliance">
                      <div className="absolute top-0 left-0 h-full bg-[var(--accent-primary)]" style={{ width: `${videoProgress}%` }}></div>
                    </div>
                    
                    <span className="text-xs font-mono text-white">0:{videoProgress.toString().padStart(2, '0')} / 1:40</span>
                    <span className="text-xs bg-black/50 text-[var(--accent-primary)] px-2 py-1 rounded border border-[var(--accent-primary)]/30">Auto</span>
                  </div>
                </div>
              </div>

              {/* Required Completion Status */}
              <div className="bg-[var(--bg-secondary)] p-4 border-t border-[var(--border-color)] flex justify-between items-center">
                 <div>
                   <h4 className="font-medium text-white">1.1 Relational Algebra</h4>
                   <p className="text-xs text-[var(--text-secondary)] mt-1">Requires 90% watch time for module completion (Art. 9.3.3).</p>
                 </div>
                 <div className="flex items-center">
                   {videoProgress >= 90 ? (
                     <span className="badge badge-success text-xs"><span className="mr-1">✓</span> Completed</span>
                   ) : (
                     <span className="badge badge-neutral text-xs">In Progress ({videoProgress}%)</span>
                   )}
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'SYLLABUS' && (
            <div className="flex-1 premium-card p-6 overflow-y-auto prose prose-invert max-w-none">
              <div className="flex justify-between items-center mb-6 border-b border-[var(--border-color)] pb-4">
                <h2 className="text-2xl font-display font-bold mb-0">Course Syllabus</h2>
                <span className="text-xs font-mono text-[var(--text-muted)] border border-[var(--border-color)] px-2 py-1 rounded">Version 1.2</span>
              </div>
              <p><strong>Course Code:</strong> MIS2011</p>
              <p><strong>Credits:</strong> 3</p>
              <p><strong>Required Live Hours/Week:</strong> 3 Hours</p>
              <h3>Course Description</h3>
              <p>This course introduces the fundamental concepts of database systems, including the relational model, SQL, normalization, and transaction management.</p>
              <h3>Assessment Breakdown</h3>
              <ul>
                <li>Live Session Attendance: 10%</li>
                <li>Assignments: 30%</li>
                <li>Midterm Exam (Proctored): 20%</li>
                <li>Final Exam (Proctored): 40%</li>
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
