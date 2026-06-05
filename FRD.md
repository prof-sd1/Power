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

# Section 2 — Institutional Context

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
---
# PART TWO — SYSTEM ARCHITECTURE

# Section 3 — Architectural Decision Record

### 3.1 Architectural Pattern: Domain-Separated Monolith

**Decision:**
The POC-AMS will be built using a **Domain-Separated Monolith** architecture. The system will be deployed as a single, cohesive application unit, but the codebase and database will be strictly partitioned into isolated bounded contexts (Academic Core, Finance Vault, Real-Time Engine, and AI Satellite). 

**Rationale — Why Not Microservices for Phase 1?**
While microservices offer independent scaling and deployment, they introduce massive DevOps overhead, distributed tracing complexity, and network latency. For a Phase 1 launch targeting 500 students in Finote Selam, the operational cost of managing a Kubernetes cluster, service meshes, and distributed transaction sagas outweighs the benefits. Furthermore, network latency between microservices could degrade the real-time experience of the Live Classroom and Proctoring modules.

**Rationale — Why Not a Pure Monolith?**
A traditional "big ball of mud" monolith is unacceptable for this project due to the strict regulatory and security requirements of Directive 806/2013. Financial data (Student Wallets) and Academic data (Grades, Exams) must never share the same memory space, database schema, or application logic pathways. A pure monolith risks accidental data leakage and makes it impossible to enforce the "Separation of Duties" at the database level.

**Accepted Tradeoffs:**
*   **Deployment Coupling:** A bug in the LMS module requires redeploying the entire application, including the Finance Vault. *Mitigation:* Strict CI/CD pipelines, comprehensive automated testing, and feature flags.
*   **Resource Contention:** A memory leak in the Real-Time Engine could crash the Academic Core. *Mitigation:* The Real-Time Engine is isolated as a separate Node.js process managed by PM2, ensuring process-level isolation even within the same physical server.

### 3.2 Physical Topology & High Availability

To satisfy the 99.9% uptime SLA (Art. 9.5.5) and ensure zero data loss during final exams, the physical infrastructure is designed with a Primary/Warm Standby topology.

**3.2.1 Primary Node (Active)**
*   **Hardware:** Single high-spec bare-metal server or enterprise VPS (Minimum 16 vCPU, 64GB RAM, 2TB NVMe SSD).
*   **OS:** Ubuntu 22.04 LTS.
*   **Workload:** Hosts the Nginx ingress, Laravel Academic Core (PHP-FPM), Node.js Real-Time Engine, Python AI Satellite, PostgreSQL Primary, Redis Primary, and MinIO storage.
*   **Location:** Physically hosted in an ETA-certified data center within Ethiopia to guarantee Data Sovereignty (Art. 9.5.1).

**3.2.2 Warm Standby Node (Passive/Replica)**
*   **Hardware:** Identical specification to the Primary Node.
*   **Workload:** Hosts a **PostgreSQL Streaming Replica** (synchronous or semi-synchronous commit to ensure RPO = 0 for financial transactions). Hosts standby instances of Redis and MinIO.
*   **Failover Mechanism:** Managed via a floating IP or lightweight load balancer (e.g., HAProxy/Keepalived). In the event of Primary node hardware failure, the System Administrator executes the Warm Standby Promotion Runbook (Appendix G) to promote the replica to Primary in under 30 minutes.

### 3.3 Scaling Path & Evolution Strategy

The architecture is designed to evolve without requiring a complete rewrite. The Domain-Separated Monolith allows us to physically extract specific domains into independent microservices as the student population grows.

*   **Year 1 (Current State):** Domain-Separated Monolith on Primary + Warm Standby. Supports up to 500 concurrent exam takers.
*   **Year 2 (Real-Time Extraction):** As live classroom usage scales, the Node.js + LiveKit WebRTC SFU engine will be physically extracted to its own dedicated cluster. WebRTC is highly CPU and bandwidth-intensive; isolating it ensures that a spike in live video traffic does not starve the Academic Core of resources.
*   **Year 3 (Finance Vault Extraction):** The Finance Vault will be extracted into a completely separate, highly secured microservice with its own dedicated database server. This provides maximum physical isolation for financial data and allows independent scaling of transaction processing.
*   **Year 3+ (Curriculum Expansion):** The Academic Core's curriculum module will be expanded to support Master's degree programs. This will introduce new database relationships for thesis supervision (1:3 ratio) and defense scheduling, without altering the core SIS or Finance logic.

### 3.4 Data Sovereignty & Network Routing

**3.4.1 The "No External Cloud" Mandate**
Per Art. 9.5.1 and the Ethiopian Data Protection Proclamation, no student PII, exam content, or financial data may traverse international borders or be processed by foreign cloud AI. 
*   **AI Satellite:** The AI Study Assistant uses Ollama to run a local Large Language Model (LLM) directly on the Primary Node's GPU/CPU. It queries a local `pgvector` database. It has zero internet access.
*   **Video Transcoding:** FFmpeg processes all uploaded lecture videos locally on the Primary Node. No external APIs (like AWS Elemental) are used.

