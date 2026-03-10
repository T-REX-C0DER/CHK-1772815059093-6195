import React from 'react';
import Link from 'next/link';
import { Home, Search, Megaphone, Bell, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-2 md:hidden">
      <Link href="/dashboard" className="flex flex-col items-center text-slate-600 hover:text-primary">
        <Home size={20} />
        <span className="text-[10px]">Home</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center text-slate-600 hover:text-primary">
        <Search size={20} />
        <span className="text-[10px]">Search</span>
      </Link>
      <Link href="/campaigns" className="flex flex-col items-center text-slate-600 hover:text-primary">
        <Megaphone size={20} />
        <span className="text-[10px]">Campaigns</span>
      </Link>
      <Link href="/dashboard/messages" className="flex flex-col items-center text-slate-600 hover:text-primary">
        <Bell size={20} />
        <span className="text-[10px]">Notifications</span>
      </Link>
      <Link href="/dashboard/profile" className="flex flex-col items-center text-slate-600 hover:text-primary">
        <User size={20} />
        <span className="text-[10px]">Profile</span>
      </Link>
    </nav>
  );
}
