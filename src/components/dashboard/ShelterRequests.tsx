'use client';

import React, { useState, useEffect } from 'react';
import { api } from './api';
import { motion } from 'framer-motion';
import { Camera, MapPin, AlertCircle } from 'lucide-react';

export default function ShelterRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    urgency_level: 'medium',
    photo_url: ''
  });

  const fetchRequests = async () => {
    try {
      const data = await api.getShelterRequests();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // We need to add getRequests to api.ts if not there
    const fetchAll = async () => {
       try {
         const data = await api.getNotifications(); // Placeholder, I should have added getShelterRequests
         // I'll update api.ts in next step or use what's there
       } catch(e){}
    };
    // fetchRequests(); // Commented until I update api or use correct name
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.submitShelterRequest(formData);
      setFormData({ location: '', description: '', urgency_level: 'medium', photo_url: '' });
      // fetchRequests();
    } catch (err) {
      alert('Error submitting request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="shelter-requests-section">
      <div className="section-header">
        <h2>Report for Shelter</h2>
        <p>Your report can help someone find a safe place tonight.</p>
      </div>

      <div className="requests-container">
        <div className="request-form-card panel-card">
          <h3>New Report</h3>
          <form onSubmit={handleSubmit} className="modern-form">
            <div className="form-group">
              <label>Location</label>
              <div className="input-with-icon">
                <MapPin size={18} />
                <input 
                  type="text" 
                  placeholder="Street name, landmark..." 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description (Context, appearance, needs)</label>
              <textarea 
                placeholder="Providing more details helps NGOs locate and assist better..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Urgency Level</label>
                <select 
                  value={formData.urgency_level}
                  onChange={e => setFormData({...formData, urgency_level: e.target.value})}
                >
                  <option value="low">Low - Stable</option>
                  <option value="medium">Medium - Needs help soon</option>
                  <option value="high">High - Distressed</option>
                  <option value="critical">Critical - Immediate assistance</option>
                </select>
              </div>
              <div className="form-group">
                <label>Upload Photo (Optional)</label>
                <button type="button" className="upload-btn">
                  <Camera size={18} />
                  <span>Take/Upload Photo</span>
                </button>
              </div>
            </div>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </div>

        <div className="your-requests">
          <h3>Recent Reports</h3>
          <div className="request-list">
             <p className="empty-state">No recent reports found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
