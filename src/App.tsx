import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/index';
import Blog from './pages/blog';
import PostPage from './pages/blog/[slug]';
import Navbar from './components/Navbar';
import BlogNavbar from './components/BlogNavbar';
import { useEffect } from 'react';

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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0F1C]">
        <GTagRouteListener />
        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
