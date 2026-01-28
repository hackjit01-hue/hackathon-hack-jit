import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Timer, Trophy, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import camceeImage from '../assets/camcee_hero.png';

const Hero: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: isMobile ? '100px 5% 60px' : 'clamp(120px, 15vh, 180px) 5% 100px',
            background: 'transparent',
            position: 'relative',
            overflow: 'visible' // Changed from hidden to visible to prevent clipping floating elements
        }}>
            {/* Ambient Background Glow */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '0%',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, rgba(0, 78, 224, 0.05) 0%, transparent 70%)',
                zIndex: 0,
                filter: 'blur(120px)',
                pointerEvents: 'none'
            }} />

            <div style={{
                display: 'flex',
                flexWrap: 'wrap-reverse', // Image on top on mobile, on right on desktop
                gap: '40px',
                alignItems: 'center',
                width: '100%',
                maxWidth: '1440px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ flex: '1 1 600px', minWidth: '320px' }}
                >
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: isMobile ? '6px 14px' : '10px 20px',
                        background: 'var(--primary-light)',
                        borderRadius: '100px',
                        marginBottom: isMobile ? '20px' : '32px',
                        fontSize: isMobile ? '11px' : 'max(13px, 0.85vw)',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        letterSpacing: '0.02em'
                    }}>
                        <Timer size={isMobile ? 14 : 16} />
                        <span>24 HOURS OF INTENSE INNOVATION</span>
                    </div>

                    <h1 style={{
                        fontSize: isMobile ? '7vw' : 'clamp(40px, 4.5vw, 64px)',
                        lineHeight: 1.2,
                        marginBottom: isMobile ? '20px' : '28px',
                        fontWeight: 900,
                        color: '#0f172a'
                    }}>
                        <span style={{ color: 'var(--primary)', whiteSpace: 'nowrap', display: 'inline-block' }}>Brilliant Bharat Hackathon</span> <br />
                        <span style={{ display: 'inline-flex', gap: '8px', fontSize: '0.85em' }}>
                            <span style={{ color: '#FF9933' }}>Viksit</span>
                            <span style={{ color: '#138808' }}>Bharat</span>
                        </span>
                    </h1>

                    <p style={{
                        fontSize: isMobile ? '15px' : 'clamp(17px, 1.6vw, 21px)',
                        color: '#475569',
                        marginBottom: isMobile ? '32px' : '48px',
                        maxWidth: '640px',
                        fontWeight: 500,
                        lineHeight: 1.6
                    }}>
                        Join forces with brilliant minds to contribute towards a Viksit Bharat. A 24-hour journey from idea to impact.
                    </p>


                    <div style={{ display: 'flex', gap: isMobile ? '12px' : '20px', flexWrap: 'wrap', marginBottom: isMobile ? '40px' : '56px' }}>
                        <Link to="/register" className="btn-primary" style={{ padding: isMobile ? '10px 24px' : '14px 30px', fontSize: isMobile ? '14px' : '16px' }}>
                            Register Team <ArrowRight size={isMobile ? 16 : 18} />
                        </Link>
                        <a href="#about" className="btn-outline" style={{ padding: isMobile ? '10px 24px' : '14px 30px', fontSize: isMobile ? '14px' : '16px' }}>
                            Viksit Bharat Goals
                        </a>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'white', padding: '14px 20px', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                            <Timer color="var(--primary)" size={20} />
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '16px' }}>24 Hours</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>11 AM - 11 AM</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'white', padding: '14px 20px', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                            <Trophy color="#22c55e" size={20} />
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '16px' }}>₹20,000</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Prize Pool</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'white', padding: '14px 20px', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                            <CreditCard color="#004ee0" size={20} />
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '16px' }}>₹250</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Per Member</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{
                        opacity: 1,
                        scale: isMobile ? 1 : [1, 1.02, 1],
                        y: [-15, 15, -15],
                        rotate: [-2, 2, -2]
                    }}
                    transition={{
                        opacity: { duration: 1 },
                        scale: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        y: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        rotate: {
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    style={{
                        flex: '1 1 500px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: '340px',
                        padding: isMobile ? '20px' : '60px 20px'
                    }}
                >
                    <img
                        src={camceeImage}
                        alt="Brilliant Bharat Hackathon"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: isMobile ? '100%' : '540px', // Slightly reduced size in lap view
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 40px 100px rgba(0, 78, 224, 0.15))',
                            display: 'block'
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
