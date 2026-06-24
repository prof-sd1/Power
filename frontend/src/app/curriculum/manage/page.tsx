"use client";

import React, { useState } from 'react';

export default function InstructorManagePage() {
  const [courseStatus, setCourseStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [publishAttempt, setPublishAttempt] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Instructor compliance mocks based on Art 9.2.3 and 9.2.7
  const instructorCompliance = {
    mastersVerified: true,
    pedagogyValid: false, // Simulating a failed gate
    pedagogyExpiry: "2026-06-01",
    workloadCredits: 12, // Allowed max 15
  };

  const handlePublishAttempt = () => {
    setPublishAttempt(true);
    if (instructorCompliance.mastersVerified && instructorCompliance.pedagogyValid && instructorCompliance.workloadCredits <= 15) {
      setCourseStatus('PUBLISHED');
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            alert("Video successfully queued for FFmpeg HLS transcoding on the local MinIO node.");
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <header className="flex justify-between items-center mb-8 border-b border-[var(--border-color)] pb-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Curriculum <span className="gradient-text">Management</span></h1>
          <p className="text-[var(--text-secondary)] mt-1">Instructor Portal: MIS2011 (Section A)</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-semibold">Prof. Tilahun</p>
            <p className="text-xs text-[var(--text-muted)]">Department of MIS</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Course Activation Gate */}
        <div className="lg:col-span-1">
          <div className="premium-card p-6 sticky top-8">
            <h2 className="text-xl font-display font-semibold mb-6 border-b border-[var(--border-color)] pb-2">Activation Gate</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-3 rounded bg-[var(--bg-tertiary)]/20 border border-[var(--glass-border)]">
                <span className="text-sm text-[var(--text-secondary)]">Master's Degree (Art. 9.2.3)</span>
                {instructorCompliance.mastersVerified ? (
                  <span className="text-[var(--success)] font-bold">✓ Verified</span>
                ) : (
                  <span className="text-[var(--error)] font-bold">✗ Missing</span>
                )}
              </div>
              
              <div className="flex justify-between items-center p-3 rounded bg-[var(--bg-tertiary)]/20 border border-[var(--glass-border)]">
                <span className="text-sm text-[var(--text-secondary)]">Digital Pedagogy (Art. 9.2.7)</span>
                {instructorCompliance.pedagogyValid ? (
                  <span className="text-[var(--success)] font-bold">✓ Valid</span>
                ) : (
                  <span className="text-[var(--error)] font-bold flex flex-col items-end">
                    <span>✗ Expired</span>
                    <span className="text-[0.65rem] opacity-80">{instructorCompliance.pedagogyExpiry}</span>
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center p-3 rounded bg-[var(--bg-tertiary)]/20 border border-[var(--glass-border)]">
                <span className="text-sm text-[var(--text-secondary)]">Workload Cap</span>
                <span className="text-[var(--success)] font-bold">{instructorCompliance.workloadCredits} / 15 CR</span>
              </div>
            </div>

            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg mb-6 border border-[var(--border-color)]">
               <p className="text-sm font-medium mb-1">Course Status: 
                 <span className={`ml-2 badge ${courseStatus === 'PUBLISHED' ? 'badge-success' : 'badge-neutral'}`}>
                   {courseStatus}
                 </span>
               </p>
            </div>

            {publishAttempt && courseStatus === 'DRAFT' && (
              <div className="mb-4 p-3 bg-[var(--error)]/10 border-l-4 border-[var(--error)] text-sm text-[var(--error)] animate-fade-in">
                <strong>Activation Blocked:</strong> Digital Pedagogy Certificate has expired. You cannot publish courses or upload new content until compliance is restored.
              </div>
            )}

            <button 
              onClick={handlePublishAttempt}
              disabled={courseStatus === 'PUBLISHED'}
              className={`w-full py-3 rounded-md font-bold transition-all ${courseStatus === 'PUBLISHED' ? 'bg-[var(--success)]/20 text-[var(--success)] cursor-not-allowed' : 'btn-primary'}`}
            >
              {courseStatus === 'PUBLISHED' ? 'Course is Live' : 'Attempt to Publish Course'}
            </button>
          </div>
        </div>

        {/* Content Management */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upload Widget */}
          <div className="premium-card p-6">
            <h2 className="text-xl font-display font-semibold mb-2">Lecture Video Pipeline</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Upload raw MP4/MOV files. The local FFmpeg worker will automatically transcode to Adaptive Bitrate HLS (360p, 720p, 1080p).
            </p>
            
            <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${!instructorCompliance.pedagogyValid && publishAttempt ? 'border-[var(--error)] bg-[var(--error)]/5' : 'border-[var(--glass-border)] hover:bg-[var(--bg-tertiary)]/20'}`}>
              
              {!instructorCompliance.pedagogyValid && publishAttempt ? (
                <div className="text-[var(--error)]">
                   <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                   <p className="font-bold">Uploads Locked</p>
                   <p className="text-sm mt-1">Pedagogy certification required to upload new materials.</p>
                </div>
              ) : isUploading ? (
                <div className="w-full max-w-xs mx-auto">
                  <div className="flex justify-between text-xs mb-1 text-[var(--text-secondary)]">
                    <span>Uploading & Queuing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent-primary)] transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  </div>
                  <label className="text-[var(--text-primary)] font-medium cursor-pointer hover:text-[var(--accent-primary)] transition-colors">
                    Browse Files
                    <input type="file" className="hidden" accept="video/mp4,video/quicktime" onChange={handleVideoUpload} />
                  </label>
                  <p className="text-xs text-[var(--text-muted)] mt-2">Maximum file size: 2GB. Processed locally for data sovereignty.</p>
                </>
              )}
            </div>
          </div>

          {/* Module Builder */}
          <div className="premium-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-semibold">Course Modules</h2>
              <button className="btn-secondary py-1 px-3 text-xs flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                New Module
              </button>
            </div>

            <div className="space-y-4">
              <div className="border border-[var(--border-color)] rounded-lg bg-[var(--bg-secondary)] overflow-hidden">
                <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center cursor-move">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[var(--text-muted)] mr-3 cursor-grab" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
                    <span className="font-medium">Module 1: Intro to SQL</span>
                  </div>
                  <button className="text-[var(--text-muted)] hover:text-white">Edit</button>
                </div>
                <div className="p-3 bg-[var(--bg-primary)]/50">
                  <div className="flex items-center justify-between p-2 hover:bg-[var(--bg-tertiary)]/30 rounded text-sm group">
                    <div className="flex items-center text-[var(--text-secondary)] group-hover:text-white transition-colors">
                      <span className="mr-3">🎥</span> 1.1 Relational Algebra (Processed HLS)
                    </div>
                    <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[var(--text-muted)] text-xs">Required View</span>
                      <button className="text-[var(--error)]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
