'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HandHeart, 
  Users, 
  Trophy, 
  ArrowUpRight, 
  MapPin, 
  Clock,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const stats = [
  { name: 'Total Donations', value: '$1,240', icon: HandHeart, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Volunteer Hours', value: '48h', icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
  { name: 'Impact Score', value: '850', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const activeCampaigns = [
  { id: 1, title: 'Medical Aid for Gaza', org: 'Hope Intl', progress: 75, target: '$50,000', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80' },
  { id: 2, title: 'Winter Blanket Drive', org: 'Red Cross', progress: 40, target: '$10,000', image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80' },
];

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
        <p className="text-slate-500">Here's your impact overview for this month.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                  </div>
                  <div className={cn("p-3 rounded-xl transition-colors group-hover:scale-110", stat.bg, stat.color)}>
                    <stat.icon size={24} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs font-medium text-green-600">
                  <TrendingUp size={14} className="mr-1" />
                  <span>+12.5% from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Campaigns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold h-fit">Active Campaigns</h2>
            <Button variant="link" className="text-primary p-0">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCampaigns.map((camp) => (
              <Card key={camp.id} className="overflow-hidden group cursor-pointer border-none shadow-premium bg-white/50 backdrop-blur-sm">
                <div className="h-48 overflow-hidden relative">
                  <img src={camp.image} alt={camp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {camp.org}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{camp.title}</h4>
                  <div className="space-y-4">
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${camp.progress}%` }}
                        className="h-full bg-primary"
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Collected: <span className="font-bold text-slate-900">{camp.progress}%</span></span>
                      <span className="text-slate-500">Target: <span className="font-bold text-slate-900">{camp.target}</span></span>
                    </div>
                    <Button variant="premium" className="w-full">Support Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nearby NGOs / Activities */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Recommended for You</h2>
          <div className="space-y-4">
             {[1, 2, 3].map((i) => (
               <Card key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer border-slate-100">
                 <CardContent className="p-4 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                     <MapPin size={24} />
                   </div>
                   <div className="flex-1">
                     <h5 className="font-bold text-sm">Unity Shelter {i}</h5>
                     <p className="text-xs text-slate-500">2.5 miles away • 12 active needs</p>
                   </div>
                   <ArrowUpRight size={16} className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                 </CardContent>
               </Card>
             ))}
          </div>
          
          <Card className="bg-gradient-to-br from-primary to-indigo-600 border-none text-white shadow-xl overflow-hidden relative">
            <div className="absolute -right-8 -bottom-8 opacity-20 transform -rotate-12 translate-y-4">
               <Trophy size={160} />
            </div>
            <CardContent className="p-6 relative z-10">
              <h4 className="text-lg font-bold">New Badge Unlocked!</h4>
              <p className="text-blue-100 text-sm mt-1">You've reached the Silver Tier by helping 10 people this month.</p>
              <Button variant="outline" className="mt-4 border-white/30 text-white hover:bg-white/10">View Rewards</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
