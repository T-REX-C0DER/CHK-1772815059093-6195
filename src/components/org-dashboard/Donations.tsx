'use client';

import React from 'react';
import { Download, Filter, Search } from 'lucide-react';

const Donations = () => {
  const donations = [
    { id: '#DON-1234', donor: 'Michael Scott', amount: '$500', campaign: 'Winter Relief', date: 'Mar 10, 2024', status: 'Completed' },
    { id: '#DON-1235', donor: 'Pam Beesly', amount: '$150', campaign: 'Education Fund', date: 'Mar 09, 2024', status: 'Completed' },
    { id: '#DON-1236', donor: 'Jim Halpert', amount: '$200', campaign: 'Winter Relief', date: 'Mar 08, 2024', status: 'Pending' },
    { id: '#DON-1237', donor: 'Dwight Schrute', amount: '$1,000', campaign: 'General Fund', date: 'Mar 08, 2024', status: 'Completed' },
    { id: '#DON-1238', donor: 'Angela Martin', amount: '$50', campaign: 'Elder Care', date: 'Mar 07, 2024', status: 'Completed' },
    { id: '#DON-1239', donor: 'Kevin Malone', amount: '$300', campaign: 'Food Relief', date: 'Mar 06, 2024', status: 'Failed' },
  ];

  return (
    <div className="org-donations" style={{ padding: '32px 40px' }}>
      <div className="org-card">
        <div className="org-card-title">
          <h2 style={{ fontSize: '1.5rem' }}>Donations Management</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              <Filter size={18} /> Filter
            </button>
            <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              <Download size={18} /> Export CSV
            </button>
          </div>
        </div>

        <div className="org-table-container">
          <table className="org-table">
            <thead>
              <tr>
                <th>Donor Name</th>
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
                  <td style={{ fontWeight: 600 }}>{don.donor}</td>
                  <td>{don.amount}</td>
                  <td style={{ color: 'var(--org-text-secondary)' }}>{don.campaign}</td>
                  <td>{don.date}</td>
                  <td>
                    <span className={`status-badge ${
                      don.status === 'Completed' ? 'status-success' : 
                      don.status === 'Pending' ? 'status-pending' : 'status-error'
                    }`}>
                      {don.status}
                    </span>
                  </td>
                  <td>
                    <button style={{ background: 'none', border: 'none', color: 'var(--org-primary)', cursor: 'pointer', fontWeight: 600 }}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donations;
