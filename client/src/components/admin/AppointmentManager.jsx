import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import LoadingSkeleton from '../ui/LoadingSkeleton';

const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const { data } = await api.get('/appointments');
      setAppointments(data);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/appointments/${id}`, { status });
      toast.success('Appointment updated');
      loadAppointments();
    } catch (error) {
      toast.error('Status update failed');
    }
  };

  if (loading) {
    return <LoadingSkeleton rows={5} className="mt-4" />;
  }

  return (
    <div className="space-y-4">
      {appointments.map((item) => (
        <div key={item._id} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-white">{item.customerName}</p>
              <p className="text-sm text-slate-400">{item.customerEmail} • {item.customerPhone}</p>
              <p className="mt-1 text-sm text-amber-300">{item.service?.name} • {item.date} at {item.time}</p>
            </div>
            <select
              value={item.status}
              onChange={(event) => updateStatus(item._id, event.target.value)}
              className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
