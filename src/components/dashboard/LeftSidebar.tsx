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
  Heart,
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
      className="fixed hidden lg:flex flex-col h-[calc(100vh-48px)] bg-white rounded-3xl border border-slate-100 shadow-sm"
      style={{
        width: '280px',
        padding: '24px',
        margin: '24px 0 0 0',
        zIndex: 30,
      }}
    >
      {/* HelpSphere Logo & Brand */}
      <div className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <Heart size={20} className="text-white fill-white/20" />
        </div>
        <span className="text-xl font-black text-slate-800 tracking-tight">HelpSphere</span>
      </div>

      {/* Sidebar menu items */}
      <div className="space-y-1.5 flex-1 overflow-y-auto pr-2 scrollbar-hide">
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
                    'flex items-center gap-3.5 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group',
                    isActive
                      ? 'bg-[#F6E3DA] text-[#D88A6F] font-bold shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  )}
                >
                  <span
                    className={cn(
                      'transition-transform duration-300 group-hover:scale-110',
                      isActive ? 'text-[#D88A6F]' : 'text-slate-400 group-hover:text-primary'
                    )}
                    style={{ flexShrink: 0 }}
                  >
                    {item.icon}
                  </span>
                  <span className={cn('text-[14.5px]', isActive ? 'font-bold' : 'font-semibold tracking-tight')}>
                    {item.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Logout button at the bottom */}
      <div className="pt-6 mt-6 border-t border-slate-100/80">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button className="flex w-full items-center gap-3.5 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 text-slate-500 hover:bg-red-50 hover:text-red-500 group">
            <span className="transition-transform duration-300 group-hover:scale-110 text-slate-400 group-hover:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </span>
            <span className="text-[14.5px] font-semibold tracking-tight">Logout</span>
          </button>
        </motion.div>
      </div>
    </nav>
  );
}
