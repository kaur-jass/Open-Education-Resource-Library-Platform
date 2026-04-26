const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

const app = express();

// --- 1. Middleware ---
// CORS must be first to avoid "Failed to connect" errors
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Added for handling form data

// --- 2. Static Folders ---
// Fix: Ensure the uploads directory exists or the server might throw an error
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- 3. Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✨ MongoDB Connected Successfully"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); 
    });

// --- 4. API Routes ---
// Double-check: These prefixes must match your frontend fetch URLs
app.use('/api/auth', authRoutes);         
app.use('/api/resources', resourceRoutes); 

// --- 5. Root Route ---
app.get('/', (req, res) => {
    res.json({ message: "OER Platform API is running..." }); // Changed to JSON for consistency
});

// --- 6. Error Handling Middleware ---
// This prevents the "Unexpected token <" error by ensuring errors are sent as JSON
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// --- 7. Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying on http://localhost:${PORT}`);
});