import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(176,120,43,0.2),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(41,116,117,0.15),transparent_35%),#0f0f11] text-slate-100">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
