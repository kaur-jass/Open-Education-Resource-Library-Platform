const multer = require('multer');
const path = require('path');

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// file filter (only pdf, images, videos optional)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF/Image/Video allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;