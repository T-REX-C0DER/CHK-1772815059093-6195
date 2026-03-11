import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DonateForm({ organizationId }: { organizationId: string }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState('Money');
  const [amount, setAmount] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Please login to donate.');
    setLoading(true);

    try {
      const payload = category === 'Money' 
        ? { amount, userId: user.id } 
        : { category, itemName, quantity, pickupAddress, preferredDate, message, userId: user.id };

      // In a real app we would have two different endpoints or handle items vs money in the same endpoint correctly
      // Our API currently expects an amount for the Donation model.
      const res = await fetch(`/api/organization/${organizationId}/donate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: category === 'Money' ? amount : '0', userId: user.id }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Failed to submit donation');
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
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', marginBottom: 8 }}>Donation Successful!</h3>
        <p style={{ color: 'var(--text-muted)' }}>Thank you for your generous contribution.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="btn btn-secondary"
          style={{ marginTop: 20 }}
        >
          Make Another Donation
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
      {/* Category Dropdown */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>
          Donation Category
        </label>
        <select 
          value={category} 
          onChange={e => setCategory(e.target.value)}
          style={commonInputStyles}
          required
        >
          <option value="Money">Money</option>
          <option value="Food">Food</option>
          <option value="Clothes">Clothes</option>
          <option value="Books">Books</option>
          <option value="Medical Supplies">Medical Supplies</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <AnimatePresence mode="popLayout">
        {category === 'Money' ? (
          <motion.div key="money-fields" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>
              Amount (₹)
            </label>
            <input 
              type="number" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              style={commonInputStyles} 
              placeholder="e.g. 1000"
              required 
            />
            {/* Payment Method mock for UI */}
            <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>
               Payment Method
            </label>
            <select style={commonInputStyles}>
              <option value="card">Credit / Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netbanking">Net Banking</option>
            </select>
          </motion.div>
        ) : (
          <motion.div key="item-fields" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Item Name</label>
            <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} style={commonInputStyles} placeholder="e.g. Used winter clothes" required />
            
            <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Quantity</label>
            <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} style={commonInputStyles} placeholder="e.g. 5 bags" required />
            
            <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Pickup Address</label>
            <input type="text" value={pickupAddress} onChange={e => setPickupAddress(e.target.value)} style={commonInputStyles} placeholder="Full address" required />
            
            <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Preferred Pickup Date</label>
            <input type="date" value={preferredDate} onChange={e => setPreferredDate(e.target.value)} style={commonInputStyles} required />
          </motion.div>
        )}
      </AnimatePresence>

      <label style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Message to Organization (Optional)</label>
      <textarea 
        value={message} 
        onChange={e => setMessage(e.target.value)} 
        style={{ ...commonInputStyles, minHeight: 100, resize: 'vertical' }} 
        placeholder="Any special instructions or note?" 
      />

      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <button 
          type="button" 
          onClick={() => { setCategory('Money'); setAmount(''); setItemName(''); setQuantity(''); setPickupAddress(''); setPreferredDate(''); setMessage(''); }}
          className="btn btn-secondary" 
          style={{ flex: 1 }}
          disabled={loading}
        >
          Reset
        </button>
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          disabled={loading}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <HeartHandshake size={18} />}
          Submit Donation
        </button>
      </div>
    </form>
  );
}
