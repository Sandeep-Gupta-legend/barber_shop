import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/common/Seo';
import AppointmentManager from '../components/admin/AppointmentManager';
import ServiceManager from '../components/admin/ServiceManager';
import ProductManager from '../components/admin/ProductManager';
import GalleryManager from '../components/admin/GalleryManager';
import { useAuth } from '../context/AuthContext';

const tabs = ['appointments', 'services', 'products', 'gallery'];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [tab, setTab] = useState('appointments');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <Seo title="Admin Dashboard" description="Admin dashboard for appointments, services, and gallery management." />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl text-white">Dashboard</h1>
          <p className="text-slate-300">Signed in as {admin?.name || admin?.email}</p>
        </div>
        <button onClick={handleLogout} className="rounded-full border border-rose-300 px-5 py-2 text-xs uppercase tracking-[0.2em] text-rose-200">
          Logout
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] ${
              tab === item ? 'bg-amber-400 text-black' : 'border border-slate-600 text-slate-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === 'appointments' && <AppointmentManager />}
      {tab === 'services' && <ServiceManager />}
      {tab === 'products' && <ProductManager />}
      {tab === 'gallery' && <GalleryManager />}
    </section>
  );
}
