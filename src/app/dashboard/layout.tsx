'use client';

import React, { useState, useEffect } from 'react';
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
  X,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import NotificationPopover from '@/components/dashboard/NotificationPopover';
import SearchBar from '@/components/dashboard/SearchBar';
import ProtectedRoute from '@/components/ProtectedRoute';
import DonationHoverPreview from '@/components/dashboard/DonationHoverPreview';
import VolunteerHoverPreview from '@/components/dashboard/VolunteerHoverPreview';
import './dashboard.css';

const userNavItems = [
  { name: 'Feed', icon: Home, href: '/dashboard/user' },
  { name: 'My Donations', icon: HandHeart, href: '/dashboard/user/donations' },
  { name: 'Volunteering', icon: Users, href: '/dashboard/user/volunteer' },
  { name: 'Campaigns', icon: Megaphone, href: '/dashboard/user/campaigns' },
  { name: 'Saved Posts', icon: Bookmark, href: '/dashboard/saved' },
  { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages' },
];

const secondaryNavItems = [
  { name: 'Notifications', icon: Bell, href: '/dashboard/notifications' },
  { name: 'My Profile', icon: UserCircle, href: '/dashboard/profile' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

const orgNavItems = [
  { name: 'Campaigns', icon: Megaphone, href: '/dashboard/org/campaigns' },
  { name: 'Volunteer Requests', icon: Users, href: '/dashboard/org/volunteers' },
  { name: 'Shelter Requests', icon: Home, href: '/dashboard/org/shelter' },
];

const adminNavItems = [
  { name: 'All Users', icon: Users, href: '/dashboard/admin/users' },
  { name: 'All Organizations', icon: Home, href: '/dashboard/admin/orgs' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const pathname = usePathname();

  // stats for hover previews
  const [dashboardStats, setDashboardStats] = useState<{
    totalDonations: number;
    donationCount: number;
    volunteerCount: number;
    totalVolunteering?: number;
    shelterRequestsCount: number;
  } | null>(null);

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // fetch stats when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/dashboard/user');
        if (res.ok) {
          const data = await res.json();
          setDashboardStats(data.stats);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      }
    };
    fetchStats();
  }, []);


  if (!user) return null;

  const sidebarWidth = isSidebarOpen ? 280 : 80;

  const renderNavSection = (
    label: string,
    items: typeof userNavItems,
    delay = 0
  ) => (
    <div style={{ paddingBottom: 8 }}>
      {isSidebarOpen && (
        <div className="nav-group-label">{label}</div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item, idx) => {
          const isActive = pathname === item.href;
          const showDonationsPreview = item.href === '/dashboard/user/donations';
          const showVolunteerPreview = item.href === '/dashboard/user/volunteer';

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + idx * 0.04, duration: 0.3 }}
            >
              <div
                className="relative"
                onMouseEnter={() => setHoveredNav(item.name)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <Link href={item.href}>
                  <div
                    className={cn(
                      "nav-item",
                      isActive && "active"
                    )}
                    title={!isSidebarOpen ? item.name : undefined}
                  >
                    <item.icon
                      size={19}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                    {isSidebarOpen && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </div>
                </Link>

                {/* donation hover preview */}
                {showDonationsPreview && dashboardStats && (
                  <DonationHoverPreview
                    isVisible={hoveredNav === item.name}
                    data={{
                      totalDonations: dashboardStats.totalDonations,
                      campaignsSupported: 0,
                      itemsDonated: 0,
                    }}
                  />
                )}

                {/* volunteer hover preview */}
                {showVolunteerPreview && dashboardStats && (
                  <VolunteerHoverPreview
                    isVisible={hoveredNav === item.name}
                    data={{
                      totalVolunteering:
                        dashboardStats.totalVolunteering ||
                        dashboardStats.volunteerCount,
                    }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--dashboard-bg)' }}>
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "sidebar custom-scrollbar",
          "fixed inset-y-0 left-0 lg:relative",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ width: sidebarWidth }}
      >
        {/* Logo */}
        <div className="logo-container">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              className="w-9 h-9 relative flex-shrink-0"
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
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-bold text-xl tracking-tight text-neutral-800 whitespace-nowrap overflow-hidden"
                  style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}
                >
                  HelpSphere
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-full absolute -right-3.5 top-20 z-50 transition-all"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-xs)',
            color: 'var(--text-faint)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.color = 'var(--primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-faint)';
          }}
        >
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-2">
          {renderNavSection('Menu', userNavItems, 0)}
          {renderNavSection('Account', secondaryNavItems, 0.2)}

          {user.role === 'ORGANIZATION' && renderNavSection('Organization', orgNavItems, 0.3)}
          {user.role === 'ADMIN' && renderNavSection('Management', adminNavItems, 0.3)}
        </nav>

        {/* Sidebar Profile Card + Logout */}
        <div className="mt-auto pt-4 space-y-3">
          {isSidebarOpen && (
            <div className="sidebar-profile-card">
              <img
                src={user.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.name}
              />
              <div className="sidebar-profile-info">
                <div className="name">{user.name}</div>
                <div className="role">{user.role}</div>
              </div>
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50/80 rounded-xl transition-all duration-200 font-medium text-sm",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut size={18} />
            {isSidebarOpen && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="header">
          {/* Mobile menu toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="icon-btn"
            >
              <Menu size={22} />
            </button>
            <div className="w-7 h-7 relative">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <SearchBar />
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="icon-btn hidden sm:flex"
            >
              <Search size={20} />
            </motion.button>

            <Link href="/dashboard/messages">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="icon-btn"
              >
                <MessageSquare size={20} />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="icon-btn"
            >
              <Bell size={20} />
              <span className="notification-dot"></span>
            </motion.button>

            <div className="hidden sm:block w-px h-8 mx-1" style={{ background: 'var(--border-soft)' }}></div>

            {/* Profile */}
            <Link href="/dashboard/profile">
              <div className="flex items-center gap-3 pl-1 group cursor-pointer">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold leading-none" style={{ color: 'var(--text-main)' }}>{user.name}</p>
                  <p className="text-[11px] font-medium mt-1 uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>{user.role}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="overflow-hidden transition-all"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-btn)',
                    border: '2px solid var(--border)',
                  }}
                >
                  <img
                    src={user.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </Link>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </main>
      </div>
    </div>
  );
}
