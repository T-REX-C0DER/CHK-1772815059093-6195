'use client';

import React from 'react';
import {
  LayoutDashboard,
  UserCircle,
  Megaphone,
  HandHeart,
  Users,
  Home,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  X,
  Building2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useDashboard } from '@/app/organization/dashboard/DashboardContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const mainMenuItems = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Campaigns', icon: Megaphone },
  { name: 'Donations', icon: HandHeart },
  { name: 'Volunteers', icon: Users },
  { name: 'Shelter Requests', icon: Home },
];

const accountMenuItems = [
  { name: 'Reports', icon: BarChart3 },
  { name: 'Messages', icon: MessageSquare },
];

const orgMenuItems = [
  { name: 'Profile', icon: UserCircle },
  { name: 'Settings', icon: Settings },
];

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const { activeMenu, setActiveMenu } = useDashboard();

  const handleClick = (name: string) => {
    setActiveMenu(name);
    onClose?.();
  };

  return (
    <aside className={`org-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="org-mobile-toggle"
        style={{ position: 'absolute', top: 16, right: 12 }}
      >
        <X size={20} />
      </button>

      {/* Logo */}
      <div className="org-logo-container">
        <Link href="/" className="org-logo-link">
          <Image
            src="/logo.png"
            alt="HelpSphere Logo"
            width={34}
            height={34}
          />
          <span className="org-logo-text">HelpSphere</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="org-nav-menu">
        <div className="org-nav-group-label">Menu</div>
        {mainMenuItems.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.3 }}
          >
            <div
              className={`org-nav-item ${activeMenu === item.name ? 'active' : ''}`}
              onClick={() => handleClick(item.name)}
            >
              <item.icon size={20} strokeWidth={activeMenu === item.name ? 2.2 : 1.8} />
              <span>{item.name}</span>
            </div>
          </motion.div>
        ))}

        <div className="org-nav-group-label">Account</div>
        {accountMenuItems.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.04, duration: 0.3 }}
          >
            <div
              className={`org-nav-item ${activeMenu === item.name ? 'active' : ''}`}
              onClick={() => handleClick(item.name)}
            >
              <item.icon size={20} strokeWidth={activeMenu === item.name ? 2.2 : 1.8} />
              <span>{item.name}</span>
            </div>
          </motion.div>
        ))}

        <div className="org-nav-group-label">
          <Building2 size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          Organization
        </div>
        {orgMenuItems.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + idx * 0.04, duration: 0.3 }}
          >
            <div
              className={`org-nav-item ${activeMenu === item.name ? 'active' : ''}`}
              onClick={() => handleClick(item.name)}
            >
              <item.icon size={20} strokeWidth={activeMenu === item.name ? 2.2 : 1.8} />
              <span>{item.name}</span>
            </div>
          </motion.div>
        ))}
      </nav>

      {/* Profile Card */}
      <div className="org-sidebar-profile">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Org"
          alt="Organization Avatar"
        />
        <div className="org-sidebar-profile-info">
          <div className="name">Hope Foundation</div>
          <div className="role">Administrator</div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="org-sidebar-bottom">
        <Link href="/">
          <div className="org-nav-item org-nav-item-home">
            <Home size={18} />
            <span>Back to Home</span>
          </div>
        </Link>
        <div className="org-nav-item org-nav-item-logout">
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
