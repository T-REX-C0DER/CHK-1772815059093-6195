import React from 'react';
import { TrendingUp, Users, Heart, DollarSign, ShieldCheck, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  impact?: {
    livesImpacted: number;
    activeVolunteers: number;
    ongoingCampaigns: number;
    totalDonations: number;
  };
  trending?: any[];
  suggestions?: any[];
  events?: any[];
}

export default function RightSidebar({ impact, trending, suggestions, events }: Props) {
  return (
    <div className="space-y-6 pb-20">
      {/* Impact Summary Card */}
      <div className="bg-white rounded-[20px] p-6 lg:p-7 border border-slate-100/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <h3 className="text-[17px] font-black text-slate-800 mb-6 flex items-center gap-2.5 tracking-tight">
          Your Impact Network
        </h3>
        <div className="grid grid-cols-2 gap-3.5">
          <div className="bg-slate-50/50 p-4 rounded-[16px] border border-slate-100/50 transition-all hover:bg-white hover:border-[#D88A6F]/30 hover:shadow-md hover:-translate-y-0.5 cursor-default group">
            <p className="text-[22px] font-black text-[#D88A6F] tracking-tighter leading-none group-hover:scale-105 transition-transform origin-left">24.5k</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{`Lives Impacted`}</p>
          </div>
          <div className="bg-slate-50/50 p-4 rounded-[16px] border border-slate-100/50 transition-all hover:bg-white hover:border-[#D88A6F]/30 hover:shadow-md hover:-translate-y-0.5 cursor-default group">
            <p className="text-[22px] font-black text-slate-800 tracking-tighter leading-none group-hover:scale-105 transition-transform origin-left">1,240</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Volunteers</p>
          </div>
          <div className="bg-slate-50/50 p-4 rounded-[16px] border border-slate-100/50 transition-all hover:bg-white hover:border-[#D88A6F]/30 hover:shadow-md hover:-translate-y-0.5 cursor-default group">
            <p className="text-[22px] font-black text-slate-800 tracking-tighter leading-none group-hover:scale-105 transition-transform origin-left">85</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Campaigns</p>
          </div>
          <div className="bg-slate-50/50 p-4 rounded-[16px] border border-slate-100/50 transition-all hover:bg-white hover:border-[#D88A6F]/30 hover:shadow-md hover:-translate-y-0.5 cursor-default group">
            <p className="text-[22px] font-black text-[#D88A6F] tracking-tighter leading-none group-hover:scale-105 transition-transform origin-left">₹12.5L</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Raised</p>
          </div>
        </div>
      </div>

      {/* Trending Campaigns */}
      <div className="bg-white rounded-[20px] p-6 lg:p-7 border border-slate-100/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[17px] font-black text-slate-800 tracking-tight">Trending Now</h3>
          <ArrowRight size={18} className="text-slate-300 cursor-pointer hover:text-primary transition-colors" />
        </div>
        <div className="space-y-6">
          {[
            { name: 'Clean Water for Rural Villages', percent: 85, org: 'Water.org' },
            { name: 'Winter Blankets Distribution', percent: 40, org: 'Red Cross' },
            { name: 'School Meals Program', percent: 92, org: 'Save the Children' }
          ].map((campaign, idx) => (
            <div key={idx} className="space-y-2.5">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-slate-700 truncate leading-tight">{campaign.name}</p>
              </div>
              <div className="h-1.5 bg-slate-50 border border-slate-100/50 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${campaign.percent}%` }}
                  transition={{ duration: 1.5, delay: idx * 0.2 }}
                  className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(216,138,111,0.2)]"
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-primary">{campaign.percent}% funded</span>
                <span className="text-slate-400 tracking-tight">{campaign.org}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested NGOs */}
      <div className="bg-white rounded-[20px] p-6 lg:p-7 border border-slate-100/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <h3 className="text-[17px] font-black text-slate-800 mb-6 tracking-tight">NGOs to Follow</h3>
        <div className="space-y-4">
          {[
            { name: 'World Wildlife Fund', cat: 'Wildlife', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=WWF' },
            { name: 'Doctors Without Borders', cat: 'Health', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=DWB' }
          ].map((ngo, idx) => (
            <div key={idx} className="flex items-center gap-3.5 group cursor-pointer p-0.5">
              <img src={ngo.logo} alt={ngo.name} className="w-10 h-10 rounded-xl object-cover bg-slate-50 border border-slate-100 group-hover:border-primary/30 transition-all" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-slate-800 truncate leading-none mb-1.5 group-hover:text-primary transition-colors">{ngo.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-green-500"></span>
                  </span>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ngo.cat}</p>
                </div>
              </div>
              <button className="px-3.5 py-2 bg-white border border-slate-100 text-slate-600 text-[10px] font-black rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Volunteer Events */}
      <div className="bg-white rounded-[20px] p-6 lg:p-7 border border-slate-100/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <h3 className="text-[17px] font-black text-slate-800 mb-6 tracking-tight">Active Events</h3>
        <div className="space-y-3.5">
          {[
            { date: 'OCT 14', title: 'Beach Cleanup Drive', loc: 'Santa Monica' },
            { date: 'OCT 18', title: 'Food Bank Sorting', loc: 'Downtown Center' }
          ].map((event, idx) => (
            <div key={idx} className="flex gap-4 p-3.5 bg-[#FAF9F8] rounded-[24px] border border-slate-100/50 group hover:border-primary/20 hover:bg-white hover:shadow-md transition-all cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all shadow-sm">
                <span className="text-[9px] font-black text-slate-400 group-hover:text-white/80 leading-none mb-1">{event.date.split(' ')[0]}</span>
                <span className="text-[15px] font-black text-slate-800 group-hover:text-white leading-none tracking-tighter">{event.date.split(' ')[1]}</span>
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <p className="text-[13px] font-bold text-slate-800 group-hover:text-primary transition-colors truncate mb-0.5">{event.title}</p>
                <p className="text-[10px] font-bold text-slate-400 truncate opacity-80">📍 {event.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
