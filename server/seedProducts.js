const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./src/models/Product');

const dummyProducts = [
  {
    name: 'Premium Shampoo',
    description: 'Professional-grade shampoo for all hair types',
    price: 450,
    category: 'Shampoo',
    stock: 50,
    imageUrl: 'https://images.pexels.com/photos/3962280/pexels-photo-3962280.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    details: 'Specially formulated to cleanse and nourish your hair. Perfect for daily use.',
  },
  {
    name: 'Hair Conditioner',
    description: 'Hydrating conditioner with natural ingredients',
    price: 350,
    category: 'Conditioner',
    stock: 35,
    imageUrl: 'https://images.pexels.com/photos/3902882/pexels-photo-3902882.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    details: 'Restores moisture and shine to dry, damaged hair.',
  },
  {
    name: 'Hair Styling Gel',
    description: 'Strong hold styling gel for perfect looks',
    price: 250,
    category: 'Gel',
    stock: 60,
    imageUrl: 'https://images.pexels.com/photos/3962280/pexels-photo-3962280.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    details: 'Extra strong hold that lasts all day. Water-washable formula.',
  },
  {
    name: 'Beard Oil',
    description: 'Nourishing beard oil with essential oils',
    price: 300,
    category: 'Oils',
    stock: 45,
    imageUrl: 'https://images.pexels.com/photos/3683103/pexels-photo-3683103.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    details: 'Softens beard hair and promotes healthy growth. Pleasant fragrance.',
  },
  {
    name: 'Hair Care Serum',
    description: 'Advanced hair serum for shine and protection',
    price: 400,
    category: 'Hair Care',
    stock: 40,
    imageUrl: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    details: 'Protects against heat damage and UV rays.',
  },
  {
    name: 'Anti-Dandruff Shampoo',
    description: 'Specialized shampoo to eliminate dandruff',
    price: 500,
    category: 'Shampoo',
    stock: 55,
    imageUrl: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    details: 'Clinically tested formula. Results in 1 week.',
  },
  {
    name: 'Pomade Wax',
    description: 'Premium pomade for classic hairstyles',
    price: 320,
    category: 'Gel',
    stock: 50,
    imageUrl: 'https://images.pexels.com/photos/3962280/pexels-photo-3962280.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    details: 'Holds style all day. Easy to wash out.',
  },
  {
    name: 'Hair Loss Prevention Oil',
    description: 'Organic oil to reduce hair loss',
    price: 550,
    category: 'Oils',
    stock: 30,
    imageUrl: 'https://images.pexels.com/photos/3683103/pexels-photo-3683103.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    details: 'Strengthens hair roots. Use daily for best results.',
  },
  {
    name: 'Beard Balm',
    description: 'Moisturizing beard balm with natural wax',
    price: 380,
    category: 'Hair Care',
    stock: 40,
    imageUrl: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    details: 'Conditions and shapes your beard. Subtle fragrance.',
  },
  {
    name: 'Deep Conditioning Mask',
    description: 'Intensive conditioning treatment',
    price: 420,
    category: 'Conditioner',
    stock: 35,
    imageUrl: 'https://images.pexels.com/photos/3902882/pexels-photo-3902882.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    details: 'Apply once a week for maximum benefits.',
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert dummy products
    const createdProducts = await Product.insertMany(dummyProducts);
    console.log(`✅ Successfully added ${createdProducts.length} dummy products`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedProducts();
