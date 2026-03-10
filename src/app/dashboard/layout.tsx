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
    title: 'Overview',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
      { name: 'My Donations', icon: HandHeart, href: '/dashboard/user/donations', roles: ['USER'], hasPreview: true },
      { name: 'Volunteer Activities', icon: Users, href: '/dashboard/user/volunteer', roles: ['USER'] },
      { name: 'Shelter Requests', icon: Home, href: '/dashboard/user/shelter', roles: ['USER'] },
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
  },
  {
    title: 'General',
    items: [
      { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
      { name: 'Settings', icon: Settings, href: '/dashboard/settings', roles: ['USER', 'ORGANIZATION', 'ADMIN'] },
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
        <div className="p-6 flex items-center justify-between border-b border-slate-100/40">
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
                className="font-bold text-xl tracking-tight text-neutral-800"
              >
                HelpSphere
              </motion.span>
            )}
          </Link>
          <button
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto custom-scrollbar">
          {navigationGroups.map((group, groupIdx) => {
            const filteredGroupItems = group.items.filter(item => item.roles.includes(user.role));
            if (filteredGroupItems.length === 0) return null;

            return (
              <div key={group.title} className="space-y-2">
                {isSidebarOpen && (
                  <h4 className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    {group.title}
                  </h4>
                )}
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
                              "flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer relative",
                              isActive
                                ? 'bg-primary/5 text-primary shadow-[inset_0_0_0_1px_rgba(197,131,113,0.1)]'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            )}
                            onMouseEnter={() => item.hasPreview && setIsDonationHovered(true)}
                            onMouseLeave={() => item.hasPreview && setIsDonationHovered(false)}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeNav"
                                className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                            <div className="flex-shrink-0">
                              <item.icon
                                size={20}
                                strokeWidth={isActive ? 2.5 : 2}
                                className={cn(
                                  "transition-all duration-300",
                                  isActive ? 'text-primary scale-110' : 'text-slate-400 group-hover:text-slate-600 group-hover:scale-110'
                                )}
                              />
                            </div>
                            {isSidebarOpen && (
                              <span className={cn(
                                "font-bold truncate text-sm tracking-tight",
                                isActive ? 'text-primary' : 'text-slate-600 group-hover:text-slate-900'
                              )}>
                                {item.name}
                              </span>
                            )}

                            {item.hasPreview && (
                              <DonationHoverPreview
                                isVisible={isDonationHovered}
                                data={{
                                  totalDonations: 12500,
                                  campaignsSupported: 8,
                                  itemsDonated: 15
                                }}
                              />
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

        <div className="p-4 border-t border-slate-100/40">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-200 font-semibold text-sm"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - 64px production spec */}
        <header style={{
          height: '72px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'max(16px, env(safe-area-inset-left))',
          paddingRight: 'max(16px, env(safe-area-inset-right))',
          zIndex: 40,
        }}>
          {/* Left: Logo and Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  setIsMobileMenuOpen(true);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              }}
              style={{
                padding: '8px',
                marginLeft: '-8px',
                borderRadius: '10px',
                backgroundColor: 'transparent',
                color: '#6B7280',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(197, 131, 113, 0.08)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6B7280';
              }}
            >
              <Menu size={20} />
            </motion.button>

            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.png"
                  alt="HelpSphere Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-tighter text-slate-800 hidden md:block">
                HelpSphere
              </span>
            </Link>
          </div>

          {/* Center: Search bar (Hidden on mobile) */}
          <div className="hidden lg:flex flex-1 justify-center mx-10">
            <SearchBar />
          </div>

          {/* Right: User controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: '#6B7280',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                  e.currentTarget.style.color = '#1F2937';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6B7280';
                }}
              >
                <Bell size={22} />
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#EF4444',
                  borderRadius: '50%',
                  border: '2px solid white',
                }}></span>
              </motion.button>
              <NotificationPopover
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
              />
            </div>

            {/* Messages */}
            <Link href="/dashboard/messages">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: '#6B7280',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                  e.currentTarget.style.color = '#1F2937';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6B7280';
                }}
              >
                <MessageSquare size={22} />
              </motion.button>
            </Link>

            {/* User avatar dropdown */}
            <div style={{ position: 'relative' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '2px',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  border: '2px solid #F3F4F6',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--color-background)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#F3F4F6';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <img
                  src={user.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }}
                />
              </motion.button>
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
