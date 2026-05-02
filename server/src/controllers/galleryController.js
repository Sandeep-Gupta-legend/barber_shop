const cloudinary = require('../config/cloudinary');
const Gallery = require('../models/Gallery');

const getGalleryItems = async (req, res) => {
  const items = await Gallery.find().sort({ createdAt: -1 });
  return res.json(items);
};

const uploadGalleryImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  const title = req.body.title || 'Barber Style';

  const item = await Gallery.create({
    title,
    imageUrl: req.file.path,
    publicId: req.file.filename,
  });

  return res.status(201).json(item);
};

const deleteGalleryImage = async (req, res) => {
  const item = await Gallery.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Gallery image not found' });
  }

  await cloudinary.uploader.destroy(item.publicId);
  await item.deleteOne();

  return res.json({ message: 'Gallery image deleted' });
};

module.exports = {
  getGalleryItems,
  uploadGalleryImage,
  deleteGalleryImage,
};
