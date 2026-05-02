export default function Footer() {
  return (
    <footer className="border-t border-amber-500/20 bg-black/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-sm text-slate-400 md:flex-row md:px-6">
        <p>© {new Date().getFullYear()} Crown & Blade. Crafted for modern grooming.</p>
        <p>Open Mon-Sat, 9:00 AM - 9:00 PM</p>
      </div>
    </footer>
  );
}
