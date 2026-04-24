const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    middle: { type: String },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Student', 'Teacher', 'Admin'], 
    default: 'Student' 
  },
  joinDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);