import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, ShieldCheck, Users, HandHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  post: any;
}

export default function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const percent = Math.min((post.collectedAmount / post.targetAmount) * 100, 100);
  const daysLeft = 12;

  return (
    <div
      className="bg-white overflow-hidden group border"
      style={{
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        borderColor: 'var(--border-soft)',
        transition: 'var(--transition-smooth)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* NGO Header */}
      <div className="px-6 pt-6 pb-3 flex items-center justify-between md:px-7">
        <div className="flex items-center gap-3.5">
          <div className="relative flex-shrink-0">
            <img
              src={post.organization?.logo || '/placeholder-logo.png'}
              alt={post.organization?.organizationName}
              className="w-12 h-12 object-cover"
              style={{ borderRadius: 14, border: '2px solid var(--border-soft)' }}
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
              <ShieldCheck size={13} className="text-green-500 fill-green-500/10" />
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-[15px] tracking-tight truncate leading-tight" style={{ color: 'var(--text-main)' }}>
              {post.organization?.organizationName}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold" style={{ color: 'var(--text-faint)' }}>
              <span className="whitespace-nowrap">5h ago</span>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--text-faint)' }} />
              <span className="uppercase tracking-widest truncate" style={{ color: 'var(--primary-brand)' }}>
                {post.category || 'Environmental'}
              </span>
            </div>
          </div>
        </div>
        <button
          className="p-2.5 rounded-xl transition-all"
          style={{ color: 'var(--text-faint)' }}
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-6 md:px-7 mb-4">
        <p className="post-text">{post.description}</p>
        {post.image && (
          <div className="relative overflow-hidden aspect-[16/9]" style={{ borderRadius: 16, background: 'var(--gradient-warm-subtle)', border: '1px solid var(--border-soft)' }}>
            <img
              src={post.image}
              alt="Cause"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        )}
      </div>

      {/* Donation Progress Section */}
      <div className="px-6 md:px-7 mb-5">
        <div
          className="p-6"
          style={{
            background: 'var(--gradient-warm-subtle)',
            borderRadius: 18,
            border: '1px solid var(--border-soft)',
          }}
        >
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-faint)' }}>Funds Raised</p>
              <p className="text-2xl font-extrabold tracking-tighter" style={{ color: 'var(--primary-brand)' }}>₹{post.collectedAmount?.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-faint)' }}>Target Goal</p>
              <p className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-main)', opacity: 0.8 }}>of ₹{post.targetAmount?.toLocaleString()}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar" style={{ height: 10 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="progress-fill"
            />
          </div>

          {/* Stats Row */}
          <div className="flex justify-between items-center mt-4 text-[11px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-1 rounded-lg"
                style={{ background: 'rgba(197, 131, 113, 0.1)', color: 'var(--primary-brand)' }}
              >{percent.toFixed(0)}%</span>
              <span style={{ color: 'var(--text-faint)' }}>Funded</span>
            </div>
            <div className="flex gap-5" style={{ color: 'var(--text-muted)' }}>
              <div className="flex flex-col items-end">
                <span style={{ color: 'var(--text-main)', fontWeight: 800 }}>1,245</span>
                <span className="text-[9px] mt-0.5" style={{ color: 'var(--text-faint)' }}>Supporters</span>
              </div>
              <div className="w-px h-7" style={{ background: 'var(--border-soft)' }} />
              <div className="flex flex-col items-end">
                <span style={{ color: 'var(--text-main)', fontWeight: 800 }}>{daysLeft}</span>
                <span className="text-[9px] mt-0.5" style={{ color: 'var(--text-faint)' }}>Days Left</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3.5 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
                boxShadow: '0 4px 16px rgba(197, 131, 113, 0.25)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <HandHeart size={17} /> Donate Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="py-3.5 px-5 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                background: 'transparent',
                color: 'var(--primary-brand)',
                border: '2px solid rgba(197, 131, 113, 0.25)',
                cursor: 'pointer',
              }}
            >
              <Users size={17} /> Volunteer
            </motion.button>
          </div>
        </div>
      </div>

      {/* Social Interactions */}
      <div className="social-bar">
        <div className="social-actions">
          <button
            onClick={() => setLiked(!liked)}
            className={cn("social-btn", liked && "active")}
          >
            <Heart size={16} className={liked ? "fill-current" : ""} />
            <span>2.4k</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="social-btn"
          >
            <MessageCircle size={16} />
            <span>128</span>
          </button>

          <button className="social-btn">
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comment Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-7 pb-6 overflow-hidden"
          >
            <div className="pt-4 flex gap-3" style={{ borderTop: '1px solid var(--border-soft)' }}>
              <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: 'var(--gradient-warm-subtle)' }} />
              <div className="flex-1">
                <div className="p-4" style={{ background: 'var(--gradient-warm-subtle)', borderRadius: 14 }}>
                  <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-main)' }}>Marcus J.</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Just donated! So happy to support this vital work. Keep it up team! 👏
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 ml-2 text-[10px] font-bold" style={{ color: 'var(--text-faint)' }}>
                  <button className="hover:text-primary transition-colors" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>Like</button>
                  <button className="hover:text-primary transition-colors" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>Reply</button>
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
