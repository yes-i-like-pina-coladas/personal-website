import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';

export default function BlogNavbar() {
  const location = useLocation();
  const isPost = /^\/blog\//.test(location.pathname);

  return (
    <header className={`w-full border-b border-stone-200 bg-[#FFFBF5]/90 backdrop-blur supports-[backdrop-filter]:bg-[#FFFBF5]/70 ${isPost ? 'sticky top-0 z-50' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-800 hover:text-stone-900">
          <Home className="h-5 w-5" />
          <span className="font-semibold">Vladimir Loginov</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors ${
              location.pathname === '/blog' ? 'bg-stone-100 text-stone-900' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Blog
          </Link>
          {isPost && (
            <a
              href="#top"
              className="hidden sm:inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm text-stone-500 hover:text-stone-900 hover:bg-stone-100"
            >
              Top
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}


