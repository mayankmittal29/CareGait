const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const {addInitialPreset} = require('./controllers/Chatbotcontroller');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Call addInitialPreset after DB connection is established
(async () => {
  try {
    await addInitialPreset();
    console.log('Initial chatbot preset added successfully (if not already present).');
  } catch (error) {
    console.error('Error adding initial chatbot preset:', error);
  }
})();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));