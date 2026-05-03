import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Book', to: '/book' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="font-display text-2xl tracking-widest text-amber-400">
          CROWN & BLADE
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm uppercase tracking-[0.2em] transition ${
                  isActive ? 'text-amber-300' : 'text-slate-300 hover:text-amber-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/admin/login"
          className="rounded-full border border-amber-400 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-300 transition hover:bg-amber-400 hover:text-black"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}
