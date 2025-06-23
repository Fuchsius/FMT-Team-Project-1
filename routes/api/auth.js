const express = require('express');
const router = express.Router();
const { client } = require('../../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'b7e2c1a4e8f3d9c2a5b6e7f8c9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8';

function getUserCollection() {
  const database = client.db('skill-growdb');
  return database.collection('user');
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userCollection = getUserCollection();
  const user = await userCollection.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const userCollection = getUserCollection();
  const existing = await userCollection.findOne({ email });
  if (existing) return res.status(409).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const result = await userCollection.insertOne({ firstName, lastName, email, password: hashed });
  res.status(201).json({ message: 'User registered', userId: result.insertedId });
});

module.exports = router; 