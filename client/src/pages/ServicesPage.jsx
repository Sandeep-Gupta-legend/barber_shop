import { useEffect, useState } from 'react';
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

const extraServiceShots = [
  'https://images.pexels.com/photos/897251/pexels-photo-897251.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1453005/pexels-photo-1453005.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1200',
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

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/services');
        setServices(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <Seo
        title="Services"
        description="Explore premium haircut, beard, and grooming services at Crown & Blade."
      />
      <div className="mb-10 overflow-hidden rounded-3xl border border-amber-400/20">
        <img
          src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Professional barber service"
          className="h-64 w-full object-cover md:h-80"
        />
      </div>
      <h1 className="font-display text-4xl text-white">Our Services</h1>
      <p className="mt-3 max-w-2xl text-slate-300">From executive trims to skin fades and beard sculpting, every appointment is crafted for precision and style.</p>

      <div className="mt-10">
        {loading ? (
          <LoadingSkeleton rows={6} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service._id} className="overflow-hidden rounded-2xl border border-amber-400/20 bg-black/40">
                <img
                  src={getServiceImage(service)}
                  alt={service.name}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h2 className="text-xl text-white">{service.name}</h2>
                  <p className="mt-2 text-slate-300">{service.description}</p>
                  <p className="mt-4 text-sm uppercase tracking-[0.15em] text-amber-300">{service.duration} mins</p>
                  <p className="mt-1 text-2xl font-semibold text-white">${service.price}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {extraServiceShots.map((image, index) => (
          <img
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            src={image}
            alt="Barber service style"
            className="h-44 w-full rounded-2xl border border-slate-700 object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
