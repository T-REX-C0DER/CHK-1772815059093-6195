import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  post: any;
}

export default function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const percent = Math.min((post.collectedAmount / post.targetAmount) * 100, 100);
  const daysLeft = 12; // Example static value or calculated

  return (
    <div
      className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 border border-slate-100/60 group"
    >
      {/* NGO Header */}
      <div className="p-6 md:p-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={post.organization?.logo || '/placeholder-logo.png'}
              alt={post.organization?.organizationName}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-50">
              <ShieldCheck size={14} className="text-green-500 fill-green-500/10" />
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="font-extrabold text-slate-800 tracking-tight truncate leading-tight">{post.organization?.organizationName}</h3>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] font-bold text-slate-400">
              <span className="whitespace-nowrap">5h ago</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full flex-shrink-0" />
              <span className="text-primary uppercase tracking-widest truncate">{post.category || 'Environmental'}</span>
            </div>
          </div>
        </div>
        <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all hover:text-slate-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-6 md:px-8 mb-5">
        <p className="text-slate-700 font-medium leading-relaxed mb-5 text-[15px]">
          {post.description}
        </p>
        {post.image && (
          <div className="relative rounded-[16px] overflow-hidden aspect-[16/9] bg-slate-50 border border-slate-100/50">
            <img
              src={post.image}
              alt="Cause"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        )}
      </div>

      {/* Donation Progress Section */}
      <div className="px-6 md:px-8 mb-6">
        <div className="bg-[#FAF9F8] rounded-[28px] p-6 md:p-8 border border-slate-100/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-end mb-5">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-80">Funds Raised</p>
              <p className="text-3xl font-black text-primary tracking-tighter">₹{post.collectedAmount?.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-80">Target Goal</p>
              <p className="text-xl font-extrabold text-slate-800 tracking-tight opacity-90">of ₹{post.targetAmount?.toLocaleString()}</p>
            </div>
          </div>

          <div className="h-3 bg-white border border-slate-100 rounded-full overflow-hidden mb-5 relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 bg-primary rounded-full shadow-[0_0_12px_rgba(216,138,111,0.4)]"
            />
          </div>

          <div className="flex justify-between items-center mb-8 text-[11px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/5">{percent.toFixed(0)}%</span>
              <span className="text-slate-400">Accomplished</span>
            </div>
            <div className="flex gap-5 text-slate-600">
              <div className="flex flex-col items-end">
                <span className="text-slate-800">1,245</span>
                <span className="text-[9px] text-slate-400 mt-0.5">Supporters</span>
              </div>
              <div className="w-px h-7 bg-slate-200" />
              <div className="flex flex-col items-end">
                <span className="text-slate-800">{daysLeft}</span>
                <span className="text-[9px] text-slate-400 mt-0.5">Days Left</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-4 bg-[#F6E3DA] text-[#D88A6F] hover:bg-[#D88A6F] hover:text-white text-[15px] font-bold rounded-[14px] shadow-sm flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Heart size={18} className={cn("fill-current")} /> Donate Now
          </motion.button>
        </div>
      </div>

      {/* Social Interactions */}
      <div className="px-6 md:px-8 pb-6 flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className={cn(
              "flex items-center gap-2 transition-all px-4 py-2.5 rounded-[12px]",
              liked ? "bg-[#F6E3DA] text-[#D88A6F]" : "bg-slate-50/80 hover:bg-slate-100 text-slate-500 hover:text-slate-700"
            )}
          >
            <Heart size={18} className={liked ? "fill-current" : ""} />
            <span className="text-[13px] font-bold">2.4k</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 transition-all px-4 py-2.5 rounded-[12px] bg-slate-50/80 hover:bg-slate-100 text-slate-500 hover:text-slate-700"
          >
            <MessageCircle size={18} />
            <span className="text-[13px] font-bold">128</span>
          </button>

          <button
            className="flex items-center gap-2 transition-all px-4 py-2.5 rounded-[12px] bg-slate-50/80 hover:bg-slate-100 text-slate-500 hover:text-slate-700"
          >
            <Share2 size={18} />
            <span className="text-[13px] font-bold">Share</span>
          </button>
        </div>

        <button className="flex items-center gap-2 transition-all px-5 py-2.5 rounded-[12px] bg-primary text-white hover:bg-primary/90 hover:scale-105 shadow-sm shadow-primary/20">
          <Heart size={16} className="fill-white" />
          <span className="text-[13px] font-bold">Donate</span>
        </button>
      </div>

      {/* Comment Section placeholder */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-8 pb-8 overflow-hidden"
          >
            <div className="pt-6 border-t border-slate-100 flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex-shrink-0" />
              <div className="flex-1">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-800 mb-1">Marcus J.</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Just donated! So happy to support this vital work. Keep it up team! 👏
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 ml-2 text-[10px] font-bold text-slate-400">
                  <button className="hover:text-primary">Like</button>
                  <button className="hover:text-primary">Reply</button>
                  <span>38m</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
