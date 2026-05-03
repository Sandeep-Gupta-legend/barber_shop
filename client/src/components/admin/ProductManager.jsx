import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import LoadingSkeleton from '../ui/LoadingSkeleton';

const initialForm = {
  name: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  imageUrl: '',
  details: '',
};

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
        toast.success('Product updated');
      } else {
        await api.post('/products', form);
        toast.success('Product added');
      }

      setForm(initialForm);
      setEditingId('');
      loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Product action failed');
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      imageUrl: product.imageUrl || '',
      details: product.details || '',
    });
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      loadProducts();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-5">
      <form onSubmit={submitForm} className="grid gap-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
        <input 
          required 
          value={form.name} 
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} 
          placeholder="Product name" 
          className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" 
        />
        <textarea 
          required 
          value={form.description} 
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} 
          placeholder="Description" 
          className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" 
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input 
            required 
            type="number" 
            min="0" 
            value={form.price} 
            onChange={(event) => setForm((prev) => ({ ...prev, price: Number(event.target.value) }))} 
            placeholder="Price" 
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" 
          />
          <input 
            required 
            value={form.category} 
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))} 
            placeholder="Category" 
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" 
          />
        </div>
        <input 
          required 
          type="number" 
          min="0" 
          value={form.stock} 
          onChange={(event) => setForm((prev) => ({ ...prev, stock: Number(event.target.value) }))} 
          placeholder="Stock" 
          className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" 
        />
        <input 
          value={form.imageUrl} 
          onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))} 
          placeholder="Image URL (optional)" 
          className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" 
        />
        <textarea 
          value={form.details} 
          onChange={(event) => setForm((prev) => ({ ...prev, details: event.target.value }))} 
          placeholder="Product details (optional)" 
          className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" 
        />
        <button className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-black">
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <div>
                <p className="font-semibold text-white">{product.name}</p>
                <p className="text-sm text-slate-400">₹{product.price} • {product.category} • Stock: {product.stock}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => editProduct(product)} className="rounded-lg border border-cyan-300 px-3 py-2 text-xs uppercase tracking-[0.12em] text-cyan-200">Edit</button>
                <button onClick={() => deleteProduct(product._id)} className="rounded-lg border border-rose-300 px-3 py-2 text-xs uppercase tracking-[0.12em] text-rose-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
