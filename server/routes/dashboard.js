const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get User Dashboard Data
router.get('/me', auth, async (req, res) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.user.id },
      include: {
        donations: true,
        volunteerActs: true,
        shelterRequests: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Normalize response to match legacy structure if needed or provide clean Prisma object
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Organizations by Category
router.get('/organizations', auth, async (req, res) => {
  const { category } = req.query;
  try {
    const orgs = await db.organization.findMany({
      where: category ? { organizationType: category } : {}
    });
    res.json(orgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Donations
router.get('/donations', auth, async (req, res) => {
  try {
    const donations = await db.donation.findMany({
      where: { userId: req.user.id },
      include: { organization: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Volunteer Activities
router.get('/volunteer', auth, async (req, res) => {
  try {
    const volunteerActs = await db.volunteer.findMany({
      where: { userId: req.user.id },
      include: { organization: true },
      orderBy: { appliedDate: 'desc' }
    });
    res.json(volunteerActs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit Shelter Request
router.post('/shelter-request', auth, async (req, res) => {
  const { location, photo_url, description, urgency_level, personName, age } = req.body;
  try {
    const result = await db.shelterRequest.create({
      data: {
        userId: req.user.id,
        location,
        photo: photo_url,
        description,
        personName: personName || 'Anonymous',
        age: parseInt(age) || 0,
        status: 'PENDING'
      }
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Shelter Requests (User's own reports)
router.get('/shelter-requests', auth, async (req, res) => {
  try {
    const requests = await db.shelterRequest.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Notifications
router.get('/notifications', auth, async (req, res) => {
  try {
    // Note: Notifications are not in the Prisma schema, so we return empty for now
    // or we could add them to the schema.
    res.json([]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

