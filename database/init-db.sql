-- =============================================================================
-- POC-AMS PostgreSQL Database Initialization Script
-- Aligned with FRD Section 5 — Data Architecture
-- =============================================================================
-- This script MUST be run as a PostgreSQL superuser (e.g., postgres).
-- It creates the database, schemas, isolated roles, and the immutable audit
-- trigger infrastructure that forms the foundation of the Domain-Separated
-- Monolith architecture.
-- =============================================================================

-- =============================================
-- 1. CREATE DATABASE
-- =============================================
-- Run this separately if needed:
-- CREATE DATABASE poc_ams WITH ENCODING 'UTF8' LC_COLLATE 'en_US.UTF-8' LC_CTYPE 'en_US.UTF-8' TEMPLATE template0;

\connect poc_ams;

-- =============================================
-- 2. ENABLE EXTENSIONS
-- =============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";       -- UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";         -- Cryptographic functions (hashing)
CREATE EXTENSION IF NOT EXISTS "vector";           -- pgvector for AI embeddings (FRD 4.5)

-- =============================================
-- 3. CREATE SCHEMAS (FRD Section 5.1)
-- =============================================
-- Strict logical isolation. Cross-schema JOINs are prohibited at app layer.

CREATE SCHEMA IF NOT EXISTS schema_auth;
CREATE SCHEMA IF NOT EXISTS schema_sis;
CREATE SCHEMA IF NOT EXISTS schema_finance;
CREATE SCHEMA IF NOT EXISTS schema_lms;
CREATE SCHEMA IF NOT EXISTS schema_library;
CREATE SCHEMA IF NOT EXISTS schema_audit;
CREATE SCHEMA IF NOT EXISTS schema_ai;

-- =============================================
-- 4. CREATE DATABASE ROLES (FRD Section 5.2)
-- =============================================
-- Each application service connects as a different DB user with minimal privileges.
-- This prevents lateral movement in case of SQL injection.

-- 4.1 Auth Service User
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'user_auth') THEN
    CREATE ROLE user_auth WITH LOGIN PASSWORD 'auth_secret_changeme';
  END IF;
END $$;

-- 4.2 Academic Core User (SIS + LMS + Library)
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'user_academic') THEN
    CREATE ROLE user_academic WITH LOGIN PASSWORD 'academic_secret_changeme';
  END IF;
END $$;

-- 4.3 Finance Vault User (Strictly isolated from academic data)
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'user_finance') THEN
    CREATE ROLE user_finance WITH LOGIN PASSWORD 'finance_secret_changeme';
  END IF;
END $$;

-- 4.4 Audit User (SELECT + INSERT-only via function)
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'user_audit') THEN
    CREATE ROLE user_audit WITH LOGIN PASSWORD 'audit_secret_changeme';
  END IF;
END $$;

-- 4.5 AI Satellite User (Read LMS content, CRUD on schema_ai)
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'user_ai') THEN
    CREATE ROLE user_ai WITH LOGIN PASSWORD 'ai_secret_changeme';
  END IF;
END $$;

-- =============================================
-- 5. GRANT SCHEMA PERMISSIONS (FRD Section 5.2)
-- =============================================

-- 5.1 user_auth → schema_auth ONLY
GRANT USAGE ON SCHEMA schema_auth TO user_auth;
GRANT CREATE ON SCHEMA schema_auth TO user_auth;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_auth GRANT ALL ON TABLES TO user_auth;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_auth GRANT ALL ON SEQUENCES TO user_auth;

-- 5.2 user_academic → schema_sis, schema_lms, schema_library
GRANT USAGE ON SCHEMA schema_sis TO user_academic;
GRANT CREATE ON SCHEMA schema_sis TO user_academic;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_sis GRANT ALL ON TABLES TO user_academic;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_sis GRANT ALL ON SEQUENCES TO user_academic;

GRANT USAGE ON SCHEMA schema_lms TO user_academic;
GRANT CREATE ON SCHEMA schema_lms TO user_academic;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_lms GRANT ALL ON TABLES TO user_academic;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_lms GRANT ALL ON SEQUENCES TO user_academic;

GRANT USAGE ON SCHEMA schema_library TO user_academic;
GRANT CREATE ON SCHEMA schema_library TO user_academic;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_library GRANT ALL ON TABLES TO user_academic;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_library GRANT ALL ON SEQUENCES TO user_academic;

