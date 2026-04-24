const express = require('express');
const multer = require('multer');
const { uploadResource, getResources } = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', protect, upload.single('file'), uploadResource);
router.get('/', getResources);

module.exports = router;