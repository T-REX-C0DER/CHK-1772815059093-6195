import React from 'react';
import { TrendingUp, Calendar, Users, Heart, DollarSign, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post, OrganizationInfo } from '@/types';

interface TrendingCampaign {
  id: string;
  name: string;
  percentage: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  time?: string;
}

interface Props {
  impact?: {
    livesImpacted: number;
    activeVolunteers: number;
    ongoingCampaigns: number;
    totalDonations: number;
  };
  trending?: TrendingCampaign[];
  suggestions?: OrganizationInfo[];
  events?: Event[];
}

export default function RightSidebar({ impact, trending, suggestions, events }: Props) {
  const renderCard = (title: string, children: React.ReactNode, icon?: string) => (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '20px',
        padding: '28px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid rgba(197, 131, 113, 0.08)',
        transition: 'all 0.3s ease'
      }}
      className="hover:shadow-md transition-shadow"
    >
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon} {title}
      </h3>
      {children}
    </div>
  );

  const renderStatWidget = (icon: React.ReactNode, value: string, label: string, color: string = '#D88A6F') => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: 'var(--color-background)',
        borderRadius: '16px',
        marginBottom: '12px',
        border: '1px solid rgba(197, 131, 113, 0.04)',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0px' }}>
          {value}
        </p>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
          {label}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      {/* impact summary */}
      {impact &&
        renderCard('Your Impact Network', (
          <div className="grid grid-cols-1 gap-4">
            {renderStatWidget(
              <Users size={24} strokeWidth={2.5} />,
              impact.livesImpacted.toLocaleString(),
              'Total Lives Impacted',
              '#22C55E'
            )}
            {renderStatWidget(
              <Heart size={24} strokeWidth={2.5} />,
              impact.activeVolunteers.toString(),
              'Volunteer Activities',
              '#EF4444'
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100/50">
                <TrendingUp size={20} className="text-primary mb-3" strokeWidth={2.5} />
                <p className="text-2xl font-black text-slate-800 tracking-tighter">{impact.ongoingCampaigns}</p>
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Ongoing</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100/50">
                <DollarSign size={20} className="text-primary mb-3" strokeWidth={2.5} />
                <p className="text-2xl font-black text-slate-800 tracking-tighter">₹{impact.totalDonations.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Donated</p>
              </div>
            </div>
          </div>
        ))}

      {/* trending campaigns */}
      {trending && trending.length > 0 &&
        renderCard('🔥 Trending Campaigns', (
          <div className="grid gap-5">
            {trending.map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group cursor-pointer"
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: '20px',
                  border: '1px solid rgba(197,131,113,0.06)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="flex gap-4 items-center mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/50">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-xl">
                      {c.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-slate-800 leading-tight mb-1 truncate group-hover:text-primary transition-colors">
                      {c.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {c.percentage.toFixed(0)}%
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">completed</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/80 rounded-full overflow-hidden border border-slate-100/50 relative">
                  <motion.div
                    style={{ background: 'var(--gradient-primary)', height: '100%' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ))}

      {/* suggestions */}
      {suggestions && suggestions.length > 0 &&
        renderCard('Suggested NGOs', (
          <div style={{ display: 'grid', gap: '12px' }}>
            {suggestions.map((org) => (
              <div
                key={org.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  backgroundColor: '#F8F6F4',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(197, 131, 113, 0.06)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-background)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <img
                    src={org.logo || '/placeholder-logo.png'}
                    alt={org.organizationName}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {org.organizationName}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 600 }}>
                      {org.organizationType || 'Organization'}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid var(--color-primary)',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    marginLeft: '8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(197, 131, 113, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = 'var(--color-primary)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Follow
                </motion.button>
              </div>
            ))}
          </div>
        ))}

      {/* upcoming events */}
      {events && events.length > 0 &&
        renderCard('📅 Upcoming Events', (
          <div style={{ display: 'grid', gap: '12px' }}>
            {events.map((ev, idx) => (
              <div
                key={ev.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  paddingBottom: idx < events.length - 1 ? '12px' : '0',
                  borderBottom: idx < events.length - 1 ? '1px solid #E5E7EB' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    backgroundColor: '#D88A6F',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>
                    {new Date(ev.date).getDate()}
                  </span>
                  <span style={{ fontSize: '10px', opacity: 0.8 }}>
                    {new Date(ev.date).toLocaleString('default', { month: 'short' })}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                    {ev.title}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                    📍 {ev.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
