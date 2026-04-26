const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');

// 🔥 IMPORTANT: correct import
const resourceController = require('../controllers/resourceController');

router.get('/', resourceController.getResources);

// comment this temporarily to isolate error
// router.post('/upload', upload.single('file'), resourceController.uploadResource);
console.log("Controller:", resourceController);
console.log("getResources:", resourceController.getResources);
// router.post('/upload', upload.single('file'), (req, res) => {
//   console.log("Upload route hit");
//   console.log("Request body:", req.body);
//   console.log("Request file:", req.file);
//   resourceController.uploadResource(req, res);
// });
router.post('/upload', upload.single('file'), resourceController.uploadResource);
module.exports = router;
