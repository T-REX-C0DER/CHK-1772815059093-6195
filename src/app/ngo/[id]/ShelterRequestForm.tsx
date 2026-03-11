import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ShelterRequestForm({ organizationId }: { organizationId: string }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [personName, setPersonName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [condition, setCondition] = useState('Homeless');
  const [location, setLocation] = useState('');
  const [landmark, setLandmark] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Please login to submit a shelter request.');
    setLoading(true);

    try {
      const res = await fetch(`/api/organization/${organizationId}/shelter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id,
          personName,
          age,
          gender,
          condition,
          location: `${location}, ${landmark}`,
          description,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Failed to submit shelter request');
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
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', marginBottom: 8 }}>Shelter Request Submitted!</h3>
        <p style={{ color: 'var(--text-muted)' }}>The organization will review and respond. Thank you for helping someone in need.</p>
        <button 
          onClick={() => {
            setSuccess(false);
            setPersonName('');
            setAge('');
            setLocation('');
            setLandmark('');
            setDescription('');
          }}
          className="btn btn-secondary"
          style={{ marginTop: 20 }}
        >
          Submit Another Request
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
      {/* Target Person Details */}
      <h4 style={{ fontSize: 'var(--fs-small)', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 16px', paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>Person Needing Help</h4>
      
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Name (If known)</label>
          <input type="text" value={personName} onChange={e => setPersonName(e.target.value)} style={commonInputStyles} placeholder="e.g. Unknown" required />
        </div>
        <div style={{ width: 100 }}>
          <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Est. Age</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} style={commonInputStyles} placeholder="e.g. 45" required />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value)} style={commonInputStyles} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
           <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Condition</label>
           <select value={condition} onChange={e => setCondition(e.target.value)} style={commonInputStyles} required>
             <option value="Homeless">Homeless</option>
             <option value="Elderly Abandoned">Elderly Abandoned</option>
             <option value="Orphan Child">Orphan Child</option>
             <option value="Disabled Person">Disabled Person</option>
             <option value="Beggar">Beggar</option>
           </select>
        </div>
      </div>

      {/* Location Details */}
      <h4 style={{ fontSize: 'var(--fs-small)', fontWeight: 700, color: 'var(--text-main)', margin: '20px 0 16px', paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>Location Info</h4>
      
      <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Address found at</label>
      <div style={{ position: 'relative' }}>
         <input type="text" value={location} onChange={e => setLocation(e.target.value)} style={{ ...commonInputStyles, paddingRight: 40 }} placeholder="Street name / Area" required />
         <MapPin size={18} style={{ color: 'var(--text-faint)', position: 'absolute', right: 14, top: 14 }} />
      </div>

      <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Nearest Landmark</label>
      <input type="text" value={landmark} onChange={e => setLandmark(e.target.value)} style={commonInputStyles} placeholder="e.g. Next to Central Station" />

      {/* Situation Details */}
      <h4 style={{ fontSize: 'var(--fs-small)', fontWeight: 700, color: 'var(--text-main)', margin: '20px 0 16px', paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>Situation Details</h4>

      <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Description</label>
      <textarea 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
        style={{ ...commonInputStyles, minHeight: 100, resize: 'vertical' }} 
        placeholder="Briefly describe the person's condition and why they need help." 
        required
      />

      <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Upload Photo (Optional but helpful)</label>
      <div style={{ 
        border: '2px dashed var(--border)', 
        borderRadius: 'var(--radius-btn)', 
        padding: 24, 
        textAlign: 'center',
        background: 'var(--bg-main)',
        marginBottom: 20,
        cursor: 'pointer'
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)', margin: 0 }}>Click to browse or drag image here</p>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ 
          width: '100%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 
        }}
        disabled={loading}
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
        Submit Shelter Request
      </button>
    </form>
  );
}
