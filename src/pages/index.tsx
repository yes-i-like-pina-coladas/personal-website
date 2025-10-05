import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import careerData from "@/data/career.json";
import projectsData from "@/data/projects.json";
import organizationsData from "@/data/organizations.json";
import { LinkedinIcon, FileText, ArrowRight, BookOpen, HeartHandshake, TrendingUp, Scale } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getPosts } from '@/lib/content';
import BlogPostCard from '@/components/BlogPostCard';
import type { Post } from '@/lib/content';
import { motion } from "framer-motion";
import CompanyLogo from '../components/CompanyLogo';
import OrganizationLogo from '../components/OrganizationLogo';
import TiltedPhoto from '../components/TiltedPhoto';
import TiltedCard from '../components/TiltedCard';
import Footer from '../components/Footer';

export default function Home() {
  const [activeCareerItem, setActiveCareerItem] = useState<string | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
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
    document.title = 'Vladimir Loginov - Product Manager';
    const description = 'Product Manager accelerating growth through data, experimentation, and insight. Articles on product, AI, and engineering.';
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
      ['og:title', 'Vladimir Loginov - Product Manager'],
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
      ['twitter:title', 'Vladimir Loginov - Product Manager'],
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

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Vladimir Loginov',
      url: `${window.location.origin}/`,
    };
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
    <div className="flex flex-col min-h-screen bg-[#0A0F1C]">
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
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 opacity-75 blur-[60px] pointer-events-none"
                      style={{
                        willChange: 'transform',
                        zIndex: 0,
                      }}
                    />
                    <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl/none font-bold tracking-tighter text-white z-10">
                      Vladimir Loginov
                    </h1>
                  </div>
                  <p className="relative text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-[600px] mx-auto lg:mx-0 z-10">
                  Accelerating product growth through data, experimentation, and insight.
                  </p>
                </div>
                <div className="relative flex flex-col sm:flex-row gap-4 justify-center lg:justify-start z-10 w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="relative group/btn overflow-hidden bg-blue-500 text-white transition-all duration-300 gap-2 w-full sm:w-auto transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_theme(colors.blue.500)]"
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
                    className="group/btn relative overflow-hidden border-2 border-gray-700 bg-transparent text-gray-300 hover:text-white hover:border-blue-400 transition-all duration-300 gap-2 w-full sm:w-auto transform hover:-translate-y-0.5 hover:shadow-[0_0_15px_theme(colors.blue.400)]"
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
                  <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                    Product Manager
                  </div>
                }
              />
            </div>
          </div>
        </section>
        {/* Values Section */}
        <section id="values" className="w-full py-8 sm:py-12 md:py-20 lg:py-28 scroll-mt-28">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6 text-white">
              Values
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mb-8 sm:mb-12">
              My core values are aligned with Andrey Sakharov’s triad: Peace, Progress, and Human Rights. These principles guide my decisions, collaborations, and the products I build. I try to follow them to contribute to a better world and society, both at work and outside it.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <TiltedCard glowClassName="bg-blue-500/20" roundedClassName="rounded-[16px] sm:rounded-[20px]" containerClassName="w-full" className="overflow-hidden">
                <Card className="relative h-full overflow-hidden border border-gray-800 bg-gray-900/50">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/10" />
                    <div className="relative w-full h-full grid place-items-center">
                      <HeartHandshake className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-xl lg:text-2xl text-white">Peace</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Foster respectful dialogue and collaboration. Seek solutions that reduce conflict and create trust among teams, users, and stakeholders.
                    </p>
                  </CardContent>
                </Card>
              </TiltedCard>

              <TiltedCard glowClassName="bg-emerald-500/20" roundedClassName="rounded-[16px] sm:rounded-[20px]" containerClassName="w-full" className="overflow-hidden">
                <Card className="relative h-full overflow-hidden border border-gray-800 bg-gray-900/50">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-500/10" />
                    <div className="relative w-full h-full grid place-items-center">
                      <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-xl lg:text-2xl text-white">Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Pursue meaningful innovation with rigor. Use data, experimentation, and learning loops to deliver real, compounding improvements.
                    </p>
                  </CardContent>
                </Card>
              </TiltedCard>

              <TiltedCard glowClassName="bg-purple-500/20" roundedClassName="rounded-[16px] sm:rounded-[20px]" containerClassName="w-full" className="overflow-hidden">
                <Card className="relative h-full overflow-hidden border border-gray-800 bg-gray-900/50">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-purple-500/10" />
                    <div className="relative w-full h-full grid place-items-center">
                      <Scale className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-xl lg:text-2xl text-white">Human Rights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Build responsibly. Protect privacy, ensure accessibility, and champion dignity and inclusion in product choices and team culture.
                    </p>
                  </CardContent>
                </Card>
              </TiltedCard>
            </div>
            {/* Volunteering & Activities moved under Values */}
            <div className="mt-12 sm:mt-16 lg:mt-24">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter mb-6 sm:mb-8 lg:mb-12 text-white text-left">
                Volunteering & Activities
              </h3>
              <motion.div 
                className="flex flex-col sm:flex-row sm:flex-nowrap justify-center items-center gap-6 sm:gap-8 w-full overflow-visible sm:overflow-x-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {organizationsData.map((org) => (
                  <div key={org.name} className="flex items-center justify-center w-full sm:w-auto shrink-0 px-2">
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
        <section id="career" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 scroll-mt-28">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-8 sm:mb-16 text-white">
              Career Timeline
            </h2>
            <div className="relative mt-4 sm:mt-8">
              <div className="hidden sm:block absolute left-1/2 h-full w-[2px] -translate-x-1/2 bg-gray-200/40" />
              {careerData.map((item, index) => (
                <motion.div
                  key={item.company}
                  id={`career-${index}`}
                  data-career-item
                  className={`mb-8 sm:mb-16 lg:mb-24 last:mb-0 sm:w-[calc(50%-32px)] scroll-mt-28 ${index % 2 === 1 ? 'sm:ml-auto' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="relative">
                    {/* Date label */}
                    <div className={`hidden sm:block absolute top-6 text-base sm:text-lg font-medium text-gray-400 whitespace-nowrap ${
                      index % 2 === 0 ? 'right-0 translate-x-[calc(100%+40px)]' : 'left-0 -translate-x-[calc(100%+40px)]'
                    }`}>
                      {item.years}
                    </div>
                    
                    <div className={`relative group ${activeCareerItem === `career-${index}` ? 'is-active' : ''}`}>
                      <div 
                        className={`absolute -inset-2 sm:-inset-4 bg-blue-500/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[20px] sm:rounded-[28px] pointer-events-none ${
                          activeCareerItem === `career-${index}` ? 'opacity-100' : ''
                        }`}
                        style={{
                          filter: 'blur(30px)',
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
                              <p className="text-sm sm:text-base font-medium text-gray-700 sm:hidden">{item.years}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
        </section>
        <section id="projects" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 scroll-mt-28">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-6 sm:mb-8 lg:mb-12">
              Side Projects
            </h2>
            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {projectsData.map((project) => (
                <motion.div
                  key={project.title}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="w-full group relative"
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute -inset-1 sm:-inset-2 bg-blue-500/30 opacity-0 group-hover:opacity-100 rounded-[16px] sm:rounded-[20px] pointer-events-none transition-all duration-500"
                    style={{
                      filter: 'blur(30px)',
                      willChange: 'transform, opacity, filter',
                      transform: 'translate3d(0, 0, 0)',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                  <Card className="relative h-full overflow-hidden border border-gray-800 bg-gray-900/50 transition-colors duration-300 group-hover:border-blue-500/50">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-xl lg:text-2xl text-white">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-4">
                      <p className="text-xs sm:text-base text-gray-300">
                        {project.description}
                      </p>
                      {Array.isArray((project as any).highlights) && (
                        <ul className="list-disc list-inside space-y-1 text-[11px] sm:text-sm text-gray-400">
                          {(project as any).highlights.map((point: string) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                      <Button 
                        className="w-full sm:w-auto bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30" 
                        variant="outline"
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="blog" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 scroll-mt-28">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-6 sm:mb-8 lg:mb-12">
              Blog
            </h2>
            {recentPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-6 sm:mb-8">
                  <div 
                    className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  />
                  <div className="relative w-full h-full">
                    <BookOpen className="w-full h-full text-blue-500/80" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">Coming Soon</h3>
                <p className="text-base sm:text-lg text-gray-400 max-w-md">
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
                    className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30"
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