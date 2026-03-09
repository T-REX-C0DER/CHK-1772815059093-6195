'use client';

import React from 'react';
import { MapPin, Phone, User, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';

const ShelterRequests = () => {
  const requests = [
    {
      id: 'REQ-001',
      person: 'Elderly Man (approx. 70s)',
      location: 'Park Avenue, near Central Park',
      reporter: 'John Smith',
      time: '2 hours ago',
      status: 'Pending',
      details: 'Found sleeping on a bench, looks dehydrated and needs medical attention.',
      image: 'https://images.unsplash.com/photo-1542156822-6924d1a719bf?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'REQ-002',
      person: 'Homeless Mother with Child',
      location: 'Queensboro Bridge Underpass',
      reporter: 'Emily Watson',
      time: '5 hours ago',
      status: 'Reviewing',
      details: 'Seeking shelter for the night, child is approx 5 years old.',
      image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <div className="org-shelter-requests" style={{ padding: '32px 40px' }}>
      <div className="org-card-title" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.75rem' }}>Shelter Requests</h2>
        <div className="org-tag" style={{ background: 'rgba(229, 115, 115, 0.1)', color: '#E57373' }}>
          {requests.length} Urgent Requests
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {requests.map((req, i) => (
          <div key={i} className="org-card" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px', padding: '0', overflow: 'hidden' }}>
            <img src={req.image} alt="Request" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>{req.person}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--org-text-secondary)', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={16} /> {req.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={16} /> {req.time}
                    </span>
                  </div>
                </div>
                <span className={`status-badge ${req.status === 'Pending' ? 'status-pending' : 'status-success'}`}>
                  {req.status}
                </span>
              </div>

              <div style={{ padding: '16px', background: '#FDF8F5', borderRadius: '12px', borderLeft: '4px solid var(--org-primary)' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "{req.details}"
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} color="var(--org-primary)" /> 
                  <span><strong>Reporter:</strong> {req.reporter}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ExternalLink size={16} color="var(--org-primary)" /> 
                  <a href="#" style={{ color: 'var(--org-primary)', fontWeight: 600 }}>View on Map</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <button className="btn btn-primary" style={{ padding: '12px 24px' }}>
                  <CheckCircle size={18} /> Accept Request
                </button>
                <button className="btn btn-secondary" style={{ padding: '12px 24px' }}>
                  <XCircle size={18} /> Reject
                </button>
                <button className="btn btn-outline" style={{ padding: '12px 24px', border: '1px solid #D1D5DB' }}>
                   Contact Reporter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShelterRequests;
