import { useState, useEffect } from 'react';
import { User, Briefcase, Code, BookOpen, HeartHandshake } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isBlog = location.pathname.startsWith('/blog');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (isBlog) return; // don't track sections on blog pages
    const handleScroll = () => {
      const sections = ['about', 'values', 'career', 'projects', 'blog'];
      let currentSection = sections[0];
      let minDistance = Infinity;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Calculate distance from the top of the viewport
          const distance = Math.abs(rect.top - 100); // 100px offset for navbar
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBlog]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset for navbar height and some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update active section immediately
      setActiveSection(sectionId);
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (isBlog) {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    scrollToSection(sectionId);
  };

  return (
    <div className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto">
      {/* Glow effect */}
      <div 
        className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl pointer-events-none"
        style={{
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      />
      
      <nav className="relative flex items-center justify-between sm:justify-start gap-1 sm:gap-3 p-2 sm:p-3 rounded-full border border-gray-800 bg-gray-900/90 backdrop-blur-lg shadow-lg overflow-x-auto">
        <button
          onClick={() => handleNavClick('about')}
          className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3 flex-shrink-0 ${
            !isBlog && activeSection === 'about'
              ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="hidden sm:inline text-sm sm:text-base font-medium">About</span>
        </button>
        <button
          onClick={() => handleNavClick('values')}
          className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3 flex-shrink-0 ${
            !isBlog && activeSection === 'values'
              ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <HeartHandshake className="w-5 h-5" />
          <span className="hidden sm:inline text-sm sm:text-base font-medium">Values</span>
        </button>
        <button
          onClick={() => handleNavClick('career')}
          className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3 flex-shrink-0 ${
            !isBlog && activeSection === 'career'
              ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="hidden sm:inline text-sm sm:text-base font-medium">Career</span>
        </button>
        <button
          onClick={() => handleNavClick('projects')}
          className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3 flex-shrink-0 ${
            !isBlog && activeSection === 'projects'
              ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <Code className="w-5 h-5" />
          <span className="hidden sm:inline text-sm sm:text-base font-medium">Projects</span>
        </button>
        <button
          onClick={() => handleNavClick('blog')}
          className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3 flex-shrink-0 ${
            !isBlog && activeSection === 'blog'
              ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="hidden sm:inline text-sm sm:text-base font-medium">Blog</span>
        </button>
      </nav>
    </div>
  );
} 