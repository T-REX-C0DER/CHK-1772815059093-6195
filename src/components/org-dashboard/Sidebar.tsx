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
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Sidebar = ({ activeMenu, setActiveMenu }: SidebarProps) => {
  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Profile', icon: UserCircle },
    { name: 'Campaigns', icon: Megaphone },
    { name: 'Donations', icon: HandHeart },
    { name: 'Volunteers', icon: Users },
    { name: 'Shelter Requests', icon: Home },
    { name: 'Reports', icon: BarChart3 },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Settings', icon: Settings },
    { name: 'Home', icon: Home },
  ];

  return (
    <aside className="org-sidebar">
      <div className="org-logo-container">
        <div className="org-logo-text">HelpSphere</div>
      </div>

      <nav className="org-nav-menu">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`org-nav-item ${activeMenu === item.name ? 'active' : ''}`}
            onClick={() => {
              if (item.name === 'Home') {
                window.location.href = '/';
                return;
              }
              setActiveMenu(item.name);
            }}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </div>
        ))}
      </nav>

      <div className="org-nav-item" style={{ marginTop: 'auto', color: '#E57373' }}>
        <LogOut size={20} />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