**3.4.2 Ingress and Traffic Routing**
All external traffic enters through Nginx on the Primary Node. Nginx acts as a reverse proxy, terminating SSL/TLS and routing requests based on URL paths:
*   `/api/finance/*` → Routes to the isolated Finance Vault application port.
*   `/api/academic/*`, `/api/sis/*` → Routes to the Laravel Academic Core.
*   `/ws/*`, `/live/*` → Routes to the Node.js Real-Time Engine (WebSocket upgrade).
*   `/api/ai/*` → Routes to the Python FastAPI AI Satellite.

This routing ensures that even though the services run on the same physical server, they communicate over `localhost` via strict HTTP/gRPC boundaries, mimicking microservice network isolation without the external network overhead.

---

# PART TWO — SYSTEM ARCHITECTURE (Continued)

# Section 4 — Technology Stack

The selection of the technology stack for POC-AMS is not driven by trends, but by strict adherence to the project's core constraints: **100% online delivery, absolute data sovereignty, high concurrency for exams/live classes, and resilience against the infrastructural realities of Finote Selam.** Every tool chosen below serves a specific regulatory or operational mandate.

### 4.1 Frontend — Next.js 14 (App Router)
**Scope:** Student Portal, Staff Portal, Public-Facing Admissions Site.

*   **Rationale:** Next.js 14 with React Server Components (RSC) is selected to aggressively minimize the client-side JavaScript bundle size. For a 100% online college in West Gojjam, where students may be accessing the system via 3G mobile networks or unstable broadband, a heavy Single Page Application (SPA) is unacceptable. RSC allows the server to render the UI and send minimal HTML/JSON over the wire, drastically reducing Time-to-Interactive (TTI) on low-end devices.
*   **Public Site:** Replaces the existing `power-college.com`. Utilizes Static Site Generation (SSG) for blazing-fast load times and SEO optimization for student recruitment.
*   **Portals:** Utilizes Server Actions for secure, direct database mutations without exposing API endpoints to the client, reducing the attack surface for Cross-Site Request Forgery (CSRF).

### 4.2 Academic Core — Laravel 11
**Scope:** Authentication, SIS, Curriculum, Exams, Library, AI Tutor orchestration.

*   **Rationale:** Laravel provides a mature, highly secure, and expressive ecosystem for complex relational data. The Academic Core manages the most intricate business logic in the system (e.g., prerequisite chains, graduation audits, grade lifecycles). Laravel’s Eloquent ORM, built-in queue system, and robust authorization gates (Policies) accelerate development while enforcing strict security boundaries.
*   **Version:** Laravel 11 (PHP 8.3) is utilized for its performance optimizations, fiber-based concurrency, and streamlined application structure.

### 4.3 Finance Vault — Laravel 11 (Isolated Application)
**Scope:** Student Wallets, Payment Processing, Double-Entry Ledger, Financial Audit.

*   **Rationale:** The Finance Vault is **not** a module within the Academic Core; it is a completely separate Laravel application with its own codebase, its own database schema (`schema_finance`), and its own deployment process. 
*   **Strict Isolation:** The Finance Vault knows *nothing* about grades, courses, or attendance. It only understands `transactions`, `wallets`, and `ledgers`. This enforces the "Separation of Duties" at the code level. If the Academic Core is compromised, the attacker cannot manipulate financial balances because the Academic Core application literally does not have the code to do so.
*   **Database Transactions:** Heavily utilizes Laravel’s `DB::transaction()` to ensure ACID compliance for every single credit and debit.

### 4.4 Real-Time Engine — Node.js 20 + Socket.io + LiveKit SDK
**Scope:** Live Classroom (WebRTC), Real-time Chat, System Notifications.

*   **Rationale:** Node.js’s event-driven, non-blocking I/O model is the industry standard for managing thousands of concurrent, persistent WebSocket connections. 
*   **LiveKit SFU:** We utilize LiveKit as our self-hosted Selective Forwarding Unit (SFU) for WebRTC. This is the backbone of the 100% online delivery model. By self-hosting LiveKit, we guarantee sub-200ms latency for live lectures and ensure that no video/audio data routes through third-party cloud servers, maintaining strict data sovereignty.
*   **Socket.io:** Handles fallback mechanisms for clients behind strict corporate or local ISP firewalls that block raw WebRTC, ensuring no student is locked out of live notifications or chat.

### 4.5 AI Satellite — Python FastAPI + LangChain + Ollama + pgvector
**Scope:** AI Study Assistant, Course Material Embeddings, RAG (Retrieval-Augmented Generation).

*   **Rationale:** Python is the undisputed language of AI. FastAPI provides asynchronous, high-performance endpoints for the AI queries.
*   **Ollama (Local LLM):** This is a critical compliance component. We run a quantized open-source LLM (e.g., Llama-3-8B) locally via Ollama. **No student prompts or course data are ever sent to OpenAI, Anthropic, or any external API.** This guarantees 100% compliance with the Ethiopian Data Protection Proclamation regarding PII and data sovereignty.
*   **pgvector:** Stores the vector embeddings of all course materials (PDFs, transcripts). The AI uses RAG to answer student questions, ensuring it only answers based on the official syllabus and never hallucinates external information.

