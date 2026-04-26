const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// WRONG: router.post('/api/auth/register', ...) 
// RIGHT: server.js already added '/api/auth', so just use '/register'
router.post('/register', registerUser); 
router.post('/login', loginUser);

module.exports = router;