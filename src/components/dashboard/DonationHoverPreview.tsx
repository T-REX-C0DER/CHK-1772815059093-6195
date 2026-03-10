"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Landmark, Package } from 'lucide-react';

interface DonationHoverPreviewProps {
    isVisible: boolean;
    data: {
        totalDonations: number;
        campaignsSupported: number;
        itemsDonated: number;
    };
}

export default function DonationHoverPreview({ isVisible, data }: DonationHoverPreviewProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                        position: 'absolute',
                        left: 'calc(100% + 12px)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '260px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(197, 131, 113, 0.08)',
                        padding: '20px',
                        zIndex: 100,
                        pointerEvents: 'none',
                    }}
                >
                    <div className="space-y-4">
                        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            Donation Summary
                        </h5>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-xl font-extrabold text-slate-800 tracking-tight">₹{data.totalDonations.toLocaleString()}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Donated</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <Landmark size={14} className="text-primary mb-1.5" />
                                <p className="text-sm font-bold text-slate-800">{data.campaignsSupported}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Campaigns</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <Package size={14} className="text-primary mb-1.5" />
                                <p className="text-sm font-bold text-slate-800">{data.itemsDonated}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Food Kits</p>
                            </div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div style={{
                        position: 'absolute',
                        left: '-6px',
                        top: '50%',
                        transform: 'translateY(-50%) rotate(45deg)',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#FFFFFF',
                        borderLeft: '1px solid rgba(197, 131, 113, 0.08)',
                        borderBottom: '1px solid rgba(197, 131, 113, 0.08)',
                    }} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
