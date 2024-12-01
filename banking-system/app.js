//app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const bankerRoutes = require('./routes/bankerRoutes');
const authenticate = require('./middleware/auth');
const cors = require('cors');
dotenv.config();

const app = express();
// Allow specific origin
app.use(cors({
    origin: 'http://localhost:3001', // Replace with the frontend's URL
  }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/customer', authenticate, customerRoutes);
app.use('/banker', authenticate, bankerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
