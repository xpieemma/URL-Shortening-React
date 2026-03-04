import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.svg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Shortly" className="logo" />
            {!isMobile && (
              <div className="nav-links">
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#resources">Resources</a>
              </div>
            )}
          </div>

          {!isMobile && (
            <div className="nav-right">
              <a href="#login" className="btn">Login</a>
              <a href="#signup" className="btn btn-primary">Sign Up</a>
            </div>
          )}

          {isMobile && (
            <>
              <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                <span style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
                <span style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>
                <span style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none' }}></span>
              </div>

              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{
                    position: 'absolute',
                    top: '100px',
                    left: '20px',
                    right: '20px',
                    backgroundColor: 'var(--primary-dark-violet)',
                    borderRadius: '10px',
                    padding: '30px',
                    zIndex: 1000
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <a href="#features" style={{ color: 'white', textDecoration: 'none' }}>Features</a>
                    <a href="#pricing" style={{ color: 'white', textDecoration: 'none' }}>Pricing</a>
                    <a href="#resources" style={{ color: 'white', textDecoration: 'none' }}>Resources</a>
                    <hr style={{ width: '100%', borderColor: 'rgba(255,255,255,0.1)' }} />
                    <a href="#login" style={{ color: 'white', textDecoration: 'none' }}>Login</a>
                    <a href="#signup" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>Sign Up</a>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;