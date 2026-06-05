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

---

# PART TWO — SYSTEM ARCHITECTURE (Continued)

## Section 5 — Data Architecture

The data architecture of the POC-AMS is designed to enforce the "Separation of Duties" and "Principle of Least Privilege" at the deepest possible level: the database engine itself. By strictly isolating domains within PostgreSQL and utilizing cryptographic boundaries for inter-service communication, the system ensures that a compromise in the Learning Management System (LMS) cannot lead to a breach of the Finance Vault or the Immutable Audit Log.

### 5.1 Schema Isolation Map

The system utilizes a single PostgreSQL 16 cluster, but data is strictly partitioned into isolated schemas. Cross-schema `JOIN` queries are strictly prohibited at the application layer; data aggregation across domains must be done via the application logic or materialized views managed by the DBA.

*   **`schema_auth`**: Users, roles, permissions, MFA secrets, session tokens, and password hashes.
*   **`schema_sis`**: Admissions workflows, student profiles, enrollment records, grade lifecycles, transcripts, and graduation clearance chains.
*   **`schema_finance`**: Student wallets, double-entry ledger transactions, payment gateway webhooks, and financial holds. *(Strictly isolated from academic data).*
*   **`schema_lms`**: Course catalogs, curriculum hierarchies, content modules, live classroom attendance, and assignment submissions.
*   **`schema_library`**: E-resource metadata, DRM licensing, borrowing records, and FIFO waitlists.
*   **`schema_audit`**: The immutable, hash-chained event log. Configured with `WRITE-ONCE` database triggers.
*   **`schema_ai`**: `pgvector` embeddings for course materials and localized chat history for the RAG engine.

### 5.2 Database User Permission Matrix

To prevent lateral movement in the event of an application-level SQL injection, the PostgreSQL connection users are strictly mapped to specific schemas.

| Database User | Granted Schemas | Permissions | Rationale |
| :--- | :--- | :--- | :--- |
| **`user_auth`** | `schema_auth` | `CRUD` | Manages identity. Cannot see grades or finances. |
| **`user_academic`** | `schema_sis`, `schema_lms`, `schema_library` | `CRUD` | Manages the student lifecycle and learning. |
| **`user_finance`** | `schema_finance` | `CRUD` | Manages the ledger. **Explicitly denied** access to `schema_sis` or `schema_lms`. |
| **`user_audit`** | `schema_audit` | `SELECT`, `INSERT` (via strict function) | Read-only for reporting. Inserts are only allowed via a PL/pgSQL function that enforces the hash-chain logic. |
| **`user_ai`** | `schema_ai`, `schema_lms` | `CRUD` (AI), `SELECT` (LMS) | Can read LMS content to build embeddings, but cannot modify academic records. |

*Note: All application users (`user_academic`, `user_finance`, etc.) are granted `INSERT` privileges on `schema_audit` to write their respective domain events, but they cannot `UPDATE` or `DELETE` audit records.*

### 5.3 Inter-Service Authentication (RS256 JWT)

Because the Finance Vault and Academic Core are isolated applications, they must authenticate each other without sharing a database or a secret symmetric key.

*   **Asymmetric Signing (RS256):** The Authentication Service generates an RSA keypair. The **Private Key** is kept exclusively in the Auth Service's memory (or HashiCorp Vault). The **Public Key** is distributed to the Academic Core, Finance Vault, Node.js Real-Time Engine, and Python AI Satellite.
*   **Verification:** When the Finance Vault receives an API request from the Academic Core (e.g., "Check Student Wallet Balance"), it verifies the JWT signature locally using the Public Key. This requires zero network calls to the Auth Service, eliminating a single point of failure and ensuring sub-millisecond authentication overhead.
*   **Token Lifecycle:** Access tokens have a strict 15-minute TTL. Refresh tokens are rotated on every use and tracked in Redis to allow instant, system-wide revocation if a user is suspended by the Compliance Officer.

### 5.4 Cross-Domain Event Contract (Redis Pub/Sub)

The Domain-Separated Monolith relies on Redis Pub/Sub for asynchronous, cross-domain communication. To guarantee data integrity, all events follow strict contracts.

**5.4.1 The Transactional Outbox Pattern**
To prevent the "Double Write" problem (where a database transaction succeeds but the Redis publish fails), the Finance Vault utilizes the Transactional Outbox pattern:
1.  When a Telebirr payment is verified, the Finance Vault writes the ledger entry to `schema_finance` AND an event record to an `outbox_events` table in the **exact same database transaction**.
2.  A lightweight background worker (Laravel Horizon) continuously polls the `outbox_events` table, publishes the payload to Redis (`channel: finance.payment.success`), and marks the outbox record as processed.

