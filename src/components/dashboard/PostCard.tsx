import React, { useState } from 'react';
import {
  Heart, MessageCircle, Share2, MoreHorizontal, ShieldCheck,
  Users, HandHeart, Bookmark, Calendar, MapPin, Megaphone, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Organization {
  id: string;
  organizationName: string;
  logo: string | null;
  city: string;
  verified: boolean;
  organizationType: string;
}

interface Post {
  id: string;
  postType: 'campaign' | 'event' | 'awareness';
  title: string;
  description: string;
  images: string[];
  targetAmount?: number | null;
  raisedAmount?: number | null;
  supportersCount?: number | null;
  eventDate?: string | null;
  location?: string | null;
  category?: string | null;
  likesCount: number;
  createdAt: string;
  organization: Organization;
}

interface Props {
  post: Post | any;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const typeConfig = {
  campaign: {
    label: 'Campaign',
    icon: HandHeart,
    color: 'var(--primary)',
    bg: 'var(--primary-light)',
  },
  event: {
    label: 'Event',
    icon: Calendar,
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
  },
  awareness: {
    label: 'Story',
    icon: Globe,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
  },
};

export default function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likesCount || 0);

  const postType: 'campaign' | 'event' | 'awareness' =
    post.postType || 'campaign';
  const config = typeConfig[postType] ?? typeConfig.campaign;
  const TypeIcon = config.icon;

  // For donation campaigns
  const percent =
    postType === 'campaign' && post.targetAmount && post.raisedAmount
      ? Math.min((post.raisedAmount / post.targetAmount) * 100, 100)
      : 0;

  const coverImage = post.images?.[0] || post.image || null;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c: number) => (liked ? c - 1 : c + 1));
  };

  return (
    <div className="post-card">

      {/* ── NGO Header ── */}
      <div style={{ padding: '20px 24px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>

          {/* Avatar with verified badge */}
          <div className="relative flex-shrink-0">
            <img
              src={
                post.organization?.logo ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${post.organization?.organizationName}&backgroundColor=c8875c&fontColor=ffffff`
              }
              alt={post.organization?.organizationName}
              style={{
                width: 46, height: 46,
                borderRadius: 'var(--radius-btn)',
                objectFit: 'cover',
                border: '2px solid var(--border)',
                background: 'var(--gradient-warm-subtle)',
              }}
            />
            {post.organization?.verified && (
              <div style={{
                position: 'absolute', bottom: -2, right: -2,
                background: 'white', borderRadius: '50%', padding: 1,
                boxShadow: 'var(--shadow-xs)',
              }}>
                <ShieldCheck size={13} style={{ color: '#22C55E', fill: 'rgba(34,197,94,0.1)' }} />
              </div>
            )}
          </div>

          {/* Author info */}
          <div style={{ minWidth: 0 }}>
            <h3 style={{
              fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em',
              color: 'var(--text-main)', margin: 0,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {post.organization?.organizationName}
              {post.organization?.verified && (
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: '2px 6px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(34,197,94,0.1)',
                  color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  Verified
                </span>
              )}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 'var(--fs-micro)', fontWeight: 500, color: 'var(--text-faint)' }}>
                {post.createdAt ? timeAgo(post.createdAt) : '5h ago'}
              </span>
              {post.organization?.city && (
                <>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-faint)', flexShrink: 0 }} />
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 'var(--fs-micro)', fontWeight: 500, color: 'var(--text-faint)' }}>
                    <MapPin size={10} /> {post.organization.city}
                  </span>
                </>
              )}
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-faint)', flexShrink: 0 }} />
              {/* Post type tag */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                background: config.bg, color: config.color,
                fontSize: 'var(--fs-tag)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                <TypeIcon size={9} />
                {config.label}
              </span>
            </div>
          </div>
        </div>

        <button
          style={{
            padding: 8, borderRadius: 'var(--radius-btn)',
            background: 'transparent', border: 'none',
            cursor: 'pointer', color: 'var(--text-faint)', transition: 'all 0.15s',
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

      {/* ── Post Title ── */}
      <div style={{ padding: '0 24px 12px' }}>
        <h4 style={{
          fontSize: 'var(--fs-card-title)', fontWeight: 700,
          color: 'var(--text-main)', margin: 0,
          lineHeight: 1.35, letterSpacing: '-0.01em',
          fontFamily: 'var(--font-heading)',
        }}>
          {post.title}
        </h4>
      </div>

      {/* ── Cover Image ── */}
      {coverImage && (
        <div style={{
          margin: '0 24px 20px',
          position: 'relative', overflow: 'hidden',
          borderRadius: 'var(--radius-img)', aspectRatio: '16/9',
          border: '1px solid var(--border)',
        }}>
          <img
            src={coverImage}
            alt={post.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.6s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
          {/* Category overlay badge */}
          {post.category && (
            <span style={{
              position: 'absolute', top: 12, right: 12,
              padding: '5px 12px', borderRadius: 'var(--radius-pill)',
              background: 'rgba(0,0,0,0.55)', color: 'white',
              fontSize: 'var(--fs-tag)', fontWeight: 700,
              backdropFilter: 'blur(8px)', letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              {post.category}
            </span>
          )}
        </div>
      )}

      {/* ── Description ── */}
      <div style={{ padding: '0 24px 20px' }}>
        <p style={{ margin: 0, lineHeight: 1.65, fontSize: 'var(--fs-body)', color: '#3D3D3D' }}>
          {post.description}
        </p>
      </div>

      {/* ── CAMPAIGN: Progress + CTA ── */}
      {postType === 'campaign' && post.targetAmount && (
        <div style={{ padding: '0 24px 24px' }}>
          <div style={{
            background: 'var(--gradient-warm-subtle)',
            borderRadius: 'var(--radius-card)',
            padding: 20,
            border: '1px solid var(--border)',
          }}>
            {/* Amounts */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
              <div>
                <p style={{ fontSize: 'var(--fs-tag)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: 4 }}>
                  Funds Raised
                </p>
                <p style={{ fontSize: 'var(--fs-num)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--primary)', fontFamily: 'var(--font-heading)', lineHeight: 1, margin: 0 }}>
                  ₹{(post.raisedAmount || 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 'var(--fs-tag)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)', marginBottom: 4 }}>
                  Goal
                </p>
                <p style={{ fontSize: 'var(--fs-card-title)', fontWeight: 700, color: 'var(--text-main)', opacity: 0.7, margin: 0 }}>
                  ₹{post.targetAmount.toLocaleString('en-IN')}
                </p>
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

            {/* Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  padding: '3px 10px', borderRadius: 'var(--radius-btn)',
                  background: 'var(--primary-light)', color: 'var(--primary)',
                  fontSize: 'var(--fs-micro)', fontWeight: 700,
                }}>
                  {percent.toFixed(0)}%
                </span>
                <span style={{ color: 'var(--text-faint)', fontSize: 'var(--fs-micro)', fontWeight: 600 }}>
                  Funded
                </span>
              </div>
              {(post.supportersCount ?? 0) > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-faint)', fontSize: 'var(--fs-micro)', fontWeight: 600 }}>
                  <Users size={13} />
                  {(post.supportersCount || 0).toLocaleString('en-IN')} supporters
                </div>
              )}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
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
      )}

      {/* ── EVENT: Date + Location + CTA ── */}
      {postType === 'event' && (
        <div style={{ padding: '0 24px 24px' }}>
          <div style={{
            background: 'rgba(59,130,246,0.05)',
            borderRadius: 'var(--radius-card)',
            padding: 20,
            border: '1px solid rgba(59,130,246,0.12)',
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
              {post.eventDate && (
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  minWidth: 60, height: 60,
                  borderRadius: 'var(--radius-btn)',
                  background: 'rgba(59,130,246,0.1)', border: '1.5px solid rgba(59,130,246,0.2)',
                  padding: '6px 12px',
                }}>
                  <Calendar size={16} style={{ color: '#3B82F6', marginBottom: 3 }} />
                  <span style={{ fontSize: 'var(--fs-micro)', fontWeight: 700, color: '#3B82F6', textAlign: 'center', lineHeight: 1.2 }}>
                    {post.eventDate}
                  </span>
                </div>
              )}
              {post.location && (
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 'var(--fs-tag)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', display: 'block', marginBottom: 4 }}>
                    Location
                  </span>
                  <span style={{ display: 'flex', alignItems: 'flex-start', gap: 5, fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)' }}>
                    <MapPin size={14} style={{ color: '#3B82F6', marginTop: 1, flexShrink: 0 }} />
                    {post.location}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  flex: 1, padding: '13px', borderRadius: 'var(--radius-btn)',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                  color: 'white', border: 'none', fontWeight: 700,
                  fontSize: 15, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 4px 18px rgba(59,130,246,0.25)',
                }}
              >
                <Users size={17} /> Register / Volunteer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '13px 20px', borderRadius: 'var(--radius-btn)',
                  background: 'transparent', color: '#3B82F6',
                  border: '2px solid rgba(59,130,246,0.2)', fontWeight: 700,
                  fontSize: 15, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.08)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#3B82F6';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(59,130,246,0.2)';
                }}
              >
                <Share2 size={17} /> Share
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* ── AWARENESS: Impact stats row (optional) ── */}
      {postType === 'awareness' && (
        <div style={{ padding: '0 24px 20px' }}>
          <div style={{
            display: 'flex', gap: 10,
            padding: '14px 18px',
            background: 'rgba(16,185,129,0.05)',
            borderRadius: 'var(--radius-btn)',
            border: '1px solid rgba(16,185,129,0.12)',
          }}>
            {post.location && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 'var(--fs-small)', fontWeight: 600, color: '#059669',
              }}>
                <MapPin size={14} /> {post.location}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Social Interaction Bar ── */}
      <div className="social-bar">
        <div className="social-actions">
          <button
            onClick={handleLike}
            className={cn('social-btn', liked && 'active')}
          >
            <Heart size={16} className={liked ? 'fill-current' : ''} />
            <span>{likeCount.toLocaleString('en-IN')}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="social-btn"
          >
            <MessageCircle size={16} />
            <span>Comment</span>
          </button>

          <button className="social-btn">
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>

        <button
          onClick={() => setSaved(!saved)}
          className={cn('social-btn', saved && 'active')}
        >
          <Bookmark size={16} className={saved ? 'fill-current' : ''} />
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
              <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 'var(--radius-btn)',
                  background: 'var(--gradient-warm-subtle)', flexShrink: 0,
                }} />
                <div
                  style={{
                    flex: 1, padding: '10px 16px',
                    background: 'var(--gradient-warm-subtle)',
                    borderRadius: 'var(--radius-card)',
                    color: 'var(--text-faint)', fontSize: 'var(--fs-meta)',
                    cursor: 'text',
                  }}
                >
                  Write a comment...
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
