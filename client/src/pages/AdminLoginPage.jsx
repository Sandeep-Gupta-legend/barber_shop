import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/common/Seo';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', form);
      login({ _id: data._id, name: data.name, email: data.email }, data.token);
      toast.success('Welcome back');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[75vh] w-full max-w-md items-center px-4 py-10">
      <Seo title="Admin Login" description="Secure admin login for Crown & Blade staff dashboard." />
      <form onSubmit={onSubmit} className="w-full rounded-2xl border border-slate-700 bg-black/60 p-6">
        <h1 className="font-display text-3xl text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-400">Manage appointments, services, and gallery from one place.</p>

        <div className="mt-5 space-y-3">
          <input required type="email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="Email" className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white" />
          <input required type="password" value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} placeholder="Password" className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white" />
        </div>

        <button disabled={loading} className="mt-5 w-full rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
}
