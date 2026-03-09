'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  HandHeart, 
  Users, 
  Home, 
  BarChart3, 
  MessageSquare, 
  Settings,
  LogOut,
  Megaphone,
  UserCircle,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import NotificationPopover from '@/components/dashboard/NotificationPopover';

interface SidebarItem {
  name: string;
  icon: any;
  href: string;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  // Common
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
  
  // User Specific
  { name: 'My Donations', icon: HandHeart, href: '/dashboard/user/donations', roles: ['USER'] },
  { name: 'Volunteer Activities', icon: Users, href: '/dashboard/user/volunteer', roles: ['USER'] },
  { name: 'Shelter Requests', icon: Home, href: '/dashboard/user/shelter', roles: ['USER'] },
  
  // Organization Specific
  { name: 'Campaigns', icon: Megaphone, href: '/dashboard/org/campaigns', roles: ['ORGANIZATION'] },
  { name: 'Volunteer Requests', icon: Users, href: '/dashboard/org/volunteers', roles: ['ORGANIZATION'] },
  { name: 'Shelter Requests', icon: Home, href: '/dashboard/org/shelter', roles: ['ORGANIZATION'] },
  
  // Admin Specific
  { name: 'All Users', icon: Users, href: '/dashboard/admin/users', roles: ['ADMIN'] },
  { name: 'All Organizations', icon: Home, href: '/dashboard/admin/orgs', roles: ['ADMIN'] },
  
  // Common Bottom
  { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  if (!user) return null; // Or show loading/redirect

  const filteredItems = sidebarItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col z-20"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">H</div>
          {isSidebarOpen && <span className="font-bold text-xl text-slate-900 transition-all duration-300">HelpSphere</span>}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {filteredItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group cursor-pointer mb-1",
                "hover:bg-slate-50 text-slate-600 hover:text-primary"
              )}>
                <div className="flex-shrink-0">
                  <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                {isSidebarOpen && <span className="font-medium truncate">{item.name}</span>}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
            onClick={logout}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <LayoutDashboard size={20} />
          </button>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 relative transition-all"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <NotificationPopover 
                isOpen={isNotificationsOpen} 
                onClose={() => setIsNotificationsOpen(false)} 
              />
            </div>

            <div className="h-8 w-px bg-slate-200 mx-2"></div>

            <div className="flex items-center gap-3 pr-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 line-clamp-1">{user.name}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter font-bold">{user.role}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden ring-1 ring-slate-100">
                 <img src={user.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/30">
          {children}
        </main>
      </div>
    </div>
  );
}
