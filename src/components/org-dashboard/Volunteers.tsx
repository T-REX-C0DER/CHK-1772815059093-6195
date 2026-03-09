'use client';

import React from 'react';
import { Star, MapPin, Check, X, Mail } from 'lucide-react';

const Volunteers = () => {
  const volunteers = [
    { name: 'Sarah Wilson', hours: 45, rating: 4.9, location: 'New York, NY', status: 'Active', badge: 'Expert' },
    { name: 'James Brown', hours: 12, rating: 4.5, location: 'Brooklyn, NY', status: 'Pending', badge: 'Novice' },
    { name: 'Emily Davis', hours: 88, rating: 5.0, location: 'Queens, NY', status: 'Active', badge: 'Elite' },
    { name: 'Robert Wilson', hours: 5, rating: 4.2, location: 'Bronx, NY', status: 'Under Review', badge: 'Newbie' },
  ];

  return (
    <div className="org-volunteers" style={{ padding: '32px 40px' }}>
      <div className="org-card-title" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Volunteer Management</h2>
        <div className="org-tag">Total: {volunteers.length} Active Volunteers</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {volunteers.map((vol, i) => (
          <div key={i} className="org-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${vol.name}`} 
                  alt={vol.name} 
                  style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid var(--org-primary-light)' }}
                />
                <div>
                  <h4 style={{ margin: 0 }}>{vol.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--org-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {vol.location}
                  </div>
                </div>
              </div>
              <span className={`status-badge ${vol.status === 'Active' ? 'status-success' : 'status-pending'}`} style={{ fontSize: '0.7rem' }}>
                {vol.status}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#FDF8F5', borderRadius: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--org-text-secondary)', textTransform: 'uppercase' }}>Hours</div>
                <div style={{ fontWeight: 700, color: 'var(--org-primary)' }}>{vol.hours}h</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--org-text-secondary)', textTransform: 'uppercase' }}>Rating</div>
                <div style={{ fontWeight: 700, color: 'var(--org-primary)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <Star size={14} fill="var(--org-primary)" /> {vol.rating}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--org-text-secondary)', textTransform: 'uppercase' }}>Badge</div>
                <div style={{ fontWeight: 700, color: 'var(--org-primary)' }}>{vol.badge}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button className="btn btn-primary" style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}>
                <Check size={16} /> Approve
              </button>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}>
                <Mail size={16} /> Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Volunteers;