### 4.6 Database — PostgreSQL 16
**Scope:** The single source of truth for all relational and structured data.

*   **Rationale:** PostgreSQL is selected for its strict ACID compliance, advanced indexing, and robust JSONB support. 
*   **Multi-Schema Architecture:** We utilize a single PostgreSQL cluster but enforce strict logical isolation using schemas (`schema_auth`, `schema_sis`, `schema_finance`, `schema_audit`, `schema_lms`). Database roles are restricted at the connection level (e.g., the `user_finance` database user physically cannot execute queries against `schema_sis`).
*   **High Availability:** Configured with a Streaming Replica on the Warm Standby node to ensure an RPO (Recovery Point Objective) of near-zero for financial and academic records.

### 4.7 Cache and Queue — Redis 7
**Scope:** Session management, background jobs, real-time event bus, security token blacklisting.

*   **Rationale:** Redis provides sub-millisecond in-memory data storage.
*   **Use Cases:**
    *   **Laravel Horizon:** Manages background jobs (e.g., video transcoding, email dispatch, nightly reconciliation).
    *   **Pub/Sub:** Acts as the event bus for the Domain-Separated Monolith. When the Finance Vault processes a payment, it publishes a `payment.success` event to Redis, which the Academic Core listens to in order to unlock the student's course.
    *   **Security:** Stores the JWT token blacklist. When a user logs out or changes their password, their token is instantly blacklisted in Redis, preventing replay attacks.
    *   **Idempotency:** Stores webhook transaction IDs for 24 hours to prevent double-crediting a student's wallet if Telebirr sends the same webhook twice.

### 4.8 File Storage — MinIO
**Scope:** Storage for all uploaded documents, KYC IDs, exam snapshots, video lectures, and financial receipts.

*   **Rationale:** MinIO is a high-performance, S3-compatible object storage server. 
*   **Data Sovereignty:** Instead of using AWS S3 or external cloud storage, MinIO runs directly on the Primary Node’s local NVMe drives. All PII, exam content, and financial records remain physically inside the institution's ETA-certified server room.
*   **Security:** Configured with Server-Side Encryption (SSE) using AES-256. Access to buckets (e.g., `private/exam-snapshots`) is strictly controlled via pre-signed URLs that expire after 15 minutes.

### 4.9 Search — Meilisearch
**Scope:** Full-text search for the Digital Library (Art. 9.5.11).

*   **Rationale:** Meilisearch is chosen over Elasticsearch for its lightweight footprint, blazing-fast sub-50ms response times, and out-of-the-box typo tolerance (crucial for users searching with mixed English/Amharic spellings). It indexes the text extracted from thousands of PDFs and ePUBs in the digital library, allowing students to find specific concepts across all course materials instantly.

### 4.10 Media Pipeline — FFmpeg
**Scope:** Video transcoding, adaptive bitrate streaming, audio extraction.

*   **Rationale:** When an instructor uploads a raw 1080p lecture video, it is passed to a background worker running FFmpeg.
*   **Adaptive Bitrate (ABR):** FFmpeg transcodes the video into HLS (HTTP Live Streaming) format, generating multiple quality tiers (360p, 720p, 1080p). 
*   **Low-Bandwidth Optimization:** This is critical for the 100% online model in Finote Selam. If a student's internet connection drops, the video player automatically switches to the 360p stream, preventing buffering and ensuring the student can still accumulate the required "time-on-task" for attendance compliance.

### 4.11 Process Management
**Scope:** Keeping the application services alive and managing background workers.

*   **PM2:** Manages the Node.js Real-Time Engine. Provides zero-downtime restarts, log aggregation, and automatic crash recovery.
*   **Supervisor:** Manages the Laravel queue workers (Horizon). If a worker crashes while processing a video transcode or sending an SMS, Supervisor instantly restarts it.
*   **Systemd:** The native Linux service manager used to ensure PostgreSQL, Redis, and MinIO start automatically on server boot and are monitored for health.

### 4.12 Ingress — Nginx
**Scope:** The front door of the entire system. Reverse proxy, SSL termination, security enforcement.

*   **Rationale:** Nginx is the most battle-tested web server for high-concurrency environments.
*   **SSL Termination:** Enforces TLS 1.3 exclusively. Nginx holds the SSL certificates and handles the encryption/decryption, offloading this CPU-intensive task from the application servers.
*   **Internal API Gateway:** Nginx routes traffic based on URL paths. 
    *   `api.powercollege.edu.et/finance/*` routes to the Finance Vault port.
    *   `api.powercollege.edu.et/academic/*` routes to the Academic Core port.
    *   `live.powercollege.edu.et/*` routes to the Node.js WebSocket port.
*   **Security & Rate Limiting:** Nginx enforces strict rate limiting (e.g., max 60 requests/minute per IP for login endpoints) to mitigate brute-force attacks and DDoS. It also injects mandatory HTTP security headers (Content Security Policy, X-Frame-Options: DENY, Referrer-Policy) into every response.
