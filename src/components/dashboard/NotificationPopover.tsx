'use client';

import React from 'react';
import { Bell, Info, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type NotificationType = 'info' | 'success' | 'warning';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Donation Received', message: 'You just received $500 for the Winter Shelter campaign!', type: 'success', time: '2m ago' },
  { id: '2', title: 'New Volunteer', message: 'Sarah Wilson has applied to help with your active campaign.', type: 'info', time: '1h ago' },
  { id: '3', title: 'Urgent Request', message: 'A new urgent shelter request was reported 5 miles away.', type: 'warning', time: '3h ago' },
];

export default function NotificationPopover({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-40 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Bell size={18} className="text-primary" />
                  Notifications
               </h4>
               <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">3 NEW</span>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-50">
               {mockNotifications.map((notif) => (
                 <div key={notif.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group relative">
                    <div className="flex gap-4">
                       <div className={cn(
                         "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                         notif.type === 'success' ? "bg-green-100 text-green-600" : 
                         notif.type === 'warning' ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                       )}>
                          {notif.type === 'success' && <CheckCircle2 size={20} />}
                          {notif.type === 'warning' && <AlertTriangle size={20} />}
                          {notif.type === 'info' && <Info size={20} />}
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-slate-900">{notif.title}</p>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{notif.message}</p>
                          <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider">{notif.time}</p>
                       </div>
                    </div>
                    <button className="absolute top-4 right-4 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-slate-900 transition-all">
                       <X size={14} />
                    </button>
                 </div>
               ))}
            </div>
            
            <div className="p-3 border-t border-slate-100 text-center">
               <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">Mark all as read</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
