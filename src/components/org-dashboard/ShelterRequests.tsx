'use client';

import React from 'react';
import { MapPin, User, Clock, CheckCircle, XCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const ShelterRequests = () => {
  const requests = [
    {
      id: 'REQ-001',
      person: 'Elderly Man (approx. 70s)',
      location: 'Park Avenue, near Central Park',
      reporter: 'John Smith',
      time: '2 hours ago',
      status: 'Pending',
      urgency: 'High',
      details: 'Found sleeping on a bench, looks dehydrated and needs medical attention.',
      image: 'https://images.unsplash.com/photo-1542156822-6924d1a719bf?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 'REQ-002',
      person: 'Homeless Mother with Child',
      location: 'Queensboro Bridge Underpass',
      reporter: 'Emily Watson',
      time: '5 hours ago',
      status: 'Reviewing',
      urgency: 'Critical',
      details: 'Seeking shelter for the night, child is approx 5 years old.',
      image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '1.4rem', fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '6px',
          }}>Shelter Requests</h2>
          <div className="org-tag" style={{ background: 'rgba(229, 115, 115, 0.08)', color: '#E57373' }}>
            <AlertTriangle size={12} /> {requests.length} Urgent Requests
          </div>
        </div>
      </div>

      {/* Request Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {requests.map((req, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            className="org-card"
            style={{
              display: 'grid', gridTemplateColumns: '280px 1fr',
              gap: '0', padding: '0', overflow: 'hidden',
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={req.image}
                alt="Request"
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '280px' }}
              />
              {/* Urgency Badge */}
              <div style={{
                position: 'absolute', top: 16, left: 16,
              }}>
                <span style={{
                  padding: '5px 12px', borderRadius: '9999px',
                  fontSize: '0.72rem', fontWeight: 700,
                  background: req.urgency === 'Critical' ? 'rgba(229, 115, 115, 0.9)' : 'rgba(255, 152, 0, 0.9)',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  backdropFilter: 'blur(4px)',
                }}>
                  {req.urgency}
                </span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Title & Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div>
                  <h3 style={{
                    margin: '0 0 8px 0',
                    fontFamily: 'var(--font-outfit), sans-serif',
                    fontSize: '1.15rem', fontWeight: 700,
                    letterSpacing: '-0.01em',
                  }}>
                    {req.person}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--org-text-faint)', fontSize: '0.85rem', fontWeight: 500, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={14} color="var(--org-primary)" /> {req.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14} color="var(--org-primary)" /> {req.time}
                    </span>
                  </div>
                </div>
                <span className={`status-badge ${req.status === 'Pending' ? 'status-pending' : 'status-success'}`}>
                  {req.status}
                </span>
              </div>

              {/* Details Quote */}
              <div style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, #FDF8F5 0%, #FAEEE7 100%)',
                borderRadius: '14px',
                borderLeft: '4px solid var(--org-primary)',
              }}>
                <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.6', fontStyle: 'italic', color: 'var(--org-text-secondary)' }}>
                  &ldquo;{req.details}&rdquo;
                </p>
              </div>

              {/* Info Row */}
              <div style={{ display: 'flex', gap: '24px', fontSize: '0.88rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} color="var(--org-primary)" />
                  <span><strong style={{ fontWeight: 600 }}>Reporter:</strong> <span style={{ color: 'var(--org-text-secondary)' }}>{req.reporter}</span></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ExternalLink size={16} color="var(--org-primary)" />
                  <a href="#" style={{ color: 'var(--org-primary)', fontWeight: 600, textDecoration: 'none' }}>View on Map</a>
                </div>
              </div>

              {/* Timeline / Status Tracker */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0',
                padding: '12px 0',
              }}>
                {['Reported', 'Reviewing', 'Dispatched', 'Resolved'].map((step, si) => {
                  const isCompleted = si === 0;
                  const isCurrent = (req.status === 'Pending' && si === 0) || (req.status === 'Reviewing' && si <= 1);
                  return (
                    <React.Fragment key={si}>
                      <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                        flex: si < 3 ? '0 0 auto' : '0 0 auto',
                      }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: '50%',
                          background: isCurrent ? 'var(--gradient-primary)' : 'rgba(197, 131, 113, 0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: isCurrent ? 'white' : 'var(--org-text-faint)',
                          fontSize: '0.65rem', fontWeight: 700,
                          boxShadow: isCurrent ? '0 2px 8px rgba(197, 131, 113, 0.3)' : 'none',
                        }}>
                          {si + 1}
                        </div>
                        <span style={{
                          fontSize: '0.65rem', fontWeight: 600,
                          color: isCurrent ? 'var(--org-primary)' : 'var(--org-text-faint)',
                          whiteSpace: 'nowrap',
                        }}>
                          {step}
                        </span>
                      </div>
                      {si < 3 && (
                        <div style={{
                          flex: 1, height: 2, minWidth: 24,
                          background: isCurrent && si < 1 ? 'var(--org-primary)' : 'rgba(197, 131, 113, 0.12)',
                          margin: '0 4px',
                          marginBottom: '20px',
                          borderRadius: 2,
                        }} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <button className="btn btn-primary" style={{ padding: '11px 22px', borderRadius: 12, fontSize: '0.85rem' }}>
                  <CheckCircle size={16} /> Accept
                </button>
                <button className="btn btn-secondary" style={{ padding: '11px 22px', borderRadius: 12, fontSize: '0.85rem' }}>
                  <XCircle size={16} /> Reject
                </button>
                <button style={{
                  padding: '11px 22px', borderRadius: 12, fontSize: '0.85rem',
                  background: 'transparent',
                  border: '1.5px solid var(--org-border)',
                  color: 'var(--org-text-secondary)',
                  cursor: 'pointer', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'var(--org-transition)',
                }}>
                  Contact Reporter
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShelterRequests;
