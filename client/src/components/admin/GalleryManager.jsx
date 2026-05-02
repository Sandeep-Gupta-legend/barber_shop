import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

export default function GalleryManager() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);
  const [uploading, setUploading] = useState(false);

  const loadItems = async () => {
    const { data } = await api.get('/gallery');
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const upload = async (event) => {
    event.preventDefault();

    if (!file) {
      toast.error('Select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('title', title || 'Barber Style');
    formData.append('image', file);

    try {
      setUploading(true);
      await api.post('/gallery', formData);
      toast.success('Image uploaded');
      setTitle('');
      setFile(null);
      loadItems();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (id) => {
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Image deleted');
      loadItems();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-5">
      <form onSubmit={upload} className="grid gap-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Image title" className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" />
        <input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" />
        <button disabled={uploading} className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-black disabled:opacity-60">
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item._id} className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/60">
            <img src={item.imageUrl} alt={item.title} className="h-44 w-full object-cover" />
            <div className="flex items-center justify-between p-3">
              <p className="text-sm text-slate-200">{item.title}</p>
              <button onClick={() => removeImage(item._id)} className="text-xs uppercase tracking-[0.15em] text-rose-300">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
