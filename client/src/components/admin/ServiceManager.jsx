import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import LoadingSkeleton from '../ui/LoadingSkeleton';

const initialForm = {
  name: '',
  description: '',
  duration: 30,
  price: 20,
  imageUrl: '',
};

export default function ServiceManager() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    try {
      const { data } = await api.get('/services');
      setServices(data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, form);
        toast.success('Service updated');
      } else {
        await api.post('/services', form);
        toast.success('Service added');
      }

      setForm(initialForm);
      setEditingId('');
      loadServices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Service action failed');
    }
  };

  const editService = (service) => {
    setEditingId(service._id);
    setForm({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      imageUrl: service.imageUrl || '',
    });
  };

  const deleteService = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      toast.success('Service deleted');
      loadServices();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-5">
      <form onSubmit={submitForm} className="grid gap-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
        <input required value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Service name" className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" />
        <textarea required value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} placeholder="Description" className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" />
        <div className="grid gap-3 sm:grid-cols-2">
          <input required type="number" min="5" value={form.duration} onChange={(event) => setForm((prev) => ({ ...prev, duration: Number(event.target.value) }))} placeholder="Duration (mins)" className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" />
          <input required type="number" min="0" value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: Number(event.target.value) }))} placeholder="Price" className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" />
        </div>
        <input value={form.imageUrl} onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))} placeholder="Image URL (optional)" className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white" />
        <button className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-black">
          {editingId ? 'Update Service' : 'Add Service'}
        </button>
      </form>

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <div>
                <p className="font-semibold text-white">{service.name}</p>
                <p className="text-sm text-slate-400">${service.price} • {service.duration} mins</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => editService(service)} className="rounded-lg border border-cyan-300 px-3 py-2 text-xs uppercase tracking-[0.12em] text-cyan-200">Edit</button>
                <button onClick={() => deleteService(service._id)} className="rounded-lg border border-rose-300 px-3 py-2 text-xs uppercase tracking-[0.12em] text-rose-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
