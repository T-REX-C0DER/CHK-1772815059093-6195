'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Grid, 
  Heart, 
  Users, 
  Flag, 
  MessageSquare, 
  Bookmark, 
  Bell, 
  User, 
  Settings, 
  Search, 
  MoreHorizontal, 
  Share2, 
  MessageCircle, 
  Heart as HeartIcon,
  ChevronDown,
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './dashboard.css';

// Mock Data
const NGO_POSTS = [
  {
    id: 1,
    ngo: {
      name: "Green Earth Alliance",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=green",
      verified: true
    },
    time: "2 hours ago",
    category: "Environment",
    content: {
      text: "We're on a mission to plant 10,000 native trees in the deforested regions of the Amazon this month. Every $5 helps us plant and maintain one tree for its first crucial year. Let's restore our planet's lungs together! 🌳🌍",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000"
    },
    donation: {
      raised: 15450,
      goal: 25000,
      supporters: 1245,
      daysLeft: 12
    },
    stats: {
      likes: "2.4k",
      comments: 128,
      shares: 45
    }
  },
  {
    id: 2,
    ngo: {
      name: "Education First Foundation",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=edu",
      verified: true
    },
    time: "5 hours ago",
    category: "Education",
    content: {
      text: "A huge thank you to all our weekend volunteers! We successfully renovated the community library in the downtown district and sorted over 2,000 donated books. The kids are going to love their new reading space. 📚✨",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000"
    },
    donation: null, // Just a post, no campaign
    stats: {
      likes: 892,
      comments: 42,
      shares: 12
    }
  }
];

const IMPACT_STATS = [
  { label: "Lives Impacted", value: "24.5k", suffix: "Today" },
  { label: "Active Volunteers", value: "1,240", suffix: "" },
  { label: "Ongoing Campaigns", value: "85", suffix: "" },
  { label: "Raised this Week", value: "$1.2M", suffix: "" }
];

const TRENDING_CAMPAIGNS = [
  { name: "Clean Water for Rural Villages", progress: 85, org: "Water.org" },
  { name: "Winter Blankets Distribution", progress: 40, org: "Red Cross" },
  { name: "School Meals Program", progress: 92, org: "Save the Children" }
];

