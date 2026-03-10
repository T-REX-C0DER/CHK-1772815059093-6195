'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// dashboard components
import Feed from '@/components/dashboard/Feed';
import RightSidebar from '@/components/dashboard/RightSidebar';
import DashboardGrid from '@/components/dashboard/DashboardGrid';

interface DashboardData {
  profile: {
    name: string;
    email: string;
    phone?: string;
    city?: string;
    createdAt: string;
  };
  stats: {
    totalDonations: number;
    donationCount: number;
    volunteerCount: number;
    shelterRequestsCount: number;
  };
  recentDonations: Array<{
    id: string;
    amount: number;
    createdAt: string;
    organization: { organizationName: string };
  }>;
  volunteerActivities: Array<{
    id: string;
    status: string;
    appliedDate: string;
    organization: { organizationName: string };
  }>;
  activeCampaigns: Array<{
    id: string;
    title: string;
    description: string;
    targetAmount: number;
    collectedAmount: number;
    image?: string;
    organization: { organizationName: string; logo?: string };
  }>;
  trending: Array<{ id: string; name: string; percentage: number }>;
  suggestions: Array<{ id: string; organizationName: string; logo?: string; organizationType?: string }>;
  events: Array<{ id: string; title: string; date: string; location: string; time?: string }>;
}

export default function UserDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-600">Failed to load dashboard data</p>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Donations',
      value: `₹${dashboardData.stats.totalDonations.toLocaleString()}`,
      icon: 'HandHeart',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      name: 'Volunteer Activities',
      value: dashboardData.stats.volunteerCount.toString(),
      icon: 'Users',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      name: 'Impact Score',
      value: (dashboardData.stats.donationCount * 10 + dashboardData.stats.volunteerCount * 5).toString(),
      icon: 'Trophy',
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
      {/* Premium Welcome Section */}
      <motion.div
        style={{
          background: 'linear-gradient(135deg, #C58371 0%, #D4A373 50%, #A66E58 100%)',
          padding: '56px 40px',
          marginBottom: '40px',
          boxShadow: '0 20px 50px rgba(197, 131, 113, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          margin: '24px 32px 40px 32px'
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }}></div>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '40%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          filter: 'blur(20px)',
          rotate: '45deg'
        }}></div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '600px' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 style={{ fontSize: '42px', fontWeight: 900, color: '#FFFFFF', marginBottom: '12px', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                Welcome back, {dashboardData.profile.name.split(' ')[0]}! ✨
              </h1>
              <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, lineHeight: 1.6 }}>
                Your contributions are creating ripples of hope. Together, we've impacted <span style={{ fontWeight: 800, color: '#FFFFFF' }}>{dashboardData.stats.donationCount + dashboardData.stats.volunteerCount}</span> lives this month.
              </p>
            </motion.div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 15px 35px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FFFFFF',
              color: 'var(--color-primary)',
              padding: '18px 36px',
              borderRadius: '100px',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            💖 Start New Campaign
            <ArrowRight size={20} strokeWidth={3} />
          </motion.button>
        </div>
      </motion.div>

      {/* Main Dashboard Grid */}
      <div style={{ padding: '0 32px' }}>
        <DashboardGrid
          sidebar={<div />}
          feed={<Feed />}
          rightPanel={
            <RightSidebar
              impact={{
                livesImpacted: dashboardData.stats.donationCount + dashboardData.stats.volunteerCount,
                activeVolunteers: dashboardData.stats.volunteerCount,
                ongoingCampaigns: dashboardData.activeCampaigns.length,
                totalDonations: dashboardData.stats.totalDonations,
              }}
              trending={dashboardData.trending}
              suggestions={dashboardData.suggestions.map(o => ({
                id: o.id,
                organizationName: o.organizationName,
                logo: o.logo,
                organizationType: o.organizationType
              }))}
              events={dashboardData.events}
            />
          }
        />
      </div>

      {/* Floating Donate Button */}
      <motion.button
        whileHover={{ scale: 1.08, translateY: -5 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '32px',
          background: 'var(--gradient-primary)',
          color: '#FFFFFF',
          padding: '18px 32px',
          borderRadius: '9999px',
          boxShadow: 'var(--shadow-lg)',
          border: 'none',
          fontWeight: 700,
          fontSize: '16px',
          cursor: 'pointer',
          display: 'none',
          zIndex: 50,
        }}
        className="md:block"
      >
        💝 Donate Now
      </motion.button>
    </div>
  );
}
