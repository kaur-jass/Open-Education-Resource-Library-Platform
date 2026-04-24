const Resource = require('../models/Resource');

// @desc    Get all resources (with search/filter)
// @route   GET /api/resources
exports.getResources = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // 1. Search Logic: Search title OR description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // 2. Category Filter Logic
    if (category && category !== 'Subject') {
      query.category = category;
    }

    // Fetch and populate the uploader name
    const resources = await Resource.find(query)
      .populate('uploader', 'name')
      .sort({ createdAt: -1 });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};