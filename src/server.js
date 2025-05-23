const express = require('express');
require('dotenv').config();

const db = require('./config/db');   
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/schools', schoolRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/',         (req, res) => res.json({ message: 'School Database API is running!', status: 'OK' }));
app.get('/health',   (req, res) => res.json({ status: 'healthy', timestamp: new Date().toISOString() }));


app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ success: true, result: rows[0].result });
  } catch (error) {
    console.error('❌ DB test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
