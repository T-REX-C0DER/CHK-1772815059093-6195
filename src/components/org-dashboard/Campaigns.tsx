'use client';

import React from 'react';
import { Plus, Users, Target } from 'lucide-react';

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
    },
    {
      title: 'Education for Every Child',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
      raised: 8000,
      goal: 10000,
      donors: 92,
      progress: 80,
    },
    {
      title: 'Safe Shelter for Elders',
      category: 'Shelter',
      image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=800&auto=format&fit=crop',
      raised: 15400,
      goal: 25000,
      donors: 210,
      progress: 61.6,
    }
  ];

  return (
    <div className="org-campaigns">
      <div className="org-card-title" style={{ padding: '32px 40px 0' }}>
        <h2 style={{ fontSize: '1.75rem' }}>Campaign Management</h2>
        <button className="btn btn-primary">
          <Plus size={20} /> Create New Campaign
        </button>
      </div>

      <div className="campaign-grid">
        {campaigns.map((campaign, index) => (
          <div key={index} className="campaign-card">
            <img src={campaign.image} alt={campaign.title} className="campaign-image" />
            <div className="campaign-content">
              <span className="campaign-tag">{campaign.category}</span>
              <h3 className="campaign-title">{campaign.title}</h3>
              
              <div className="campaign-progress-container">
                <div className="campaign-progress-bar">
                  <div 
                    className="campaign-progress-fill" 
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
                <div className="campaign-stats">
                  <span><strong>${campaign.raised.toLocaleString()}</strong> raised</span>
                  <span>{campaign.progress}%</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F0E6E1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--org-text-secondary)', fontSize: '0.9rem' }}>
                  <Users size={16} /> {campaign.donors} Donors
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--org-text-secondary)', fontSize: '0.9rem' }}>
                  <Target size={16} /> Goal: ${campaign.goal.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
