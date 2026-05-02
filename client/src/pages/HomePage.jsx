import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Scissors, Star, Clock3, Sparkles } from 'lucide-react';
import api from '../api/axios';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import Seo from '../components/common/Seo';

const serviceImageFallbacks = {
  haircut:
    'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1200',
  beard:
    'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1200',
  styling:
    'https://images.pexels.com/photos/769739/pexels-photo-769739.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

const styleGallery = [
  {
    title: 'Skin Fade Precision',
    image:
      'https://images.pexels.com/photos/769739/pexels-photo-769739.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Classic Scissor Cut',
    image:
      'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Beard Sculpting',
    image:
      'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Executive Hair Styling',
    image:
      'https://images.pexels.com/photos/1453005/pexels-photo-1453005.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Hot Towel Beard Trim',
    image:
      'https://images.pexels.com/photos/897251/pexels-photo-897251.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Modern Texture Cut',
    image:
      'https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

const getServiceImage = (service) => {
  if (service.imageUrl) {
    return service.imageUrl;
  }

  const name = service.name.toLowerCase();

  if (name.includes('beard')) {
    return serviceImageFallbacks.beard;
  }

  if (name.includes('style')) {
    return serviceImageFallbacks.styling;
  }

  return serviceImageFallbacks.haircut;
};

const testimonials = [
  { name: 'Rohan Mehta', quote: 'Best fade in town. Sharp, clean and always on time.' },
  { name: 'Aditya Rana', quote: 'Premium vibes and solid grooming advice every visit.' },
  { name: 'Daniel Cruz', quote: 'Booked online in 2 minutes and the experience was top-tier.' },
];

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await api.get('/services');
        setServices(data.slice(0, 3));
      } catch (error) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <>
      <Seo
        title="Barber Shop"
        description="Premium barber services, quick online appointments, and a bold grooming experience."
      />

      <section className="relative overflow-hidden px-4 pb-20 pt-20 md:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-300/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-amber-200">
              <Sparkles className="size-4" /> Urban luxury grooming
            </p>
            <h1 className="font-display text-5xl leading-tight text-white md:text-7xl">
              Precision Cuts.
              <br />
              Effortless Style.
            </h1>
            <p className="max-w-lg text-slate-300">
              Crown & Blade blends old-school barber craftsmanship with modern styling. Book in seconds and step out with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/book"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-amber-300"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-slate-500 px-6 py-3 text-sm uppercase tracking-[0.2em] text-slate-100 transition hover:border-amber-300"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-linear-to-br from-amber-200/10 to-cyan-400/10 p-6 backdrop-blur-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-black/40 p-5">
                <Clock3 className="mb-3 size-6 text-amber-300" />
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Open Hours</p>
                <p className="mt-2 text-lg text-white">9 AM - 9 PM</p>
              </div>
              <div className="rounded-2xl bg-black/40 p-5">
                <Scissors className="mb-3 size-6 text-amber-300" />
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Signature Cuts</p>
                <p className="mt-2 text-lg text-white">Classic, Skin Fade, Styling</p>
              </div>
              <div className="rounded-2xl bg-black/40 p-5 sm:col-span-2">
                <Star className="mb-3 size-6 text-amber-300" />
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Client Rating</p>
                <p className="mt-2 text-lg text-white">4.9/5 across 1,200+ bookings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-3xl text-white">Popular Services</h2>
          <Link to="/services" className="text-sm uppercase tracking-[0.2em] text-amber-300">
            View all
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton rows={4} />
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article key={service._id} className="overflow-hidden rounded-2xl border border-slate-700/60 bg-black/40">
                <img
                  src={getServiceImage(service)}
                  alt={service.name}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="text-xl text-white">{service.name}</h3>
                  <p className="mt-2 text-slate-400">{service.description}</p>
                  <p className="mt-4 text-amber-300">${service.price} • {service.duration} mins</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6">
        <h2 className="mb-6 font-display text-3xl text-white">Haircut Gallery</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {styleGallery.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-2xl border border-slate-700 bg-black/40">
              <img src={item.image} alt={item.title} className="h-64 w-full object-cover" loading="lazy" />
              <p className="p-4 text-sm uppercase tracking-[0.15em] text-amber-300">{item.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6">
        <h2 className="mb-6 font-display text-3xl text-white">What Clients Say</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-cyan-300/20 bg-cyan-950/20 p-5">
              <p className="text-slate-200">"{item.quote}"</p>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-cyan-200">{item.name}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
