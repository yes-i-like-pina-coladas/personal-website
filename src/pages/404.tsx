import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-orange-500/20 select-none">404</p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-stone-900">
          Page not found
        </h1>
        <p className="mt-3 text-stone-500 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full bg-orange-500 text-white font-medium text-sm transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
