require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const complaintRoutes = require('./routes/complaintRoutes');
const authRoutes = require('./routes/auth');
 

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());


app.use(cors());

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/complaints', complaintRoutes);
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('API is running'); 
});

// Global error handler
 

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