**5.4.2 Event Catalogue & Idempotency**
*   **Event:** `finance.payment.success`
*   **Payload:** `{"student_id": "PC/MIS/001/2026", "amount": 5000.00, "currency": "ETB", "transaction_id": "TXN_998877", "idempotency_key": "UUID-1234"}`
*   **Consumer:** Academic Core (SIS Module).
*   **Action:** Lifts the financial hold on the student's account, allowing course registration.
*   **Idempotency:** The Academic Core checks Redis for the `idempotency_key`. If it has already processed this UUID, it ignores the event. This prevents double-unlocking or duplicate notifications if Redis replays the message.

**5.4.3 Compensation Sagas (Rollback)**
If the `finance.payment.success` event fires, but the Academic Core fails to unlock the course (e.g., due to a temporary SIS database lock), the system does not silently fail. 
*   The Academic Core publishes a `sis.course_unlock.failed` event.
*   The Finance Vault consumes this event and triggers a **Compensation Saga**: it automatically reverses the wallet credit, initiates a refund to the Telebirr API, and alerts the Finance Officer and Student via SMS that the payment was rejected due to a system enrollment error.

### 5.5 File Storage Bucket Map (MinIO)

All files are stored in MinIO on local NVMe drives. Buckets are strictly segmented by access level and retention policy.

| Bucket Name | Access Level | Encryption | Contents & Retention |
| :--- | :--- | :--- | :--- |
| `private/kyc-docs` | Restricted (Red) | AES-256 | National IDs, Applicant photos. Retained 6 months if rejected (then cryptographically wiped), perpetual if enrolled. |
| `private/exam-snapshots` | Restricted (Red) | AES-256 | Webcam snapshots during exams. Retained for 1 semester (grade dispute window), then permanently deleted. |
| `private/proctoring-snapshots`| Restricted (Red) | AES-256 | AI-flagged suspicion images. Retained 1 semester. |
| `private/financial-records` | Restricted (Red) | AES-256 | Manual bank receipt images. Retained 7 years per financial audit laws. |
| `private/audit-exports` | Restricted (Red) | AES-256 | Generated ETA Compliance Bundles (ZIPs). Retained 5 years. |
| `public/course-videos` | Public (Green) | None (Served via CDN/Nginx) | HLS transcoded video segments (`.ts`, `.m3u8`). Permanent retention. |
| `public/course-materials` | Public (Green) | None | Syllabi, public reading lists. Permanent retention. |

### 5.6 Data Classification

To comply with the Ethiopian Data Protection Proclamation, all database columns and file storage objects are tagged with a classification level, which dictates encryption and logging behavior.

*   **Public Green:** Course descriptions, timetables, public announcements. No encryption at rest required. Logged normally.
*   **Confidential Amber:** Student records, grades, enrollment data, attendance logs. Encrypted at rest via PostgreSQL TDE (Transparent Data Encryption) or application-level encryption. PII auto-redacted in application logs (e.g., Sentry).
*   **Restricted Red:** National ID numbers, wallet balances, passwords, exam snapshots, audit logs. **Strict AES-256 encryption at rest.** Never written to application logs. Access requires explicit, audited RBAC permissions and MFA.

### 5.7 Data Sovereignty & External API Governance

**5.7.1 The "No External Cloud" Mandate**
Per Art. 9.5.1 of Directive 806/2013 and national data protection laws, no student PII or institutional financial data may traverse international borders.
*   The AI Study Assistant (Ollama) runs entirely on the local Primary Node.
*   Video transcoding (FFmpeg) and document text extraction run locally.
*   No external cloud services (AWS, Azure, GCP) are used for data processing or storage.

**5.7.2 External API Hooks (e.g., Plagiarism Detection)**
The system integrates with external services like Turnitin for thesis plagiarism checking (Art. 9.4.4). To maintain data sovereignty and privacy:
*   **PII Stripping:** Before a document is sent to the Turnitin API, a local middleware strips all metadata, author names, student IDs, and institutional watermarks.
*   **Anonymized Payload:** Only the raw text content and a randomized, non-reversible document hash are transmitted.
*   **Result Mapping:** The external API returns a similarity score mapped to the document hash, which the local system then maps back to the specific student's submission record. The external provider never knows the identity of the student or the institution.

---

# PART TWO — SYSTEM ARCHITECTURE (Continued)

# Section 6 — Infrastructure & Compliance Baseline

The physical and network infrastructure of the POC-AMS is designed to guarantee 99.9% uptime, absolute data sovereignty, and strict compliance with the Ethiopian Education and Training Authority (ETA) Directive 806/2013. Because the college operates 100% online, this infrastructure is the *only* physical footprint of the institution's academic delivery.

