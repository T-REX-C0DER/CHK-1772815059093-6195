import React from 'react';
import { TrendingUp, Users, Heart, ArrowRight, Calendar, MapPin, Flame, ArrowUpRight } from 'lucide-react';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 80 }}>
      {/* ── Impact Summary — Glass Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="panel-card glass"
      >
        <h3 className="panel-title" style={{ fontSize: 'var(--fs-card-title)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={18} style={{ color: 'var(--primary)' }} />
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
            <motion.div
              key={idx}
              className="stat-item"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="stat-value"
                style={{
                  color: stat.highlight ? 'var(--primary)' : 'var(--text-main)',
                  fontSize: 'var(--fs-num)',
                }}
              >
                {stat.value}
              </span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Trending Campaigns — Glass Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="panel-card glass"
      >
        <div className="panel-title" style={{ fontSize: 'var(--fs-card-title)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Flame size={16} style={{ color: 'var(--primary)' }} />
            Trending Now
          </span>
          <ArrowRight
            size={16}
            className="cursor-pointer"
            style={{ color: 'var(--text-faint)', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { name: 'Clean Water for Rural Villages', percent: 85, org: 'Water.org' },
            { name: 'Winter Blankets Distribution', percent: 40, org: 'Red Cross' },
            { name: 'School Meals Program', percent: 92, org: 'Save the Children' },
          ].map((campaign, idx) => (
            <div
              key={idx}
              className="group cursor-pointer"
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              <p
                style={{
                  fontSize: 'var(--fs-small)',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  lineHeight: 1.3,
                  margin: 0,
                  transition: 'color 0.15s',
                }}
                className="group-hover:text-primary"
              >
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--fs-tag)',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {campaign.percent}% funded
                </span>
                <span
                  style={{
                    fontSize: 'var(--fs-tag)',
                    fontWeight: 600,
                    color: 'var(--text-faint)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {campaign.org}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Suggested NGOs ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="panel-card glass"
      >
        <h3 className="panel-title" style={{ fontSize: 'var(--fs-card-title)' }}>
          <span>NGOs to Follow</span>
          <ArrowRight
            size={16}
            className="cursor-pointer"
            style={{ color: 'var(--text-faint)', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
          />
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { name: 'World Wildlife Fund', cat: 'Wildlife', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=WWF' },
            { name: 'Doctors Without Borders', cat: 'Health', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=DWB' },
            { name: 'Habitat for Humanity', cat: 'Housing', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=HFH' },
          ].map((ngo, idx) => (
            <div
              key={idx}
              className="group"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                padding: '6px 4px',
                borderRadius: 'var(--radius-btn)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-light)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <img
                src={ngo.logo}
                alt={ngo.name}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-btn)',
                  objectFit: 'cover',
                  background: 'var(--gradient-warm-subtle)',
                  border: '1px solid var(--border)',
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 'var(--fs-small)',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    margin: 0,
                    lineHeight: 1.2,
                    transition: 'color 0.15s',
                  }}
                  className="group-hover:text-primary"
                >
                  {ngo.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: 'var(--fs-tag)',
                      fontWeight: 600,
                      color: 'var(--text-faint)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {ngo.cat}
                  </span>
                </div>
              </div>
              <button
                style={{
                  padding: '6px 14px',
                  fontSize: 'var(--fs-tag)',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-pill)',
                  background: 'transparent',
                  border: '1.5px solid var(--border)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.background = 'var(--primary-light)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Active Events ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="panel-card glass"
      >
        <h3 className="panel-title" style={{ fontSize: 'var(--fs-card-title)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calendar size={16} style={{ color: 'var(--primary)' }} />
            Active Events
          </span>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { date: 'OCT 14', title: 'Beach Cleanup Drive', loc: 'Santa Monica' },
            { date: 'OCT 18', title: 'Food Bank Sorting', loc: 'Downtown Center' },
          ].map((event, idx) => (
            <div
              key={idx}
              className="group"
              style={{
                display: 'flex',
                gap: 14,
                padding: 12,
                borderRadius: 'var(--radius-card)',
                background: 'var(--gradient-warm-subtle)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                alignItems: 'center',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* Date badge */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-btn)',
                  background: 'white',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 'var(--fs-tag)', fontWeight: 700, color: 'var(--text-faint)', lineHeight: 1, marginBottom: 1 }}>
                  {event.date.split(' ')[0]}
                </span>
                <span style={{ fontSize: 'var(--fs-body)', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  {event.date.split(' ')[1]}
                </span>
              </div>

              {/* Event info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 'var(--fs-small)',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    margin: 0,
                    lineHeight: 1.2,
                    transition: 'color 0.15s',
                  }}
                  className="group-hover:text-primary"
                >
                  {event.title}
                </p>
                <p
                  style={{
                    fontSize: 'var(--fs-tag)',
                    fontWeight: 500,
                    color: 'var(--text-faint)',
                    margin: '4px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <MapPin size={10} /> {event.loc}
                </p>
              </div>

              {/* Join CTA */}
              <button
                style={{
                  fontSize: 'var(--fs-tag)',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--gradient-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--primary-light)';
                  e.currentTarget.style.color = 'var(--primary)';
                }}
              >
                Join <ArrowUpRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
