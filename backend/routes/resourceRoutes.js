const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const resourceController = require('../controllers/resourceController');

// IMPORT the model if you are writing logic directly in the router
// Better yet, move the delete logic to the controller (shown below)
const Resource = require('../models/Resource'); 

// GET all resources
router.get('/', resourceController.getResources);

// POST upload a new resource
router.post('/upload', upload.single('file'), resourceController.uploadResource);

// DELETE a resource by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedResource = await Resource.findByIdAndDelete(req.params.id);
        
        if (!deletedResource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Error deleting resource from database" });
    }
});

module.exports = router;