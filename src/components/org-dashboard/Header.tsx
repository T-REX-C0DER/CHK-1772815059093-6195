'use client';

import React from 'react';
import {
  Search,
  Bell,
  MessageSquare,
  MapPin,
  Menu,
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="org-header">
      <div className="org-header-left">
        {/* Mobile hamburger */}
        <button className="org-mobile-toggle" onClick={onToggleSidebar}>
          <Menu size={22} />
        </button>

        {/* Org Name & Subtitle */}
        <div className="org-header-title-group">
          <h1 className="org-header-org-name">Hope Foundation</h1>
          <div className="org-header-subtitle">
            <span>Organization Dashboard</span>
            <span className="org-header-location">
              <MapPin size={13} />
              New York, NY
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="org-header-actions">
        <button className="org-icon-btn" title="Search">
          <Search size={19} />
        </button>
        <button className="org-icon-btn" title="Messages">
          <MessageSquare size={19} />
        </button>
        <button className="org-icon-btn" title="Notifications">
          <Bell size={19} />
          <span className="org-notification-dot"></span>
        </button>

        <div className="org-header-divider"></div>

        <div className="org-profile-dropdown">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Org"
            alt="Organization Avatar"
            className="org-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
