require('dotenv').config(); // Load environment variables

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;  // Use PORT from .env, fallback to 3000 if not set
const connectToMongo = require('./db');


connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
