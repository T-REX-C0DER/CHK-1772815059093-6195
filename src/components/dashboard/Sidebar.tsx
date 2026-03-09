'use client';

import React, { useState } from 'react';
import { 
  Home, 
  Grid, 
  Heart, 
  Users, 
  Flag, 
  MessageSquare, 
  Bell, 
  User, 
  Settings,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'Child Orphanages',
  'Old Age Homes',
  'Homeless Shelters',
  'NGOs',
  'Animal Shelters',
  'Education NGOs',
  'Disaster Relief Organizations'
];

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  setSelectedCategory: (category: string) => void;
}

export default function Sidebar({ activeMenu, setActiveMenu, setSelectedCategory }: SidebarProps) {
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);

  const menuItems = [
    { name: 'Dashboard Overview', icon: Home, id: 'Home' },
    { name: 'Categories', icon: Grid, id: 'Categories', hasDropdown: true },
    { name: 'Donations', icon: Heart, id: 'Donations' },
    { name: 'Volunteer', icon: Users, id: 'Volunteer' },
    { name: 'Campaigns', icon: Flag, id: 'Campaigns' },
    { name: 'Shelter Requests', icon: MessageSquare, id: 'Shelter Requests' },
    { name: 'Notifications', icon: Bell, id: 'Notifications' },
    { name: 'Profile Settings', icon: User, id: 'Profile' },
    { name: 'Back to Home', icon: Home, id: 'BackHome' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-box" style={{ background: 'var(--primary-brand)', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={18} color="white" fill="white" />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--neutral-dark)' }}>HelpSphere</span>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            onMouseEnter={() => item.hasDropdown && setIsCategoriesHovered(true)}
            onMouseLeave={() => item.hasDropdown && setIsCategoriesHovered(false)}
            className="nav-item-container"
          >
            <motion.div
              whileHover={{ x: 4 }}
              onClick={() => {
                if (item.id === 'BackHome') {
                  window.location.href = '/';
                  return;
                }
                setActiveMenu(item.id);
                if (item.id !== 'Categories') setSelectedCategory('');
              }}
              className={`nav-item ${activeMenu === item.id || (item.id === 'Categories' && isCategoriesHovered) ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
              {item.hasDropdown && (isCategoriesHovered ? <ChevronDown size={14} style={{ marginLeft: 'auto' }} /> : <ChevronRight size={14} style={{ marginLeft: 'auto' }} />)}
            </motion.div>

            {item.hasDropdown && (
              <AnimatePresence>
                {isCategoriesHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="dropdown-menu"
                  >
                    {CATEGORIES.map((cat) => (
                      <div 
                        key={cat} 
                        className="dropdown-item"
                        onClick={() => {
                          setActiveMenu('Categories');
                          setSelectedCategory(cat);
                        }}
                      >
                        {cat}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
