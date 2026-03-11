'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Megaphone, HeartHandshake, Users, Home, Loader2, AlertCircle
} from 'lucide-react';

import ProfileHeader from './ProfileHeader';
import EmergencyContact from './EmergencyContact';
import PostCard from '@/components/dashboard/PostCard';
import DonateForm from './DonateForm';
import VolunteerForm from './VolunteerForm';
import ShelterRequestForm from './ShelterRequestForm';

const tabs = [
  { id: 'posts', label: 'Posts / Updates', icon: Megaphone },
  { id: 'donate', label: 'Donate', icon: HeartHandshake },
  { id: 'volunteer', label: 'Volunteer', icon: Users },
  { id: 'shelter', label: 'Shelter Request', icon: Home },
];

export default function OrganizationProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('posts');
  const [organization, setOrganization] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [orgRes, postsRes] = await Promise.all([
          fetch(`/api/organization/${id}`),
          fetch(`/api/organization/${id}/posts`)
        ]);

        if (!orgRes.ok) throw new Error('Organization not found');

        const orgData = await orgRes.json();
        const postsData = await postsRes.json();

        setOrganization(orgData.organization);
        setPosts(postsData.posts || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Loader2 size={40} className="animate-spin text-primary" style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  if (error || !organization) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <AlertCircle size={48} style={{ color: 'var(--text-faint)', margin: '0 auto 16px' }} />
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h2)' }}>Organization Not Found</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', padding: '32px 16px 80px' }}>
      <ProfileHeader organization={organization} />
      
      <EmergencyContact organization={organization} />

      {/* ── Tabs Navigation ── */}
      <div style={{ 
        display: 'flex', 
        gap: 8, 
        padding: '6px', 
        background: 'var(--card-bg)', 
        borderRadius: 'var(--radius-card)', 
        border: '1px solid var(--border)',
        marginBottom: 24,
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                minWidth: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 16px',
                border: 'none',
                background: isActive ? 'var(--primary-light)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                borderRadius: 'var(--radius-btn)',
                fontWeight: isActive ? 700 : 600,
                fontSize: 'var(--fs-small)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tabs Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'posts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {posts.length > 0 ? (
                posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: 40, background: 'var(--card-bg)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}>
                   <p style={{ color: 'var(--text-muted)', margin: 0 }}>No posts to show yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'donate' && (
            <div style={{ background: 'var(--card-bg)', padding: 32, borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', marginBottom: 20 }}>Support Our Mission</h3>
              <DonateForm organizationId={id as string} />
            </div>
          )}

          {activeTab === 'volunteer' && (
             <div style={{ background: 'var(--card-bg)', padding: 32, borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', marginBottom: 20 }}>Join Our Team</h3>
              <VolunteerForm organizationId={id as string} />
            </div>
          )}

          {activeTab === 'shelter' && (
             <div style={{ background: 'var(--card-bg)', padding: 32, borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', marginBottom: 20 }}>Report a Person in Need</h3>
              <ShelterRequestForm organizationId={id as string} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
