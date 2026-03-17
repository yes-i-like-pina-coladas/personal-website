import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/index';
import Blog from './pages/blog';
import PostPage from './pages/blog/[slug]';
import NotFound from './pages/404';
import Navbar from './components/Navbar';
import BlogNavbar from './components/BlogNavbar';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.25,
  ease: 'easeInOut',
};

function GTagRouteListener() {
  const location = useLocation();

  useEffect(() => {
    const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
    if (!gtag) return;

    const pagePath = location.pathname + location.search + location.hash;
    const pageTitle = document.title;
    const pageLocation = window.location.href;

    gtag('config', 'G-D3JY9STWJT', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: pageLocation,
    });
  }, [location]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <BlogNavbar />
                <div className="mt-4" />
                <Blog />
              </>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <>
                <BlogNavbar />
                <div className="mt-4" />
                <PostPage />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FFFBF5]">
        <GTagRouteListener />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
