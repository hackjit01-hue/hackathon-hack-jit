import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import campusImg from '../assets/jit_campus.png';
import sirenIcon from '../assets/siren_icon.png';
import SplitText from './SplitText';
import BlurText from './BlurText';

const WelcomeModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 800);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const closeModal = () => setIsOpen(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    background: 'rgba(15, 23, 42, 0.15)', // Neutral light backdrop with a hint of depth
                    backdropFilter: 'blur(12px)'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 30 }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            y: 10,
                            transition: { duration: 0.2, ease: 'easeIn' }
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.98)', // Glassy white with high opacity
                            width: '100%',
                            maxWidth: isMobile ? '310px' : '440px',
                            borderRadius: isMobile ? '28px' : '40px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(30px)'
                        }}
                    >
                        {/* Elegant Background Pattern */}
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            right: '-50px',
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(0, 78, 224, 0.05) 0%, transparent 70%)',
                            zIndex: 0
                        }} />

                        {/* Image Header with Elegant Overlay */}
                        <div style={{ position: 'relative', height: isMobile ? '160px' : '220px', width: '100%' }}>
                            <img
                                src={campusImg}
                                alt="JIT Campus"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '-2px', // Overlap to remove the line
                                left: 0,
                                right: 0,
                                height: '120px',
                                background: 'linear-gradient(to top, rgba(255, 255, 255, 0.98) 15%, rgba(255, 255, 255, 0) 100%)',
                                zIndex: 1
                            }} />

                            {/* Old UI Style Badge Reverted - Glass Light Style */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                left: '20px',
                                background: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(8px)',
                                padding: isMobile ? '4px 10px' : '6px 14px',
                                borderRadius: '100px',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                fontSize: isMobile ? '8px' : '10px',
                                fontWeight: 700,
                                color: 'rgba(15, 23, 42, 0.8)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                zIndex: 2
                            }}>
                                JIT Coimbatore
                            </div>
                        </div>

                        {/* Content Section */}
                        <div style={{ padding: isMobile ? '0 24px 36px' : '0 40px 48px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            {/* Refined Announcement Bar - Moved Down Style */}
                            <div style={{
                                width: '100%',
                                margin: '18px auto 18px', // Increased margins to move down and add space with title
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1
                            }}>
                                <BlurText
                                    text="24 Hours Hackathon — Code Till You Drop"
                                    animateBy="words"
                                    delay={100}
                                    direction="top"
                                    className="announcement-text"
                                />
                                <style>{`
                                    .announcement-text {
                                        color: #334155;
                                        font-weight: 700;
                                        font-size: ${isMobile ? '10px' : '12px'};
                                        letter-spacing: 0.05em;
                                        text-transform: uppercase;
                                        display: block;
                                        line-height: 1.4;
                                        text-align: center;
                                    }
                                `}</style>
                            </div>

                            {/* Main Title with Professional Colors */}
                            <div style={{ marginBottom: '16px', marginTop: '4px' }}>
                                <SplitText
                                    text="CAMCEE 5.0"
                                    className="modal-title"
                                    delay={40}
                                    duration={0.8}
                                    splitType="words"
                                    textAlign="center"
                                    tag="h2"
                                />
                                <style>{`
                                    .modal-title {
                                        font-size: ${isMobile ? '30px' : '44px'} !important;
                                        font-weight: 800 !important;
                                        color: #0f172a !important;
                                        line-height: 1.1 !important;
                                        letter-spacing: ${isMobile ? '-0.02em' : '-0.04em'} !important;
                                        display: block !important;
                                    }
                                    .modal-title .split-word:nth-child(1) { color: #f97316; margin-right: 0.15em; }
                                    .modal-title .split-word:nth-child(2) { color: #2563eb; }
                                `}</style>
                            </div>

                            {/* Department Welcome Text */}
                            <div style={{
                                marginBottom: '12px',
                                marginTop: '8px',
                                fontWeight: 700, // Increased weight for better visibility
                                fontSize: isMobile ? '15px' : '17px',
                                color: '#1e293b',
                                fontFamily: "'Archia', sans-serif",
                                letterSpacing: '0.01em',
                                opacity: 0.9
                            }}>
                                Welcome to CSE Department
                            </div>

                            {/* Registration Deadline Notice */}
                            <div style={{
                                marginBottom: isMobile ? '28px' : '34px', // Slightly reduced to move button up
                                fontSize: isMobile ? '12px' : '13px',
                                fontWeight: 600,
                                color: '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                                <img src={sirenIcon} alt="Siren" style={{ width: '20px', height: '20px', animation: 'pulse 2s infinite', objectFit: 'contain' }} />
                                Registration closes on Feb 4
                                <style>{`
                                    @keyframes pulse {
                                        0% { opacity: 1; transform: scale(1); }
                                        50% { opacity: 0.5; transform: scale(1.2); }
                                        100% { opacity: 1; transform: scale(1); }
                                    }
                                `}</style>
                            </div>

                            <button
                                onClick={closeModal}
                                style={{
                                    width: '100%',
                                    maxWidth: isMobile ? '200px' : '240px',
                                    margin: '0 auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: isMobile ? '14px 28px' : '16px 40px',
                                    fontSize: isMobile ? '13px' : '15px',
                                    fontWeight: 700,
                                    borderRadius: '100px',
                                    background: '#22c55e',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 15px 30px -10px rgba(34, 197, 94, 0.4)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 20px 35px -10px rgba(34, 197, 94, 0.5)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(34, 197, 94, 0.4)';
                                }}
                            >
                                Get Started
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;
