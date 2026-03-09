'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Heart, Users } from 'lucide-react';
import { api } from './api';

interface CategoriesProps {
  selectedCategory: string;
}

export default function Categories({ selectedCategory }: CategoriesProps) {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrgs = async () => {
      setLoading(true);
      try {
        const data = await api.getOrganizations(selectedCategory);
        setOrganizations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrgs();
  }, [selectedCategory]);

  return (
    <div className="categories-section">
      <div className="section-header">
        <h2>{selectedCategory || 'All Organizations'}</h2>
        <p>Support verified organizations making a difference.</p>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3].map(i => <div key={i} className="skeleton-card" style={{ height: 200, borderRadius: 16 }}></div>)}
        </div>
      ) : (
        <div className="org-grid">
          {organizations.map((org) => (
            <motion.div 
              key={org.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="panel-card org-card"
            >
              <div className="org-header">
                <img src={org.logo_url} alt={org.name} className="org-logo" />
                <div className="org-title-info">
                  <h3>
                    {org.name}
                    {org.verified && <CheckCircle size={14} color="#3182CE" fill="#3182CE" style={{ color: 'white', marginLeft: 6 }} />}
                  </h3>
                  <span className="org-category">{org.category}</span>
                </div>
              </div>
              <p className="org-description">{org.description}</p>
              <div className="org-meta">
                <div className="meta-item"><MapPin size={14} /> <span>{org.location}</span></div>
                <div className="meta-item"><Users size={14} /> <span>{org.volunteers_count} Volunteers</span></div>
              </div>
              <div className="org-actions">
                <button className="btn-primary donate-btn">
                  <Heart size={16} fill="white" />
                  Donate
                </button>
                <button className="btn-secondary volunteer-btn">
                  Volunteer
                </button>
              </div>
            </motion.div>
          ))}
          {organizations.length === 0 && <p className="empty-state">No organizations found in this category.</p>}
        </div>
      )}
    </div>
  );
}