### 6.1 Server Specification & Resource Allocation

To support the Peak Concurrent User (PCU) load of **500 concurrent exam takers** (heavy database writes) and **50 simultaneous live classrooms** (approx. 2,500 concurrent WebSocket/WebRTC connections), the Primary Node is provisioned with the following production specifications:

*   **Compute:** 32 vCPU (Dedicated cores to prevent noisy-neighbor issues if hosted in a regional data center).
*   **Memory:** 128GB DDR4 ECC RAM. 
    *   *Allocation:* 64GB dedicated to PostgreSQL shared buffers and OS cache; 32GB for the Local LLM (Ollama running a 4-bit quantized model); 16GB for Node.js (LiveKit SFU) and PHP-FPM; 16GB for Redis and MinIO.
*   **Storage:** 4TB NVMe SSD (RAID 10 for redundancy and high IOPS). 
    *   *IOPS Requirement:* Minimum 10,000 IOPS to handle the concurrent write-load of 500 students submitting exams and logging attendance simultaneously.
*   **Warm Standby Node:** Identical hardware specification, running in a passive state, hosting the PostgreSQL Streaming Replica and standby Redis/MinIO instances.

### 6.2 Bandwidth Requirements & West Gojjam Connectivity

The system is deployed in Finote Selam, where internet infrastructure, while connected to the national fiber backbone, requires careful provisioning to handle peak academic loads.

*   **Art. 9.5.2 Compliance (Live Classroom Bandwidth):** The directive requires sufficient bandwidth for live sessions. Calculated as: `512 Kbps × 2,500 peak concurrent users = 1.28 Gbps`.
*   **Art. 9.5.3 Compliance (Web Traffic):** `8 Mbps/sec × 1,000 concurrent website users = 8 Gbps` (burst capacity for public site and API).
*   **Provisioning Strategy:** The institution must procure a dedicated, symmetric **1 Gbps Enterprise Fiber line** from EthioTelecom, with a secondary 4G/5G LTE failover router (e.g., Huawei or Mikrotik) configured via BGP/OSPF to automatically route critical WebSocket and API traffic if the primary fiber is cut.

### 6.3 Physical Server Room (Art. 9.1.4)

Since there are no physical classrooms, the physical server room is the most critical physical asset of Power College. It must strictly comply with Art. 9.1.4 of the Directive.

*   **Environmental Controls:** Dedicated precision cooling (CRAC unit) maintaining 18°C–27°C and 40%-60% humidity.
*   **Power Redundancy:** 
    *   Dual online-conversion UPS units (N+1 redundancy) providing 30 minutes of runtime.
    *   Diesel backup generator with an Automatic Transfer Switch (ATS) configured to start and take the load within 15 seconds of a grid failure.
*   **Physical Security & Safety:** Biometric access control (fingerprint) restricted to the System Administrator and Compliance Officer. FM-200 or Novec 1230 clean agent fire suppression system (water sprinklers are strictly prohibited in the server room).
*   **System Tracking:** The Compliance Officer module contains a digital registry of the Server Room Compliance Certificate, updated annually after physical inspection.

### 6.4 Dedicated Server Mandate (Art. 8.2.12)

*   **No Shared Hosting:** Directive 806/2013 Art. 8.2.12 requires dedicated infrastructure for higher education institutions to ensure performance isolation and security. 
*   **Implementation:** The POC-AMS runs on bare-metal hardware physically owned by the college and housed in their certified server room, OR on a strictly isolated, single-tenant bare-metal dedicated server leased from an ETA-approved local data center (e.g., EthioTelecom Data Center in Addis Ababa, routed securely to Finote Selam). Virtual Private Servers (VPS) sharing hypervisors with unknown third parties are strictly prohibited.

### 6.5 Network Security & Perimeter Defense

The network perimeter is designed on a "Default Deny" philosophy.

*   **Firewall (UFW/iptables):** `DENY ALL` incoming traffic by default.
*   **Public Exposure:** Only ports `80` (HTTP, for immediate redirect to HTTPS) and `443` (HTTPS/TLS 1.3) are exposed to the public internet. 
*   **SSH Access:** Port 22 is blocked from the public internet. SSH access is only permitted via a secure, hardware-key authenticated VPN (e.g., WireGuard or OpenVPN).
*   **Admin Tooling Isolation:** Critical administrative interfaces—including Laravel Horizon (queue monitoring), MinIO Console, Meilisearch Dashboard, and PostgreSQL admin tools—are **never** exposed on public IPs. They are only accessible to the System Administrator via the internal VPN.

### 6.6 Secrets Management

Hardcoded credentials and plaintext `.env` files in production are a critical security violation.

