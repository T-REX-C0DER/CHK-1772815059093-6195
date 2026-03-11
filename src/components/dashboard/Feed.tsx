'use client';

import React, { useEffect, useState, useCallback } from 'react';
import PostCard from './PostCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles, Heart, Users, TrendingUp, Filter,
  Flame, Clock, HandHeart, Calendar, Globe, RefreshCw,
} from 'lucide-react';

type SortMode = 'latest' | 'trending';
type FilterType = 'all' | 'campaign' | 'event' | 'awareness';

const typeFilters: { value: FilterType; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All Posts', icon: Sparkles },
  { value: 'campaign', label: 'Campaigns', icon: HandHeart },
  { value: 'event', label: 'Events', icon: Calendar },
  { value: 'awareness', label: 'Stories', icon: Globe },
];

function SkeletonCard() {
  return (
    <div
      style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        padding: 24,
      }}
    >
      <div className="animate-pulse">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-btn)', background: 'rgba(0,0,0,0.06)' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ height: 14, background: 'rgba(0,0,0,0.06)', borderRadius: 6, width: '45%' }} />
            <div style={{ height: 10, background: 'rgba(0,0,0,0.04)', borderRadius: 6, width: '30%' }} />
          </div>
        </div>
        {/* Title */}
        <div style={{ height: 18, background: 'rgba(0,0,0,0.06)', borderRadius: 6, width: '80%', marginBottom: 10 }} />
        <div style={{ height: 14, background: 'rgba(0,0,0,0.04)', borderRadius: 6, width: '60%', marginBottom: 16 }} />
        {/* Image */}
        <div style={{ height: 200, background: 'rgba(0,0,0,0.05)', borderRadius: 'var(--radius-img)', marginBottom: 20 }} />
        {/* Button */}
        <div style={{ height: 48, background: 'rgba(0,0,0,0.06)', borderRadius: 'var(--radius-btn)' }} />
      </div>
    </div>
  );
}

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isExploring, setIsExploring] = useState(false);
  const [sort, setSort] = useState<SortMode>('latest');
  const [activeType, setActiveType] = useState<FilterType>('all');

  const fetchPosts = useCallback(
    async (cursor: string | null = null, reset = false) => {
      const isFirst = cursor === null;
      if (isFirst) setLoading(true);
      else setLoadingMore(true);

      try {
        const params = new URLSearchParams({ sort, type: activeType });
        if (cursor) params.set('cursor', cursor);
        const res = await fetch(`/api/posts?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(prev => (reset || isFirst ? data.posts : [...prev, ...data.posts]));
          setHasMore(data.hasMore);
          setNextCursor(data.nextCursor);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        if (isFirst) setLoading(false);
        else setLoadingMore(false);
      }
    },
    [sort, activeType]
  );

  // Whenever sort or type changes and we're in explore mode — reload from top
  useEffect(() => {
    if (isExploring) {
      fetchPosts(null, true);
    }
  }, [sort, activeType, isExploring]);

  const handleExplore = () => {
    setIsExploring(true);
    fetchPosts(null, true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 80 }}>

      {/* ── Welcome Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="welcome-banner"
      >
        <h2>Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋</h2>
        <p>Your impact is making a difference. Keep the momentum going.</p>
        <div className="quick-stats">
          <div className="quick-stat">
            <span className="value">
              <Heart size={16} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              12
            </span>
            <span className="label">Donations</span>
          </div>
          <div className="quick-stat">
            <span className="value">
              <Users size={16} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              5
            </span>
            <span className="label">Volunteered</span>
          </div>
          <div className="quick-stat">
            <span className="value">
              <TrendingUp size={16} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              ₹24.5k
            </span>
            <span className="label">Total Given</span>
          </div>
        </div>
      </motion.div>

      {/* ── Feed Section ── */}
      <AnimatePresence mode="wait">
        {!isExploring ? (
          /* ── Empty / Launch State ── */
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)',
              padding: '48px 32px',
              textAlign: 'center',
            }}
          >
            {/* Decorative circles */}
            <div style={{ position: 'relative', width: 90, height: 90, margin: '0 auto 24px' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'var(--gradient-primary)',
                borderRadius: '50%',
                opacity: 0.12,
              }} />
              <div style={{
                position: 'absolute', inset: 8,
                background: 'var(--gradient-primary)',
                borderRadius: '50%',
                opacity: 0.15,
              }} />
              <div style={{
                position: 'absolute', inset: 20,
                background: 'var(--gradient-primary)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={22} style={{ color: 'white' }} />
              </div>
            </div>

            <h3 style={{
              fontSize: 'var(--fs-h2)', fontWeight: 700,
              color: 'var(--text-main)', margin: '0 0 10px',
              fontFamily: 'var(--font-heading)',
            }}>
              Discover Causes That Matter
            </h3>
            <p style={{
              fontSize: 'var(--fs-body)', color: 'var(--text-muted)',
              lineHeight: 1.7, maxWidth: 380, margin: '0 auto 28px',
            }}>
              Explore verified NGOs and orphanages from across India — campaigns, events, and real impact stories, all in one social feed.
            </p>

            {/* Feature pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
              {[
                { icon: HandHeart, label: 'Donation Campaigns', color: 'var(--primary)', bg: 'var(--primary-light)' },
                { icon: Calendar, label: 'NGO Events', color: '#3B82F6', bg: 'rgba(59,130,246,0.08)' },
                { icon: Globe, label: 'Impact Stories', color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
              ].map(pill => {
                const PillIcon = pill.icon;
                return (
                  <span
                    key={pill.label}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 14px', borderRadius: 'var(--radius-pill)',
                      background: pill.bg, color: pill.color,
                      fontSize: 'var(--fs-small)', fontWeight: 600,
                    }}
                  >
                    <PillIcon size={14} /> {pill.label}
                  </span>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExplore}
              className="donate-btn"
              style={{ maxWidth: 260, margin: '0 auto', display: 'flex' }}
            >
              <Sparkles size={18} /> Explore Campaigns
            </motion.button>
          </motion.div>
        ) : (
          /* ── Active Feed ── */
          <motion.div
            key="feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            {/* ── Filter Bar ── */}
            <div className="feed-filter-bar">
              {/* Sort Toggles */}
              <div className="feed-sort-group">
                <button
                  className={`feed-sort-btn ${sort === 'latest' ? 'active' : ''}`}
                  onClick={() => setSort('latest')}
                >
                  <Clock size={14} /> Latest
                </button>
                <button
                  className={`feed-sort-btn ${sort === 'trending' ? 'active' : ''}`}
                  onClick={() => setSort('trending')}
                >
                  <Flame size={14} /> Trending
                </button>
              </div>

              {/* Type Filter Pills */}
              <div className="feed-type-filters">
                {typeFilters.map(f => {
                  const FIcon = f.icon;
                  return (
                    <button
                      key={f.value}
                      className={`feed-type-pill ${activeType === f.value ? 'active' : ''}`}
                      onClick={() => setActiveType(f.value)}
                    >
                      <FIcon size={13} /> {f.label}
                    </button>
                  );
                })}
              </div>

              {/* Refresh */}
              <motion.button
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
                className="feed-refresh-btn"
                onClick={() => fetchPosts(null, true)}
                title="Refresh feed"
              >
                <RefreshCw size={15} />
              </motion.button>
            </div>

            {/* ── Posts ── */}
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <SkeletonCard />
                  </motion.div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center', padding: '48px 32px',
                  background: 'var(--card-bg)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <Filter size={40} style={{ color: 'var(--text-faint)', margin: '0 auto 16px', display: 'block' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h2)', margin: '0 0 8px' }}>
                  No posts found
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)', margin: '0 0 20px' }}>
                  Try changing the filter or sort to discover more posts.
                </p>
                <button
                  onClick={() => { setActiveType('all'); setSort('latest'); }}
                  className="donate-btn"
                  style={{ maxWidth: 180, margin: '0 auto', display: 'flex' }}
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {posts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx < 6 ? idx * 0.07 : 0, duration: 0.4 }}
                    layout
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* ── Load More / End ── */}
            {!loading && posts.length > 0 && (
              <div style={{ textAlign: 'center', paddingTop: 8 }}>
                {hasMore ? (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fetchPosts(nextCursor)}
                    disabled={loadingMore}
                    className="volunteer-btn"
                    style={{ margin: '0 auto', display: 'inline-flex', gap: 8 }}
                  >
                    {loadingMore ? (
                      <>
                        <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        Loading...
                      </>
                    ) : (
                      <>Load More Posts</>
                    )}
                  </motion.button>
                ) : (
                  <p style={{ color: 'var(--text-faint)', fontSize: 'var(--fs-small)', fontWeight: 500 }}>
                    ✨ You've seen all posts — check back soon for more!
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
