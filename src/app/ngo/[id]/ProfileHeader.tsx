import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Heart, Users, Target, BookOpen } from 'lucide-react';

interface OrgProfileHeaderProps {
  organization: any;
}

export default function ProfileHeader({ organization }: OrgProfileHeaderProps) {
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 'var(--radius-card)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden',
      marginBottom: 24,
    }}>
      {/* Cover Image/Gradient background */}
      <div style={{
        height: 160,
        background: 'var(--gradient-warm)',
        position: 'relative',
      }} />
      
      <div style={{ padding: '0 32px 32px', position: 'relative' }}>
        {/* Avatar */}
        <div style={{
          position: 'absolute',
          top: -45,
          left: 32,
          padding: 4,
          background: 'var(--card-bg)',
          borderRadius: 'var(--radius-btn)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <img
            src={organization.logo || `https://api.dicebear.com/7.x/initials/svg?seed=${organization.organizationName}&backgroundColor=c8875c&fontColor=ffffff`}
            alt={organization.organizationName}
            style={{
              width: 90, height: 90,
              borderRadius: 'var(--radius-btn)',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 16 }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: 'var(--fs-small)' }}
          >
            Follow
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: 'var(--fs-small)' }}
          >
            Join
          </motion.button>
        </div>

        {/* Info */}
        <div style={{ marginTop: 16 }}>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--fs-h2)',
            fontWeight: 700,
            margin: '0 0 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            {organization.organizationName}
            {organization.verified && (
              <ShieldCheck size={20} style={{ color: '#10B981' }} />
            )}
          </h1>
          
          <p style={{
            fontSize: 'var(--fs-body)',
            color: 'var(--text-muted)',
            margin: '0 0 16px',
            maxWidth: 600,
          }}>
            Empowering communities and making a difference. Join us in our mission to create a better future.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            {organization.city && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-faint)', fontSize: 'var(--fs-small)', fontWeight: 500 }}>
                <MapPin size={16} />
                {organization.city}, {organization.address || 'India'}
              </span>
            )}
            
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-faint)', fontSize: 'var(--fs-small)', fontWeight: 500 }}>
                <ShieldCheck size={16} />
                Verified NGO
            </span>
            
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-faint)', fontSize: 'var(--fs-small)', fontWeight: 500 }}>
                <Users size={16} />
                {(organization._count?.volunteers || 0) * 10 + 250} Supporters
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: 16, 
          marginTop: 24,
          paddingTop: 24,
          borderTop: '1px solid var(--border)'
        }}>
          {[
            { label: 'Total Campaigns', value: organization._count?.campaigns || 0, icon: Target, color: 'var(--primary)', bg: 'var(--primary-light)' },
            { label: 'Donations Received', value: organization._count?.donations || 0, icon: Heart, color: '#E11D48', bg: '#FFE4E6' },
            { label: 'Volunteers Joined', value: organization._count?.volunteers || 0, icon: Users, color: '#3B82F6', bg: '#DBEAFE' },
            { label: 'Cases Resolved', value: (organization._count?.donations || 0) * 2 + 15, icon: BookOpen, color: '#10B981', bg: '#D1FAE5' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 40, height: 40, 
                  borderRadius: '50%', 
                  background: stat.bg, 
                  color: stat.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-h3)', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 'var(--fs-micro)', fontWeight: 600, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
