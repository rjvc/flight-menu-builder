require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Read the CA certificate
let caCertificate;
try {
    caCertificate = fs.readFileSync('ca.pem').toString();
    console.debug('CA Certificate Loaded Successfully');
} catch (error) {
    console.error('Error reading CA certificate:', error);
}

// Create a new PostgreSQL pool
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: true,
        ca: caCertificate,
    },
});

// Debugging: Test the connection to the database
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.debug('Connected to the database successfully');
    release();
});

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));

// Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Helper function to insert into join tables
const insertIntoJoinTable = async (tableName, mealId, ids) => {
    if (ids && Array.isArray(ids)) {
        const insertPromises = ids.map(id =>
            pool.query(`INSERT INTO ${tableName} (meal_id, ${tableName.slice(5, -1)}_id) VALUES ($1, $2)`, [mealId, id])
        );
        await Promise.all(insertPromises);
    }
};

// API endpoint to save meal data
app.post('/api/save-meal-data', async (req, res) => {
    const {
        name,
        email,
        airport,
        numPassengers,
        numCrew,
        mealType,
        selectedMeals,
        breakfastType,
        foodPreferences,
        dietaryRestrictions,
        drinkPreference,
        device,
        timestamp,
    } = req.body;

    console.debug('Received meal data:', req.body);

    try {
        // Insert data into the meals table
        const result = await pool.query(
            `INSERT INTO meals (
                name, email, airport, num_passengers, num_crew, breakfast_type, 
                drink_preference, device, timestamp
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
            [name, email, airport, numPassengers, numCrew, breakfastType, drinkPreference, device, timestamp]
        );

        const mealId = result.rows[0].id;
        console.debug('Inserted meal data with ID:', mealId);

        // Insert into related tables
        await insertIntoJoinTable('meals_meal_types', mealId, mealType);
        await insertIntoJoinTable('meals_selected_meals', mealId, selectedMeals);
        await insertIntoJoinTable('meals_food_preferences', mealId, foodPreferences);
        await insertIntoJoinTable('meals_dietary_restrictions', mealId, dietaryRestrictions);

        res.status(200).json({ message: 'Meal data saved successfully!' });
    } catch (err) {
        console.error('Error saving data:', err.stack);
        res.status(500).json({ message: 'Error saving data', error: err.message });
    }
});

// GET request to fetch menu by ID
app.get('/api/menu/:id', async (req, res) => {
    const menuId = req.params.id;
    console.log(`Fetching menu data for ID: ${menuId}`);

    try {
        // Fetch the main meal data
        const mealData = await pool.query(`SELECT * FROM meals WHERE id = $1`, [menuId]);
        console.debug('Fetched meal data:', mealData.rows);

        if (mealData.rowCount === 0) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        const meal = mealData.rows[0];

        // Fetch related data from join tables
        const mealTypes = await pool.query(
            `SELECT mt.id, mt.name
             FROM meals_meal_types mmt
             JOIN meal_types mt ON mmt.meal_type_id = mt.id
             WHERE mmt.meal_id = $1`,
            [menuId]
        );
        console.debug('Fetched meal types:', mealTypes.rows);

        const selectedMeals = await pool.query(
            `SELECT sm.id, sm.name
             FROM meals_selected_meals msm
             JOIN selected_meals sm ON msm.selected_meal_id = sm.id
             WHERE msm.meal_id = $1`,
            [menuId]
        );
        console.debug('Fetched selected meals:', selectedMeals.rows);

        const foodPreferences = await pool.query(
            `SELECT fp.id, fp.name
             FROM meals_food_preferences mfp
             JOIN food_preferences fp ON mfp.food_preference_id = fp.id
             WHERE mfp.meal_id = $1`,
            [menuId]
        );
        console.debug('Fetched food preferences:', foodPreferences.rows);

        const dietaryRestrictions = await pool.query(
            `SELECT dr.id, dr.restriction
             FROM meals_dietary_restrictions mdr
             JOIN dietary_restrictions dr ON mdr.dietary_restriction_id = dr.id
             WHERE mdr.meal_id = $1`,
            [menuId]
        );
        console.debug('Fetched dietary restrictions:', dietaryRestrictions.rows);

        // Combine all data into a single response object
        res.status(200).json({
            ...meal,
            mealTypes: mealTypes.rows,
            selectedMeals: selectedMeals.rows,
            foodPreferences: foodPreferences.rows,
            dietaryRestrictions: dietaryRestrictions.rows,
        });
    } catch (error) {
        console.error('Error fetching menu:', error.stack);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// API endpoint to fetch meal types
app.get('/api/meal-types', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name FROM meal_types');
        console.debug('Meal types fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching meal types:', error.stack);
        res.status(500).json({ message: 'Error fetching meal types', error: error.message });
    }
});

// Fetch food preferences for frontend dropdown
app.get('/api/food-preferences', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM food_preferences');
        console.debug('Food preferences fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching food preferences:', err.stack);
        res.status(500).json({ message: 'Error fetching food preferences', error: err.message });
    }
});

// Fetch dietary restrictions for frontend dropdown
app.get('/api/dietary-restrictions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dietary_restrictions');
        console.debug('Dietary restrictions fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching dietary restrictions:', err.stack);
        res.status(500).json({ message: 'Error fetching dietary restrictions', error: err.message });
    }
});

// Fetch selected meals for frontend dropdown
app.get('/api/selected-meals', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM selected_meals');
        console.debug('Selected meals fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching selected meals:', err.stack);
        res.status(500).json({ message: 'Error fetching selected meals', error: err.message });
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
