import React from 'react';
import { PhoneCall, Mail, Navigation, AlertCircle } from 'lucide-react';

interface EmergencyContactProps {
  organization: any;
}

export default function EmergencyContact({ organization }: EmergencyContactProps) {
  return (
    <div style={{
      background: 'rgba(239, 68, 68, 0.05)',
      borderRadius: 'var(--radius-card)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      padding: 24,
      marginBottom: 32,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ 
          width: 48, height: 48, 
          borderRadius: '50%', 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: '#EF4444',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'var(--fs-h3)', 
            fontWeight: 700, 
            color: 'var(--text-main)', 
            margin: '0 0 4px' 
          }}>
            Emergency Contact
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)', margin: 0 }}>
            Reach out immediately for urgent cases or immediate shelter assistance.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--card-bg)', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border)' }}>
          <PhoneCall size={20} style={{ color: 'var(--primary)' }} />
          <div>
            <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase' }}>Phone Line 24/7</div>
            <div style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-main)' }}>{organization.phone || '+91 8000 000 000'}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--card-bg)', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border)' }}>
          <Mail size={20} style={{ color: '#3B82F6' }} />
          <div>
            <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase' }}>Email Support</div>
            <div style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-main)' }}>{organization.email || 'support@ngo.org'}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--card-bg)', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border)' }}>
          <Navigation size={20} style={{ color: '#10B981' }} />
          <div>
            <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase' }}>Headquarters</div>
            <div style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-main)' }}>{organization.city || 'India'}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button style={{
          flex: 1,
          padding: '12px 24px',
          background: '#EF4444',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-btn)',
          fontWeight: 700,
          fontSize: 'var(--fs-body)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)'
        }}>
          <PhoneCall size={18} /> Call Now
        </button>
        <button style={{
          flex: 1,
          padding: '12px 24px',
          background: 'var(--card-bg)',
          color: '#EF4444',
          border: '2px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-btn)',
          fontWeight: 700,
          fontSize: 'var(--fs-body)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          Report Emergency Case
        </button>
      </div>
    </div>
  );
}