-- 5.3 user_finance → schema_finance ONLY (EXPLICITLY DENIED access to schema_sis/schema_lms)
GRANT USAGE ON SCHEMA schema_finance TO user_finance;
GRANT CREATE ON SCHEMA schema_finance TO user_finance;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_finance GRANT ALL ON TABLES TO user_finance;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_finance GRANT ALL ON SEQUENCES TO user_finance;
-- Explicit denial is the default — user_finance has NO grants on any other schema.

-- 5.4 user_audit → schema_audit (SELECT + INSERT via function only)
GRANT USAGE ON SCHEMA schema_audit TO user_audit;
-- INSERT is handled exclusively via the audit_append() PL/pgSQL function below.
-- Direct table INSERT/UPDATE/DELETE is NOT granted.

-- 5.5 user_ai → schema_ai (CRUD) + schema_lms (SELECT only)
GRANT USAGE ON SCHEMA schema_ai TO user_ai;
GRANT CREATE ON SCHEMA schema_ai TO user_ai;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_ai GRANT ALL ON TABLES TO user_ai;
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_ai GRANT ALL ON SEQUENCES TO user_ai;

GRANT USAGE ON SCHEMA schema_lms TO user_ai;
-- user_ai can SELECT from schema_lms but cannot INSERT/UPDATE/DELETE
-- (Actual table-level grants are applied after tables are created)

-- 5.6 All application users can INSERT audit events
GRANT USAGE ON SCHEMA schema_audit TO user_auth, user_academic, user_finance, user_ai;


