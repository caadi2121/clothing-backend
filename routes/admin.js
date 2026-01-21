const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO admins (username, password) VALUES (?, ?)';

  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error registering admin' });
    }
    res.json({ message: 'Admin registered successfully' });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM admins WHERE username = ?';

  db.query(sql, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Login error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = results[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  });
});


module.exports = router;
