const express = require('express');
const db = require('../config/db');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/add', upload.single('image'), (req, res) => {
  const { name, price, description, category } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO products (name, price, description, image, category)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, price, description, image, category], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error adding product' });
    }
    res.json({ message: 'Product added successfully' });
  });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error' });
    res.json(results);
  });
});

module.exports = router;
