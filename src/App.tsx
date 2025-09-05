import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/index';
import Navbar from './components/Navbar';
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
