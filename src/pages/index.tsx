import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import careerData from "@/data/career.json";
import projectsData from "@/data/projects.json";
import organizationsData from "@/data/organizations.json";
import skillsData from "@/data/skills.json";
import { LinkedinIcon, FileText, ArrowRight, BookOpen, HeartHandshake, TrendingUp, Scale, ChevronDown, Target, Zap, BarChart2, Wrench, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getPosts } from '@/lib/content';
import BlogPostCard from '@/components/BlogPostCard';
import type { Post } from '@/lib/content';
import { motion, AnimatePresence } from "framer-motion";
import CompanyLogo from '../components/CompanyLogo';
import OrganizationLogo from '../components/OrganizationLogo';
import TiltedPhoto from '../components/TiltedPhoto';
import TiltedCard from '../components/TiltedCard';
import Footer from '../components/Footer';

export default function Home() {
  const [activeCareerItem, setActiveCareerItem] = useState<string | null>(null);
  const [expandedCareerItems, setExpandedCareerItems] = useState<Set<string>>(new Set());
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const toggleCareerItem = (id: string) => {
    setExpandedCareerItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const location = useLocation();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Triggers when item is 20% from top/bottom of viewport
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCareerItem(entry.target.id);
        }
      });
    }, options);

    // Observe all career items
    document.querySelectorAll('[data-career-item]').forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    (async () => {
      const posts = await getPosts();
      setRecentPosts(posts.slice(0, 3));
    })();
  }, []);

  useEffect(() => {
    const state = location.state as any;
    if (state?.scrollTo) {
      const id = state.scrollTo as string;
      const el = document.getElementById(id);
      if (el) {
        const offset = 100;
        const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
      // clear state so browser back/forward won’t repeat
      history.replaceState({}, document.title);
    }
  }, [location]);

  // helper removed (unused)

  // SEO: home page defaults
  useEffect(() => {
    document.title = 'Vladimir Loginov – Product Manager | Dublin';
    const description = 'Product Manager specialising in payments, conversion optimisation, and A/B testing. 4+ years growing B2C products at Yandex (Kinopoisk) and Smartbox. MSc Trinity College Dublin. Based in Dublin, Ireland.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/`);

    const og: Array<[string, string]> = [
      ['og:site_name', 'Vladimir Loginov'],
      ['og:type', 'website'],
      ['og:title', 'Vladimir Loginov – Product Manager | Dublin'],
      ['og:description', description],
      ['og:url', `${window.location.origin}/`],
      ['og:image', `${window.location.origin}/assets/photo_normal.jpg`],
    ];
    og.forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    const tw: Array<[string, string]> = [
      ['twitter:card', 'summary_large_image'],
      ['twitter:title', 'Vladimir Loginov – Product Manager | Dublin'],
      ['twitter:description', description],
      ['twitter:image', `${window.location.origin}/assets/photo_normal.jpg`],
    ];
    tw.forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    const ld = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Vladimir Loginov',
        url: `${window.location.origin}/`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Vladimir Loginov',
        jobTitle: 'Product Manager',
        description: 'Product Manager specialising in payments, conversion optimisation, and A/B testing. Based in Dublin, Ireland.',
        url: `${window.location.origin}/`,
        image: `${window.location.origin}/assets/photo_normal.jpg`,
        sameAs: [
          'https://www.linkedin.com/in/loginov-vladimir/',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Smartbox Group',
        },
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'Trinity College Dublin' },
          { '@type': 'CollegeOrUniversity', name: 'Bauman Moscow State Technical University' },
        ],
        knowsAbout: ['Product Management', 'A/B Testing', 'Conversion Rate Optimisation', 'Payments', 'Subscription Monetisation', 'Data Analytics', 'AI'],
        address: { '@type': 'PostalAddress', addressLocality: 'Dublin', addressCountry: 'IE' },
      },
    ];
    let script = document.getElementById('website-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'website-jsonld';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(ld);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBF5]">
      <main className="flex-1">
        <section id="about" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 xl:py-48 mt-16 sm:mt-20 scroll-mt-28">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <div className="flex flex-col-reverse lg:grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px] items-center">
              <motion.div 
                className="flex flex-col justify-center space-y-4 sm:space-y-6 max-w-full text-center lg:text-left w-full items-center lg:items-start mt-8 lg:mt-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-3 sm:space-y-4 w-full">
                  <div className="relative inline-block w-full">
                    <div 
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/20 opacity-75 blur-[60px] pointer-events-none"
                      style={{
                        willChange: 'transform',
                        zIndex: 0,
                      }}
                    />
                    <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl/none font-bold tracking-tighter text-stone-900 z-10">
                      Vladimir Loginov
                    </h1>
                  </div>
                  <p className="relative text-lg sm:text-xl lg:text-2xl text-stone-600 max-w-[600px] mx-auto lg:mx-0 z-10">
                  Accelerating product growth through data, experimentation, and insight.
                  </p>
                  <p className="relative text-sm sm:text-base text-stone-500 max-w-[580px] mx-auto lg:mx-0 z-10 leading-relaxed border-l-2 border-orange-400 pl-4">
                    4+ years building B2C products at scale — subscription monetisation and payment CRO at Yandex&apos;s Kinopoisk (90M+ MAU), now driving conversion growth at Europe&apos;s largest gift experience marketplace. MSc Business Management from Trinity College Dublin. Based in Dublin, Ireland.
                  </p>
                </div>
                <div className="relative flex flex-col sm:flex-row gap-4 justify-center lg:justify-start z-10 w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="relative group/btn overflow-hidden bg-orange-500 text-white transition-all duration-300 gap-2 w-full sm:w-auto transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_theme(colors.orange.500)]"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/loginov-vladimir/" target="_blank" rel="noopener noreferrer">
                      <div className="relative flex items-center justify-center gap-2">
                        <LinkedinIcon className="w-5 h-5 transition-transform duration-300" />
                        <span className="relative">Connect on LinkedIn</span>
                      </div>
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="group/btn relative overflow-hidden border-2 border-stone-300 bg-transparent text-stone-600 hover:text-stone-900 hover:border-orange-400 transition-all duration-300 gap-2 w-full sm:w-auto transform hover:-translate-y-0.5 hover:shadow-[0_0_15px_theme(colors.orange.400)]"
                    asChild
                  >
                    <a href="/cv.pdf" download>
                      <div className="relative flex items-center justify-center gap-2">
                        <FileText className="w-5 h-5 transition-transform duration-300" />
                        <span className="relative">Download CV</span>
                      </div>
                    </a>
                  </Button>
                </div>
              </motion.div>
              <TiltedPhoto
                src="/assets/photo_normal.jpg"
                alt="Vladimir Loginov"
                displayOverlayContent={true}
                overlayContent={
                  <div className="bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                    Product Manager
                  </div>
                }
              />
            </div>
          </div>
        </section>
        <section id="career" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 scroll-mt-28">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-8 sm:mb-16 text-stone-900">
              Career Timeline
            </h2>
            <div className="relative mt-4 sm:mt-8">
              <div className="hidden lg:block absolute left-1/2 h-full w-[2px] -translate-x-1/2 bg-stone-300" />
              {careerData.map((item, index) => (
                <motion.div
                  key={item.company}
                  id={`career-${index}`}
                  data-career-item
                  className={`mb-8 sm:mb-12 lg:mb-24 last:mb-0 lg:w-[calc(50%-32px)] scroll-mt-28 ${index % 2 === 1 ? 'lg:ml-auto' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="relative">
                    {/* Date label */}
                    <div className={`hidden lg:block absolute top-6 text-base lg:text-lg font-medium text-stone-400 whitespace-nowrap ${
                      index % 2 === 0 ? 'right-0 translate-x-[calc(100%+40px)]' : 'left-0 -translate-x-[calc(100%+40px)]'
                    }`}>
                      {item.years}
                    </div>
                    
                    <div className={`relative group overflow-visible ${activeCareerItem === `career-${index}` ? 'is-active' : ''}`}>
                      <div 
                        className={`absolute -inset-4 sm:-inset-6 bg-orange-500/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[24px] sm:rounded-[32px] pointer-events-none ${
                          activeCareerItem === `career-${index}` ? 'opacity-100' : ''
                        }`}
                        style={{
                          filter: 'blur(50px)',
                          willChange: 'transform, opacity, filter',
                          transform: 'translate3d(0, 0, 0)',
                          backfaceVisibility: 'hidden',
                        }}
                      />
                      <div className={`relative rounded-xl bg-white shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100 transition-all duration-300 hover:-translate-y-1 z-10 ${
                        activeCareerItem === `career-${index}` ? '-translate-y-1' : ''
                      }`}>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8">
                          <div className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                            activeCareerItem === `career-${index}` ? 'scale-105' : ''
                          }`}>
                            <CompanyLogo
                              src={item.logo}
                              alt={item.company}
                              className={`${
                                item.company.toLowerCase().includes('smartbox') 
                                  ? 'w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40' 
                                  : 'w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32'
                              } transition-all duration-300 grayscale group-hover:grayscale-0 ${
                                activeCareerItem === `career-${index}` ? 'grayscale-0' : ''
                              }`}
                            />
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">{item.company}</h3>
                            <p className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-800">{item.description}</p>
                            <div className="flex flex-col gap-1 sm:gap-2">
                              <p className="text-base sm:text-lg font-semibold text-gray-900">{item.position}</p>
                              <p className="text-sm sm:text-base font-medium text-gray-700 lg:hidden">{item.years}</p>
                            </div>
                            {Array.isArray((item as any).bullets) && (item as any).bullets.length > 0 && (
                              <div className="mt-4">
                                <button
                                  onClick={() => toggleCareerItem(`career-${index}`)}
                                  className="flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200 mx-auto sm:mx-0"
                                >
                                  <span>{expandedCareerItems.has(`career-${index}`) ? 'Hide details' : 'Show details'}</span>
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedCareerItems.has(`career-${index}`) ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                  {expandedCareerItems.has(`career-${index}`) && (
                                    <motion.ul
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="mt-3 space-y-2 overflow-hidden text-left"
                                    >
                                      {(item as any).bullets.map((bullet: string, bIdx: number) => (
                                        <li key={bIdx} className="flex gap-2 text-sm text-stone-600">
                                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                                          <span>{bullet}</span>
                                        </li>
                                      ))}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Decorative hover/scroll shapes */}
                      <div className={`absolute ${index % 2 === 0 ? '-top-3 -right-3' : '-top-3 -left-3'} w-10 h-10 sm:w-14 sm:h-14 rounded-full ring-[3px] ring-orange-500 opacity-0 scale-50 group-hover:opacity-80 group-hover:scale-100 transition-all duration-500 delay-75 pointer-events-none z-20 ${activeCareerItem === `career-${index}` ? 'opacity-80 scale-100' : ''}`} />
                      <div className={`absolute ${index % 2 === 0 ? '-bottom-2 -left-2' : '-bottom-2 -right-2'} w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-500/40 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-150 pointer-events-none z-20 ${activeCareerItem === `career-${index}` ? 'opacity-100 scale-100' : ''}`} />
                      <div className={`absolute ${index % 2 === 0 ? 'top-1/2 -left-4' : 'top-1/2 -right-4'} w-4 h-4 sm:w-5 sm:h-5 rounded-md ring-[2px] ring-orange-500/70 rotate-45 opacity-0 ${index % 2 === 0 ? '-translate-x-2 group-hover:translate-x-0' : 'translate-x-2 group-hover:translate-x-0'} group-hover:opacity-80 transition-all duration-500 delay-200 pointer-events-none z-20 ${activeCareerItem === `career-${index}` ? 'opacity-80 translate-x-0' : ''}`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
        </section>
        <section id="skills" className="w-full py-8 sm:py-12 md:py-20 lg:py-28 scroll-mt-28">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-stone-900 mb-6 sm:mb-8 lg:mb-12">
              Skills & Tools
            </h2>
            {(() => {
              // Weight 5=core, 4=strong, 3=solid, 2=good, 1=familiar
              const skillMeta: Record<string, { weight: number; orgs: string[] }> = {
                // Product
                'A/B Testing':             { weight: 5, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group'] },
                'Conversion Rate Optimisation': { weight: 5, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group'] },
                'Product Strategy':        { weight: 4, orgs: ['Smartbox Group', 'Yandex (Kinopoisk)', 'Cognitive Bias Lab'] },
                'Product Discovery':       { weight: 4, orgs: ['Smartbox Group', 'Yandex (Kinopoisk)'] },
                'Stakeholder Management':  { weight: 4, orgs: ['Smartbox Group', 'Yandex (Kinopoisk)', 'BEST Moscow (VP)'] },
                'Roadmapping':             { weight: 3, orgs: ['Smartbox Group', 'Yandex (Kinopoisk)', 'BEST Moscow (VP)'] },
                'OKRs & KPIs':             { weight: 3, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group'] },
                'User Research':           { weight: 3, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group'] },
                'Scrum':                   { weight: 3, orgs: ['Smartbox Group', 'Yandex (Kinopoisk)'] },
                'Kanban':                  { weight: 2, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group'] },
                'Product Led Growth':      { weight: 3, orgs: ['Yandex (Kinopoisk)', 'Cognitive Bias Lab'] },
                // Specialisation
                'Payments':                { weight: 5, orgs: ['Smartbox Group', 'Yandex (Kinopoisk)'] },
                'Monetisation':            { weight: 4, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group'] },
                'Growth':                  { weight: 4, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group', 'Cognitive Bias Lab'] },
                'E-Commerce':              { weight: 3, orgs: ['Smartbox Group'] },
                'NPS':                     { weight: 3, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group'] },
                // Data & Analytics
                'SQL':                     { weight: 4, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group'] },
                'Amplitude':               { weight: 3, orgs: ['Personal projects'] },
                'Tableau':                 { weight: 3, orgs: ['Yandex (Kinopoisk)'] },
                'Google Analytics':        { weight: 3, orgs: ['Cognitive Bias Lab', 'Smartbox Group'] },
                'Data Visualization':      { weight: 3, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group', 'Novaya Gazeta Europe'] },
                'Statistics':              { weight: 3, orgs: ['Bauman Moscow State TU', 'Yandex (Kinopoisk)', 'Novaya Gazeta Europe'] },
                'Power BI':                { weight: 2, orgs: ['Smartbox Group'] },
                // Tools
                'Jira':                    { weight: 3, orgs: ['Smartbox Group'] },
                'Figma':                   { weight: 3, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group'] },
                'Confluence':              { weight: 2, orgs: ['Smartbox Group'] },
                'Miro':                    { weight: 2, orgs: ['Yandex (Kinopoisk)', 'Smartbox Group', 'Trinity College Dublin'] },
                'Notion':                  { weight: 2, orgs: ['Cognitive Bias Lab', 'BEST Moscow (VP)', 'Personal projects'] },
                // AI
                'Claude Code':             { weight: 4, orgs: ['Cognitive Bias Lab', 'Commute Check', 'Personal projects'] },
                'Cursor':                  { weight: 3, orgs: ['Cognitive Bias Lab', 'Personal projects'] },
                'Prompt Engineering':      { weight: 3, orgs: ['Improve at Chess with AI', 'Cognitive Bias Lab'] },
                'ChatGPT':                 { weight: 3, orgs: ['Improve at Chess with AI', 'Personal projects'] },
                'Claude Cowork':           { weight: 2, orgs: ['Personal projects'] },
              };

              const sizeClass = (w: number) => {
                if (w >= 5) return 'text-2xl sm:text-3xl px-5 py-2.5 font-bold';
                if (w === 4) return 'text-lg sm:text-xl px-4 py-2 font-semibold';
                if (w === 3) return 'text-base px-3.5 py-1.5 font-medium';
                if (w === 2) return 'text-sm px-3 py-1.5 font-medium';
                return 'text-xs px-2.5 py-1 font-medium';
              };

              const allSkills = Object.entries(skillsData).flatMap(([cat, skills]) =>
                (skills as string[]).map(skill => ({ skill, cat }))
              );

              return (
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center">
                  {allSkills.map(({ skill, cat }, i) => {
                    const meta = skillMeta[skill] ?? { weight: 1, orgs: [] };
                    const isActive = activeTooltip === skill;
                    return (
                      <div key={skill} className="relative">
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.02 }}
                          whileHover={{ scale: 1.08, y: -2 }}
                          onClick={() => setActiveTooltip(isActive ? null : skill)}
                          onMouseEnter={() => setActiveTooltip(skill)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          className={`${sizeClass(meta.weight)} rounded-full transition-all duration-200 ${
                            isActive
                              ? 'ring-1 ring-stone-300 text-stone-900'
                              : 'text-stone-600 hover:ring-1 hover:ring-stone-300 hover:text-stone-900'
                          }`}
                        >
                          {skill}
                        </motion.button>
                        <AnimatePresence>
                          {isActive && meta.orgs.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
                            >
                              <div className="bg-stone-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                                <p className="text-stone-400 text-[10px] uppercase tracking-wide mb-1 font-medium">Used / learned at</p>
                                {meta.orgs.map(org => (
                                  <p key={org} className="leading-snug">{org}</p>
                                ))}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </section>
        <section id="projects" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 scroll-mt-28">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-stone-900 mb-6 sm:mb-8 lg:mb-12">
              Side Projects
            </h2>
            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.title}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="w-full group relative overflow-visible"
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute -inset-4 sm:-inset-6 bg-orange-500/30 opacity-0 group-hover:opacity-100 rounded-[24px] sm:rounded-[32px] pointer-events-none transition-all duration-500"
                    style={{
                      filter: 'blur(50px)',
                      willChange: 'transform, opacity, filter',
                      transform: 'translate3d(0, 0, 0)',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                  <Card className="relative h-full overflow-hidden border border-stone-200 bg-white/80 transition-colors duration-300 group-hover:border-orange-500/50 z-10">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-xl lg:text-2xl text-stone-900">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-4">
                      <p className="text-xs sm:text-base text-stone-600">
                        {project.description}
                      </p>
                      {Array.isArray((project as any).highlights) && (
                        <ul className="list-disc list-inside space-y-1 text-[11px] sm:text-sm text-stone-500">
                          {(project as any).highlights.map((point: string) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                      <Button 
                        className="w-full sm:w-auto border-2 border-stone-300 bg-transparent text-stone-600 hover:text-stone-900 hover:border-orange-400 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_theme(colors.orange.400)]" 
                        variant="outline"
                        asChild
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full"
                        >
                          View Project <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                  {/* Decorative hover shapes */}
                  <div className={`absolute ${index % 2 === 0 ? '-top-3 -right-3' : '-top-3 -left-3'} w-10 h-10 sm:w-14 sm:h-14 rounded-full ring-[3px] ring-orange-500 opacity-0 scale-50 group-hover:opacity-80 group-hover:scale-100 transition-all duration-500 delay-75 pointer-events-none z-20`} />
                  <div className={`absolute ${index % 2 === 0 ? '-bottom-2 -left-2' : '-bottom-2 -right-2'} w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-500/40 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-150 pointer-events-none z-20`} />
                  <div className={`absolute ${index % 2 === 0 ? 'top-1/3 -left-4' : 'top-1/3 -right-4'} w-4 h-4 sm:w-5 sm:h-5 rounded-md ring-[2px] ring-orange-500/70 rotate-45 opacity-0 ${index % 2 === 0 ? '-translate-x-2 group-hover:translate-x-0' : 'translate-x-2 group-hover:translate-x-0'} group-hover:opacity-80 transition-all duration-500 delay-200 pointer-events-none z-20`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Values Section */}
        <section id="values" className="w-full py-8 sm:py-12 md:py-20 lg:py-28 scroll-mt-28">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6 text-stone-900">
              Values
            </h2>
            <p className="text-base sm:text-lg text-stone-600 max-w-3xl mb-8 sm:mb-12">
              My core values are aligned with Andrey Sakharov’s triad: Peace, Progress, and Human Rights. These principles guide my decisions, collaborations, and the products I build. I try to follow them to contribute to a better world and society, both at work and outside it.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7">
              <TiltedCard glowClassName="bg-orange-500/30" roundedClassName="rounded-2xl" containerClassName="w-full" className="overflow-visible" scaleOnHover={1.03} rotateAmplitude={10}>
                <div className="relative h-full bg-white border border-stone-200/60 rounded-2xl p-6 sm:p-8 group/card">
                  <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[3px] rounded-b-full bg-gradient-to-r from-orange-400 to-orange-500" />
                  <div className="mb-5 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-50 ring-1 ring-orange-200/60">
                    <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-2 sm:mb-3">Peace</h3>
                  <p className="text-stone-500 text-sm sm:text-[15px] leading-relaxed">
                    Foster respectful dialogue and collaboration. Seek solutions that reduce conflict and create trust among teams, users, and stakeholders.
                  </p>
                  <div className="absolute -top-3 -right-3 w-10 h-10 sm:w-14 sm:h-14 rounded-full ring-[3px] ring-orange-500 opacity-0 scale-50 group-hover/card:opacity-80 group-hover/card:scale-100 transition-all duration-500 delay-75 pointer-events-none" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-500/40 opacity-0 scale-50 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-500 delay-150 pointer-events-none" />
                  <div className="absolute top-10 -right-4 w-5 h-5 sm:w-6 sm:h-6 rounded-md ring-[2px] ring-orange-500/70 rotate-45 opacity-0 translate-x-2 group-hover/card:opacity-80 group-hover/card:translate-x-0 transition-all duration-500 delay-200 pointer-events-none" />
                </div>
              </TiltedCard>

              <TiltedCard glowClassName="bg-orange-500/30" roundedClassName="rounded-2xl" containerClassName="w-full" className="overflow-visible" scaleOnHover={1.03} rotateAmplitude={10}>
                <div className="relative h-full bg-white border border-stone-200/60 rounded-2xl p-6 sm:p-8 group/card">
                  <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[3px] rounded-b-full bg-gradient-to-r from-orange-400 to-orange-500" />
                  <div className="mb-5 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-50 ring-1 ring-orange-200/60">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-2 sm:mb-3">Progress</h3>
                  <p className="text-stone-500 text-sm sm:text-[15px] leading-relaxed">
                    Pursue meaningful innovation with rigor. Use data, experimentation, and learning loops to deliver real, compounding improvements.
                  </p>
                  <div className="absolute -top-3 -left-3 w-8 h-8 sm:w-12 sm:h-12 rounded-full ring-[3px] ring-orange-500 opacity-0 scale-50 group-hover/card:opacity-80 group-hover/card:scale-100 transition-all duration-500 delay-75 pointer-events-none" />
                  <div className="absolute -bottom-3 -right-2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-orange-500/40 opacity-0 scale-50 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-500 delay-150 pointer-events-none" />
                  <div className="absolute bottom-12 -left-3 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-500/50 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-500 delay-200 pointer-events-none" />
                </div>
              </TiltedCard>

              <TiltedCard glowClassName="bg-orange-500/30" roundedClassName="rounded-2xl" containerClassName="w-full" className="overflow-visible" scaleOnHover={1.03} rotateAmplitude={10}>
                <div className="relative h-full bg-white border border-stone-200/60 rounded-2xl p-6 sm:p-8 group/card">
                  <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[3px] rounded-b-full bg-gradient-to-r from-orange-400 to-orange-500" />
                  <div className="mb-5 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-50 ring-1 ring-orange-200/60">
                    <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-2 sm:mb-3">Human Rights</h3>
                  <p className="text-stone-500 text-sm sm:text-[15px] leading-relaxed">
                    Build responsibly. Protect privacy, ensure accessibility, and champion dignity and inclusion in product choices and team culture.
                  </p>
                  <div className="absolute -bottom-3 -right-3 w-11 h-11 sm:w-14 sm:h-14 rounded-full ring-[3px] ring-orange-500 opacity-0 scale-50 group-hover/card:opacity-80 group-hover/card:scale-100 transition-all duration-500 delay-75 pointer-events-none" />
                  <div className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-500/40 opacity-0 scale-50 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-500 delay-150 pointer-events-none" />
                  <div className="absolute top-1/2 -right-4 w-5 h-5 sm:w-6 sm:h-6 rounded-md ring-[2px] ring-orange-500/70 rotate-45 opacity-0 translate-x-2 group-hover/card:opacity-80 group-hover/card:translate-x-0 transition-all duration-500 delay-200 pointer-events-none" />
                </div>
              </TiltedCard>
            </div>
            {/* Volunteering & Activities moved under Values */}
            <div className="mt-12 sm:mt-16 lg:mt-24">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter mb-6 sm:mb-8 lg:mb-12 text-stone-900 text-left">
                Volunteering & Activities
              </h3>
              <motion.div 
                className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {organizationsData.map((org) => (
                  <div key={org.name} className="flex items-center justify-center">
                    <OrganizationLogo
                      src={org.logo}
                      alt={org.name}
                      description={org.description}
                      className="h-auto object-contain mx-auto"
                      customSize={org.customSize}
                      link={org.link}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        <section id="blog" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 scroll-mt-28">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-stone-900 mb-6 sm:mb-8 lg:mb-12">
              Blog
            </h2>
            {recentPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-6 sm:mb-8">
                  <div 
                    className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl"
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  />
                  <div className="relative w-full h-full">
                    <BookOpen className="w-full h-full text-orange-500/80" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 mb-3">Coming Soon</h3>
                <p className="text-base sm:text-lg text-stone-500 max-w-md">
                  I'm working on sharing my thoughts and experiences through blog posts. Stay tuned!
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {recentPosts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <Button 
                    className="border-2 border-stone-300 bg-transparent text-stone-600 hover:text-stone-900 hover:border-orange-400 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_theme(colors.orange.400)]"
                    variant="outline"
                    asChild
                  >
                    <Link to="/blog" className="flex items-center gap-2">
                      View all posts <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 