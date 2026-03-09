'use client';

import React, { createContext, useContext, useState } from 'react';

interface DashboardContextType {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState('Overview');

  return (
    <DashboardContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
