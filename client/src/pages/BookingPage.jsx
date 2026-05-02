import { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Seo from '../components/common/Seo';

const timeSlots = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '18:00', '19:00'];

const bookingVisuals = [
  'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/769739/pexels-photo-769739.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

export default function BookingPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    service: '',
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    time: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/services');
      setServices(data);
    };

    load();
  }, []);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!form.service || !form.time) {
      toast.error('Please select service and time slot');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/appointments', form);
      toast.success('Appointment booked successfully');
      setForm((prev) => ({
        ...prev,
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        service: '',
        time: '',
        notes: '',
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6">
      <Seo
        title="Book Appointment"
        description="Book a haircut, beard trim, or styling session at Crown & Blade in minutes."
      />
      <h1 className="font-display text-4xl text-white">Book Your Appointment</h1>
      <p className="mt-3 text-slate-300">Pick your service, preferred date and time, and we will take care of the rest.</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-2xl border border-slate-700 bg-black/50 p-6">
        <input required name="customerName" value={form.customerName} onChange={onChange} placeholder="Full name" className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400" />
        <input required type="email" name="customerEmail" value={form.customerEmail} onChange={onChange} placeholder="Email" className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400" />
        <input required name="customerPhone" value={form.customerPhone} onChange={onChange} placeholder="Phone number" className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400" />

        <select required name="service" value={form.service} onChange={onChange} className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400">
          <option value="">Select service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name} - ${service.price}
            </option>
          ))}
        </select>

        <div className="grid gap-4 sm:grid-cols-2">
          <input required type="date" name="date" value={form.date} onChange={onChange} className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400" />
          <select required name="time" value={form.time} onChange={onChange} className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400">
            <option value="">Select time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <textarea name="notes" value={form.notes} onChange={onChange} placeholder="Any preferences (optional)" className="min-h-28 rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400" />

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-amber-300 disabled:opacity-60"
        >
          {submitting ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {bookingVisuals.map((image, index) => (
          <img
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            src={image}
            alt="Barber booking inspiration"
            className="h-44 w-full rounded-2xl border border-slate-700 object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
