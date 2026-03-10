import React, { useEffect, useState, useRef, useCallback } from 'react';
import PostCard from './PostCard';
import SearchBar from './SearchBar';
import { motion, AnimatePresence } from 'framer-motion';

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/dashboard/user');
        if (response.ok) {
          const data = await response.json();
          // Assuming activeCampaigns or similar for the feed
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
    <div className="space-y-8 pb-20">
      {/* Top Search Bar */}
      <div className="sticky top-6 z-40 bg-[#F7F3EF]/80 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 hidden md:block rounded-b-3xl">
        <SearchBar />
      </div>

      {loading ? (
        // premium skeleton loaders
        [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 p-8"
          >
            <div className="animate-pulse">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-100 rounded-full w-32" />
                  <div className="h-3 bg-slate-50 rounded-full w-24" />
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="h-4 bg-slate-100 rounded-full w-full" />
                <div className="h-4 bg-slate-100 rounded-full w-5/6" />
              </div>
              <div className="h-64 bg-slate-50 rounded-[24px] mb-8" />
              <div className="h-16 bg-slate-50 rounded-2xl w-full" />
            </div>
          </motion.div>
        ))
      ) : (
        <AnimatePresence mode="popLayout">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
