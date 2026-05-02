import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center px-4 text-center md:px-6">
      <Seo title="404" description="The page you are looking for could not be found." />
      <p className="font-display text-7xl text-amber-300">404</p>
      <h1 className="mt-4 text-3xl text-white">Page Not Found</h1>
      <p className="mt-3 text-slate-300">The style you are looking for might have moved to another page.</p>
      <Link to="/" className="mt-6 rounded-full bg-amber-400 px-6 py-3 text-sm uppercase tracking-[0.2em] text-black">
        Back to Home
      </Link>
    </section>
  );
}
