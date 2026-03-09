'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Home, 
  ShieldCheck, 
  AlertCircle,
  BarChart3,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const adminStats = [
  { name: 'Total Users', value: '1,280', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Registered NGOs', value: '85', icon: Home, color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'Verified Platforms', value: '72', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
  { name: 'Pending Approvals', value: '14', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">System Overview</h1>
        <p className="text-slate-500">Administrator Panel • Global monitoring & verification</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-slate-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className={cn("p-3 rounded-lg", stat.bg, stat.color)}>
                    <stat.icon size={20} />
                  </div>
                  <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp size={12} className="mr-1" />
                    4%
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">{stat.name}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Queue */}
        <Card className="lg:col-span-2 border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Verification Queue</CardTitle>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" className="h-8">
                  <Filter size={14} className="mr-2" /> Filter
               </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-bold">Organization</th>
                    <th className="pb-3 font-bold">Type</th>
                    <th className="pb-3 font-bold">Applied Date</th>
                    <th className="pb-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-500">NGO</div>
                            <div>
                               <p className="font-bold text-sm text-slate-900">Bright Future NGO {i}</p>
                               <p className="text-[10px] text-slate-500">Reg: HS-2024-{i}X</p>
                            </div>
                         </div>
                      </td>
                      <td className="py-4 text-xs font-medium text-slate-600">Child Welfare</td>
                      <td className="py-4 text-xs text-slate-500">Oct {10+i}, 2024</td>
                      <td className="py-4 text-right">
                         <Button size="sm" className="h-7 text-[10px] px-3">Verify</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* System Health / Analytics */}
        <div className="space-y-6">
           <Card className="border-slate-100 shadow-sm">
              <CardHeader>
                 <CardTitle className="text-xl">System Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                       <BarChart3 size={20} />
                    </div>
                    <div>
                       <p className="text-xs text-slate-500">Daily Donations</p>
                       <p className="font-bold text-slate-900">$4,250.00</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                       <ShieldCheck size={20} />
                    </div>
                    <div>
                       <p className="text-xs text-slate-500">Verification Rate</p>
                       <p className="font-bold text-slate-900">92.4%</p>
                    </div>
                 </div>
                 <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-900 mb-2">Platform Goal Progress</p>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-primary w-[78%] rounded-full" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">78% of $1M yearly impact goal reached</p>
                 </div>
              </CardContent>
           </Card>

           <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-6">
                 <h4 className="font-bold mb-2">Need Help with Reports?</h4>
                 <p className="text-slate-400 text-xs">Generate custom analytics reports for platform growth and NGO tracking.</p>
                 <Button className="w-full mt-4 bg-white text-slate-900 hover:bg-slate-100 h-9 text-xs font-bold">Generate PDF</Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
