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
    <div className="space-y-6 pb-20">
      {/* Welcome Banner */}
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

      {/* Posts */}
      {loading ? (
        // Premium skeleton loaders
        [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white overflow-hidden border p-7"
            style={{
              borderRadius: 'var(--radius-card)',
              borderColor: 'var(--border-soft)',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div className="animate-pulse">
              <div className="flex items-center gap-4 mb-7">
                <div className="skeleton-avatar" />
                <div className="space-y-2 flex-1">
                  <div className="skeleton-line" style={{ width: '45%' }} />
                  <div className="skeleton-line" style={{ width: '30%', height: 10 }} />
                </div>
              </div>
              <div className="space-y-3 mb-7">
                <div className="skeleton-line" style={{ width: '100%' }} />
                <div className="skeleton-line" style={{ width: '80%' }} />
              </div>
              <div className="skeleton-image" />
              <div className="skeleton-line mt-6" style={{ width: '100%', height: 48, borderRadius: 14 }} />
            </div>
          </motion.div>
        ))
      ) : posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="empty-state bg-white border"
          style={{
            borderRadius: 'var(--radius-card)',
            borderColor: 'var(--border-soft)',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div className="icon">
            <Sparkles size={48} style={{ color: 'var(--primary-brand)', margin: '0 auto' }} />
          </div>
          <h3>Your feed is looking quiet</h3>
          <p>Follow organizations and explore campaigns to discover causes you care about.</p>
          <button
            className="btn btn-primary mt-6"
            onClick={() => window.location.href = '/dashboard/user/campaigns'}
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
