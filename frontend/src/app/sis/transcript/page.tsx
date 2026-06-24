"use client";

import React, { useState } from 'react';

// Mock Data for Transcript
const transcriptData = {
  studentId: "PC/MIS/0142/2026",
  name: "Abebe Kebede",
  program: "Bachelor of Arts (BA) in Management Information Systems",
  enrollmentDate: "September 15, 2026",
  cgpa: "3.85",
  totalCreditsEarned: 45,
  qrValidationCode: "1a2b3c4d5e6f7g8h9i0j",
  semesters: [
    {
      term: "Year 1, Semester 1",
      sgpa: "4.00",
      courses: [
        { code: "MIS1011", name: "Intro to Programming", credits: 4, grade: "A", points: 16.0 },
        { code: "MGT1011", name: "Principles of Management", credits: 3, grade: "A", points: 12.0 },
        { code: "ENG1011", name: "Communicative English", credits: 3, grade: "A", points: 12.0 },
      ]
    },
    {
      term: "Year 1, Semester 2",
      sgpa: "3.71",
      courses: [
        { code: "MIS1021", name: "Data Structures", credits: 4, grade: "B+", points: 14.0 },
        { code: "ACC1011", name: "Fundamentals of Accounting", credits: 3, grade: "A", points: 12.0 },
        { code: "MTH1011", name: "Applied Mathematics", credits: 4, grade: "B", points: 12.0 },
      ]
    }
  ]
};

export default function TranscriptPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    setIsGenerating(true);
    // Simulate PDF generation with Puppeteer via backend API
    setTimeout(() => {
      setIsGenerating(false);
      alert("Official Cryptographically Signed PDF generated and downloaded.");
    }, 2500);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Official <span className="gradient-text">Transcript</span></h1>
          <p className="text-[var(--text-secondary)] mt-1">On-Demand Digital Transcript Generation</p>
        </div>
        <button 
          onClick={generatePDF}
          disabled={isGenerating}
          className="btn-primary"
        >
          {isGenerating ? 'Generating PDF...' : 'Download Official PDF'}
        </button>
      </header>

      {/* Official Transcript Preview (Parchment Style) */}
      <div className="premium-card bg-[#f8f9fa] border-none text-[#1f2937] p-8 md:p-12 shadow-2xl relative overflow-hidden mx-auto max-w-4xl w-full">
        
        {/* Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <svg className="w-96 h-96" viewBox="0 0 100 100" fill="currentColor"><path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"/></svg>
        </div>

        <div className="text-center mb-10 border-b-2 border-[#d1d5db] pb-8 relative z-10">
          <h2 className="text-3xl font-serif font-bold uppercase tracking-widest text-[#111827]">Power College</h2>
          <p className="text-sm tracking-widest mt-2 uppercase text-[#4b5563]">Finote Selam, Ethiopia</p>
          <p className="text-sm mt-1 text-[#4b5563]">Accredited by the Education and Training Authority (ETA)</p>
          <div className="mt-6 text-xl font-serif font-bold tracking-widest uppercase bg-[#111827] text-white py-2 inline-block px-8 rounded-sm">Official Academic Transcript</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative z-10 text-sm">
          <div>
            <div className="flex border-b border-[#e5e7eb] py-2">
              <span className="font-bold w-1/3">Student Name:</span>
              <span className="w-2/3 uppercase">{transcriptData.name}</span>
            </div>
            <div className="flex border-b border-[#e5e7eb] py-2">
              <span className="font-bold w-1/3">Student ID:</span>
              <span className="w-2/3 font-mono">{transcriptData.studentId}</span>
            </div>
            <div className="flex border-b border-[#e5e7eb] py-2">
              <span className="font-bold w-1/3">Enrollment Date:</span>
              <span className="w-2/3">{transcriptData.enrollmentDate}</span>
            </div>
          </div>
          <div>
            <div className="flex border-b border-[#e5e7eb] py-2">
              <span className="font-bold w-1/3">Program:</span>
              <span className="w-2/3 font-bold uppercase">{transcriptData.program}</span>
            </div>
            <div className="flex border-b border-[#e5e7eb] py-2">
              <span className="font-bold w-1/3">Total Credits:</span>
              <span className="w-2/3">{transcriptData.totalCreditsEarned}</span>
            </div>
            <div className="flex border-b border-[#e5e7eb] py-2">
              <span className="font-bold w-1/3 text-[#10b981]">Cumulative GPA:</span>
              <span className="w-2/3 font-bold text-lg text-[#10b981]">{transcriptData.cgpa}</span>
            </div>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          {transcriptData.semesters.map((semester, idx) => (
            <div key={idx}>
              <h3 className="font-bold border-b-2 border-[#111827] uppercase tracking-wider pb-1 mb-3 flex justify-between">
                <span>{semester.term}</span>
                <span className="text-xs text-[#4b5563] font-normal mt-1">Term GPA: <span className="font-bold text-[#111827]">{semester.sgpa}</span></span>
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#4b5563] border-b border-[#e5e7eb]">
                    <th className="py-2 w-1/6 font-normal uppercase text-xs">Course Code</th>
                    <th className="py-2 w-1/2 font-normal uppercase text-xs">Course Title</th>
                    <th className="py-2 w-1/12 text-center font-normal uppercase text-xs">Credits</th>
                    <th className="py-2 w-1/12 text-center font-normal uppercase text-xs">Grade</th>
                    <th className="py-2 w-1/12 text-right font-normal uppercase text-xs">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {semester.courses.map((course, cIdx) => (
                    <tr key={cIdx} className="border-b border-[#f3f4f6]">
                      <td className="py-2 font-mono text-xs">{course.code}</td>
                      <td className="py-2">{course.name}</td>
                      <td className="py-2 text-center">{course.credits}</td>
                      <td className="py-2 text-center font-bold">{course.grade}</td>
                      <td className="py-2 text-right">{course.points.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-between items-end relative z-10 pt-8 border-t border-[#d1d5db]">
          <div className="text-xs text-[#4b5563] max-w-sm">
            <p className="font-bold mb-1">Cryptographic Verification</p>
            <p>This document is electronically signed and secured via RS256 hashing. To verify its authenticity, scan the QR code or visit <span className="font-mono text-[#3b82f6]">verify.powercollege.edu.et</span></p>
            <p className="mt-2">Hash ID: <span className="font-mono text-[#9ca3af]">{transcriptData.qrValidationCode}</span></p>
          </div>
          
          <div className="text-center">
            <div className="w-48 h-16 border-b border-[#111827] mb-2 relative">
              {/* Fake Signature */}
              <svg className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-12 text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10,20 Q15,5 20,25 T30,20 T40,25 Q45,10 50,20 T60,15 T70,25 Q80,5 90,20" />
              </svg>
            </div>
            <p className="font-bold text-sm uppercase">Office of the Registrar</p>
            <p className="text-xs text-[#4b5563]">Power College</p>
          </div>
        </div>
      </div>
    </div>
  );
}
