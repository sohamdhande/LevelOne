-- Supabase Schema for Level One Demand Validation

-- 1. Submissions Table
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    year TEXT,
    early_access_interest BOOLEAN,
    price_vote_section TEXT CHECK (price_vote_section IN ('yes', 'maybe', 'no')),
    price_vote_form TEXT CHECK (price_vote_form IN ('yes', 'maybe', 'no')),
    biggest_struggle TEXT,
    ip_hash TEXT NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indices for submissions performance
CREATE INDEX idx_submissions_email ON submissions (email);
CREATE INDEX idx_submissions_created_at ON submissions (created_at);

-- 2. Events Table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    metadata JSONB,
    ip_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indices for events performance
CREATE INDEX idx_events_ip_hash ON events (ip_hash);
CREATE INDEX idx_events_event_type ON events (event_type);
CREATE INDEX idx_events_created_at ON events (created_at);
