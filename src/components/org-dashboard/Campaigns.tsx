'use client';

import React from 'react';
import { Plus, Users, Target, MoreHorizontal, Eye, Pause, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

const Campaigns = () => {
  const campaigns = [
    {
      title: 'Feed the Hungry: Winter Relief',
      category: 'Food Security',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
      raised: 12500,
      goal: 20000,
      donors: 145,
      progress: 62.5,
      status: 'Active',
    },
    {
      title: 'Education for Every Child',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
      raised: 8000,
      goal: 10000,
      donors: 92,
      progress: 80,
      status: 'Active',
    },
    {
      title: 'Safe Shelter for Elders',
      category: 'Shelter',
      image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=800&auto=format&fit=crop',
      raised: 15400,
      goal: 25000,
      donors: 210,
      progress: 61.6,
      status: 'Active',
    }
  ];

  return (
    <div>
      <div className="org-card-title" style={{ padding: '28px 32px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-outfit), sans-serif', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Campaign Management
        </h2>
        <button className="btn btn-primary" style={{ borderRadius: '14px', fontSize: '0.88rem' }}>
          <Plus size={18} /> Create Campaign
        </button>
      </div>

      <div className="campaign-grid">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="campaign-card"
          >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={campaign.image} alt={campaign.title} className="campaign-image" />
              <div style={{
                position: 'absolute',
                top: 12,
                right: 12,
                display: 'flex',
                gap: 6,
              }}>
                <span className={`status-badge ${campaign.status === 'Active' ? 'status-success' : 'status-pending'}`}>
                  {campaign.status}
                </span>
              </div>
            </div>

            <div className="campaign-content">
              <span className="campaign-tag">{campaign.category}</span>
              <h3 className="campaign-title">{campaign.title}</h3>

              <div className="campaign-progress-container">
                <div className="campaign-progress-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${campaign.progress}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + index * 0.1 }}
                    className="campaign-progress-fill"
                  />
                </div>
                <div className="campaign-stats">
                  <span><strong>${campaign.raised.toLocaleString()}</strong> raised</span>
                  <span style={{ fontWeight: 600, color: 'var(--org-primary)' }}>{campaign.progress}%</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid var(--org-border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--org-text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                  <Users size={15} /> {campaign.donors} Donors
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    title="View"
                    style={{
                      width: 34, height: 34, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(197, 131, 113, 0.06)',
                      border: 'none', cursor: 'pointer', color: 'var(--org-text-secondary)',
                      transition: 'var(--org-transition)',
                    }}
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    title="Edit"
                    style={{
                      width: 34, height: 34, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(197, 131, 113, 0.06)',
                      border: 'none', cursor: 'pointer', color: 'var(--org-text-secondary)',
                      transition: 'var(--org-transition)',
                    }}
                  >
                    <Edit size={15} />
                  </button>
                  <button
                    title="More"
                    style={{
                      width: 34, height: 34, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(197, 131, 113, 0.06)',
                      border: 'none', cursor: 'pointer', color: 'var(--org-text-secondary)',
                      transition: 'var(--org-transition)',
                    }}
                  >
                    <MoreHorizontal size={15} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
