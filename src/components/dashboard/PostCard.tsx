import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, ShieldCheck, Users, HandHeart, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  post: any;
}

export default function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const percent = Math.min((post.collectedAmount / post.targetAmount) * 100, 100);
  const daysLeft = 12;

  return (
    <div
      className="post-card"
    >
      {/* ── NGO Header ── */}
      <div
        style={{
          padding: '24px 24px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Avatar with verified badge */}
          <div className="relative flex-shrink-0">
            <img
              src={post.organization?.logo || '/placeholder-logo.png'}
              alt={post.organization?.organizationName}
              style={{
                width: 46,
                height: 46,
                borderRadius: 'var(--radius-btn)',
                objectFit: 'cover',
                border: '2px solid var(--border)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                background: 'white',
                borderRadius: '50%',
                padding: 1,
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <ShieldCheck size={13} className="text-green-500 fill-green-500/10" />
            </div>
          </div>

          {/* Author info */}
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--text-main)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {post.organization?.organizationName}
            </h3>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 4,
              }}
            >
              <span style={{ fontSize: 'var(--fs-micro)', fontWeight: 500, color: 'var(--text-faint)' }}>
                5h ago
              </span>
              <span
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: 'var(--text-faint)',
                  flexShrink: 0,
                }}
              />
              {/* Category tag pill */}
              <span className="category-tag">
                {post.category || 'Environmental'}
              </span>
            </div>
          </div>
        </div>

        <button
          style={{
            padding: 8,
            borderRadius: 'var(--radius-btn)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-faint)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--primary-light)';
            e.currentTarget.style.color = 'var(--primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-faint)';
          }}
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* ── Post Content ── */}
      <div style={{ padding: '0 24px 20px' }}>
        <p className="post-text">{post.description}</p>
        {post.image && (
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 'var(--radius-img)',
              aspectRatio: '16/9',
              border: '1px solid var(--border)',
            }}
          >
            <img
              src={post.image}
              alt="Campaign"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>
        )}
      </div>

      {/* ── Donation Progress Section ── */}
      <div style={{ padding: '0 24px 24px' }}>
        <div
          style={{
            background: 'var(--gradient-warm-subtle)',
            borderRadius: 'var(--radius-card)',
            padding: 24,
            border: '1px solid var(--border)',
          }}
        >
          {/* Amounts row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
            <div>
              <p
                style={{
                  fontSize: 'var(--fs-tag)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-faint)',
                  marginBottom: 6,
                }}
              >
                Funds Raised
              </p>
              <p
                style={{
                  fontSize: 'var(--fs-num)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                ₹{post.collectedAmount?.toLocaleString()}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p
                style={{
                  fontSize: 'var(--fs-tag)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-faint)',
                  marginBottom: 6,
                }}
              >
                Target
              </p>
              <p
                style={{
                  fontSize: 'var(--fs-card-title)',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  opacity: 0.7,
                  margin: 0,
                }}
              >
                of ₹{post.targetAmount?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress Bar — 12px thick */}
          <div className="progress-bar" style={{ height: 12 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="progress-fill"
            />
          </div>

          {/* Stats Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-btn)',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontSize: 'var(--fs-micro)',
                  fontWeight: 700,
                }}
              >
                {percent.toFixed(0)}%
              </span>
              <span style={{ color: 'var(--text-faint)', fontSize: 'var(--fs-micro)', fontWeight: 600 }}>
                Funded
              </span>
            </div>
            <div style={{ display: 'flex', gap: 20, color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 800, fontSize: 'var(--fs-body)' }}>1,245</span>
                <span style={{ fontSize: 'var(--fs-tag)', color: 'var(--text-faint)', marginTop: 1 }}>Supporters</span>
              </div>
              <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 800, fontSize: 'var(--fs-body)' }}>{daysLeft}</span>
                <span style={{ fontSize: 'var(--fs-tag)', color: 'var(--text-faint)', marginTop: 1 }}>Days Left</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="donate-btn"
              style={{ flex: 1 }}
            >
              <HandHeart size={17} /> Donate Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="volunteer-btn"
            >
              <Users size={17} /> Volunteer
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Social Interaction Bar ── */}
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

        <button
          onClick={() => setSaved(!saved)}
          className={cn("social-btn", saved && "active")}
        >
          <Bookmark size={16} className={saved ? "fill-current" : ""} />
        </button>
      </div>

      {/* ── Comment Section ── */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 24px 24px' }}>
              <div
                style={{
                  paddingTop: 16,
                  display: 'flex',
                  gap: 12,
                  borderTop: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-btn)',
                    background: 'var(--gradient-warm-subtle)',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      padding: 16,
                      background: 'var(--gradient-warm-subtle)',
                      borderRadius: 'var(--radius-card)',
                    }}
                  >
                    <p style={{ fontSize: 'var(--fs-meta)', fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>
                      Marcus J.
                    </p>
                    <p style={{ fontSize: 'var(--fs-meta)', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      Just donated! So happy to support this vital work. Keep it up team! 👏
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, marginLeft: 8 }}>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 'var(--fs-tag)',
                        fontWeight: 700,
                        color: 'var(--text-faint)',
                      }}
                    >
                      Like
                    </button>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 'var(--fs-tag)',
                        fontWeight: 700,
                        color: 'var(--text-faint)',
                      }}
                    >
                      Reply
                    </button>
                    <span style={{ fontSize: 'var(--fs-tag)', fontWeight: 600, color: 'var(--text-faint)' }}>38m</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
