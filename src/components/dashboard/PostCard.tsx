import React, { useState } from 'react';
import { Post } from '@/types';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const toggleLike = () => setLiked(prev => !prev);
  const toggleComments = () => setShowComments(prev => !prev);

  const percent = Math.min((post.raisedAmount / post.goalAmount) * 100, 100);
  const daysLeft = Math.floor(Math.random() * 60) + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 group border border-slate-100/60"
      style={{
        marginBottom: '40px',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Header - Refined Typography & Spacing */}
      <div className="p-8 pb-0">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={post.organization.logo || '/placeholder-logo.png'}
                alt={post.organization.organizationName}
                className="rounded-2xl object-cover border-2 border-slate-50 shadow-sm"
                style={{
                  width: '48px',
                  height: '48px',
                }}
              />
              {post.organization.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="#22C55E"
                  >
                    <path d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 12.14l-5-4.87 6.91-1.01L12 0z" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-lg font-extrabold text-slate-800 tracking-tight leading-tight">
                  {post.organization.organizationName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-slate-200 text-xs">•</span>
                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-primary/5 text-primary border border-primary/10">
                  {post.category}
                </span>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.05)', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl transition-colors text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-100"
          >
            <MoreHorizontal size={20} />
          </motion.button>
        </div>

        {/* Content */}
        <p className="text-[15px] text-slate-600 font-medium leading-[1.7] mb-6">
          {post.content}
        </p>
      </div>

      {/* Full-width Image */}
      {post.image && (
        <div className="relative overflow-hidden mb-8 aspect-[16/9] group-hover:shadow-lg transition-shadow duration-500">
          <img
            src={post.image}
            alt="Post media"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-6 left-8 flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live Campaign
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Donation Progress Section */}
      <div className="px-8 pb-8">
        <div
          className="rounded-3xl p-8 mb-8"
          style={{
            backgroundColor: 'var(--color-background)',
            border: '1px solid rgba(197, 131, 113, 0.08)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          {/* Amount and Goal */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
                Raised currently
              </span>
              <p className="text-3xl font-black text-primary tracking-tighter">
                ₹{post.raisedAmount.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
                Target Objective
              </span>
              <p className="text-xl font-extrabold text-slate-800 tracking-tight">
                of ₹{post.goalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress Bar with Glow */}
          <div className="mb-6 relative">
            <div
              className="w-full rounded-2xl overflow-hidden bg-white/50 border border-slate-100/50"
              style={{ height: '12px' }}
            >
              <motion.div
                style={{
                  background: 'linear-gradient(90deg, #C58371 0%, #D4A373 100%)',
                  height: '100%',
                  boxShadow: '0 0 15px rgba(197, 131, 113, 0.3)'
                }}
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Progress Stats Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                {percent.toFixed(0)}%
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">funded</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-slate-800">{post.supportersCount.toLocaleString()}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">supporters</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-slate-800">{daysLeft}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">days left</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-[2] rounded-2xl text-white font-black transition-all shadow-lg shadow-primary/20"
              style={{
                background: 'var(--gradient-primary)',
                padding: '16px',
                fontSize: '15px',
                border: 'none',
              }}
            >
              💝 Donate Now
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: '#F3F4F6' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm transition-all"
            >
              Share
            </motion.button>
          </div>
        </div>
      </div>

      {/* Social Interactions */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLike}
          className="flex items-center gap-2 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
          style={{
            color: liked ? '#EF4444' : '#6B7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
          <span style={{ fontSize: '14px', fontWeight: 500 }}>
            {liked ? post.likes + 1 : post.likes}
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleComments}
          className="flex items-center gap-2 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
          style={{
            color: '#6B7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <MessageCircle size={20} />
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{post.comments}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
          style={{
            color: '#6B7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Share2 size={20} />
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Share</span>
        </motion.button>
      </div>

      {/* comment section placeholder */}
      {showComments && (
        <div
          className="border-t mt-4 pt-4"
          style={{ borderColor: '#E5E7EB', backgroundColor: '#F8F6F4', padding: '12px', borderRadius: '8px', marginTop: '16px' }}
        >
          <p style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center' }}>
            Comments coming soon...
          </p>
        </div>
      )}
    </motion.div>
  );
}
