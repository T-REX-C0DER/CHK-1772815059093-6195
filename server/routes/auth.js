const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Helper to set cookie
const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });
};

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role, registrationId, location, website } = req.body;

  try {
    // Check if user/org exists in either table
    const existingUser = await db.user.findUnique({ where: { email } });
    const existingOrg = await db.organization.findUnique({ where: { email } });
    
    if (existingUser || existingOrg) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let newUser;
    const isOrg = role === 'ORGANIZATION';

    if (isOrg) {
      // Insert into organizations
      const result = await db.organization.create({
        data: {
          organizationName: name,
          email,
          passwordHash,
          registrationNumber: registrationId,
          city: location,
        }
      });
      newUser = { id: result.id, name: result.organizationName, email: result.email, role: 'ORGANIZATION' };
    } else {
      // Insert into users
      const result = await db.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: role || 'USER',
          city: location,
        }
      });
      newUser = { id: result.id, name: result.name, email: result.email, role: result.role };
    }

    // Generate JWT
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    setAuthCookie(res, token);

    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check users table
    let user = await db.user.findUnique({ where: { email } });
    let role;

    if (user) {
      role = user.role;
    } else {
      // Check organizations table
      user = await db.organization.findUnique({ where: { email } });
      if (user) {
        role = 'ORGANIZATION';
        user.name = user.organizationName; // Normalize name field
      }
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    setAuthCookie(res, token);

    res.json({ 
      user: { id: user.id, name: user.name, email: user.email, role: role } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Get current user (Me)
const auth = require('../middleware/auth');
router.get('/me', auth, async (req, res) => {
  try {
    let user;
    if (req.user.role === 'ORGANIZATION') {
      const result = await db.organization.findUnique({ 
        where: { id: req.user.id },
        select: { id: true, organizationName: true, email: true }
      });
      if (result) {
        user = { id: result.id, name: result.organizationName, email: result.email, role: 'ORGANIZATION' };
      }
    } else {
      user = await db.user.findUnique({ 
        where: { id: req.user.id },
        select: { id: true, name: true, email: true, role: true }
      });
    }

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
