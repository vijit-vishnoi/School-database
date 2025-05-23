const express = require('express');
const app = express();
require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const schoolRoutes = require('./routes/schoolRoutes');
app.use('/api/schools', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


app.get('/', (req, res) => {
  res.json({ message: 'School Database API is running!', status: 'OK' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Add this to your server.js after requiring db
const pool = require('./config/db'); // adjust path as needed

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });