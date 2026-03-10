'use client';

import React from 'react';
import { Star, MapPin, Check, Mail, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Volunteers = () => {
  const volunteers = [
    { name: 'Sarah Wilson', hours: 45, rating: 4.9, location: 'New York, NY', status: 'Active', badge: 'Expert' },
    { name: 'James Brown', hours: 12, rating: 4.5, location: 'Brooklyn, NY', status: 'Pending', badge: 'Novice' },
    { name: 'Emily Davis', hours: 88, rating: 5.0, location: 'Queens, NY', status: 'Active', badge: 'Elite' },
    { name: 'Robert Wilson', hours: 5, rating: 4.2, location: 'Bronx, NY', status: 'Under Review', badge: 'Newbie' },
  ];

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '1.4rem', fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '6px',
          }}>Volunteer Management</h2>
          <div className="org-tag">Total: {volunteers.length} Volunteers</div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 16px', borderRadius: 12,
            background: 'var(--org-surface)',
            border: '1px solid var(--org-border)',
          }}>
            <Search size={16} color="var(--org-text-faint)" />
            <input
              placeholder="Search volunteers..."
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: '0.88rem', fontWeight: 500, color: 'var(--org-text-primary)',
                width: '160px',
              }}
            />
          </div>
          <button className="btn btn-secondary" style={{ padding: '9px 18px', fontSize: '0.85rem', borderRadius: 12 }}>
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {volunteers.map((vol, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="org-card"
            style={{
              padding: '24px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              cursor: 'default',
            }}
          >
            {/* Top Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${vol.name}`}
                  alt={vol.name}
                  style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    border: '2px solid var(--org-accent)',
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <h4 style={{
                    margin: 0, fontSize: '0.95rem', fontWeight: 700,
                    fontFamily: 'var(--font-outfit), sans-serif',
                    color: 'var(--org-text-primary)',
                  }}>{vol.name}</h4>
                  <div style={{
                    fontSize: '0.78rem', color: 'var(--org-text-faint)',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    marginTop: '3px', fontWeight: 500,
                  }}>
                    <MapPin size={12} /> {vol.location}
                  </div>
                </div>
              </div>
              <span className={`status-badge ${vol.status === 'Active' ? 'status-success' : 'status-pending'}`}>
                {vol.status}
              </span>
            </div>

            {/* Stats Row */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '14px 16px',
              background: 'linear-gradient(135deg, #FDF8F5 0%, #FAEEE7 100%)',
              borderRadius: '14px',
              border: '1px solid var(--org-border)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--org-text-faint)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>Hours</div>
                <div style={{ fontWeight: 800, color: 'var(--org-primary)', fontFamily: 'var(--font-outfit), sans-serif', fontSize: '1.1rem', marginTop: '2px' }}>{vol.hours}h</div>
              </div>
              <div style={{ width: '1px', background: 'var(--org-border)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--org-text-faint)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>Rating</div>
                <div style={{ fontWeight: 800, color: 'var(--org-primary)', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'center', fontFamily: 'var(--font-outfit), sans-serif', fontSize: '1.1rem', marginTop: '2px' }}>
                  <Star size={14} fill="var(--org-primary)" /> {vol.rating}
                </div>
              </div>
              <div style={{ width: '1px', background: 'var(--org-border)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--org-text-faint)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>Badge</div>
                <div style={{ fontWeight: 700, color: 'var(--org-primary)', fontSize: '0.88rem', marginTop: '4px' }}>{vol.badge}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button className="btn btn-primary" style={{ flex: 1, padding: '11px', fontSize: '0.82rem', borderRadius: 12 }}>
                <Check size={16} /> Approve
              </button>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '11px', fontSize: '0.82rem', borderRadius: 12 }}>
                <Mail size={16} /> Contact
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Volunteers;