*   **HashiCorp Vault:** All database passwords, API keys (Telebirr, EthioTelecom SMS), and JWT signing keys are stored in HashiCorp Vault.
*   **Application Injection:** At boot time, the Laravel and Node.js applications authenticate with Vault via AppRole and dynamically inject secrets into the application's memory environment. 
*   **Zero Plaintext:** The production server will not contain a `.env` file. If the application code is compromised via directory traversal, no credentials are exposed.
*   **Rotation Schedule:** Database passwords and API keys are automatically rotated by Vault every 90 days.

### 6.7 Dependency Supply Chain Security

To prevent supply chain attacks (e.g., malicious npm or Composer packages):

*   **Lock File Integrity:** CI/CD pipelines strictly enforce `npm ci` and `composer install --no-dev`. Any mismatch between `package-lock.json`/`composer.lock` and the manifest files triggers an immediate build failure.
*   **Automated CVE Scanning:** Tools like Snyk or Dependabot are integrated into the Git repository. 
*   **Deployment Block:** If a Critical or High severity CVE is detected in any dependency, the CI pipeline blocks the deployment to production until the package is patched or an explicit risk-acceptance waiver is signed by the System Architect.

### 6.8 Backup Strategy (3-2-1 Rule)

Data loss is unacceptable. The backup strategy strictly adheres to the 3-2-1 rule: 3 copies of data, on 2 different media types, with 1 copy offsite.

*   **Hourly WAL Archiving:** PostgreSQL Write-Ahead Logs (WAL) are continuously archived using `wal-g` to a local encrypted backup drive. This ensures an RPO (Recovery Point Objective) of exactly 1 hour.
*   **Daily Full Snapshots:** Every day at 1:00 AM EAT, a full encrypted filesystem snapshot (`pg_basebackup` + LVM snapshot) is taken.
*   **Offsite Replication:** The daily encrypted snapshot is securely rsync'd over a dedicated VPN tunnel to a secondary, geographically distinct backup server (e.g., at a partner institution or secondary data center in Addis Ababa).
*   **Retention:** 30-day rolling retention for daily snapshots. Monthly snapshots are retained for 7 years for financial/academic audit compliance.

### 6.9 Recovery Targets

*   **RPO (Recovery Point Objective):** 1 Hour. In a worst-case catastrophic failure, the maximum data lost is the last 60 minutes of transactions (recoverable via WAL replay).
*   **RTO (Recovery Time Objective):** 4 Hours. The system is architected to be fully restored and serving students within 4 hours of a total primary node destruction.

### 6.10 Warm Standby Promotion Runbook

To ensure the RTO is achievable, the Warm Standby node is not a "set and forget" backup; it is an actively tested failover mechanism.

*   **Streaming Replica:** The standby node runs a PostgreSQL streaming replica that is always within milliseconds of the primary.
*   **Promotion Procedure:** In the event of primary failure, the System Administrator executes the `promote_standby.sh` script. This breaks the replication, promotes the standby DB to primary, updates the Keepalived floating IP to point to the standby's MAC address, and restarts the Laravel/Node services. Target time: **< 30 minutes**.
*   **Quarterly Game Day:** Every three months, during the maintenance window, the team simulates a total primary node failure. The System Administrator must successfully promote the Warm Standby and verify all system functions. The results are logged in the ETA Compliance Bundle as proof of disaster recovery readiness.

### 6.11 Maintenance Windows & Student Notification

System updates, OS patching, and database vacuuming require downtime.

*   **Scheduled Window:** All non-emergency maintenance is strictly confined to **Sundays between 2:00 AM and 4:00 AM EAT**, when system traffic is at its absolute lowest.
*   **Art. 9.5.5 Notification Mandate:** The directive requires advanced notice of system downtime. 
*   **Automated Workflow:** 24 hours before the maintenance window, a Laravel Horizon cron job triggers the Communication Service. It sends an SMS (via EthioTelecom) and an Email to all active students and staff: *"Power College System Notice: The academic portal will undergo scheduled maintenance on Sunday from 2:00 AM to 4:00 AM. Please plan your studies accordingly."* The delivery status of these messages is logged in the audit trail to prove compliance to ETA inspectors.

---

# PART THREE — USER ROLES AND ACCESS CONTROL

# Section 7 — RBAC Architecture

The Role-Based Access Control (RBAC) architecture of the POC-AMS is the primary defense mechanism against internal fraud, academic manipulation, and unauthorized data access. Because the system is 100% online and lacks physical security guards to monitor administrative actions, the software itself must act as the uncompromising enforcer of institutional policy and ETA Directive 806/2013.

### 7.1 Principle of Least Privilege (PoLP)

**Requirement:** Every user, service account, and API token must be granted only the absolute minimum level of access necessary to perform their specific, defined duties.

