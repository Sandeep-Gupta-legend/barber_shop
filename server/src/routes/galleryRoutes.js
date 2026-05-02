const express = require('express');
const {
  getGalleryItems,
  uploadGalleryImage,
  deleteGalleryImage,
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/').get(getGalleryItems).post(protect, upload.single('image'), uploadGalleryImage);
router.route('/:id').delete(protect, deleteGalleryImage);

module.exports = router;
