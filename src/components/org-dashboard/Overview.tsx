'use client';

import React from 'react';
import {
  HandHeart,
  Megaphone,
  Users,
  Home,
  TrendingUp,
  TrendingDown,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

const Overview = () => {
  const stats = [
    { label: 'Total Donations', value: '$45,280', icon: HandHeart, change: '+12.5%', isUp: true },
    { label: 'Active Campaigns', value: '12', icon: Megaphone, change: '0%', isUp: true },
    { label: 'Registered Volunteers', value: '148', icon: Users, change: '+5.2%', isUp: true },
    { label: 'Shelter Requests', value: '24', icon: Home, change: '-2.4%', isUp: false },
  ];

  const activities = [
    { text: 'New donation from John Doe', time: '2 mins ago', type: 'donation' as const },
    { text: 'Volunteer Sarah requested to join Campaign X', time: '1 hour ago', type: 'volunteer' as const },
    { text: 'Shelter request accepted for Location Y', time: '3 hours ago', type: 'shelter' as const },
    { text: 'New campaign "Winter Relief" launched', time: '5 hours ago', type: 'campaign' as const },
    { text: 'Monthly report generated', time: '1 day ago', type: 'campaign' as const },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const barHeights = [40, 60, 45, 70, 85, 55, 90, 75, 65, 80, 95, 88];

  return (
    <div>
      {/* Stats Grid */}
      <div className="org-stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="org-stat-card"
          >
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
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="org-content-grid">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="org-card"
        >
          <div className="org-card-title">
            <h3>Monthly Donation Growth</h3>
            <div className="org-tag">
              <Zap size={12} /> Year 2024
            </div>
          </div>
          <div style={{ height: '280px', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingTop: '20px' }}>
            {barHeights.map((height, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: '100%',
                    background: i === barHeights.length - 1 || i === barHeights.length - 2
                      ? 'var(--gradient-primary)'
                      : 'rgba(197, 131, 113, 0.15)',
                    borderRadius: '8px 8px 4px 4px',
                    position: 'relative',
                    minHeight: '4px',
                    cursor: 'default',
                    transition: 'background 0.3s ease',
                  }}
                  whileHover={{
                    scaleY: 1.05,
                  }}
                />
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: 'var(--org-text-faint)',
                  letterSpacing: '0.02em',
                }}>
                  {months[i]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="org-card"
        >
          <div className="org-card-title">
            <h3>Recent Activity</h3>
            <div className="org-tag">Live</div>
          </div>
          <div>
            {activities.map((activity, i) => (
              <div key={i} className="org-activity-item">
                <div className={`org-activity-dot ${activity.type}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.4, color: 'var(--org-text-primary)' }}>
                    {activity.text}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--org-text-faint)', marginTop: 4, fontWeight: 500 }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
