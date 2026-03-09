'use client';

import React from 'react';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  ChevronDown 
} from 'lucide-react';

const Header = () => {
  return (
    <header className="org-header">
      <div className="org-search-bar">
        <Search size={18} color="var(--org-text-secondary)" />
        <input 
          type="text" 
          placeholder="Search campaigns, volunteers, donors..." 
          className="org-search-input"
        />
      </div>

      <div className="org-header-actions">
        <button className="org-icon-btn">
          <MessageSquare size={20} />
        </button>
        <button className="org-icon-btn">
          <Bell size={20} />
          <span className="org-notification-dot"></span>
        </button>
        
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
          <ChevronDown size={14} color="var(--org-text-secondary)" />
        </div>
      </div>
    </header>
  );
};

export default Header;
