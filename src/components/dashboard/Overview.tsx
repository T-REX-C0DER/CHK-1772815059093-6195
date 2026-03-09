'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Building, ShieldCheck } from 'lucide-react';

interface OverviewProps {
  stats: {
    total_donations: number;
    total_volunteer_hours: number;
    organizations_supported: number;
    impact_score: number;
  };
}

export default function Overview({ stats }: OverviewProps) {
  const statCards = [
    { label: "Total Donations", value: `₹${stats.total_donations}`, icon: Heart, color: "#FF6B6B" },
    { label: "Volunteer Hours", value: stats.total_volunteer_hours, icon: Users, color: "#4DABF7" },
    { label: "Orgs Supported", value: stats.organizations_supported, icon: Building, color: "#51CF66" },
    { label: "Impact Score", value: stats.impact_score, icon: ShieldCheck, color: "#FCC419" },
  ];

  return (
    <div className="overview-container">
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="panel-card stat-card"
          >
            <div className="stat-icon-wrapper" style={{ background: `${stat.color}15` }}>
              <stat.icon size={24} color={stat.color} />
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-charts">
         <div className="panel-card chart-card">
           <h2 className="panel-title">Donation Analytics</h2>
           <div className="chart-placeholder">
             <p>Monthly donations graph will appear here</p>
           </div>
         </div>
         <div className="panel-card chart-card">
           <h2 className="panel-title">Recent Activity</h2>
           <div className="activity-list">
             <p className="empty-state">No recent activity to show.</p>
           </div>
         </div>
      </div>
    </div>
  );
}
