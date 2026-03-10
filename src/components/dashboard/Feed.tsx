import React, { useEffect, useState, useRef, useCallback } from 'react';
import PostCard from './PostCard';
import { Post } from '@/types';
import { motion } from 'framer-motion';

// simple cursor-based pagination
export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const loadMore = async () => {
    setLoading(true);
    const cursor = posts.length ? posts[posts.length - 1].createdAt : undefined;
    const res = await fetch(`/api/posts${cursor ? `?cursor=${cursor}` : ''}`);
    if (res.ok) {
      const json = await res.json();
      setPosts(prev => [...prev, ...json.posts]);
      setHasMore(json.hasMore);
    }
    setLoading(false);
    setInitialLoad(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className="space-y-6">
      {initialLoad && loading ? (
        // premium skeleton loaders
        [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100"
          >
            <div className="animate-pulse">
              <div className="h-16 bg-slate-50 border-b border-slate-100" />
              <div className="p-8 space-y-6">
                <div className="h-5 bg-slate-100 rounded-full w-3/4" />
                <div className="h-64 bg-slate-50 rounded-2xl" />
                <div className="space-y-3">
                  <div className="h-4 bg-slate-100 rounded-full w-full" />
                  <div className="h-4 bg-slate-100 rounded-full w-5/6" />
                </div>
                <div className="h-12 bg-slate-100 rounded-xl w-full" />
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        posts.map((post, idx) => {
          if (idx === posts.length - 1) {
            return (
              <div ref={lastPostRef} key={post.id}>
                <PostCard post={post} />
              </div>
            );
          }
          return <PostCard key={post.id} post={post} />;
        })
      )}

      {loading && !initialLoad && (
        <div className="flex justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 border-4 border-[rgba(197,131,113,0.1)] border-t-[var(--color-primary)] rounded-full"
          />
        </div>
      )}
    </div>
  );
}
