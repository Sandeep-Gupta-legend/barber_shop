import Seo from '../components/common/Seo';

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <Seo
        title="Contact"
        description="Visit Crown & Blade barber shop. Find location, opening hours and contact details."
      />
      <h1 className="font-display text-4xl text-white">Contact Us</h1>
      <p className="mt-3 text-slate-300">Walk in or book online. We are located in the heart of the city.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-700 bg-black/40 p-6 text-slate-200">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Address</p>
          <p className="mt-2">123 Downtown Avenue, New York, NY</p>

          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-amber-300">Phone</p>
          <p className="mt-2">+1 (555) 123-4567</p>

          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-amber-300">Email</p>
          <p className="mt-2">hello@crownandblade.com</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-700">
          <iframe
            title="Barber shop map"
            src="https://www.google.com/maps?q=Times+Square,+New+York&output=embed"
            className="h-80 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
