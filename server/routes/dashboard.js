const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get User Dashboard Data
router.get('/me', auth, async (req, res) => {
  try {
    const userResult = await db.query(
      'SELECT u.id, u.name, u.email, u.role, p.phone, p.location, p.profile_picture, p.total_donations, p.total_volunteer_hours, p.badges, p.joined_at ' +
      'FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.id = $1',
      [req.user.id]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.json(userResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Organizations by Category
router.get('/organizations', auth, async (req, res) => {
  const { category } = req.query;
  try {
    let query = 'SELECT * FROM organizations';
    let params = [];
    
    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Donations
router.get('/donations', auth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT d.*, o.name as organization_name FROM donations d ' +
      'JOIN organizations o ON d.organization_id = o.id ' +
      'WHERE d.user_id = $1 ORDER BY d.donation_date DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Volunteer Activities
router.get('/volunteer', auth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT v.*, o.name as organization_name FROM volunteer_activities v ' +
      'JOIN organizations o ON v.organization_id = o.id ' +
      'WHERE v.user_id = $1 ORDER BY v.activity_date DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit Shelter Request
router.post('/shelter-request', auth, async (req, res) => {
  const { location, photo_url, description, urgency_level } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO shelter_requests (reported_by, location, photo_url, description, urgency_level) ' +
      'VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, location, photo_url, description, urgency_level]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Shelter Requests (User's own reports)
router.get('/shelter-requests', auth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM shelter_requests WHERE reported_by = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Notifications
router.get('/notifications', auth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
