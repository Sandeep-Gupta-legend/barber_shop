export default function WhatsAppButton() {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '15551234567';
  const message = encodeURIComponent('Hi, I want to book an appointment at Crown & Blade.');

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:scale-105"
    >
      WhatsApp Booking
    </a>
  );
}
