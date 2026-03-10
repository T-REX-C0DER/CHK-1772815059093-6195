'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

// dashboard components
import Feed from '@/components/dashboard/Feed';
import RightSidebar from '@/components/dashboard/RightSidebar';
import DashboardGrid from '@/components/dashboard/DashboardGrid';

export default function UserDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard/user');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      <DashboardGrid
        sidebar={null}
        feed={<Feed />}
        rightPanel={
          <RightSidebar
            impact={dashboardData?.stats}
            trending={dashboardData?.trending}
            suggestions={dashboardData?.suggestions}
            events={dashboardData?.events}
          />
        }
      />

      {/* Floating Donate Button for Mobile */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-8 bg-primary text-white font-black px-8 py-4 rounded-full shadow-2xl z-50 md:hidden"
      >
        💝 Donate Now
      </motion.button>
    </div>
  );
}
