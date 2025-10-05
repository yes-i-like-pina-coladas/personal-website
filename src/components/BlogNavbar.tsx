import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';

export default function BlogNavbar() {
  const location = useLocation();
  const isPost = /^\/blog\//.test(location.pathname);

  return (
    <header className={`w-full border-b border-gray-800/80 bg-[#0B1222]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0B1222]/70 ${isPost ? 'sticky top-0 z-50' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
          <Home className="h-5 w-5" />
          <span className="font-semibold">Vladimir Loginov</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors ${
              location.pathname === '/blog' ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Blog
          </Link>
          {isPost && (
            <a
              href="#top"
              className="hidden sm:inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10"
            >
              Top
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}


