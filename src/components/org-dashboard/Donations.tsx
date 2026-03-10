'use client';

import React from 'react';
import { Download, Filter, DollarSign, TrendingUp, Users, CircleCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Donations = () => {
  const summaryStats = [
    { label: 'Total Received', value: '$2,200', icon: DollarSign },
    { label: 'This Month', value: '$850', icon: TrendingUp },
    { label: 'Total Donors', value: '6', icon: Users },
    { label: 'Completed', value: '4', icon: CircleCheck },
  ];

  const donations = [
    { id: '#DON-1234', donor: 'Michael Scott', amount: '$500', campaign: 'Winter Relief', date: 'Mar 10, 2024', status: 'Completed' },
    { id: '#DON-1235', donor: 'Pam Beesly', amount: '$150', campaign: 'Education Fund', date: 'Mar 09, 2024', status: 'Completed' },
    { id: '#DON-1236', donor: 'Jim Halpert', amount: '$200', campaign: 'Winter Relief', date: 'Mar 08, 2024', status: 'Pending' },
    { id: '#DON-1237', donor: 'Dwight Schrute', amount: '$1,000', campaign: 'General Fund', date: 'Mar 08, 2024', status: 'Completed' },
    { id: '#DON-1238', donor: 'Angela Martin', amount: '$50', campaign: 'Elder Care', date: 'Mar 07, 2024', status: 'Completed' },
    { id: '#DON-1239', donor: 'Kevin Malone', amount: '$300', campaign: 'Food Relief', date: 'Mar 06, 2024', status: 'Failed' },
  ];

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {summaryStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{
              background: 'linear-gradient(135deg, #FDF8F5 0%, #FAEEE7 100%)',
              borderRadius: 'var(--org-radius-sm)',
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              border: '1px solid var(--org-border)',
            }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'rgba(197, 131, 113, 0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--org-primary)',
            }}>
              <stat.icon size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--org-text-faint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontSize: '1.3rem', fontWeight: 800,
                color: 'var(--org-text-primary)',
                letterSpacing: '-0.02em',
              }}>
                {stat.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="org-card"
      >
        <div className="org-card-title">
          <h2 style={{ fontFamily: 'var(--font-outfit), sans-serif', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Donations History
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" style={{ padding: '9px 18px', fontSize: '0.85rem', borderRadius: 12 }}>
              <Filter size={16} /> Filter
            </button>
            <button className="btn btn-primary" style={{ padding: '9px 18px', fontSize: '0.85rem', borderRadius: 12 }}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <div className="org-table-container">
          <table className="org-table">
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount</th>
                <th>Campaign</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((don, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${don.donor}`}
                        alt={don.donor}
                        style={{
                          width: 34, height: 34, borderRadius: 10,
                          border: '1px solid var(--org-border)',
                        }}
                      />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{don.donor}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, fontFamily: 'var(--font-outfit), sans-serif', color: 'var(--org-text-primary)' }}>
                    {don.amount}
                  </td>
                  <td style={{ color: 'var(--org-text-secondary)', fontSize: '0.88rem' }}>{don.campaign}</td>
                  <td style={{ color: 'var(--org-text-faint)', fontSize: '0.88rem' }}>{don.date}</td>
                  <td>
                    <span className={`status-badge ${don.status === 'Completed' ? 'status-success' :
                        don.status === 'Pending' ? 'status-pending' : 'status-error'
                      }`}>
                      {don.status}
                    </span>
                  </td>
                  <td>
                    <button style={{
                      background: 'none', border: 'none',
                      color: 'var(--org-primary)', cursor: 'pointer',
                      fontWeight: 600, fontSize: '0.85rem',
                    }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Donations;
