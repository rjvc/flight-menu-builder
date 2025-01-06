const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const MealData = require('./models/mealDataModel');


// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://menubuilder:Menu100Acesso.@cluster0.7etwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from React's frontend
}));

// API endpoint to handle meal data
app.post('/api/save-meal-data', async (req, res) => {
  try {
    const newMealData = new MealData(req.body);
    await newMealData.save();
    res.status(200).json({ message: 'Meal data saved successfully!' });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ message: 'Error saving data', error: err.message });
  }
});

// GET request to fetch menu by ID
app.get('/api/menu/:id', async (req, res) => {
  const menuId = req.params.id;
  console.log(`Fetching menu data for ID: ${menuId}`);

  try {
    const menuData = await MealData.findById(menuId);
    console.log("Menu data fetched:", menuData);

    if (menuData) {
      res.status(200).json(menuData);
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Serve static files from the React app (only after API routes)
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Serve React app after API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
