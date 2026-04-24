const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  fileUrl: { type: String, required: true }, // URL to the PDF/Video
  fileType: { type: String, enum: ['pdf', 'video', 'notes'] },
  licenseType: String,
  category: { type: String, required: true }, // e.g., DBMS, SE
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  downloadCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);