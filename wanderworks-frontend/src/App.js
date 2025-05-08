import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const [showFooter, setShowFooter] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      if (scrollDiff > 25) {
        setShowFooter(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setShowFooter(false), 2000);
      } else if (scrollDiff < -10) {
        setShowFooter(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [lastScrollY]);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className="app-content">
        <AppRouter />
      </div>
      {!isAuthPage && showFooter && <Footer />} {/* Conditionally render footer */}
    </>
  );
}

export default App;