*   **Endpoint Gating:** Every API route in the Laravel Academic Core and Finance Vault is protected by strict Middleware policies. If a user's role does not explicitly include the `permission:finance.wallet.credit` flag, the request is rejected with a `403 Forbidden` before it even reaches the controller logic.
*   **UI Element Masking:** The Next.js frontend dynamically renders or hides UI elements (buttons, forms, data tables) based on the user's JWT claims. A student viewing a grade report will not even receive the HTML/JSON for the "Edit Grade" button.
*   **Database Level Enforcement:** As defined in Section 5.2, the application connects to PostgreSQL using role-specific users (e.g., `user_finance`). Even if an attacker bypasses the application logic and achieves SQL injection in the Academic Core, the database will reject any query attempting to read or write to `schema_finance`.

### 7.2 Separation of Duties (SoD)

**Requirement:** No single role can initiate AND approve a high-risk, irreversible action. The system architecture inherently prevents conflicts of interest and unilateral manipulation of academic or financial records.

*   **Academic SoD:** An Instructor can *draft* and *submit* grades for their assigned sections. However, they cannot *approve* or *lock* those grades. Only the Head of Department (HoD) can approve, and only the Registrar can lock.
*   **Financial SoD:** A Finance Officer can *verify* a manual bank receipt and *initiate* a wallet credit. However, they cannot *approve* their own verification. If the credit exceeds the threshold, it requires a second, distinct approval.
*   **System SoD:** The System Administrator manages infrastructure, server health, and backups. They have **zero access** to read student grades, alter financial balances, or view KYC National ID documents. Conversely, the Registrar and Finance Officers have no access to server configurations or database backups.

### 7.3 The Four-Eyes Principle (Maker-Checker)

**Requirement:** For critical state changes, the system mandates a "Maker-Checker" workflow. The user who initiates the action (Maker) and the user who approves it (Checker) must be distinct individuals, and the system must cryptographically prove they used separate login sessions.

*   **Defined High-Risk Actions:**
    *   Grade changes after the `REGISTRAR_LOCKED` state.
    *   Manual wallet adjustments or refunds exceeding 5,000 ETB.
    *   Reversal of an academic expulsion or disciplinary action.
    *   Modification of the academic calendar after the semester has started.
*   **Session Verification:** When the Checker logs in to approve the Maker's request, the system checks the `session_id` in Redis. If the `session_id` belongs to the same `user_id` that initiated the request, the approval is rejected with the error: *"Four-Eyes Violation: Approver cannot be the Initiator."*
*   **Audit Trail:** Both the initiation and the approval are recorded as distinct, hash-chained entries in `schema_audit`.

### 7.4 Hash-Chained Append-Only Audit Log

**Requirement:** To satisfy the ETA's requirement for tamper-evident records (Art. 11), the system utilizes a cryptographic hash chain for all critical events.

*   **Mechanism:** Every time a critical event occurs (e.g., grade change, payment, login), the system generates a log entry containing the event data, timestamp, user ID, and IP address. 
*   **The Chain:** The system calculates the `SHA-256` hash of the *current* event's payload combined with the `hash` of the *previous* event. 
*   **Immutability:** This creates an unbreakable chain. If a rogue Database Administrator attempts to alter a grade change record from three months ago, the hash of that altered record will change. This breaks the chain for every subsequent record. 
*   **Nightly Integrity Check:** A cron job runs at midnight EAT, recalculating the hash chain from the genesis block. If a broken link is detected, the system immediately triggers a P1 Incident Response, freezes all academic and financial modifications, and alerts the Board Chair and Compliance Officer.

### 7.5 Root Authority (Multi-Signature Break-Glass)

**Requirement:** Certain catastrophic or system-altering actions require consensus from the highest levels of institutional leadership to prevent a single compromised executive account from destroying the system.

*   **The 2-of-3 Rule:** Actions such as "Wipe Finance Ledger," "Reset Audit Chain," or "Emergency System Shutdown" require cryptographic approval from at least **two of the following three roles**:
    1.  Board Chair
    2.  Academic Dean
    3.  Chief Financial Officer (CFO)
*   **Implementation:** When a Root Action is initiated, the system generates a secure, time-limited token. The initiating executive shares this token out-of-band (e.g., via a secure physical meeting or encrypted communication) with a second executive. Both must authenticate via their hardware MFA keys to sign the transaction.

### 7.6 Session Policy & Concurrency Limits

**Requirement:** Session management must balance security for staff with usability for students accessing the 100% online platform from various devices.

