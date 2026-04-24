const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

const app = express();

// --- Middleware ---
app.use(cors()); // Allows your React frontend to talk to this server
app.use(express.json()); // Allows server to accept JSON data in the body

// --- Static Folders ---
// This makes the 'uploads' folder public so users can view/download files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✨ MongoDB Connected Successfully"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Stop the server if DB connection fails
    });

// --- API Routes ---
app.use('/api/auth', authRoutes);         // Register & Login
app.use('/api/resources', resourceRoutes); // Upload & Get Files

// --- Root Route (For Testing) ---
app.get('/', (req, res) => {
    res.send("OER Platform API is running...");
});

// --- Error Handling Middleware ---
// This catches any errors and sends a clean JSON message instead of a crash
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying on http://localhost:${PORT}`);
});