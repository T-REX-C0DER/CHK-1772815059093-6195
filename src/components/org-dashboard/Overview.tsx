'use client';

import React from 'react';
import {
  HandHeart,
  Megaphone,
  Users,
  Receipt,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Plus,
  Eye,
  Edit,
  Share2,
  Zap,
  FileText,
  UserCheck,
  UserX,
  Inbox,
  BarChart3,
} from 'lucide-react';
import { motion } from 'framer-motion';

const Overview = () => {
  /* ─── Mock Data ─── */
  const stats = [
    { label: 'Total Donations', value: '₹12,500', icon: HandHeart, change: '+12%', isUp: true, desc: 'this month', color: '#C58371' },
    { label: 'Active Campaigns', value: '12', icon: Megaphone, change: '+3', isUp: true, desc: 'new this week', color: '#42A5F5' },
    { label: 'Volunteers', value: '148', icon: Users, change: '+5.2%', isUp: true, desc: 'vs last month', color: '#66BB6A' },
    { label: 'Donation Count', value: '89', icon: Receipt, change: '-2.4%', isUp: false, desc: 'vs last month', color: '#FFA726' },
  ];

  const recentDonations = [
    { donor: 'Michael Scott', amount: '₹500', campaign: 'Winter Relief', date: 'Mar 10, 2024', avatar: 'Michael Scott' },
    { donor: 'Pam Beesly', amount: '₹150', campaign: 'Education Fund', date: 'Mar 09, 2024', avatar: 'Pam Beesly' },
    { donor: 'Jim Halpert', amount: '₹200', campaign: 'Winter Relief', date: 'Mar 08, 2024', avatar: 'Jim Halpert' },
    { donor: 'Dwight Schrute', amount: '₹1,000', campaign: 'General Fund', date: 'Mar 08, 2024', avatar: 'Dwight Schrute' },
  ];

  const campaigns = [
    {
      title: 'Feed the Hungry: Winter Relief',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
      raised: 12500, goal: 20000, donors: 145, progress: 62.5, status: 'Active',
    },
    {
      title: 'Education for Every Child',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
      raised: 8000, goal: 10000, donors: 92, progress: 80, status: 'Active',
    },
  ];

  const volunteerRequests = [
    { name: 'Sarah Wilson', skills: 'Medical Aid, First Aid', message: 'I would love to help with medical camps.', avatar: 'Sarah Wilson' },
    { name: 'James Brown', skills: 'Logistics, Driving', message: 'Available for supply transportation.', avatar: 'James Brown' },
  ];

  const quickActions = [
    { label: 'Create Campaign', icon: Plus, color: '#C58371' },
    { label: 'Post Update', icon: FileText, color: '#42A5F5' },
    { label: 'View Donations', icon: BarChart3, color: '#66BB6A' },
    { label: 'Manage Volunteers', icon: Users, color: '#FFA726' },
  ];

  /* ─── Stat Icon Color Maps ─── */
  const statIconBg = [
    'linear-gradient(135deg, rgba(197,131,113,0.15) 0%, rgba(212,163,115,0.18) 100%)',
    'linear-gradient(135deg, rgba(66,165,245,0.15) 0%, rgba(100,181,246,0.18) 100%)',
    'linear-gradient(135deg, rgba(102,187,106,0.15) 0%, rgba(129,199,132,0.18) 100%)',
    'linear-gradient(135deg, rgba(255,167,38,0.15) 0%, rgba(255,183,77,0.18) 100%)',
  ];

  return (
    <div className="org-overview">
      {/* ─── Stats Grid ─── */}
      <div className="org-stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="org-stat-card"
          >
            <div className="org-stat-icon" style={{ background: statIconBg[index], color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="org-stat-info">
              <h4>{stat.label}</h4>
              <div className="org-stat-value">{stat.value}</div>
              <div className={`org-stat-change ${stat.isUp ? 'up' : 'down'}`}>
                {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change} <span>{stat.desc}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Two-Column Dashboard Layout ─── */}
      <div className="org-dashboard-columns">
        {/* ────── LEFT COLUMN (70%) ────── */}
        <div className="org-dashboard-left">
          {/* Recent Donations */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="org-card"
          >
            <div className="org-card-title">
              <h3>💰 Recent Donations</h3>
              <button className="org-view-all-btn">
                View All Donations <ArrowRight size={14} />
              </button>
            </div>

            {recentDonations.length > 0 ? (
              <div className="org-donation-list">
                {recentDonations.map((don, i) => (
                  <div key={i} className="org-donation-row">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${don.avatar}`}
                      alt={don.donor}
                      className="org-donation-avatar"
                    />
                    <div className="org-donation-info">
                      <span className="org-donation-name">{don.donor}</span>
                      <span className="org-donation-campaign">{don.campaign}</span>
                    </div>
                    <div className="org-donation-meta">
                      <span className="org-donation-amount">{don.amount}</span>
                      <span className="org-donation-date">{don.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="org-empty-state">
                <div className="org-empty-icon">
                  <Inbox size={40} />
                </div>
                <h4>No donations yet</h4>
                <p>Start campaigns to receive support from the community.</p>
                <button className="btn btn-primary" style={{ borderRadius: 14, fontSize: '0.88rem' }}>
                  <Plus size={16} /> Create Campaign
                </button>
              </div>
            )}
          </motion.div>

          {/* Your Campaigns */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="org-card"
          >
            <div className="org-card-title">
              <h3>📢 Your Campaigns</h3>
              <button className="btn btn-primary" style={{ borderRadius: 14, fontSize: '0.85rem', padding: '10px 18px' }}>
                <Plus size={16} /> Create Campaign
              </button>
            </div>

            {campaigns.length > 0 ? (
              <div className="org-campaigns-grid">
                {campaigns.map((campaign, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="org-overview-campaign-card"
                  >
                    <div className="org-overview-campaign-image-wrapper">
                      <img src={campaign.image} alt={campaign.title} className="org-overview-campaign-image" />
                      <span className={`org-overview-campaign-status ${campaign.status === 'Active' ? 'active' : 'completed'}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="org-overview-campaign-body">
                      <h4 className="org-overview-campaign-title">{campaign.title}</h4>
                      <div className="org-overview-campaign-progress-bar">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${campaign.progress}%` }}
                          transition={{ duration: 1.2, delay: 0.6 + index * 0.1 }}
                          className="org-overview-campaign-progress-fill"
                        />
                      </div>
                      <div className="org-overview-campaign-stats">
                        <span><strong>₹{campaign.raised.toLocaleString()}</strong> / ₹{campaign.goal.toLocaleString()}</span>
                        <span><Users size={14} /> {campaign.donors} donors</span>
                      </div>
                      <div className="org-overview-campaign-actions">
                        <button className="org-action-btn" title="View"><Eye size={15} /> View</button>
                        <button className="org-action-btn" title="Edit"><Edit size={15} /> Edit</button>
                        <button className="org-action-btn" title="Share"><Share2 size={15} /> Share</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="org-empty-state">
                <div className="org-empty-icon">
                  <Megaphone size={40} />
                </div>
                <h4>You haven&apos;t created a campaign yet</h4>
                <p>Launch your first campaign to start making an impact.</p>
                <button className="btn btn-primary" style={{ borderRadius: 14, fontSize: '0.88rem' }}>
                  <Plus size={16} /> Create Your First Campaign
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* ────── RIGHT COLUMN (30%) ────── */}
        <div className="org-dashboard-right">
          {/* Volunteer Requests */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="org-card"
          >
            <div className="org-card-title">
              <h3>🤝 Volunteer Requests</h3>
            </div>

            {volunteerRequests.length > 0 ? (
              <div className="org-volunteer-list">
                {volunteerRequests.map((vol, i) => (
                  <div key={i} className="org-volunteer-request-card">
                    <div className="org-volunteer-request-top">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${vol.avatar}`}
                        alt={vol.name}
                        className="org-volunteer-request-avatar"
                      />
                      <div>
                        <div className="org-volunteer-request-name">{vol.name}</div>
                        <div className="org-volunteer-request-skills">{vol.skills}</div>
                      </div>
                    </div>
                    <p className="org-volunteer-request-message">&ldquo;{vol.message}&rdquo;</p>
                    <div className="org-volunteer-request-actions">
                      <button className="org-accept-btn">
                        <UserCheck size={14} /> Accept
                      </button>
                      <button className="org-decline-btn">
                        <UserX size={14} /> Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="org-empty-state org-empty-state-sm">
                <div className="org-empty-icon">
                  <Users size={32} />
                </div>
                <h4>No volunteer requests yet</h4>
                <p>Requests will appear here when volunteers apply.</p>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="org-card"
          >
            <div className="org-card-title">
              <h3>⚡ Quick Actions</h3>
            </div>
            <div className="org-quick-actions-grid">
              {quickActions.map((action, i) => (
                <button key={i} className="org-quick-action-btn">
                  <div className="org-quick-action-icon" style={{ background: `${action.color}14`, color: action.color }}>
                    <action.icon size={20} />
                  </div>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
