'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Info, User, Calendar, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ShelterRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Request submitted successfully!');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Request a Shelter</h1>
        <p className="text-slate-500">Help someone find a safe place to stay by providing details below.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-slate-100 shadow-md overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg flex items-center gap-2">
                 <User className="text-primary" size={20} />
                 Person Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                    <Input placeholder="Enter person's name" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Estimated Age</label>
                    <Input type="number" placeholder="e.g. 45" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Current Location / Landmark</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                    <Input className="pl-10" placeholder="e.g. 15th St & Main, near the park" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Situation Description</label>
                  <textarea 
                    className="w-full min-h-[120px] rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                    placeholder="Describe their current situation and why they need shelter..."
                    required
                  ></textarea>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Add a Photo (Optional)</label>
                   <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-all cursor-pointer">
                      <Camera size={32} className="mb-2" />
                      <span className="text-sm font-medium">Click to upload or drag & drop</span>
                   </div>
                </div>

                <Button type="submit" variant="premium" className="w-full h-12 text-lg" disabled={isSubmitting}>
                   {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
           <Card className="border-none bg-indigo-50 text-indigo-900 overflow-hidden relative">
              <div className="absolute -right-4 -top-4 opacity-10">
                 <Info size={120} />
              </div>
              <CardContent className="p-6 relative z-10">
                 <h4 className="font-bold flex items-center gap-2">
                    <Info size={18} /> How it works
                 </h4>
                 <ul className="mt-4 space-y-4 text-xs font-medium leading-relaxed">
                    <li className="flex gap-3">
                       <span className="flex-shrink-0 w-5 h-5 bg-indigo-200 rounded-full flex items-center justify-center text-[10px]">1</span>
                       Submit details about the person in need and their location.
                    </li>
                    <li className="flex gap-3">
                       <span className="flex-shrink-0 w-5 h-5 bg-indigo-200 rounded-full flex items-center justify-center text-[10px]">2</span>
                       Our partner NGOs and shelters in the area will be notified immediately.
                    </li>
                    <li className="flex gap-3">
                       <span className="flex-shrink-0 w-5 h-5 bg-indigo-200 rounded-full flex items-center justify-center text-[10px]">3</span>
                       Once an NGO accepts the request, we'll coordinate the pickup.
                    </li>
                 </ul>
              </CardContent>
           </Card>

           <Card className="border-slate-100">
              <CardHeader className="p-4 bg-slate-50/50">
                 <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    My Previous Requests
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 {[1, 2].map((i) => (
                   <div key={i} className="p-4 border-t border-slate-100 flex items-center justify-between text-xs transition-colors hover:bg-slate-50 cursor-pointer">
                      <div>
                         <p className="font-bold text-slate-900">John Roe</p>
                         <p className="text-slate-500">Submitted on Oct {12-i}</p>
                      </div>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full font-bold",
                        i === 1 ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                      )}>
                        {i === 1 ? 'ACCEPTED' : 'PENDING'}
                      </span>
                   </div>
                 ))}
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
