'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/org-dashboard/Sidebar';
import Header from '@/components/org-dashboard/Header';
import Overview from '@/components/org-dashboard/Overview';
import Campaigns from '@/components/org-dashboard/Campaigns';
import Donations from '@/components/org-dashboard/Donations';
import Volunteers from '@/components/org-dashboard/Volunteers';
import ShelterRequests from '@/components/org-dashboard/ShelterRequests';
import { motion, AnimatePresence } from 'framer-motion';
import './org-dashboard.css';

export default function OrganizationDashboard() {
  const [activeMenu, setActiveMenu] = useState('Overview');

  const renderContent = () => {
    switch (activeMenu) {
      case 'Overview':
        return <Overview />;
      case 'Campaigns':
        return <Campaigns />;
      case 'Donations':
        return <Donations />;
      case 'Volunteers':
        return <Volunteers />;
      case 'Shelter Requests':
        return <ShelterRequests />;
      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--org-text-secondary)' }}>
              {activeMenu} section is coming soon!
            </h2>
            <p>We are currently working on this feature to help your organization better manage its impact.</p>
          </div>
        );
    }
  };

  return (
    <div className="org-dashboard-container">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div className="org-main-wrapper">
        <Header />
        
        <main className="org-dashboard-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
