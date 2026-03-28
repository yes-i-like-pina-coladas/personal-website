import { useState, useEffect } from 'react';
import { User, Briefcase, Code, BookOpen, HeartHandshake } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'about', label: 'About', icon: User },
  { id: 'career', label: 'Career', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'values', label: 'Values', icon: HeartHandshake },
  { id: 'blog', label: 'Blog', icon: BookOpen },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isBlog = location.pathname.startsWith('/blog');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (isBlog) return;
    const handleScroll = () => {
      const sections = navItems.map(n => n.id);
      let currentSection = sections[0];
      let minDistance = Infinity;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBlog]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

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
      <div 
        className="absolute -inset-2 bg-orange-500/20 rounded-full blur-xl pointer-events-none"
        style={{
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      />
      
      <nav className="relative flex items-center justify-between sm:justify-start gap-1 sm:gap-1.5 p-2 sm:p-2.5 rounded-full border border-stone-200 bg-white/90 backdrop-blur-lg shadow-lg overflow-x-auto">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = !isBlog && activeSection === id;
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2 sm:gap-2.5 flex-shrink-0 transition-colors duration-200 z-10"
            >
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className={`relative w-5 h-5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-stone-400 group-hover:text-stone-700'}`} />
              <span className={`hidden sm:inline relative text-sm font-medium transition-colors duration-200 ${isActive ? 'text-white' : 'text-stone-500 hover:text-stone-900'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
} 