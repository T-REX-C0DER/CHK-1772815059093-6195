import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function VolunteerForm({ organizationId }: { organizationId: string }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [skills, setSkills] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hours, setHours] = useState('');
  const [motivation, setMotivation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Please login to apply for volunteering.');
    setLoading(true);

    try {
      const res = await fetch(`/api/organization/${organizationId}/volunteer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id,
          skills,
          availability: { startDate, endDate, hours },
          message: motivation
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Failed to submit application');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '40px 20px' }}
      >
        <CheckCircle2 size={64} style={{ color: '#10B981', margin: '0 auto 16px' }} />
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', marginBottom: 8 }}>Application Submitted!</h3>
        <p style={{ color: 'var(--text-muted)' }}>The organization will review your application and get back to you shortly.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="btn btn-secondary"
          style={{ marginTop: 20 }}
        >
          Start Another Application
        </button>
      </motion.div>
    );
  }

  const commonInputStyles = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--radius-btn)',
    border: '1px solid var(--border)',
    background: 'var(--bg-main)',
    fontSize: 'var(--fs-body)',
    fontFamily: 'inherit',
    marginBottom: 16,
    transition: 'border-color 0.2s',
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
      <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Full Name</label>
      <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} style={commonInputStyles} required />
      
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={commonInputStyles} required />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Phone Number</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={commonInputStyles} required />
        </div>
      </div>

      <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Skills</label>
      <select value={skills} onChange={e => setSkills(e.target.value)} style={commonInputStyles} required>
        <option value="" disabled>Select primary skill</option>
        <option value="Teaching">Teaching</option>
        <option value="Medical Support">Medical Support</option>
        <option value="Event Management">Event Management</option>
        <option value="Social Work">Social Work</option>
        <option value="Technical Support">Technical Support</option>
        <option value="Other">Other</option>
      </select>

      <div style={{ padding: '16px', background: 'rgba(59,130,246,0.05)', borderRadius: 'var(--radius-card)', border: '1px solid rgba(59,130,246,0.1)', marginBottom: 16 }}>
        <h4 style={{ fontSize: 'var(--fs-small)', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 12px' }}>Availability</h4>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 'var(--fs-micro)', color: 'var(--text-faint)', marginBottom: 4 }}>Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{...commonInputStyles, marginBottom: 0}} required />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 'var(--fs-micro)', color: 'var(--text-faint)', marginBottom: 4 }}>End Date</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{...commonInputStyles, marginBottom: 0}} required />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
           <label style={{ display: 'block', fontSize: 'var(--fs-micro)', color: 'var(--text-faint)', marginBottom: 4 }}>Hours per week</label>
           <input type="number" value={hours} onChange={e => setHours(e.target.value)} style={{...commonInputStyles, marginBottom: 0}} placeholder="e.g. 10" required />
        </div>
      </div>

      <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Motivation Message</label>
      <textarea 
        value={motivation} 
        onChange={e => setMotivation(e.target.value)} 
        style={{ ...commonInputStyles, minHeight: 100, resize: 'vertical' }} 
        placeholder="Why do you want to volunteer with us?" 
        required
      />

      <button 
        type="submit" 
        className="btn" 
        style={{ 
          width: '100%', 
          marginTop: 8, 
          background: '#3B82F6', 
          color: 'white',
          border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 
        }}
        disabled={loading}
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Users size={18} />}
        Apply for Volunteering
      </button>
    </form>
  );
}
