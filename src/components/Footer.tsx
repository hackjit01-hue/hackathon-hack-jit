import React from 'react';
import { Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import jitLogo from '../assets/jit_logo_no_bg.png';

const Footer: React.FC = () => {
    return (
        <footer style={{
            padding: '30px 5% 20px',
            borderTop: '1px solid rgba(0, 78, 224, 0.08)',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: '1 1 300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <img
                                src={jitLogo}
                                alt="JIT Logo"
                                style={{ height: '42px', width: 'auto' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '15px', fontWeight: 800, color: '#002e73', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                                    JANSONS INSTITUTE OF TECHNOLOGY
                                </span>
                                <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>
                                    AUTONOMOUS • COIMBATORE
                                </span>
                            </div>
                        </div>
                        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, maxWidth: '450px', margin: 0 }}>
                            An ISO certified institution dedicated to excellence in engineering education,
                            fostering innovation and professional integrity to shape a sustainable future.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <a href="https://jit.ac.in" target="_blank" rel="noopener noreferrer" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#004ee0',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: 700,
                            padding: '8px 16px',
                            background: 'rgba(0, 78, 224, 0.05)',
                            borderRadius: '100px',
                            transition: 'all 0.3s ease'
                        }}>
                            College Website <ExternalLink size={14} />
                        </a>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <a href="https://x.com/JIT_Offl" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', transition: 'color 0.3s ease' }}><Twitter size={18} /></a>
                            <a href="https://www.instagram.com/jit_offl/?hl=en" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', transition: 'color 0.3s ease' }}><Instagram size={18} /></a>
                            <a href="https://www.linkedin.com/school/jansons-institute-of-technology/" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', transition: 'color 0.3s ease' }}><Linkedin size={18} /></a>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                    color: '#94a3b8',
                    fontSize: '12px',
                    fontWeight: 600,
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div>© 2026 Brilliant Bharath 1.0. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Link to="/admin" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 700 }}>Coordinator Portal</Link>
                        <span style={{ cursor: 'pointer' }}>Privacy</span>
                        <span style={{ cursor: 'pointer' }}>Terms</span>
                    </div>
                </div>
            </div>

            <style>{`
                footer a:hover {
                    color: #004ee0 !important;
                    filter: brightness(0.8);
                }
            `}</style>
        </footer>
    );
};

export default Footer;
