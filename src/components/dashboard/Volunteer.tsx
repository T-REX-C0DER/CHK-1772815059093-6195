'use client';

import React, { useEffect, useState } from 'react';
import { api } from './api';
import { motion } from 'framer-motion';
import { Clock, Award } from 'lucide-react';

export default function Volunteer() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await api.getVolunteerActivities();
        setActivities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const totalHours = activities.reduce((sum, a) => sum + parseFloat(a.hours), 0);

  return (
    <div className="volunteer-section">
      <div className="section-header">
        <h2>Volunteer Activities</h2>
        <div className="donation-summary">
          <div className="summary-card">
            <span className="label">Total Hours</span>
            <span className="value">{totalHours}h</span>
          </div>
          <div className="summary-card">
            <span className="label">Impact Points</span>
            <span className="value">{totalHours * 10}</span>
          </div>
        </div>
      </div>

      <div className="activity-grid">
        {loading ? (
          <p>Loading activities...</p>
        ) : (
          activities.map((activity) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="panel-card activity-card"
            >
              <div className="activity-header">
                <div>
                  <h3 className="activity-org">{activity.organization_name}</h3>
                  <p className="activity-role">{activity.role}</p>
                </div>
                <div className="activity-badge">
                  <Clock size={14} />
                  <span>{activity.hours}h</span>
                </div>
              </div>
              <p className="activity-impact">{activity.impact_summary}</p>
              <div className="activity-footer">
                <span className="activity-date">{new Date(activity.activity_date).toLocaleDateString()}</span>
                <div className="impact-points">
                   <Award size={14} />
                   <span>+{parseFloat(activity.hours) * 10} points</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
        {!loading && activities.length === 0 && <p className="empty-state">You haven't volunteered yet. Start making an impact!</p>}
      </div>
    </div>
  );
}
