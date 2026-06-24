"use client";

import React, { useState } from 'react';

// Mock Data for the Course Catalog
const availableCourses = [
  {
    id: "MIS2011",
    name: "Database Systems",
    credits: 3,
    prerequisite: "MIS1011",
    prereqMet: true,
    capacity: 80,
    enrolled: 79,
    status: "OPEN",
    instructor: "Prof. Tilahun",
    schedule: "Mon/Wed 10:00 AM (LiveKit)",
  },
  {
    id: "MIS2021",
    name: "System Analysis & Design",
    credits: 4,
    prerequisite: "MIS1021",
    prereqMet: true,
    capacity: 80,
    enrolled: 80,
    status: "WAITLIST",
    instructor: "Dr. Almaz",
    schedule: "Tue/Thu 2:00 PM (LiveKit)",
  },
  {
    id: "MIS3011",
    name: "Advanced Web Technologies",
    credits: 3,
    prerequisite: "MIS2011",
    prereqMet: false, // Simulated blocked prerequisite
    capacity: 80,
    enrolled: 45,
    status: "OPEN",
    instructor: "Dr. Solomon",
    schedule: "Fri 9:00 AM (LiveKit)",
  }
];

export default function CourseRegistrationPage() {
  const [financialHold, setFinancialHold] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalCredits = cart.reduce((total, courseId) => {
    const course = availableCourses.find(c => c.id === courseId);
    return total + (course?.credits || 0);
  }, 0);

  const handleRegister = (courseId: string) => {
    if (financialHold) {
      alert("Registration Blocked: Active Financial Hold. Please clear your balance in the Finance Vault.");
      return;
    }
    const course = availableCourses.find(c => c.id === courseId);
    if (!course?.prereqMet) {
      alert(`Registration Blocked: Prerequisite ${course?.prerequisite} not met.`);
      return;
    }
    if (totalCredits + (course?.credits || 0) > 19) {
      alert("Registration Blocked: Exceeds 19 credit maximum load limit.");
      return;
    }
    
    setCart([...cart, courseId]);
  };

  const handleDrop = (courseId: string) => {
    setCart(cart.filter(id => id !== courseId));
  };

  const submitRegistration = () => {
    setIsProcessing(true);
    // Simulate pushing to Redis FIFO Queue via API
    setTimeout(() => {
      setIsProcessing(false);
      alert("Registration request submitted to queue. You will be notified of your enrollment status shortly.");
      setCart([]);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col space-y-6">
      <header>
        <h1 className="text-3xl font-display font-bold">Course <span className="gradient-text">Registration</span></h1>
        <p className="text-[var(--text-secondary)] mt-1">Year 2, Semester 1 | Standard Max Load: 19 Credits</p>
      </header>

      {/* Financial Hold Toggle (For demo purposes) */}
      <div className="flex items-center space-x-3 mb-4 p-4 bg-[var(--bg-tertiary)]/20 rounded-lg border border-[var(--border-color)] w-max">
        <label className="text-sm font-medium text-[var(--text-secondary)]">Simulate Finance Hold Check:</label>
        <button 
          onClick={() => setFinancialHold(!financialHold)}
          className={`px-3 py-1 text-xs rounded-md font-bold transition-colors ${financialHold ? 'bg-[var(--error)] text-white' : 'bg-[var(--success)] text-white'}`}
        >
          {financialHold ? 'HOLD ACTIVE (Art. 9.7)' : 'CLEAR (Balance 0.00 ETB)'}
        </button>
      </div>

      {financialHold && (
        <div className="premium-card bg-[var(--error)]/10 border-[var(--error)]/30 p-6 animate-fade-in">
          <h3 className="text-lg font-bold text-[var(--error)] flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Financial Hold Active
          </h3>
          <p className="text-[var(--text-primary)] mt-2">
            Your registration is blocked due to an outstanding wallet balance. The SIS continuously checks the Finance Vault status. Once cleared, registration will instantly unlock.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Catalog */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-display font-semibold border-b border-[var(--border-color)] pb-2">Available Courses</h2>
          
          {availableCourses.map((course) => (
            <div key={course.id} className="premium-card p-5 hover:bg-[var(--bg-tertiary)]/10 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{course.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{course.id} • {course.credits} Credits • {course.instructor}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {course.status === "WAITLIST" ? (
                    <span className="badge badge-warning">Waitlist Only ({course.enrolled}/{course.capacity})</span>
                  ) : (
                    <span className="badge badge-success">Open ({course.enrolled}/{course.capacity})</span>
                  )}
                  {cart.includes(course.id) ? (
                    <button onClick={() => handleDrop(course.id)} className="btn-secondary py-1 px-3 text-xs border-[var(--error)] text-[var(--error)] hover:bg-[var(--error)]/10">Drop</button>
                  ) : (
                    <button 
                      onClick={() => handleRegister(course.id)} 
                      disabled={financialHold || !course.prereqMet}
                      className={`btn-primary py-1 px-3 text-xs ${(!course.prereqMet || financialHold) && 'opacity-50 cursor-not-allowed'}`}
                    >
                      {course.status === "WAITLIST" ? 'Join Waitlist' : 'Add to Cart'}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center text-xs space-x-4 pt-3 border-t border-[var(--border-color)]">
                <span className="text-[var(--text-muted)] flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {course.schedule}
                </span>
                <span className={`flex items-center font-medium ${course.prereqMet ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                  {course.prereqMet ? '✓ Prerequisite Met' : `✗ Prerequisite Missing: ${course.prerequisite}`}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Cart */}
        <div className="lg:col-span-1">
          <div className="premium-card p-6 sticky top-8">
            <h2 className="text-xl font-display font-semibold mb-4 border-b border-[var(--border-color)] pb-2">Registration Cart</h2>
            
            {cart.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)] text-center py-8">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 mb-6">
                {cart.map(id => {
                  const c = availableCourses.find(course => course.id === id);
                  return (
                    <div key={id} className="flex justify-between items-center bg-[var(--bg-tertiary)]/30 p-3 rounded-lg border border-[var(--border-color)]">
                      <div>
                        <p className="text-sm font-bold text-white">{id}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{c?.credits} Credits</p>
                      </div>
                      <button onClick={() => handleDrop(id)} className="text-[var(--text-muted)] hover:text-[var(--error)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="border-t border-[var(--border-color)] pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[var(--text-secondary)] font-medium">Total Credits</span>
                <span className={`text-xl font-bold ${totalCredits > 19 ? 'text-[var(--error)]' : 'text-white'}`}>{totalCredits} / 19</span>
              </div>
              <div className="w-full bg-[var(--bg-tertiary)] h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${totalCredits > 19 ? 'bg-[var(--error)]' : 'bg-[var(--accent-primary)]'}`}
                  style={{ width: `${Math.min((totalCredits / 19) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <button 
              onClick={submitRegistration}
              disabled={cart.length === 0 || totalCredits > 19 || isProcessing}
              className="w-full btn-primary py-3 relative"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting to Queue...
                </span>
              ) : (
                'Finalize Registration'
              )}
            </button>
            <p className="text-xs text-[var(--text-muted)] text-center mt-3">
              Registration requests are processed via Redis FIFO Queue to ensure capacity limits are enforced.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
