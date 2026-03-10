import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  HandHeart,
  Users,
  Home,
  Megaphone,
  MessageSquare,
  Bookmark,
  Bell,
  User,
  Settings,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
  { name: 'My Donations', icon: <HandHeart size={20} />, href: '/dashboard/user/donations' },
  { name: 'Volunteer Activities', icon: <Users size={20} />, href: '/dashboard/user/volunteer' },
  { name: 'Shelter Requests', icon: <Home size={20} />, href: '/dashboard/user/shelter' },
  { name: 'Campaigns', icon: <Megaphone size={20} />, href: '/dashboard/campaigns' },
  { name: 'Messages', icon: <MessageSquare size={20} />, href: '/dashboard/messages' },
  { name: 'Saved Posts', icon: <Bookmark size={20} />, href: '/dashboard/saved' },
  { name: 'Notifications', icon: <Bell size={20} />, href: '/dashboard/notifications' },
  { name: 'My Profile', icon: <User size={20} />, href: '/dashboard/profile' },
  { name: 'Settings', icon: <Settings size={20} />, href: '/dashboard/settings' },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed hidden lg:flex flex-col h-screen bg-white border-r"
      style={{
        width: '240px',
        borderColor: '#E5E7EB',
        padding: '24px',
        gap: '24px',
        overflowY: 'auto',
        zIndex: 30,
      }}
    >
      {/* Sidebar menu items */}
      <div className="space-y-2">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-text-secondary hover:bg-primary/5'
                  )}
                  style={{
                    color: isActive ? '#D88A6F' : '#6B7280',
                    backgroundColor: isActive ? '#F6E3DA' : 'transparent',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: isActive ? 600 : 500 }}>
                    {item.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
}