*   **Staff Roles (Strict):** Limited to **one active session** at a time. If an Instructor logs in on their laptop, and then logs in on their phone, the laptop session is immediately invalidated in Redis. This prevents credential sharing and ensures that if a staff member's account is compromised, the legitimate user can regain control simply by logging in again.
*   **Student Roles (Flexible):** Limited to **two concurrent sessions**. This acknowledges the reality of the 100% online model, where a student might be watching a LiveKit lecture on their laptop while simultaneously checking the Digital Library or chatting on their mobile phone. A third login attempt will invalidate the oldest session.
*   **Absolute Timeout:** All sessions (staff and student) are hard-terminated after 12 hours of inactivity, requiring a fresh login and MFA challenge.

### 7.7 Multi-Factor Authentication (MFA)

**Requirement:** Passwords alone are insufficient to protect PII and financial data.

*   **TOTP Mandatory for Staff:** All staff roles (Instructor, Registrar, Finance Officer, System Admin, etc.) must enroll a Time-based One-Time Password (TOTP) authenticator app (e.g., Google Authenticator, Authy, or 1Password) upon their first login. 
*   **Enforcement:** The system will not allow a staff member to access any functional module until MFA is successfully verified. 
*   **Student MFA:** MFA is optional but highly encouraged for students via SMS OTP. However, if a student enables MFA, it becomes mandatory for all future logins.

### 7.8 Account Lockout & Brute Force Protection

**Requirement:** Protect the system against credential stuffing and brute-force attacks without causing accidental Denial of Service (DoS) for legitimate users.

*   **Progressive Lockout:** 
    *   **Attempts 1-4:** Failed login attempts are logged, but the user can retry immediately.
    *   **Attempt 5:** The account is locked for **10 minutes**. An email notification is sent to the account owner.
    *   **Consecutive Lockouts:** If an account triggers the 10-minute lockout **three times in a 24-hour period**, the account status is changed to `FROZEN`.
*   **Compliance Alert:** When an account is `FROZEN`, an automated SMS and Email alert is sent to the Compliance Officer and the System Administrator, detailing the IP addresses and device fingerprints associated with the failed attempts. Only the Compliance Officer can unfreeze the account after verifying the user's identity.

### 7.9 Administrative Isolation (VPN-Only Access)

**Requirement:** Backend infrastructure and administrative tooling must never be exposed to the public internet.

*   **Public vs. Private:** The Next.js frontend and the public API endpoints (`/api/public/*`) are the only services listening on ports 80/443.
*   **Admin Tooling:** Interfaces like Laravel Horizon (queue management), MinIO Console (file storage), Meilisearch Dashboard, and PostgreSQL Adminer are strictly bound to the `127.0.0.1` (localhost) or internal private IP interfaces.
*   **VPN Mandate:** To access these administrative tools, the System Administrator and authorized DevOps personnel must first connect to the institution's WireGuard/OpenVPN server. The Nginx reverse proxy is configured to only route requests to these admin panels if the source IP matches the internal VPN subnet (e.g., `10.8.0.0/24`).

---

# PART THREE — USER ROLES AND ACCESS CONTROL (Continued)

# Section 8 — Role Definitions

This section defines the exact lifecycle, permissions, constraints, and regulatory gates for every user role within the POC-AMS. Because the institution operates 100% online, these digital roles replace all physical administrative functions. Every role is bound by the Principle of Least Privilege (Section 7.1) and the strict separation of duties required by Directive 806/2013.

### 8.1 Applicant
**Lifecycle & Scope:** 
The Applicant role is the entry point into the system. It exists from the moment a prospective student registers on the public portal until their application is either accepted (transitioning to Student) or rejected.
*   **Permissions:** Submit application forms, upload KYC documents (National ID, prior transcripts), pay the non-refundable application fee via Telebirr/CBE Birr, and track application status.
*   **Constraints:** Cannot access any academic content, live classrooms, or library resources. 
*   **Auto-Archive & Wipe:** If an application is rejected, or if the applicant abandons the process, the account transitions to a `REJECTED` state. Per data minimization principles, the system automatically cryptographically wipes all PII (National ID, phone numbers) exactly **6 months** after the rejection date, retaining only an anonymized statistical record of the rejection reason.

### 8.2 Student (Active Learner)
**Lifecycle & Scope:** 
The primary consumer of the 100% online educational experience. This role is activated only after the Registrar formally accepts the applicant and the student pays the initial semester tuition.
*   **Permissions:** Register for courses (subject to prerequisites and capacity), attend LiveKit sessions, access DRM-protected course materials, submit assignments, take proctored exams, interact with the AI Study Assistant, and view grades/transcripts.
*   **Financial Hold Logic:** The system continuously checks the Student Wallet. If the balance falls below the required tuition threshold, the system automatically places a `FINANCIAL_HOLD`. This blocks course registration, blocks access to new content, and blocks exam entry. The hold is instantly lifted the millisecond the Finance Vault processes a successful payment webhook.
*   **Academic Hold Logic:** If a student's CGPA drops below 2.0, they are placed on Academic Probation. The SIS automatically restricts their maximum credit load to 12 credits (down from the standard 19) for the subsequent semester.
*   **Online-Only Awareness:** The student UI contains no physical campus maps, no physical office hours, and no paper forms. All support is routed through the digital ticketing system or the AI Assistant.

