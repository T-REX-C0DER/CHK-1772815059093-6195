'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Megaphone, Target, Image as ImageIcon, Plus, Trash2, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CampaignManagementPage() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-8 pb-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Campaign Management</h1>
          <p className="text-slate-500">Create, monitor, and manage your fundraising campaigns.</p>
        </div>
        {!isCreating && (
          <Button variant="premium" onClick={() => setIsCreating(true)}>
            <Plus className="mr-2" size={20} />
            Create New Campaign
          </Button>
        )}
      </header>

      {isCreating ? (
        <Card className="max-w-3xl border-slate-100 shadow-xl overflow-hidden">
          <CardHeader className="bg-slate-50/50">
            <CardTitle className="text-xl flex items-center gap-2">
               <Megaphone className="text-primary" size={22} />
               New Campaign Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Campaign Title</label>
                   <Input placeholder="e.g. Clean Water Initiative 2024" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Description</label>
                   <textarea 
                    className="w-full min-h-[150px] rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                    placeholder="Tell your story and describe the impact..."
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 font-bold mb-2 block">Target Amount ($)</label>
                      <div className="relative">
                         <Target className="absolute left-3 top-3 text-slate-400" size={18} />
                         <Input className="pl-10" type="number" placeholder="5000" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 font-bold mb-2 block">Campaign Image URL</label>
                      <div className="relative">
                         <ImageIcon className="absolute left-3 top-3 text-slate-400" size={18} />
                         <Input className="pl-10" placeholder="https://..." />
                      </div>
                   </div>
                </div>
             </div>
             <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1 h-12" onClick={() => setIsCreating(false)}>Cancel</Button>
                <Button variant="premium" className="flex-1 h-12">Publish Campaign</Button>
             </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[1, 2, 3].map((i) => (
             <Card key={i} className="group border-slate-100 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col">
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                   <img src={`https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=500&q=80&seed=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-900 border border-white/50">
                      HS-CAM-00{i}
                   </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col space-y-4">
                   <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg text-slate-900 leading-tight">Emergency Flood Relief {i}</h4>
                   </div>
                   <p className="text-xs text-slate-500 line-clamp-2">Protecting families displaced by the recent monsoon floods with food and shelter.</p>
                   
                   <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs font-bold mb-1">
                         <span className="text-primary">$4,250 raised</span>
                         <span className="text-slate-400">Target $10,000</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-primary w-[42%]" />
                      </div>
                   </div>

                   <div className="flex gap-2 pt-4">
                      <Button variant="outline" size="sm" className="flex-1 h-9 text-xs">
                         <Edit size={14} className="mr-2" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="w-10 h-9 p-0 bg-red-50 text-red-500 hover:bg-red-100 border-none">
                         <Trash2 size={16} />
                      </Button>
                   </div>
                </CardContent>
             </Card>
           ))}

           <button 
             onClick={() => setIsCreating(true)}
             className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:bg-slate-50 hover:text-primary transition-all space-y-2 min-h-[300px]"
           >
              <Plus size={32} />
              <span className="font-bold text-sm">Start a New Campaign</span>
           </button>
        </div>
      )}
    </div>
  );
}
