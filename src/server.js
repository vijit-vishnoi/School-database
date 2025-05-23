const express = require('express');
const app = express();
require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const schoolRoutes = require('./routes/schoolRoutes');
app.use('/api/schools', schoolRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


app.get('/', (req, res) => {
  res.json({ message: 'School Database API is running!', status: 'OK' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});


connection.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to MySQL');
  }
});


  app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ success: true, result: rows[0].result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
