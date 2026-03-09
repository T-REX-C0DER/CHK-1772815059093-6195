'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/org-dashboard/Sidebar';
import Header from '@/components/org-dashboard/Header';
import './org-dashboard.css';

export default function OrgDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeMenu, setActiveMenu] = useState('Overview');

  // We'll pass activeMenu and setActiveMenu to children using a context or props if needed,
  // but for now, the main page will handle the rendering based on this state.
  
  return (
    <div className="org-dashboard-container">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="org-main-wrapper">
        <Header />
        <main className="org-content">
          {/* Since Next.js layout doesn't easily allow passing state to children without Context, 
              we'll move the conditional rendering inside the page.tsx but keep the layout for structure.
              Alternatively, we can use a Context Provider here.
          */}
          {children}
        </main>
      </div>
    </div>
  );
}
