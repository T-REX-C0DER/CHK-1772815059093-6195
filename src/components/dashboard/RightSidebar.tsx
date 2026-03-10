import React from 'react';
import { TrendingUp, Users, Heart, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  impact?: {
    livesImpacted: number;
    activeVolunteers: number;
    ongoingCampaigns: number;
    totalDonations: number;
  };
  trending?: any[];
  suggestions?: any[];
  events?: any[];
}

export default function RightSidebar({ impact, trending, suggestions, events }: Props) {
  return (
    <div className="space-y-5 pb-20">
      {/* Impact Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="panel-card"
      >
        <h3 className="panel-title">
          <span className="flex items-center gap-2">
            <TrendingUp size={18} style={{ color: 'var(--primary-brand)' }} />
            Your Impact
          </span>
        </h3>
        <div className="impact-stats">
          {[
            { value: '24.5k', label: 'Lives Impacted', highlight: true },
            { value: '1,240', label: 'Volunteers', highlight: false },
            { value: '85', label: 'Campaigns', highlight: false },
            { value: '₹12.5L', label: 'Total Raised', highlight: true },
          ].map((stat, idx) => (
            <div key={idx} className="stat-item">
              <span
                className="stat-value"
                style={{ color: stat.highlight ? 'var(--primary-brand)' : 'var(--text-main)' }}
              >
                {stat.value}
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trending Campaigns */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="panel-card"
      >
        <div className="panel-title">
          <span>Trending Now</span>
          <ArrowRight
            size={16}
            className="cursor-pointer transition-colors"
            style={{ color: 'var(--text-faint)' }}
          />
        </div>
        <div className="space-y-5">
          {[
            { name: 'Clean Water for Rural Villages', percent: 85, org: 'Water.org' },
            { name: 'Winter Blankets Distribution', percent: 40, org: 'Red Cross' },
            { name: 'School Meals Program', percent: 92, org: 'Save the Children' },
          ].map((campaign, idx) => (
            <div key={idx} className="space-y-2.5 cursor-pointer group">
              <p className="text-sm font-semibold truncate leading-tight group-hover:text-primary transition-colors" style={{ color: 'var(--text-main)' }}>
                {campaign.name}
              </p>
              <div className="progress-bar" style={{ height: 6 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${campaign.percent}%` }}
                  transition={{ duration: 1.5, delay: 0.3 + idx * 0.15 }}
                  className="progress-fill"
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span style={{ color: 'var(--primary-brand)' }}>{campaign.percent}% funded</span>
                <span style={{ color: 'var(--text-faint)' }}>{campaign.org}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Suggested NGOs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="panel-card"
      >
        <h3 className="panel-title">NGOs to Follow</h3>
        <div className="space-y-4">
          {[
            { name: 'World Wildlife Fund', cat: 'Wildlife', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=WWF' },
            { name: 'Doctors Without Borders', cat: 'Health', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=DWB' },
            { name: 'Habitat for Humanity', cat: 'Housing', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=HFH' },
          ].map((ngo, idx) => (
            <div key={idx} className="flex items-center gap-3 group cursor-pointer p-1">
              <img
                src={ngo.logo}
                alt={ngo.name}
                className="w-10 h-10 rounded-xl object-cover transition-all"
                style={{ background: 'var(--gradient-warm-subtle)', border: '1px solid var(--border-soft)' }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold truncate leading-none mb-1 group-hover:text-primary transition-colors" style={{ color: 'var(--text-main)' }}>
                  {ngo.name}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>{ngo.cat}</p>
                </div>
              </div>
              <button
                className="px-3.5 py-2 text-[10px] font-bold rounded-lg transition-all"
                style={{
                  background: 'transparent',
                  border: '1.5px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="panel-card"
      >
        <h3 className="panel-title">
          <span className="flex items-center gap-2">
            <Calendar size={16} style={{ color: 'var(--primary-brand)' }} />
            Active Events
          </span>
        </h3>
        <div className="space-y-3">
          {[
            { date: 'OCT 14', title: 'Beach Cleanup Drive', loc: 'Santa Monica' },
            { date: 'OCT 18', title: 'Food Bank Sorting', loc: 'Downtown Center' },
          ].map((event, idx) => (
            <div
              key={idx}
              className="flex gap-3.5 p-3 rounded-2xl border group cursor-pointer transition-all"
              style={{
                background: 'var(--gradient-warm-subtle)',
                borderColor: 'var(--border-soft)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0 transition-all border"
                style={{
                  background: 'white',
                  borderColor: 'var(--border-soft)',
                }}
              >
                <span className="text-[9px] font-bold leading-none mb-0.5" style={{ color: 'var(--text-faint)' }}>
                  {event.date.split(' ')[0]}
                </span>
                <span className="text-[14px] font-extrabold leading-none tracking-tighter" style={{ color: 'var(--text-main)' }}>
                  {event.date.split(' ')[1]}
                </span>
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <p className="text-[13px] font-semibold truncate mb-0.5 group-hover:text-primary transition-colors" style={{ color: 'var(--text-main)' }}>
                  {event.title}
                </p>
                <p className="text-[10px] font-medium flex items-center gap-1 truncate" style={{ color: 'var(--text-faint)' }}>
                  <MapPin size={10} /> {event.loc}
                </p>
              </div>
              <button
                className="ml-auto text-[10px] font-bold px-3 py-1.5 rounded-lg self-center transition-all"
                style={{
                  background: 'rgba(197, 131, 113, 0.08)',
                  color: 'var(--primary-brand)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
