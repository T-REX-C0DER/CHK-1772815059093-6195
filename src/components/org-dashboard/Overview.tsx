'use client';

import React from 'react';
import { 
  HandHeart, 
  Megaphone, 
  Users, 
  Home, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';

const Overview = () => {
  const stats = [
    { label: 'Total Donations', value: '$45,280', icon: HandHeart, change: '+12.5%', isUp: true },
    { label: 'Active Campaigns', value: '12', icon: Megaphone, change: '0%', isUp: true },
    { label: 'Registered Volunteers', value: '148', icon: Users, change: '+5.2%', isUp: true },
    { label: 'Shelter Requests', value: '24', icon: Home, change: '-2.4%', isUp: false },
  ];

  return (
    <div className="org-overview">
      <div className="org-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="org-stat-card">
            <div className="org-stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="org-stat-info">
              <h4>{stat.label}</h4>
              <div className="org-stat-value">{stat.value}</div>
              <div className={`org-stat-change ${stat.isUp ? 'up' : 'down'}`}>
                {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change} <span>vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="org-content-grid">
        <div className="org-card">
          <div className="org-card-title">
            <h3>Monthly Donation Growth</h3>
            <div className="org-tag">Year 2024</div>
          </div>
          <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '20px 0' }}>
            {/* Simple CSS-based bar chart for visual effect without external lib yet */}
            {[40, 60, 45, 70, 85, 55, 90, 75, 65, 80, 95, 88].map((height, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: 'rgba(197, 131, 113, 0.2)', borderRadius: '4px', height: `${height}%`, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', backgroundColor: 'var(--org-primary)', borderRadius: '4px' }}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="org-card">
          <div className="org-card-title">
            <h3>Recent Activity</h3>
          </div>
          <div className="org-activity-feed">
            {[
              { text: 'New donation from John Doe', time: '2 mins ago', type: 'donation' },
              { text: 'Volunteer Sarah requested to join Campaign X', time: '1 hour ago', type: 'volunteer' },
              { text: 'Shelter request accepted for Location Y', time: '3 hours ago', type: 'shelter' },
              { text: 'New campaign "Winter Relief" launched', time: '5 hours ago', type: 'campaign' },
            ].map((activity, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: i === 3 ? 'none' : '1px solid #F0E6E1' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--org-primary)', marginTop: '6px' }}></div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{activity.text}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--org-text-secondary)' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
