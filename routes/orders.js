const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.post('/add', (req, res) => {
  const { customer_name, phone, product_id, message } = req.body;

  const sql = `
    INSERT INTO orders (customer_name, phone, product_id, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [customer_name, phone, product_id, message], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating order' });
    }
    res.json({ message: 'Order created successfully' });
  });
});

router.get('/', (req, res) => {
  const sql = `
    SELECT orders.*, products.name AS product_name
    FROM orders
    JOIN products ON orders.product_id = products.id
    ORDER BY orders.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching orders' });
    }
    res.json(results);
  });
});

module.exports = router;
