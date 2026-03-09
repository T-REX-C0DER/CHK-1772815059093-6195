'use client';

import React, { useEffect, useState } from 'react';
import { api } from './api';
import { Bell, Heart, Users, MessageSquare, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await api.getNotifications();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'donation': return <Heart size={18} color="#FF6B6B" />;
      case 'volunteer': return <Users size={18} color="#4DABF7" />;
      case 'shelter': return <MessageSquare size={18} color="#51CF66" />;
      case 'badge': return <Award size={18} color="#FCC419" />;
      default: return <Bell size={18} color="var(--text-muted)" />;
    }
  };

  return (
    <div className="notifications-section">
      <div className="section-header">
        <h2>Notifications</h2>
        <p>Stay updated on your impact and opportunities.</p>
      </div>

      <div className="notifications-list">
        {loading ? (
          <p>Loading notifications...</p>
        ) : (
          notifications.map((note) => (
            <motion.div 
              key={note.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`panel-card notification-item ${note.read_status ? 'read' : 'unread'}`}
            >
              <div className="note-icon">
                {getIcon(note.type)}
              </div>
              <div className="note-content">
                <p className="note-message">{note.message}</p>
                <span className="note-date">{new Date(note.created_at).toLocaleString()}</span>
              </div>
              {!note.read_status && <div className="unread-dot"></div>}
            </motion.div>
          ))
        )}
        {!loading && notifications.length === 0 && (
          <div className="panel-card empty-state-card">
            <Bell size={48} color="#EEDFD7" />
            <p>No new notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
