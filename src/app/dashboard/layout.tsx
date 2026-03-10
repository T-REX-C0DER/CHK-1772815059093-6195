'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
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
  Bell,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import NotificationPopover from '@/components/dashboard/NotificationPopover';
import SearchBar from '@/components/dashboard/SearchBar';
import ProtectedRoute from '@/components/ProtectedRoute';
import DonationHoverPreview from '@/components/dashboard/DonationHoverPreview';

const navigationGroups = [
  {
    title: 'Menu',
    items: [
      { name: 'Home', icon: Home, href: '/dashboard/user', roles: ['USER'] },
      { name: 'Categories', icon: LayoutDashboard, href: '/dashboard/categories', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
      { name: 'My Donations', icon: HandHeart, href: '/dashboard/user/donations', roles: ['USER'], hasPreview: true },
      { name: 'Volunteer Activities', icon: Users, href: '/dashboard/user/volunteer', roles: ['USER'] },
      { name: 'Campaigns', icon: Megaphone, href: '/dashboard/user/campaigns', roles: ['USER'] },
      { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
      { name: 'Saved Posts', icon: Bell, href: '/dashboard/saved', roles: ['USER'] },
      { name: 'Notifications', icon: Bell, href: '/dashboard/notifications', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
      { name: 'My Profile', icon: UserCircle, href: '/dashboard/profile', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
      { name: 'Settings', icon: Settings, href: '/dashboard/settings', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
    ]
  },
  {
    title: 'Organization',
    items: [
      { name: 'Campaigns', icon: Megaphone, href: '/dashboard/org/campaigns', roles: ['ORGANIZATION'] },
      { name: 'Volunteer Requests', icon: Users, href: '/dashboard/org/volunteers', roles: ['ORGANIZATION'] },
      { name: 'Shelter Requests', icon: Home, href: '/dashboard/org/shelter', roles: ['ORGANIZATION'] },
    ]
  },
  {
    title: 'Management',
    items: [
      { name: 'All Users', icon: Users, href: '/dashboard/admin/users', roles: ['ADMIN'] },
      { name: 'All Organizations', icon: Home, href: '/dashboard/admin/orgs', roles: ['ADMIN'] },
    ]
  }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  if (!user) return null; // Or show loading/redirect

  const [isDonationHovered, setIsDonationHovered] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#FDFCFB]">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 280 : 80,
          x: typeof window !== 'undefined' && window.innerWidth < 1024 ? (isMobileMenuOpen ? 0 : -280) : 0
        }}
        className={cn(
          "bg-white border-r border-slate-100/60 flex flex-col z-50 shadow-sm transition-all duration-300 ease-in-out",
          "fixed inset-y-0 left-0 lg:relative lg:translate-x-0"
        )}
      >
        <div className="p-8 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 relative"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/logo.png"
                alt="HelpSphere Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-black text-2xl tracking-tighter text-neutral-800"
              >
                HelpSphere
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navigationGroups.map((group, groupIdx) => {
            const filteredGroupItems = group.items.filter(item => item.roles.includes(user.role));
            if (filteredGroupItems.length === 0) return null;

            return (
              <div key={group.title} className="pb-6">
                <div className="space-y-1">
                  {filteredGroupItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (groupIdx * 0.1) + (idx * 0.05) }}
                      >
                        <Link href={item.href}>
                          <div
                            className={cn(
                              "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group cursor-pointer relative mx-2",
                              isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                : 'text-slate-500 hover:bg-primary/5 hover:text-primary'
                            )}
                          >
                            <div className="flex-shrink-0">
                              <item.icon
                                size={22}
                                strokeWidth={isActive ? 2.5 : 2}
                                className={cn(
                                  "transition-all duration-300",
                                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'
                                )}
                              />
                            </div>
                            {isSidebarOpen && (
                              <span className={cn(
                                "font-bold truncate text-[15px] tracking-tight",
                                isActive ? 'text-white' : 'text-slate-600 group-hover:text-primary'
                              )}>
                                {item.name}
                              </span>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="p-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className="w-full flex items-center gap-3 px-6 py-4 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-200 font-bold text-sm"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - 64px production spec */}
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100/50 flex items-center justify-between px-8" style={{ height: '80px' }}>
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="w-8 h-8 relative">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
          </div>

          <div className="flex-1 max-w-2xl px-4">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-3 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all relative"
            >
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </motion.button>

            <Link href="/dashboard/messages">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
              >
                <MessageSquare size={22} />
              </motion.button>
            </Link>

            <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden sm:block"></div>

            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">{user.name}</p>
                <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">{user.role}</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-11 h-11 rounded-2xl border-2 border-slate-100 overflow-hidden group-hover:border-primary transition-colors"
              >
                <img
                  src={user.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </header>

        {/* main content */}
        <main className="flex-1 overflow-y-auto">
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </main>
      </div>
    </div>
  );
}
