import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import careerData from "@/data/career.json";
import projectsData from "@/data/projects.json";
import organizationsData from "@/data/organizations.json";
import { LinkedinIcon, FileText, ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CompanyLogo from '../components/CompanyLogo';
import OrganizationLogo from '../components/OrganizationLogo';
import Footer from '../components/Footer';

export default function Home() {
  const [activeCareerItem, setActiveCareerItem] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0F1C]">
      <main className="flex-1">
        <section id="about" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 xl:py-48 mt-16 sm:mt-20">
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
              <motion.div 
                className="relative w-full max-w-[180px] sm:max-w-[220px] lg:max-w-[320px] lg:order-last mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative group">
                  <div 
                    className="absolute inset-0 rounded-3xl bg-blue-500/20 opacity-50 group-hover:opacity-70 pointer-events-none"
                    style={{
                      filter: 'blur(60px)',
                      willChange: 'transform, opacity, filter',
                      transform: 'translate3d(0, 0, 0)',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                  <img
                    alt="Vladimir Loginov"
                    className="relative mx-auto aspect-square rounded-3xl object-cover shadow-2xl shadow-blue-500/10 transition-all duration-300 group-hover:shadow-blue-500/20 w-full z-10"
                    src="/assets/photo_normal.jpg"
                    style={{
                      objectFit: "cover",
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gray-700 group-hover:ring-gray-600 transition-all duration-300 z-20" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="career" className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
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
                  className={`mb-8 sm:mb-16 lg:mb-24 last:mb-0 sm:w-[calc(50%-32px)] ${index % 2 === 1 ? 'sm:ml-auto' : ''}`}
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
            {/* Organizations Section */}
            <div className="mt-12 sm:mt-16 lg:mt-24">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter mb-6 sm:mb-8 lg:mb-12 text-white text-center">
                Volunteering & Activities
              </h3>
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-4 place-items-center gap-6 sm:gap-8 w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {organizationsData.map((org) => (
                  <div key={org.name} className="flex items-center justify-center w-full">
                    <OrganizationLogo
                      src={org.logo}
                      alt={org.name}
                      description={org.description}
                      className="w-full max-w-[80px] sm:max-w-full h-auto object-contain mx-auto"
                      customSize={org.customSize}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        <section id="projects" className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
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
        <section id="blog" className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-6 sm:mb-8 lg:mb-12">
              Blog
            </h2>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 