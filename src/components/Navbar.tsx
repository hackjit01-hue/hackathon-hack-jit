import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import jitLogo from '../assets/jit_logo_no_bg.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: "SDG Goals", href: "#about" },
    { name: "Schedule", href: "#schedule" },
    { name: "Prizes", href: "#prizes" },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: isMobile ? '12px 5%' : '12px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 78, 224, 0.1)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '14px' }}>
          <img
            src={jitLogo}
            alt="JIT Logo"
            style={{
              height: isMobile ? '40px' : '56px',
              width: 'auto',
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              color: '#002e73',
              fontWeight: 800,
              fontSize: isMobile ? '14px' : '18px',
              letterSpacing: '-0.01em',
              lineHeight: 1.2
            }}>
              JANSONS INSTITUTE OF TECHNOLOGY
            </span>
            {!isMobile && (
              <span style={{
                color: '#64748b',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}>
                AUTONOMOUS
              </span>
            )}
          </div>
        </a>
      </div>

      {/* Desktop Menu */}
      {!isMobile && (
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>{link.name}</a>
          ))}
          <Link to="/register" className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px', borderRadius: '100px' }}>Register Now</Link>
        </div>
      )}

      {/* Mobile Toggle */}
      {isMobile && (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'none', border: 'none', color: '#0f172a', cursor: 'pointer', padding: '8px' }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Mobile Dropdown */}
      {isMobile && isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          padding: '24px 5%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          borderTop: '1px solid #f1f5f9'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 700, fontSize: '18px' }}
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/register"
            onClick={() => setIsMenuOpen(false)}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '16px' }}
          >
            Register Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
