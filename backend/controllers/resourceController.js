const Resource = require('../models/Resource');

// ✅ GET resources
exports.getResources = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    const resources = await Resource.find(query).sort({ createdAt: -1 });

    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPLOAD resource
exports.uploadResource = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const { title, description, category, type } = req.body;

    const newResource = new Resource({
      title,
      description,
      category,
      fileType: type,
      fileUrl: req.file.filename
    });

    const saved = await newResource.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};