### 8.3 Instructor
**Lifecycle & Scope:** 
The digital facilitators of the academic programs. Instructors are strictly gated by regulatory compliance checks before they can interact with any student.
*   **Credential Gate (Art. 9.2.3):** The system enforces a hard block: an instructor cannot be assigned to any BA-level course unless they possess a verified Master’s degree in the relevant discipline. The System Admin must upload and verify the degree certificate before the instructor account is activated.
*   **Digital Pedagogy Gate (Art. 9.2.7):** Because delivery is 100% online, Directive 806/2013 mandates that all instructors hold a recognized Digital Pedagogy/Online Teaching certification. The system checks the `digital_pedagogy_cert_expiry` date. If it is expired or missing, the instructor is blocked from creating live sessions, uploading content, or grading.
*   **Workload Cap Enforcement:** The system tracks the number of credit hours assigned to each instructor per semester. If an assignment would push their workload beyond the institutional maximum (e.g., 15 credit hours per semester), the Academic Head's attempt to assign them is blocked.
*   **Supervision Ratio (Art. 9.6.8):** For BA programs, the system enforces a strict maximum student-to-instructor ratio of **1:8** for practical/lab components and **1:80** for lecture sections. The course registration engine will hard-block new enrollments into a section if adding one more student would violate this ratio.

### 8.4 Academic Head (Dean / Head of Department)
**Lifecycle & Scope:** 
The academic managers responsible for curriculum integrity and departmental oversight.
*   **Permissions:** Scope is strictly limited to their assigned department (e.g., HoD of MIS cannot see Accounting courses). They can approve syllabi, assign instructors to courses (subject to the gates in 8.3), approve draft grades submitted by instructors, and monitor the Online Delivery Ratio for their department.
*   **Constraints:** They cannot lock grades (only the Registrar can), nor can they alter financial records or student admissions status.

### 8.5 Registrar
**Lifecycle & Scope:** 
The ultimate custodian of academic records and the primary liaison for ETA compliance.
*   **Grade Lock Authority:** The Registrar is the only role capable of transitioning grades from `HOD_APPROVED` to `REGISTRAR_LOCKED`. Once locked, grades are immutable and flow to the student's permanent transcript.
*   **Transcript & Degree Issuance:** The Registrar triggers the generation of digitally signed PDF transcripts and degree certificates, complete with QR-code verification links.
*   **Student Acceptance (Art. 10.4):** The Registrar holds the final authority to transition an Applicant to an Active Student, verifying that all KYC and admission criteria are met.
*   **Renewal Evidence Custodian:** The Registrar owns the Historical Reconstruction Module and is responsible for reviewing the auto-generated ETA Compliance Bundles before they are submitted to the government.

### 8.6 Finance Officer
**Lifecycle & Scope:** 
The managers of the Student Wallet and institutional revenue. They operate strictly within the isolated Finance Vault application.
*   **Wallet Authority:** Can view wallet balances, generate financial reports, and manually credit wallets in cases of bank transfer discrepancies.
*   **Payment Verification:** Reviews manual bank receipt uploads from students and verifies them against bank statements.
*   **Four-Eyes Threshold:** Any manual wallet adjustment, refund, or credit exceeding **5,000 ETB** triggers the Four-Eyes workflow. The Finance Officer initiates the action, but it remains in a `PENDING_APPROVAL` state until the CFO logs in with a separate session and cryptographically approves it.
*   **Zero Academic Access:** The Finance Officer cannot view student grades, exam content, or attendance logs. They only see student names, IDs, and financial balances.

### 8.7 Librarian
**Lifecycle & Scope:** 
Manager of the Digital Library and e-resource compliance.
*   **Resource Management:** Uploads and categorizes e-books, PDFs, and multimedia resources.
*   **DRM Enforcement:** Configures the Digital Rights Management rules per resource (e.g., view-only in browser, no download, or limited-copy borrowing with FIFO waitlists).
*   **Journal Access (Art. 9.5.11):** Manages the institutional credentials for external scientific journals. The system displays available journal access to students based on their specific program requirements.

