import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, MessageCircle, Package, AlertCircle } from 'lucide-react';
import axios from '../api/axios';
import Seo from '../components/common/Seo';

const productImageFallbacks = {
  'Hair Care': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
  'Styling': 'https://images.unsplash.com/photo-1635273396141-226c79e52e1f?w=500&h=500&fit=crop',
  'Skincare': 'https://images.unsplash.com/photo-1556228481-8a1abb0db0f1?w=500&h=500&fit=crop',
  'Tools': 'https://images.unsplash.com/photo-1621905167918-48416bd8575a?w=500&h=500&fit=crop',
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({ name: '', phone: '', email: '' });
  const [showForm, setShowForm] = useState(false);

  // Fetch product with caching
  useEffect(() => {
    const fetchProduct = async () => {
      const cacheKey = `product_${id}`;
      const cachedProduct = sessionStorage.getItem(cacheKey);

      if (cachedProduct) {
        setProduct(JSON.parse(cachedProduct));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
        sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Memoized image URL
  const getProductImage = useMemo(() => {
    if (!product) return '';
    return product.imageUrl || productImageFallbacks[product.category] || productImageFallbacks['Hair Care'];
  }, [product]);

  // Handle WhatsApp send
  const handleSendToWhatsApp = (e) => {
    e.preventDefault();

    if (!userDetails.name.trim() || !userDetails.phone.trim()) {
      alert('Please enter your name and phone number');
      return;
    }

    const message = `Hello! I'm interested in *${product.name}*

*Product Details:*
- Price: ₹${product.price}
- Category: ${product.category}
- Stock: ${product.stock} available

*My Details:*
- Name: ${userDetails.name}
- Phone: ${userDetails.phone}
${userDetails.email ? `- Email: ${userDetails.email}` : ''}

Please provide more information about this product.`;

    const whatsappUrl = `https://wa.me/7710884302?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setUserDetails({ name: '', phone: '', email: '' });
    setShowForm(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-slate-800 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-8 bg-slate-800 rounded w-3/4"></div>
              <div className="h-6 bg-slate-800 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => navigate('/products')}
            className="mb-6 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </button>
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
            <p className="mt-4 text-lg text-red-300">{error || 'Product not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <>
      <Seo 
        title={`${product.name} | Crown & Blade`}
        description={product.description}
      />

      <main className="min-h-screen bg-slate-950 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/products')}
            className="mb-8 inline-flex items-center gap-2 text-amber-400 transition hover:text-amber-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </button>

          {/* Product Details */}
          <div className="grid gap-8 rounded-lg border border-amber-500/20 bg-slate-900/50 p-6 md:grid-cols-2">
            {/* Image */}
            <div className="flex items-center">
              <img
                src={getProductImage}
                alt={product.name}
                loading="lazy"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="mb-2 text-xs uppercase tracking-widest text-amber-400">
                  {product.category}
                </div>
                <h1 className="mb-4 text-4xl font-bold text-white">{product.name}</h1>
                <p className="text-lg text-slate-300">{product.description}</p>
              </div>

              {/* Price */}
              <div>
                <span className="text-5xl font-bold text-amber-400">₹{product.price}</span>
              </div>

              {/* Stock Status */}
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-amber-400" />
                  <span className="text-amber-200">
                    {product.stock > 0 ? (
                      <>
                        <span className="font-bold">{product.stock}</span> items available
                      </>
                    ) : (
                      'Out of stock'
                    )}
                  </span>
                </div>
              </div>

              {/* Details */}
              {product.details && (
                <div>
                  <h3 className="mb-3 text-lg font-bold text-white">Product Details</h3>
                  <p className="whitespace-pre-wrap text-slate-300">{product.details}</p>
                </div>
              )}

              {/* WhatsApp Button */}
              <button
                onClick={() => setShowForm(!showForm)}
                className={`w-full rounded-lg px-6 py-3 font-bold uppercase tracking-widest transition ${
                  product.stock === 0
                    ? 'cursor-not-allowed bg-slate-700 text-slate-400'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={product.stock === 0}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {showForm ? 'Close' : 'Inquire via WhatsApp'}
                </div>
              </button>
            </div>
          </div>

          {/* User Details Form */}
          {showForm && product.stock > 0 && (
            <div className="mt-8 rounded-lg border border-amber-500/20 bg-slate-900/50 p-6">
              <h3 className="mb-6 text-xl font-bold text-white">Enter Your Details</h3>
              <form onSubmit={handleSendToWhatsApp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-amber-500/20 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-amber-500/20 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-amber-500/20 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-600 px-6 py-3 font-bold uppercase tracking-widest text-white transition hover:bg-green-700"
                >
                  <div className="flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Send Inquiry on WhatsApp
                  </div>
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
