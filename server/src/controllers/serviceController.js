const Service = require('../models/Service');

const getServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  return res.json(services);
};

const createService = async (req, res) => {
  const { name, description, duration, price, imageUrl } = req.body;

  if (!name || !description || !duration || !price) {
    return res.status(400).json({ message: 'Name, description, duration and price are required' });
  }

  const service = await Service.create({
    name,
    description,
    duration,
    price,
    imageUrl: imageUrl || '',
  });

  return res.status(201).json(service);
};

const updateService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }

  const { name, description, duration, price, imageUrl } = req.body;

  service.name = name ?? service.name;
  service.description = description ?? service.description;
  service.duration = duration ?? service.duration;
  service.price = price ?? service.price;
  service.imageUrl = imageUrl ?? service.imageUrl;

  const updatedService = await service.save();
  return res.json(updatedService);
};

const deleteService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }

  await service.deleteOne();
  return res.json({ message: 'Service removed' });
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
};
