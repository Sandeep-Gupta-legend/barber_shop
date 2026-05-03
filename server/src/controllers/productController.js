const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  return res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json(product);
};

const createProduct = async (req, res) => {
  const { name, description, price, category, stock, imageUrl, details } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: 'Name, description, price and category are required' });
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock: stock || 0,
    imageUrl: imageUrl || '',
    details: details || '',
  });

  return res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const { name, description, price, category, stock, imageUrl, details } = req.body;

  product.name = name ?? product.name;
  product.description = description ?? product.description;
  product.price = price ?? product.price;
  product.category = category ?? product.category;
  product.stock = stock ?? product.stock;
  product.imageUrl = imageUrl ?? product.imageUrl;
  product.details = details ?? product.details;

  const updatedProduct = await product.save();
  return res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await Product.findByIdAndDelete(req.params.id);
  return res.json({ message: 'Product deleted' });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