-- =============================================
-- 6. SCHEMA_AUTH — Tables
-- =============================================
SET search_path TO schema_auth;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    national_id_number VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'student'
        CHECK (role IN ('student', 'instructor', 'registrar', 'finance_officer', 'compliance_officer', 'hod', 'dean', 'system_admin')),
    status VARCHAR(30) NOT NULL DEFAULT 'pending_kyc'
        CHECK (status IN ('pending_kyc', 'active', 'suspended', 'graduated', 'withdrawn')),
    kyc_verified_at TIMESTAMPTZ,
    kyc_verified_by UUID REFERENCES schema_auth.users(id),
    mfa_secret VARCHAR(255),
    mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    device_fingerprint JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES schema_auth.users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    guard_name VARCHAR(50) NOT NULL DEFAULT 'api',
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    guard_name VARCHAR(50) NOT NULL DEFAULT 'api',
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS role_has_permissions (
    role_id INTEGER NOT NULL REFERENCES schema_auth.roles(id) ON DELETE CASCADE,
    permission_id INTEGER NOT NULL REFERENCES schema_auth.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS user_has_roles (
    user_id UUID NOT NULL REFERENCES schema_auth.users(id) ON DELETE CASCADE,
    role_id INTEGER NOT NULL REFERENCES schema_auth.roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- =============================================
-- 7. SCHEMA_SIS — Tables
-- =============================================
SET search_path TO schema_sis;

CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    degree_type VARCHAR(20) NOT NULL DEFAULT 'BA'
        CHECK (degree_type IN ('BA')),
    total_credits_required INTEGER NOT NULL DEFAULT 160,
    max_years INTEGER NOT NULL DEFAULT 6,
    delivery_mode VARCHAR(20) NOT NULL DEFAULT 'ONLINE'
        CHECK (delivery_mode = 'ONLINE'),   -- FRD: Hardcoded to ONLINE (Art. 8.3.10)
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS academic_years (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,             -- e.g., "2026/2027"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS semesters (
    id SERIAL PRIMARY KEY,
    academic_year_id INTEGER NOT NULL REFERENCES schema_sis.academic_years(id),
    name VARCHAR(50) NOT NULL,             -- e.g., "Semester 1"
    ordinal INTEGER NOT NULL CHECK (ordinal IN (1, 2, 3)),  -- 1=Sem1, 2=Sem2, 3=Summer
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    registration_open DATE NOT NULL,
    registration_close DATE NOT NULL,
    add_drop_deadline DATE NOT NULL,       -- 14-day window per Art. 9.7.4
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    program_id INTEGER NOT NULL REFERENCES schema_sis.programs(id),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 6),
    year_level INTEGER NOT NULL CHECK (year_level BETWEEN 1 AND 4),
    delivery_mode VARCHAR(20) NOT NULL DEFAULT 'ONLINE'
        CHECK (delivery_mode = 'ONLINE'),   -- FRD: Hardcoded
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_prerequisites (
    course_id INTEGER NOT NULL REFERENCES schema_sis.courses(id) ON DELETE CASCADE,
    prerequisite_id INTEGER NOT NULL REFERENCES schema_sis.courses(id) ON DELETE CASCADE,
    PRIMARY KEY (course_id, prerequisite_id),
    CHECK (course_id != prerequisite_id)
);

CREATE TABLE IF NOT EXISTS sections (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES schema_sis.courses(id),
    semester_id INTEGER NOT NULL REFERENCES schema_sis.semesters(id),
    instructor_id UUID NOT NULL,           -- References schema_auth.users(id) via app logic
    section_code VARCHAR(5) NOT NULL DEFAULT 'A',
    capacity INTEGER NOT NULL DEFAULT 80,
    enrolled_count INTEGER NOT NULL DEFAULT 0,
    schedule_json JSONB,                   -- LiveKit session schedule
    delivery_mode VARCHAR(20) NOT NULL DEFAULT 'ONLINE'
        CHECK (delivery_mode = 'ONLINE'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (course_id, semester_id, section_code)
);

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY,                    -- Same as schema_auth.users(id)
    student_id_number VARCHAR(30) NOT NULL UNIQUE,  -- e.g., "PC/MIS/0142/2026"
    program_id INTEGER NOT NULL REFERENCES schema_sis.programs(id),
    admission_date DATE NOT NULL,
    current_year INTEGER NOT NULL DEFAULT 1,
    current_semester INTEGER NOT NULL DEFAULT 1,
    cgpa NUMERIC(3,2) DEFAULT 0.00,
    total_credits_earned INTEGER NOT NULL DEFAULT 0,
    academic_status VARCHAR(30) NOT NULL DEFAULT 'GOOD_STANDING'
        CHECK (academic_status IN ('GOOD_STANDING', 'ACADEMIC_WARNING', 'ACADEMIC_PROBATION', 'DISMISSED', 'GRADUATED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES schema_sis.students(id),
    section_id INTEGER NOT NULL REFERENCES schema_sis.sections(id),
    semester_id INTEGER NOT NULL REFERENCES schema_sis.semesters(id),
    status VARCHAR(30) NOT NULL DEFAULT 'REGISTERED'
        CHECK (status IN ('REGISTERED', 'WAITLISTED', 'DROPPED', 'COMPLETED', 'FAILED', 'WITHDRAWN')),
    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    dropped_at TIMESTAMPTZ,
    UNIQUE (student_id, section_id)
);

CREATE TABLE IF NOT EXISTS grades (
    id SERIAL PRIMARY KEY,
    enrollment_id INTEGER NOT NULL REFERENCES schema_sis.enrollments(id) UNIQUE,
    letter_grade VARCHAR(5)
        CHECK (letter_grade IN ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'I', 'W', 'NG')),
    grade_point NUMERIC(3,2),
    instructor_submitted_at TIMESTAMPTZ,
    instructor_id UUID,
    hod_approved_at TIMESTAMPTZ,
    hod_id UUID,
    registrar_locked_at TIMESTAMPTZ,
    registrar_id UUID,
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,    -- Once Registrar locks, grade is immutable
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =============================================
-- 8. SCHEMA_FINANCE — Tables
-- =============================================
SET search_path TO schema_finance;

CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY,                    -- Same as schema_auth.users(id)
    balance NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) NOT NULL DEFAULT 'ETB',
    hold_active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Double-Entry Ledger (FRD Section 12.1)
-- Balance is ALWAYS computed from SUM of ledger entries, never directly manipulated.
CREATE TABLE IF NOT EXISTS ledger_entries (
    id SERIAL PRIMARY KEY,
    wallet_id UUID NOT NULL REFERENCES schema_finance.wallets(id),
    transaction_type VARCHAR(20) NOT NULL
        CHECK (transaction_type IN ('DEBIT', 'CREDIT')),
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    running_balance NUMERIC(12,2) NOT NULL,
    description VARCHAR(500) NOT NULL,
    reference_type VARCHAR(50),            -- e.g., 'TUITION_INVOICE', 'TELEBIRR_PAYMENT', 'MANUAL_RECEIPT'
    reference_id VARCHAR(100),             -- External transaction ID
    idempotency_key UUID NOT NULL UNIQUE,  -- Prevents double-crediting (FRD 5.4.2)
    processed_by UUID,                     -- Finance Officer who approved (for manual entries)
    approved_by UUID,                      -- CFO for amounts > 5000 ETB (Four-Eyes)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Transactional Outbox Pattern (FRD Section 5.4.1)
CREATE TABLE IF NOT EXISTS outbox_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,       -- e.g., 'finance.payment.success'
    payload JSONB NOT NULL,
    published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Webhook Idempotency Store
CREATE TABLE IF NOT EXISTS webhook_logs (
    id SERIAL PRIMARY KEY,
    provider VARCHAR(30) NOT NULL,         -- 'TELEBIRR' or 'CBE_BIRR'
    external_transaction_id VARCHAR(255) NOT NULL UNIQUE,
    payload JSONB NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'RECEIVED'
        CHECK (status IN ('RECEIVED', 'PROCESSED', 'FAILED', 'DUPLICATE')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =============================================
-- 9. SCHEMA_LMS — Tables
-- =============================================
SET search_path TO schema_lms;

CREATE TABLE IF NOT EXISTS course_content (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL,             -- References schema_sis.courses(id) via app logic
    module_order INTEGER NOT NULL,
    module_title VARCHAR(200) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_items (
    id SERIAL PRIMARY KEY,
    module_id INTEGER NOT NULL REFERENCES schema_lms.course_content(id) ON DELETE CASCADE,
    item_order INTEGER NOT NULL,
    item_type VARCHAR(30) NOT NULL
        CHECK (item_type IN ('VIDEO', 'READING', 'ASSIGNMENT', 'QUIZ', 'LIVE_SESSION')),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    -- Video-specific fields
    video_storage_path VARCHAR(500),        -- MinIO path to HLS manifest
    video_duration_seconds INTEGER,
    required_watch_percentage INTEGER DEFAULT 90,  -- Art. 9.3.3: 90% required
    -- Reading-specific fields
    file_storage_path VARCHAR(500),         -- MinIO path to PDF/ePUB
    drm_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    is_required BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_progress (
    id SERIAL PRIMARY KEY,
    student_id UUID NOT NULL,               -- References schema_auth.users(id)
    content_item_id INTEGER NOT NULL REFERENCES schema_lms.content_items(id),
    progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    last_accessed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (student_id, content_item_id)
);

CREATE TABLE IF NOT EXISTS attendance_logs (
    id SERIAL PRIMARY KEY,
    student_id UUID NOT NULL,
    section_id INTEGER NOT NULL,            -- References schema_sis.sections(id) via app logic
    session_date DATE NOT NULL,
    join_time TIMESTAMPTZ NOT NULL,
    leave_time TIMESTAMPTZ,
    duration_seconds INTEGER,
    ip_address INET,
    status VARCHAR(20) NOT NULL DEFAULT 'PRESENT'
        CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (student_id, section_id, session_date)
);


-- =============================================
-- 10. SCHEMA_LIBRARY — Tables
-- =============================================
SET search_path TO schema_library;

CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(300),
    isbn VARCHAR(20),
    resource_type VARCHAR(20) NOT NULL
        CHECK (resource_type IN ('PDF', 'EPUB', 'JOURNAL', 'VIDEO')),
    category VARCHAR(100),
    file_storage_path VARCHAR(500),
    file_size_bytes BIGINT,
    total_licenses INTEGER NOT NULL DEFAULT 5,
    active_leases INTEGER NOT NULL DEFAULT 0,
    meilisearch_indexed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS drm_leases (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES schema_library.resources(id),
    student_id UUID NOT NULL,
    leased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    returned_at TIMESTAMPTZ,
    decryption_key_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (resource_id, student_id, leased_at)
);

CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES schema_library.resources(id),
    student_id UUID NOT NULL,
    position INTEGER NOT NULL,
    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    fulfilled_at TIMESTAMPTZ,
    UNIQUE (resource_id, student_id)
);


-- =============================================
-- 11. SCHEMA_AUDIT — Immutable Hash-Chained Log
-- =============================================
SET search_path TO schema_audit;

CREATE TABLE IF NOT EXISTS audit_log (
    id BIGSERIAL PRIMARY KEY,
    event_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    actor_id UUID,                          -- The user who triggered the event
    actor_role VARCHAR(50),
    domain VARCHAR(30) NOT NULL             -- 'AUTH', 'SIS', 'FINANCE', 'LMS', 'LIBRARY', 'SYSTEM'
        CHECK (domain IN ('AUTH', 'SIS', 'FINANCE', 'LMS', 'LIBRARY', 'SYSTEM')),
    action VARCHAR(100) NOT NULL,           -- e.g., 'KYC_VERIFIED', 'GRADE_LOCKED', 'PAYMENT_RECEIVED'
    entity_type VARCHAR(100),               -- e.g., 'enrollment', 'ledger_entry'
    entity_id VARCHAR(100),                 -- The PK of the affected record
    details JSONB,                          -- Additional context
    severity VARCHAR(10) NOT NULL DEFAULT 'INFO'
        CHECK (severity IN ('INFO', 'MEDIUM', 'HIGH', 'CRITICAL')),
    ip_address INET,
    previous_hash VARCHAR(64),              -- SHA-256 hash of the previous row
    current_hash VARCHAR(64) NOT NULL       -- SHA-256 hash of THIS row (computed by trigger)
);

-- =============================================
-- 11.1 WRITE-ONCE Trigger — Prevents UPDATE/DELETE on audit_log
-- =============================================
CREATE OR REPLACE FUNCTION schema_audit.prevent_audit_mutation()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'AUDIT VIOLATION: UPDATE and DELETE operations are strictly prohibited on schema_audit.audit_log. This is an immutable, hash-chained ledger.';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_audit_update ON schema_audit.audit_log;
CREATE TRIGGER trg_prevent_audit_update
    BEFORE UPDATE OR DELETE ON schema_audit.audit_log
    FOR EACH ROW EXECUTE FUNCTION schema_audit.prevent_audit_mutation();

-- =============================================
-- 11.2 Hash-Chain Trigger — Auto-computes current_hash on INSERT
-- =============================================
CREATE OR REPLACE FUNCTION schema_audit.compute_audit_hash()
RETURNS TRIGGER AS $$
DECLARE
    prev_hash VARCHAR(64);
    hash_input TEXT;
BEGIN
    -- Get the hash of the previous row
    SELECT current_hash INTO prev_hash
    FROM schema_audit.audit_log
    ORDER BY id DESC
    LIMIT 1;

    IF prev_hash IS NULL THEN
        prev_hash := '0000000000000000000000000000000000000000000000000000000000000000';
    END IF;

    NEW.previous_hash := prev_hash;

    -- Compute SHA-256 hash of: previous_hash + event_time + actor_id + domain + action + entity_id
    hash_input := prev_hash || '|' ||
                  COALESCE(NEW.event_time::TEXT, '') || '|' ||
                  COALESCE(NEW.actor_id::TEXT, '') || '|' ||
                  COALESCE(NEW.domain, '') || '|' ||
                  COALESCE(NEW.action, '') || '|' ||
                  COALESCE(NEW.entity_id, '');

    NEW.current_hash := encode(digest(hash_input, 'sha256'), 'hex');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_compute_audit_hash ON schema_audit.audit_log;
CREATE TRIGGER trg_compute_audit_hash
    BEFORE INSERT ON schema_audit.audit_log
    FOR EACH ROW EXECUTE FUNCTION schema_audit.compute_audit_hash();

-- =============================================
-- 11.3 Audit Append Function — The ONLY way to insert audit records
-- =============================================
CREATE OR REPLACE FUNCTION schema_audit.audit_append(
    p_actor_id UUID,
    p_actor_role VARCHAR(50),
    p_domain VARCHAR(30),
    p_action VARCHAR(100),
    p_entity_type VARCHAR(100),
    p_entity_id VARCHAR(100),
    p_details JSONB DEFAULT NULL,
    p_severity VARCHAR(10) DEFAULT 'INFO',
    p_ip_address INET DEFAULT NULL
) RETURNS BIGINT AS $$
DECLARE
    new_id BIGINT;
BEGIN
    INSERT INTO schema_audit.audit_log (
        actor_id, actor_role, domain, action, entity_type, entity_id,
        details, severity, ip_address
    ) VALUES (
        p_actor_id, p_actor_role, p_domain, p_action, p_entity_type, p_entity_id,
        p_details, p_severity, p_ip_address
    ) RETURNING id INTO new_id;

    RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant EXECUTE on audit_append to all application users
GRANT EXECUTE ON FUNCTION schema_audit.audit_append TO user_auth, user_academic, user_finance, user_ai;

-- Grant SELECT on audit_log to user_audit for reporting
GRANT SELECT ON schema_audit.audit_log TO user_audit;
GRANT SELECT ON schema_audit.audit_log TO user_academic; -- For compliance bundle generation


-- =============================================
-- 12. SCHEMA_AI — Tables
-- =============================================
SET search_path TO schema_ai;

CREATE TABLE IF NOT EXISTS embeddings (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL,
    document_path VARCHAR(500) NOT NULL,
    chunk_index INTEGER NOT NULL,
    chunk_text TEXT NOT NULL,
    embedding vector(4096),                 -- Dimension depends on model (Llama3 ~4096)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (document_path, chunk_index)
);

CREATE TABLE IF NOT EXISTS chat_history (
    id SERIAL PRIMARY KEY,
    student_id UUID NOT NULL,
    course_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sources JSONB,
    confidence NUMERIC(3,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create HNSW index for fast vector similarity search
CREATE INDEX IF NOT EXISTS idx_embeddings_vector ON schema_ai.embeddings
    USING hnsw (embedding vector_cosine_ops);


-- =============================================
-- 13. SEED DATA — Programs (FRD Section 2.2)
-- =============================================
SET search_path TO schema_sis;

INSERT INTO programs (code, name, degree_type, total_credits_required, delivery_mode)
VALUES
    ('MIS', 'Bachelor of Arts (BA) in Management Information Systems', 'BA', 160, 'ONLINE'),
    ('ACFN', 'Bachelor of Arts (BA) in Accounting and Finance', 'BA', 160, 'ONLINE'),
    ('MGMT', 'Bachelor of Arts (BA) in Management', 'BA', 160, 'ONLINE')
ON CONFLICT (code) DO NOTHING;

-- =============================================
-- 14. SEED DATA — RBAC Roles (FRD Section 7-8)
-- =============================================
SET search_path TO schema_auth;

INSERT INTO roles (name, guard_name, description) VALUES
    ('student', 'api', 'Enrolled student with access to SIS, LMS, Library, and AI Assistant'),
    ('instructor', 'api', 'Course instructor with content management and grading permissions'),
    ('registrar', 'api', 'Registrar with KYC verification, grade locking, and transcript authority'),
    ('finance_officer', 'api', 'Finance staff with wallet and ledger management access'),
    ('compliance_officer', 'api', 'Compliance officer with ETA bundle generation and audit access'),
    ('hod', 'api', 'Head of Department with grade approval and instructor oversight'),
    ('dean', 'api', 'Academic Dean with program-level oversight and graduation clearance'),
    ('system_admin', 'api', 'System Administrator with infrastructure and configuration access')
ON CONFLICT (name) DO NOTHING;

INSERT INTO permissions (name, guard_name, description) VALUES
    ('kyc.review', 'api', 'Can review and approve/reject KYC applications'),
    ('grade.submit', 'api', 'Can submit grades for a section'),
    ('grade.approve', 'api', 'Can approve submitted grades (HoD level)'),
    ('grade.lock', 'api', 'Can lock grades permanently (Registrar level)'),
    ('enrollment.manage', 'api', 'Can manage course enrollments'),
    ('finance.view', 'api', 'Can view financial records'),
    ('finance.credit', 'api', 'Can credit student wallets'),
    ('finance.approve', 'api', 'Can approve credits > 5000 ETB (CFO four-eyes)'),
    ('content.manage', 'api', 'Can upload and manage course content'),
    ('content.publish', 'api', 'Can publish courses (requires activation gate)'),
    ('compliance.bundle', 'api', 'Can generate ETA compliance bundles'),
    ('audit.view', 'api', 'Can view audit logs'),
    ('system.configure', 'api', 'Can modify system configuration'),
    ('transcript.generate', 'api', 'Can generate official transcripts')
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- 15. RESET SEARCH PATH
-- =============================================
SET search_path TO public;

-- =============================================
-- INITIALIZATION COMPLETE
-- =============================================
-- To run: psql -U postgres -f init-db.sql