### 8.8 System Administrator
**Lifecycle & Scope:** 
The technical operator of the infrastructure. 
*   **Permissions:** Full access to server health, logs, backup systems, PM2/Supervisor processes, and user account provisioning (creating accounts, resetting MFA).
*   **Strict Constraints:** The System Administrator has **ZERO access** to academic or financial data. They cannot view student grades, alter wallet balances, or read KYC National ID documents. Database connections for the SysAdmin tools are restricted to `schema_auth` and infrastructure logs. This ensures the IT staff cannot manipulate academic or financial records.

### 8.9 Compliance Officer
**Lifecycle & Scope:** 
The internal auditor and regulatory safeguard. This role is designed to ensure the college never loses its license.
*   **Read-All Access:** Can view all academic, financial, and operational data to conduct internal audits.
*   **Account Freeze Authority:** Can instantly freeze any student or staff account suspected of fraud or academic misconduct, halting all their system access.
*   **Renewal Bundle Signatory:** Reviews the One-Click ETA Compliance Bundle, applies their digital signature, and provisions the time-limited Agency Inspector accounts.
*   **Constraints:** Cannot alter grades, cannot modify financial balances, and cannot change system code.

### 8.10 Agency Inspector
**Lifecycle & Scope:** 
A specialized, temporary role created exclusively for external ETA evaluators during license renewal or accreditation visits (Art. 11.13).
*   **Provisioning:** Created solely by the Compliance Officer. The account is configured with a strict `start_date` and `expiry_date`. At 11:59 PM on the expiry date, the account is automatically and permanently deleted.
*   **Permissions:** Strictly **Read-Only**. The inspector is granted access to a dedicated dashboard containing the ETA Compliance Bundle, the hash-chained audit logs, faculty credential registers, and live delivery ratio reports. 
*   **Constraints:** Cannot modify any data, cannot download raw PII (only aggregated or redacted reports), and cannot access the system outside of their approved time window. All inspector login events and page views are heavily logged.

### 8.11 Disciplinary Committee
**Lifecycle & Scope:** 
A specialized role (or group of roles) tasked with reviewing academic integrity violations.
*   **Scope:** Strictly limited to viewing `Suspicion Reports` generated by the AI Proctoring system (Section 15) and managing academic integrity cases.
*   **Permissions:** Can view proctoring snapshots, exam logs, and violation videos. They have the authority to change an exam status from `FLAGGED` to `INVALIDATED` or `CLEARED`.
*   **Constraints:** They cannot view the student's financial records, general grades, or personal PII beyond what is necessary for the disciplinary case.

### 8.12 Permission Matrix (Role × Action Grid)

| Action / Resource | Applicant | Student | Instructor | Academic Head | Registrar | Finance Officer | SysAdmin | Compliance Officer | Inspector |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Submit KYC / Apply** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Register for Courses** | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Upload Course Content** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Conduct Live Class** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Draft / Submit Grades** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Approve Grades (HoD)** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Lock Grades / Transcript**| ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Credit Student Wallet** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Approve >5k ETB Adj.** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌* | ❌ |
| **View Audit Logs** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Generate ETA Bundle** | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Server / Infra Config** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

*\*Note: The CFO (not listed as a daily operational role, but mapped to Root Authority) approves >5k ETB adjustments via the 2-of-3 multi-sig process.*

### 8.13 Data Retention per Role Lifecycle

To comply with the Ethiopian Data Protection Proclamation and ETA audit requirements, data is automatically purged or archived based on the user's lifecycle state. A nightly cron job (`schema_audit` verified) enforces these rules:

| User State / Record Type | Retention Period | Action Upon Expiry |
| :--- | :--- | :--- |
| **Rejected Applicant** | 6 months from rejection date. | **Cryptographic Wipe.** PII (Name, ID, Phone) is permanently overwritten with random data. Only anonymized admission stats remain. |
| **Active Student** | Duration of enrollment. | N/A |
| **Graduate (Alumni)** | Perpetual. | Academic records (transcripts, degrees) are retained permanently to allow for future verification. PII is retained but heavily encrypted. |
| **Expelled Student** | 10 years post-expulsion. | After 10 years, academic records are anonymized. |
| **Financial Records** | 7 years from transaction date. | Archived to cold storage, then cryptographically destroyed per national financial audit laws. |
| **Audit Logs** | 5 years from event date. | Archived. The hash chain is preserved, but older logs may be moved to offline cold storage. |
| **Proctoring Snapshots** | 1 Semester (approx. 6 months). | **Permanent Delete.** Once the grade dispute window for the semester closes, all webcam snapshots and AI suspicion images are permanently wiped from MinIO to protect student privacy. |
| **KYC Documents (National ID)**| 6 months post-rejection OR Perpetual if enrolled. | If rejected, wiped at 6 months. If enrolled, retained securely as long as the student record exists. |
