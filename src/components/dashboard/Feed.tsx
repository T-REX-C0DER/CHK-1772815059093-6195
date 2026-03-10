import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Heart, Users, TrendingUp } from 'lucide-react';

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/dashboard/user');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.activeCampaigns || []);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

      {/* ── Posts / Skeletons / Empty ── */}
      {loading ? (
        [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div className="skeleton-avatar" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div className="skeleton-line" style={{ width: '45%' }} />
                  <div className="skeleton-line" style={{ width: '30%', height: 10 }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                <div className="skeleton-line" style={{ width: '100%' }} />
                <div className="skeleton-line" style={{ width: '80%' }} />
              </div>
              <div className="skeleton-image" />
              <div className="skeleton-line" style={{ width: '100%', height: 48, borderRadius: 'var(--radius-btn)', marginTop: 24 }} />
            </div>
          </motion.div>
        ))
      ) : posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="empty-state"
          style={{
            background: 'var(--card-bg)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="icon">
            <Sparkles size={48} style={{ color: 'var(--primary)', margin: '0 auto' }} />
          </div>
          <h3>Your feed is looking quiet</h3>
          <p>Follow organizations and explore campaigns to discover causes you care about.</p>
          <button
            onClick={() => (window.location.href = '/dashboard/user/campaigns')}
            className="donate-btn"
            style={{ maxWidth: 240, margin: '24px auto 0' }}
          >
            Explore Campaigns
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
