import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { Package, Search } from 'lucide-react';
import api from '../api/axios';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import Seo from '../components/common/Seo';

const productImageFallbacks = {
  'hair care': 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
  shampoo: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
  conditioner: 'https://images.pexels.com/photos/3902882/pexels-photo-3902882.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
  gel: 'https://images.pexels.com/photos/3962280/pexels-photo-3962280.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
  oils: 'https://images.pexels.com/photos/3683103/pexels-photo-3683103.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
};

const ProductCard = ({ product, getProductImage }) => (
  <Link
    to={`/products/${product._id}`}
    className="group overflow-hidden rounded-lg border border-amber-500/20 bg-slate-900/50 transition hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
  >
    {/* Image with lazy loading */}
    <div className="relative h-48 overflow-hidden bg-slate-800">
      <img
        src={getProductImage(product)}
        alt={product.name}
        loading="lazy"
        className="h-full w-full object-cover transition group-hover:scale-110"
      />
      {product.stock === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <span className="text-lg font-bold text-amber-300">Out of Stock</span>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-4">
      <div className="mb-2 text-xs uppercase tracking-widest text-amber-400">
        {product.category}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{product.name}</h3>
      <p className="mb-4 line-clamp-2 text-sm text-slate-300">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-amber-400">₹{product.price}</span>
        <span className="text-xs text-slate-400">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      </div>
    </div>
  </Link>
);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check cache first
        const cachedProducts = sessionStorage.getItem('products');
        if (cachedProducts) {
          setProducts(JSON.parse(cachedProducts));
          setLoading(false);
          return;
        }

        const response = await api.get('/products');
        setProducts(response.data);
        // Cache for this session
        sessionStorage.setItem('products', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, products]);

  // Memoize categories
  const categories = useMemo(() => ['all', ...new Set(products.map((p) => p.category))], [products]);

  const getProductImage = (product) => {
    if (product.imageUrl) return product.imageUrl;
    const category = product.category.toLowerCase();
    return productImageFallbacks[category] || productImageFallbacks['hair care'];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <LoadingSkeleton count={6} />
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo 
        title="Products | Crown & Blade"
        description="Premium barbershop products and grooming essentials"
      />
      
      <main className="min-h-screen bg-slate-950 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-amber-500/30 bg-amber-500/5 px-4 py-2">
              <Package className="h-4 w-4 text-amber-400" />
              <span className="text-sm text-amber-300">Premium Collection</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Our Products</h1>
            <p className="text-lg text-slate-300">
              Discover our premium collection of barbershop essentials
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-amber-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-amber-500/20 bg-slate-900 py-3 pl-12 pr-4 text-white placeholder-slate-400 outline-none transition focus:border-amber-400"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? 'bg-amber-400 text-black'
                      : 'border border-amber-500/30 text-amber-300 hover:border-amber-400'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} getProductImage={getProductImage} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-amber-500/20 bg-slate-900/50 py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-slate-600" />
              <p className="mt-4 text-slate-400">No products found</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
