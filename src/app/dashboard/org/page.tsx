'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Megaphone, 
  Users, 
  HandHeart, 
  Home, 
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MoreVertical,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const orgStats = [
  { name: 'Total Donations', value: '$45,280', icon: HandHeart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { name: 'Active Campaigns', value: '12', icon: Megaphone, color: 'text-orange-600', bg: 'bg-orange-50' },
  { name: 'Volunteers Joined', value: '148', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Shelter Requests', value: '24', icon: Home, color: 'text-rose-600', bg: 'bg-rose-50' },
];

export default function OrganizationDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{user?.organizationName || 'Hope Foundation'}</h1>
          <p className="text-slate-500">Organization Dashboard • {user?.city || 'New York'}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <HandHeart className="mr-2" size={20} />
            View Donations
          </Button>
          <Button variant="premium">
            <Plus className="mr-2" size={20} />
            Create Campaign
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orgStats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow cursor-default border-slate-100">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Volunteer Requests */}
        <Card className="lg:col-span-2 border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Volunteer Requests</CardTitle>
            <Button variant="link" className="text-primary text-sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="py-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Vol${i}`} alt="Volunteer" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">Sarah Wilson {i}</h5>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <Clock size={12} />
                        <span>Requested 2h ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" className="h-8 text-xs border-green-200 text-green-600 hover:bg-green-50">Approve</Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
                       <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shelter Requests */}
        <Card className="border-slate-100 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50">
            <CardTitle className="text-xl">Urgent Shelter Requests</CardTitle>
            <p className="text-xs text-slate-500">People needing immediate assistance nearby</p>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-slate-100">
               {[1, 2].map((i) => (
                 <div key={i} className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h5 className="font-bold text-slate-900">John Doe, 65</h5>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin size={12} /> 12th Avenue, Brooklyn
                        </p>
                      </div>
                      <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Urgent</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">"Elderly person found without shelter in cold conditions. Needs immediate medical checkup and lodging."</p>
                    <div className="flex gap-2">
                       <Button size="sm" className="flex-1 h-8 text-xs">Accept</Button>
                       <Button variant="outline" size="sm" className="h-8 text-xs">Details</Button>
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Summary */}
      <Card className="border-slate-100 shadow-sm">
         <CardHeader>
            <CardTitle className="text-xl">Active Campaigns Overview</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex justify-between items-start">
                       <h5 className="font-bold text-sm">Winter Shelter Fund {i}</h5>
                       <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">ACTIVE</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full">
                       <div className="bg-primary h-full w-[65%] rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                       <span>$6,500 raised</span>
                       <span>Goal $10,000</span>
                    </div>
                 </div>
               ))}
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
