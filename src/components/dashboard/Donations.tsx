'use client';

import React, { useEffect, useState } from 'react';
import { api } from './api';
import { motion } from 'framer-motion';

export default function Donations() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await api.getDonations();
        setDonations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const totalAmount = donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);

  return (
    <div className="donations-section">
      <div className="section-header">
        <h2>My Donations</h2>
        <div className="donation-summary">
          <div className="summary-card">
            <span className="label">Total Amount</span>
            <span className="value">₹{totalAmount.toLocaleString()}</span>
          </div>
          <div className="summary-card">
            <span className="label">Donations Made</span>
            <span className="value">{donations.length}</span>
          </div>
        </div>
      </div>

      <div className="panel-card table-container">
        {loading ? (
          <p>Loading history...</p>
        ) : (
          <table className="donations-table">
            <thead>
              <tr>
                <th>Organization</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.organization_name}</td>
                  <td>₹{parseFloat(donation.amount).toLocaleString()}</td>
                  <td>{new Date(donation.donation_date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${donation.payment_status}`}>
                      {donation.payment_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && donations.length === 0 && <p className="empty-state">You haven't made any donations yet.</p>}
      </div>
    </div>
  );
}
