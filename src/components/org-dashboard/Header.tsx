'use client';

import React from 'react';
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { useDashboard } from '@/app/organization/dashboard/DashboardContext';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { activeMenu } = useDashboard();

  return (
    <header className="org-header">
      <div className="org-header-left">
        {/* Mobile hamburger */}
        <button className="org-mobile-toggle" onClick={onToggleSidebar}>
          <Menu size={22} />
        </button>

        {/* Page Title */}
        <h1 className="org-page-title">{activeMenu}</h1>
      </div>

      {/* Search */}
      <div className="org-search-bar">
        <Search size={18} color="var(--org-text-faint)" />
        <input
          type="text"
          placeholder="Search campaigns, volunteers, donors..."
          className="org-search-input"
        />
      </div>

      {/* Actions */}
      <div className="org-header-actions">
        <button className="org-icon-btn">
          <MessageSquare size={19} />
        </button>
        <button className="org-icon-btn">
          <Bell size={19} />
          <span className="org-notification-dot"></span>
        </button>

        <div style={{ width: 1, height: 28, background: 'var(--org-border)', margin: '0 4px' }}></div>

        <div className="org-profile-dropdown">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Org"
            alt="Organization Avatar"
            className="org-avatar"
          />
          <div className="org-info-header">
            <span className="org-name">Hope Foundation</span>
            <span className="org-role">Administrator</span>
          </div>
          <ChevronDown size={14} color="var(--org-text-faint)" />
        </div>
      </div>
    </header>
  );
};

export default Header;
