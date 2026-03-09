'use client';

import React from 'react';
import Sidebar from '@/components/org-dashboard/Sidebar';
import Header from '@/components/org-dashboard/Header';
import { DashboardProvider } from './DashboardContext';
import './org-dashboard.css';

export default function OrgDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="org-dashboard-container">
        <Sidebar />
        <div className="org-main-wrapper">
          <Header />
          <main className="org-content">
            {children}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
