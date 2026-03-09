'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  ChevronDown,
  MessageSquare,
  Plus
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Overview from '@/components/dashboard/Overview';
import Categories from '@/components/dashboard/Categories';
import Donations from '@/components/dashboard/Donations';
import Volunteer from '@/components/dashboard/Volunteer';
import ShelterRequests from '@/components/dashboard/ShelterRequests';
import Notifications from '@/components/dashboard/Notifications';
import { api } from '@/components/dashboard/api';
import './dashboard.css';

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Home');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const fetchUserData = async () => {
      try {
        const data = await api.getProfile();
        setUserData(data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        // Fallback or redirect if no auth
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    if (isLoading) return <div className="loading-state">Loading your impact...</div>;
    
    switch (activeMenu) {
      case 'Home':
        return <Overview stats={{
          total_donations: userData?.total_donations || 0,
          total_volunteer_hours: userData?.total_volunteer_hours || 0,
          organizations_supported: 0, // In real app, calculate from donations/volunteer unique ids
          impact_score: (userData?.total_volunteer_hours * 10) + (userData?.total_donations / 100) || 0
        }} />;
      case 'Categories':
        return <Categories selectedCategory={selectedCategory} />;
      case 'Donations':
        return <Donations />;
      case 'Volunteer':
        return <Volunteer />;
      case 'Shelter Requests':
        return <ShelterRequests />;
      case 'Notifications':
        return <Notifications />;
      default:
        return <div className="placeholder-section">Section {activeMenu} in progress...</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
        setSelectedCategory={setSelectedCategory} 
      />

      <div className="main-wrapper">
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="search-bar">
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search organizations, campaigns, causes..." 
              className="search-input"
            />
          </div>

          <div className="header-actions">
            <button className="icon-btn">
              <MessageSquare size={20} />
            </button>
            <button className="icon-btn" style={{ position: 'relative' }}>
              <Bell size={20} />
              {userData?.unread_notifications > 0 && (
                <span className="notification-dot"></span>
              )}
            </button>
            <div className="user-profile">
              <img 
                src={userData?.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.name || 'User'}`} 
                alt="Profile" 
                className="author-avatar"
              />
              <div className="user-info-header">
                <span className="user-name">{userData?.name || 'Guest'}</span>
                <ChevronDown size={14} color="var(--text-muted)" />
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu + selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <button className="floating-cta">
        <Plus size={24} />
      </button>
    </div>
  );
}
