'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/org-dashboard/Sidebar';
import Header from '@/components/org-dashboard/Header';
import { DashboardProvider } from './DashboardContext';
import './org-dashboard.css';

export default function OrgDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <DashboardProvider>
      <div className="org-dashboard-container">
        {/* Mobile Sidebar Backdrop */}
        <div
          className={`org-sidebar-backdrop ${isSidebarOpen ? 'open' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main */}
        <div className="org-main-wrapper">
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="org-content">
            {children}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