const UPCOMING_EVENTS = [
  { title: "Beach Cleanup Drive", date: "OCT 14", location: "Santa Monica Pier", time: "9:00 AM" },
  { title: "Food Bank Sorting", date: "OCT 18", location: "Downtown Center", time: "2:00 PM" }
];

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  const toggleComments = (postId: number) => {
    setExpandedComments(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const SkeletonPost = () => (
    <div className="post-card skeleton">
      <div className="post-header">
        <div className="post-author">
          <div className="skeleton-avatar"></div>
          <div className="author-info">
            <div className="skeleton-line" style={{ width: 120 }}></div>
            <div className="skeleton-line" style={{ width: 80, height: 10 }}></div>
          </div>
        </div>
      </div>
      <div className="post-content">
        <div className="skeleton-line" style={{ width: '90%' }}></div>
        <div className="skeleton-line" style={{ width: '70%' }}></div>
        <div className="skeleton-image"></div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* 1️⃣ Left Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-box" style={{ background: 'var(--primary-brand)', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HeartIcon size={18} color="white" fill="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--neutral-dark)' }}>HelpSphere</span>
        </div>

        <nav className="nav-menu">
          {[
            { name: 'Home', icon: Home },
            { name: 'Categories', icon: Grid },
            { name: 'My Donations', icon: Heart },
            { name: 'Volunteer Activities', icon: Users },
            { name: 'Campaigns', icon: Flag },
            { name: 'Messages', icon: MessageSquare },
            { name: 'Saved Posts', icon: Bookmark },
            { name: 'Notifications', icon: Bell },
            { name: 'My Profile', icon: User },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ x: 4 }}
              onClick={() => setActiveMenu(item.name)}
              className={`nav-item ${activeMenu === item.name ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </motion.div>
          ))}
        </nav>
      </aside>

      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* 2️⃣ Top Navigation */}
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="search-bar">
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search organizations, campaigns, causes..." 
              className="search-input"
            />
          </div>

          <div className="header-actions">
            <button className="icon-btn">
              <MessageSquare size={20} />
            </button>
            <button className="icon-btn" style={{ position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, background: '#FF4D4D', borderRadius: '50%', border: '2px solid white' }}></span>
            </button>
            <div className="user-profile">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
                alt="Profile" 
                className="author-avatar"
                style={{ width: 40, height: 40, cursor: 'pointer' }}
              />
              <ChevronDown size={14} color="var(--text-muted)" />
            </div>
          </div>
        </header>

        {/* 3️⃣ Center Feed & Right Panel */}
        <div className="dashboard-grid">
          {/* Feed */}
          <main className="feed-container">
            {isLoading ? (
              <>
                <SkeletonPost />
                <SkeletonPost />
              </>
            ) : (
              NGO_POSTS.map((post) => (
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={post.id} 
                  className="post-card"
                >
                <div className="post-header">
                  <div className="post-author">
                    <img src={post.ngo.logo} alt={post.ngo.name} className="author-avatar" />
                    <div className="author-info">
                      <h3>
                        {post.ngo.name}
                        {post.ngo.verified && (
                          <span style={{ color: '#3182CE', display: 'inline-flex' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17Z" />
                            </svg>
                          </span>
                        )}
                      </h3>
                      <p>{post.time} • {post.category}</p>
                    </div>
                  </div>
                  <button className="icon-btn" style={{ border: 'none', background: 'transparent' }}>
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="post-content">
                  <p className="post-text">{post.content.text}</p>
                  <img src={post.content.image} alt="Campaign" className="post-image" />

                  {post.donation && (
                    <div className="donation-section">
                      <div className="progress-header">
                        <span style={{ color: 'var(--primary-brand)' }}>${post.donation.raised.toLocaleString()} raised</span>
                        <span style={{ color: 'var(--text-muted)' }}>of ${post.donation.goal.toLocaleString()} goal</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(post.donation.raised / post.donation.goal) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="progress-fill"
                        ></motion.div>
                      </div>
                      <div className="progress-stats">
                        <span>{post.donation.supporters.toLocaleString()} supporters</span>
                        <span>{post.donation.daysLeft} days left</span>
                      </div>
                      <button className="donate-btn" style={{ marginTop: 20 }}>
                        <Heart size={18} fill="white" style={{ marginRight: 8, display: 'inline' }} />
                        Donate Now
                      </button>
                    </div>
                  )}

                  <div className="post-interactions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: 16 }}>
                    <div style={{ display: 'flex', gap: 24 }}>
                      <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <HeartIcon size={20} />
                        <span>{post.stats.likes}</span>
                      </button>
                      <button 
                        onClick={() => toggleComments(post.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        <MessageCircle size={20} />
                        <span>{post.stats.comments}</span>
                      </button>
                      <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <Share2 size={20} />
                        <span>{post.stats.shares}</span>
                      </button>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <Bookmark size={20} />
                    </button>
                  </div>
                  
                  {/* Expanded Comment Example */}
                  <AnimatePresence>
                    {expandedComments.includes(post.id) && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ marginTop: 16, padding: '12px 16px', background: '#F8F5F3', borderRadius: 12 }}>
                          <div style={{ display: 'flex', gap: 10 }}>
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.id === 1 ? 'Marcus' : 'Sarah'}`} style={{ width: 32, height: 32, borderRadius: 8 }} alt="User" />
                            <div>
                              <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{post.id === 1 ? 'Marcus J.' : 'Sarah L.'} <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: 4 }}>• 38m</span></p>
                              <p style={{ fontSize: '0.85rem', marginTop: 2 }}>{post.id === 1 ? 'Just donated! So happy to support this vital work. Keep it up team! 👏👏' : 'This is such an important cause. Shared with my network! ❤️'}</p>
                            </div>
                          </div>
                          <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{ flex: 1, background: 'white', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                              <input type="text" placeholder="Write a comment..." style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.8rem' }} />
                            </div>
                            <button style={{ background: 'var(--primary-brand)', color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', fontSize: '0.8rem', fontWeight: 600 }}>Post</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                </motion.article>
              ))
            )}
          </main>

          {/* Right Side Panel */}
          <aside className="right-panel">
            <div className="panel-card">
              <h2 className="panel-title">Your Impact Network</h2>
              <div className="impact-stats">
                {IMPACT_STATS.map((stat) => (
                  <div key={stat.label} className="stat-item">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                    {stat.suffix && <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>{stat.suffix}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-title">
                <span>Trending Campaigns</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary-brand)', cursor: 'pointer' }}>View All</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {TRENDING_CAMPAIGNS.map((campaign) => (
                  <div key={campaign.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{campaign.name}</span>
                    </div>
                    <div style={{ height: 4, background: '#EEDFD7', borderRadius: 2 }}>
                      <div style={{ width: `${campaign.progress}%`, height: '100%', background: 'var(--primary-brand)', borderRadius: 2 }}></div>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{campaign.progress}% funded • {campaign.org}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card">
              <h2 className="panel-title">Suggested to Follow</h2>
              {[
                { name: "World Wildlife Fund", category: "Animal Welfare", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=WWF" },
                { name: "Doctors Without Borders", category: "Health", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DWB" }
              ].map((ngo) => (
                <div key={ngo.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={ngo.avatar} loading="lazy" style={{ width: 36, height: 36, borderRadius: 8 }} alt={ngo.name} />
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{ngo.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ngo.category}</p>
                    </div>
                  </div>
                  <button style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #EEDFD7', background: 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Follow</button>
                </div>
              ))}
            </div>

            <div className="panel-card">
              <h2 className="panel-title">Upcoming Volunteer Events</h2>
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.title} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 50, height: 50, background: '#F8F5F3', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary-brand)' }}>{event.date.split(' ')[0]}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>{event.date.split(' ')[1]}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{event.title}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{event.location} • {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* 📱 Mobile Floating CTA */}
      <button className="floating-cta">
        <Plus size={24} />
      </button>

      {/* 📱 Mobile Navigation */}
      <nav className="mobile-nav">
        {[
          { name: 'Home', icon: Home },
          { name: 'Search', icon: Search },
          { name: 'Campaigns', icon: Flag },
          { name: 'Notifications', icon: Bell },
          { name: 'Profile', icon: User },
        ].map((item) => (
          <button key={item.name} style={{ background: 'none', border: 'none', color: activeMenu === item.name ? 'var(--primary-brand)' : 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <item.icon size={20} />
            <span style={{ fontSize: '0.65rem' }}>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
