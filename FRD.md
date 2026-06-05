# Functional Requirements Document (FRD)
## Power Online College Academic Management System (POC-AMS)

**Version:** 1.0 (Detailed Specification)  
**Status:** Approved for Development  
**Date:** June 06, 2026  
**Prepared By:** System Architect  
**Directive Track:** ETA Directive 806/2013 Renewal Track  

---

## TABLE OF CONTENTS
- [PART ONE — FOUNDATION](#part-one--foundation)
  - [Section 1: Document Control & Scope](#section-1-document-control--scope)
  - [Section 2: Institutional Context](#section-2-institutional-context)
- [PART TWO — SYSTEM ARCHITECTURE](#part-two--system-architecture)
  - [Section 3: Architectural Decision Record](#section-3-architectural-decision-record)
  - [Section 4: Technology Stack](#section-4-technology-stack)
  - [Section 5: Data Architecture](#section-5-data-architecture)
  - [Section 6: Infrastructure & Compliance Baseline](#section-6-infrastructure--compliance-baseline)
- [PART THREE — USER ROLES AND ACCESS CONTROL](#part-three--user-roles-and-access-control)
  - [Section 7: RBAC Architecture](#section-7-rbac-architecture)
  - [Section 8: Role Definitions](#section-8-role-definitions)
- [PART FOUR — FUNCTIONAL MODULES](#part-four--functional-modules)
  - [Section 9: Identity & Authentication](#section-9-identity--authentication)
  - [Section 10: Student Information System (SIS)](#section-10-student-information-system-sis)
  - [Section 11: Online Delivery Compliance](#section-11-online-delivery-compliance)
  - [Section 12: Finance & Wallet Service](#section-12-finance--wallet-service)
  - [Section 13: Curriculum & Content Management](#section-13-curriculum--content-management)
  - [Section 14: Live Classroom Service](#section-14-live-classroom-service)
  - [Section 15: Assessment & Proctoring](#section-15-assessment--proctoring)
  - [Section 16: Digital Library Service](#section-16-digital-library-service)
  - [Section 17: Communication Service](#section-17-communication-service)
  - [Section 18: AI Study Assistant](#section-18-ai-study-assistant)
  - [Section 19: Audit & Compliance Service](#section-19-audit--compliance-service)
- [PART FIVE — NON-FUNCTIONAL REQUIREMENTS](#part-five--non-functional-requirements)
  - [Section 20: Performance](#section-20-performance)
  - [Section 21: Reliability](#section-21-reliability)
  - [Section 22: Security](#section-22-security)
  - [Section 23: Usability & Localization](#section-23-usability--localization)
- [PART SIX — COMPLIANCE AND GOVERNANCE](#part-six--compliance-and-governance)
  - [Section 24: Directive 806/2013 Compliance Matrix](#section-24-directive-8062013-compliance-matrix)
  - [Section 25: Data Privacy & Retention](#section-25-data-privacy--retention)
- [PART SEVEN — APPENDICES](#part-seven--appendices)
- [Document Sign-Off](#document-sign-off)

---
# PART ONE — FOUNDATION

## Section 1 — Document Control

### 1.1 Purpose and Authority of this Document

**Purpose:**
This Functional Requirements Document (FRD) serves as the definitive, authoritative blueprint for the design, development, testing, and deployment of the **Power Online College Academic Management System (POC-AMS)**. Its primary purpose is to translate the complex legal, regulatory, and operational mandates of the Ethiopian Education and Training Authority (ETA) Directive No. 806/2013 into strict, enforceable, and auditable software logic. This document bridges the gap between institutional compliance obligations and technical execution, ensuring that every architectural decision, database schema, and user interface directly supports the college's regulatory standing, operational efficiency, and academic integrity.

**Authority:**
This document is authored by the Lead System Architect and issued under the executive authority of the Board of Directors of Power College. Upon final execution of the sign-off chain (Section 1.6), this document becomes the binding baseline for the project. It supersedes all prior informal specifications, whiteboard diagrams, email approvals, or preliminary scoping documents. Any deviations, feature additions, or scope reductions requested after sign-off must be formally submitted to and approved by the Project Change Control Board (CCB).

### 1.2 Scope

The POC-AMS is a comprehensive, enterprise-grade Academic Management System. The boundaries of this Phase 1 build are strictly defined by the following parameters:

**1.2.1 Delivery Model**
The system is engineered exclusively for **100% online delivery**. There is no physical classroom management, hybrid scheduling, or face-to-face attendance tracking module. All courses, sections, and contact hours are digitally tracked. This architectural decision is a strategic compliance mechanism to automatically satisfy and continuously log the ≥60% online delivery ratio mandated by Art. 8.3.10 of Directive 806/2013.

**1.2.2 Academic Programs**
The system will manage the full student lifecycle (from applicant KYC to alumni transcript generation) for three specific undergraduate programs:
1. Bachelor of Arts (BA) in Management Information Systems (MIS)
2. Bachelor of Arts (BA) in Accounting and Finance
3. Bachelor of Arts (BA) in Management

**1.2.3 Geographic and Operational Context**
The system is deployed for Power College, located in **Finote Selam, West Gojjam Zone, Amhara Region, Ethiopia**. System performance, bandwidth provisioning, offline capabilities, and low-connectivity fallbacks are specifically optimized for the infrastructural realities of this regional context.

**1.2.4 Core System Domains**
The software encompasses the following integrated functional modules:
*   Identity, KYC, and Authentication Service
*   Student Information System (SIS) & Admissions
*   Online Delivery Compliance & ETA Reporting Engine
*   Finance Vault & Student Wallet (Double-entry ledger)
*   Curriculum, Content Management & DRM
*   Live Classroom (WebRTC/LiveKit) & Attendance Engine
*   Assessment, Proctoring & Academic Integrity
*   Digital Library & E-Resource Management
*   AI Study Assistant (Local RAG/LLM)
*   Immutable Audit & Compliance Logging

### 1.3 Out of Scope

To ensure Phase 1 delivery remains on schedule, within budget, and focused on regulatory compliance, the following items are explicitly **excluded** from the POC-AMS build. The system architecture will actively block or ignore workflows related to these items:

*   **Blended or Hybrid Learning:** The system does not support tracking physical classroom attendance or hybrid scheduling. The `delivery_mode` database field is hardcoded to `ONLINE`.
*   **TVET Programs:** Technical and Vocational Education and Training programs operate under different regulatory directives and are excluded.
*   **Postgraduate/Master's Programs:** Master's degree programs require different supervision ratios (e.g., 1:3 vs 1:8) and complex thesis workflows. These are deferred to Phase 2 (Year 3).
*   **Physical Library Operations:** The system manages *digital* e-resources, DRM, and journal access only. Physical book check-outs, ISBN barcode scanning, and physical inventory are out of scope.
*   **Alumni & Fundraising:** There is no alumni portal, donation processing, or endowment management module.
*   **Human Resources & Payroll:** While the system tracks instructor credentials and workload caps for compliance, it does not process staff salaries, tax withholdings, or HR benefits.

### 1.4 Governing Instruments

The business logic, data retention policies, security controls, and UI workflows defined in this FRD are strictly bound by the following legal and regulatory frameworks of the Federal Democratic Republic of Ethiopia:

1.  **ETA Directive No. 806/2013 (Primary):** The directive for the establishment and operation of private higher education institutions. The system explicitly enforces compliance with:
    *   *Art. 8.3.10:* Online delivery ratios.
    *   *Art. 9.2.3 & 9.2.7:* Instructor qualifications and digital pedagogy certification.
    *   *Art. 9.5.8 & 9.5.9:* Live contact hour formulas and session recording.
    *   *Art. 9.7:* Financial management and e-payment integration.
    *   *Art. 11.13:* Inspector access and compliance reporting.
2.  **Higher Education Proclamation No. 1152/2011:** The overarching legal framework governing the quality assurance, accreditation, and operational standards of higher education in Ethiopia.
3.  **Ethiopian Data Protection Proclamation:** Governs the collection, processing, and storage of Personally Identifiable Information (PII). Dictates the system's strict data sovereignty rules (all data must remain physically in Ethiopia), right-to-erasure implementations, and cryptographic wipe protocols.
4.  **National Bank of Ethiopia (NBE) Directives on E-Payments:** Governs the integration and reconciliation of digital financial services, specifically dictating the secure webhook handling, idempotency requirements, and audit trails for Telebirr and CBE Birr integrations.

### 1.5 Definitions and Acronyms

*Terms drawn from Directive 806/2013 Art. 5, Ethiopian legal frameworks, and standard software engineering terminology.*

**Regulatory & Institutional:**
*   **ETA:** Education and Training Authority (the federal regulatory body).
*   **Directive 806/2013:** The specific legal directive governing private higher education operations.
*   **KYC:** Know Your Customer (the National ID verification process for applicants).
*   **EAT:** East Africa Time (UTC+3), the mandatory time zone for all system logs, scheduling, and legal timestamps.
*   **INSA:** Information Network Security Administration (national cybersecurity agency).

**Academic & Functional:**
*   **SIS:** Student Information System (manages admissions, records, grades, transcripts).
*   **LMS:** Learning Management System (manages content, live classes, submissions).
*   **HoD:** Head of Department.
*   **CGPA:** Cumulative Grade Point Average.
*   **RAG:** Retrieval-Augmented Generation (the architecture used for the local AI Study Assistant).

**Technical & Infrastructure:**
*   **SFU:** Selective Forwarding Unit (WebRTC architecture used for LiveKit media routing).
*   **HLS / ABR:** HTTP Live Streaming / Adaptive Bitrate Streaming (video delivery protocols).
*   **WAL:** Write-Ahead Logging (PostgreSQL backup and crash recovery mechanism).
*   **RPO / RTO:** Recovery Point Objective / Recovery Time Objective (disaster recovery metrics).
*   **PII:** Personally Identifiable Information (e.g., National ID, phone numbers, wallet balances).

**Financial:**
*   **ETB:** Ethiopian Birr (local fiat currency).
*   **Telebirr / CBE Birr:** Mobile money and digital banking platforms integrated for tuition payments.

### 1.6 Document Versioning, Revision History, and Sign-Off Chain

**Revision History:**
| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| 0.1 | 2026-04-10 | System Architect | Initial outline and architectural decision record. |
| 0.5 | 2026-05-02 | System Architect | Integration of ETA Directive 806/2013 compliance mapping. |
| 0.9 | 2026-05-20 | System Architect | Finalized functional module requirements and RBAC matrix. |
| **1.0** | **2026-06-06** | **System Architect** | **Final detailed specification. Approved for development.** |

**Sign-Off Chain:**
By signing below, the stakeholders acknowledge that they have reviewed this document, agree that it accurately reflects the requirements and legal constraints for POC-AMS, and authorize the development team to proceed with implementation.

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Board Chair** | ______________________ | ______________________ | ________ |
| **Academic Dean** | ______________________ | ______________________ | ________ |
| **CFO** | ______________________ | ______________________ | ________ |
| **System Architect** | ______________________ | ______________________ | ________ |
| **Registrar** | ______________________ | ______________________ | ________ |
| **Legal Counsel** | ______________________ | ______________________ | ________ |
| **Compliance Officer**| ______________________ | ______________________ | ________ |

### 1.7 How This Document is Used

This FRD is an active operational tool utilized by various stakeholders throughout the Software Development Life Cycle (SDLC) and post-deployment operations:

*   **Development Team (Engineers):** Uses the functional modules (Part 4) and non-functional requirements (Part 5) to write code. The strict business rules (e.g., "Hard block if digital pedagogy cert is missing") serve as direct conditional logic gates and unit test acceptance criteria.
*   **Quality Assurance (QA):** Uses the "Acceptance Criteria" sub-bullets in every requirement to write automated end-to-end (E2E) test scripts. QA will actively attempt to break the "Four-Eyes" and "Circuit Breaker" rules to ensure they hold under edge cases and high concurrency.
*   **Registrar & Academic Dean:** Uses the SIS and Curriculum sections to verify that the digital workflows perfectly mirror their legal authority. They will use this document to train their staff on how the new system enforces grade locks, prerequisite chains, and graduation audits.
*   **Compliance Officer & ETA Inspectors:** Uses the Audit & Compliance section and the Appendix F (Compliance Matrix) to verify that the system's "One-Click ETA Bundle" contains the exact data points required by law. They rely on this document to prove to the ETA that the software inherently enforces Directive 806/2013.
*   **CFO & Finance Officer:** Uses the Finance Vault section to verify the double-entry ledger logic, the 5,000 ETB four-eyes threshold, and the Telebirr reconciliation workflows.
*   **Internal/External Auditors:** Uses the Security and Data Privacy sections during annual reviews to verify that PII is encrypted at rest (AES-256), that the hash-chained audit log cannot be tampered with, and that data retention cron jobs (e.g., wiping rejected applicants after 6 months) are executing correctly.
---
# PART ONE — FOUNDATION (Continued)

## Section 2 — Institutional Context

### 2.1 Institution Profile

**Power Online College (Power College)** is a private higher education institution established in **2006**, located in **Finote Selam Town, West Gojjam Zone, Amhara Region, Ethiopia**. 

**Operational & Geographic Context:**
Unlike institutions based in the capital city of Addis Ababa, Power College operates in a regional secondary city. While national fiber connectivity has reached Finote Selam, the local infrastructure does not possess the Tier-1 data center density, redundant ISP routing, or uninterrupted power grids of the capital. 
*   **System Implication:** This geographical and infrastructural reality is a primary driver of the system’s architecture. It mandates the requirement for an on-premises physical server room (Art. 9.1.4) with independent power, aggressive low-bandwidth optimizations in the frontend (Section 23), and offline-capable content delivery mechanisms. 
*   **Zero Physical Student Footprint:** Despite having a physical administrative and server location in Finote Selam, the institution operates with **zero physical student footprint**. Students never attend physical classes, visit a physical library, or take physical exams. The physical campus exists solely to house the IT infrastructure and administrative staff required to deliver the 100% online educational experience.

### 2.2 Current Accredited Online Programs

The system is explicitly scoped to manage the full academic lifecycle for three specific undergraduate programs. The database schemas for `curricula`, `courses`, and `programs` will be strictly constrained to these disciplines:

1.  **Bachelor of Arts (BA) in Management Information Systems (MIS)**
2.  **Bachelor of Arts (BA) in Accounting and Finance**
3.  **Bachelor of Arts (BA) in Management**

**Constraint:** The system architecture will not include data models for diploma programs, TVET certifications, or postgraduate/master's degrees in Phase 1. Any attempt to configure a program outside of these three will be blocked by the System Administrator validation rules. All three programs are delivered **100% online**.

### 2.3 Regulatory Position & License Renewal Track

Power College is an **existing license holder** operating under the renewal track defined in **Article 10 of Directive 806/2013**. 

**Critical Compliance Timeline:**
*   Per **Art. 10.2**, the institution must submit its renewal application within **90 days prior to the expiry** of its current license.
*   **System Implication:** The POC-AMS is not merely an operational tool; it is a regulatory survival mechanism. The "One-Click ETA Compliance Bundle" (detailed in Section 19) must be fully operational, stress-tested, and generating accurate reports at least **six months** before the current license expires. This provides the Compliance Officer ample time to review the auto-generated data, rectify any institutional discrepancies, and prepare the physical document package for the ETA.

### 2.4 Delivery Model — The 100% Online Advantage

Power College operates under a strict **100% online delivery model**. There are no exceptions, no hybrid options, and no physical classroom fallbacks. 

**Directive Context & System Logic:**
*   **Art. 8.3.10** of Directive 806/2013 mandates that for a program to be classified as online/distance learning, a minimum of **60% of its contact hours** must be delivered online.
*   **The Architectural Advantage:** By hardcoding `delivery_mode = 'ONLINE'` at the database level for all courses, sections, and exams, Power College mathematically guarantees a **100% online delivery ratio**. 
*   **Provability:** It is not enough to simply be 100% online; the system must *prove* it to the ETA. The Online Delivery Compliance Module (Section 11) will continuously calculate and log the ratio of `Digital_Hours_Delivered / Total_Hours_Scheduled`. Because the system lacks a physical classroom module, this ratio will perpetually equal 1.0 (100%), automatically satisfying the statutory requirement and generating an unassailable, mathematically verifiable audit trail for inspectors.

### 2.5 Student Population Projections & Capacity Planning

The infrastructure, database sizing (detailed in Appendix D), and load-testing protocols are engineered to support the following growth trajectory:

*   **Year 1 (Baseline):** ~500 active students. The system will run on a single high-spec primary node with a warm standby.
*   **Year 3 (Growth):** ~1,500 active students. Triggers the need for database read-replicas and scaling the LiveKit WebRTC SFU cluster.
*   **Year 5 (Scale):** ~3,000+ active students. Triggers the architectural split of the Finance Vault and Real-Time Engine into separate microservices (as defined in Section 3.3).

**Peak Concurrent User (PCU) Sizing:**
Regardless of total enrollment, the system must be stress-tested to handle the following simultaneous loads without degradation:
1.  **500 concurrent exam takers** (high database write/load, strict browser lockdown, and AI proctoring requirements).
2.  **2,500 concurrent live classroom attendees** (assuming 50 simultaneous sections of 50 students each, driving heavy WebSocket and media server load).

### 2.6 Institutional Pre-Conditions (Non-System Dependencies)

The POC-AMS software cannot compensate for institutional non-compliance. The following legal, financial, and physical prerequisites must be resolved by the College Board and Legal Counsel **independently of the system build**. The system will track the status of these items but will not fulfill them.

**2.6.1 Financial Guarantee Bond (Art. 8.1.5)**
*   **Requirement:** The institution must maintain a blocked bank guarantee of **ETB 500,000** in a recognized Ethiopian bank.
*   **System Tracking:** The Compliance Officer module will include a field to upload the bond certificate, record the issuing bank, and track the expiry date. The system will alert the CFO 60 days before the bond requires renewal.

**2.6.2 IT Infrastructure Installation Certificate (Art. 9.1.5)**
*   **Requirement:** The college's IT setup must be inspected and certified by the ETA/INSA.
*   **System Gate:** The System Administrator will be technically blocked from switching the application from `Staging` to `Production` mode until a valid, unexpired IT Infrastructure Certificate is uploaded and verified in the system settings.

**2.6.3 Physical Server Room Compliance (Art. 9.1.4)**
*   **Requirement:** The institution must provide a dedicated, physically secure server room with independent UPS, backup generator, fire suppression, and climate control. *(Note: This is the only physical infrastructure in the system; students and instructors never interact with it).*
*   **System Tracking:** The system will store the digital compliance certificate for the server room. In the event of an ETA inspection, the Compliance Officer can instantly produce this certificate alongside the digital server uptime logs.

**2.6.4 Historical Compliance Evidence Reconstruction**
*   **Requirement:** To renew the license, the ETA requires evidence of compliance for the *past 3-year license period*. The new POC-AMS will only have data from its go-live date forward.
*   **System Solution:** The system includes a **Historical Reconstruction Module** (Section 11.5). This is an admin-only interface where the Registrar can manually input or CSV-upload past semester data (attendance, grades, delivery ratios). The system will format this historical data into the exact same digitally signed compliance bundle structure as live data, ensuring a continuous, unbroken 3-year evidence trail for the renewal application.

### 2.7 System Success Metrics & KPIs

The success of the POC-AMS deployment will be measured against the following strict Key Performance Indicators:

1.  **100% Audit Trail Coverage:** Every state change in the SIS, Finance Vault, and LMS must have a corresponding hash-chained entry in `schema_audit`. There will be zero exceptions. If the audit chain breaks, the system is considered in a critical failure state.
2.  **One-Click ETA Bundle Generation:** The Compliance Officer must be able to generate the full, digitally signed renewal evidence package in **< 60 seconds** at any time, with zero manual data compilation required.
3.  **Performance Under Peak Load:** The system must support 500 concurrent exam takers with **< 500ms API latency** and **zero dropped WebSocket connections** during the exam window.
4.  **Proactive Renewal Automation:** The system must automatically alert the Board **180 days** before license expiry, and auto-assemble the draft renewal evidence package **90 days** before expiry, ensuring the Art. 10.2 deadline is never missed.
5.  **Zero Financial Variance:** The nightly reconciliation between the Student Wallet ledger and the Telebirr/CBE Birr bank APIs must show a variance of **0.00 ETB**. Any variance > 0.01 ETB triggers an immediate P1 alert to the CFO.
