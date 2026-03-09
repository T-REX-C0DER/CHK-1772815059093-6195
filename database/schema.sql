-- HelpSphere Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'warrior', -- 'warrior' or 'organization'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phone VARCHAR(20),
    location VARCHAR(255),
    profile_picture TEXT,
    total_donations DECIMAL(12, 2) DEFAULT 0.00,
    total_volunteer_hours DECIMAL(10, 2) DEFAULT 0.00,
    badges TEXT[] DEFAULT '{}',
    bio TEXT,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Organizations Table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    total_donations DECIMAL(12, 2) DEFAULT 0.00,
    volunteers_count INTEGER DEFAULT 0,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Donations Table
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    amount DECIMAL(12, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    donation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Volunteer Table
CREATE TABLE volunteer_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    hours DECIMAL(10, 2) NOT NULL,
    role VARCHAR(255),
    impact_summary TEXT,
    activity_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shelter Requests Table
CREATE TABLE shelter_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reported_by UUID REFERENCES users(id),
    location VARCHAR(255) NOT NULL,
    photo_url TEXT,
    description TEXT,
    urgency_level VARCHAR(50), -- 'low', 'medium', 'high', 'critical'
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'accepted', 'completed'
    assigned_ngo UUID REFERENCES organizations(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    type VARCHAR(50), -- 'donation', 'volunteer', 'campaign', 'shelter', 'badge'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed some initial organizations
INSERT INTO organizations (name, category, description, location, verified, logo_url) VALUES
('Little Hearts Orphanage', 'Child Orphanages', 'Providing care and education for children in need.', 'Mumbai, India', true, 'https://api.dicebear.com/7.x/avataaars/svg?seed=heart'),
('Golden Age Home', 'Old Age Homes', 'A peaceful sanctuary for our elders.', 'Bangalore, India', true, 'https://api.dicebear.com/7.x/avataaars/svg?seed=age'),
('City Shelter', 'Homeless Shelters', 'Providing nightly beds and hot meals.', 'Delhi, India', true, 'https://api.dicebear.com/7.x/avataaars/svg?seed=shelter'),
('Green Earth NGO', 'NGOs', 'Environmental conservation and awareness.', 'Pune, India', false, 'https://api.dicebear.com/7.x/avataaars/svg?seed=earth'),
('Paws & Claws', 'Animal Shelters', 'Rescuing and rehabilitating stray animals.', 'Hyderabad, India', true, 'https://api.dicebear.com/7.x/avataaars/svg?seed=paws');
