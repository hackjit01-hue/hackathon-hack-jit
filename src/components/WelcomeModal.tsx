import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2 } from 'lucide-react';
import campusImg from '../assets/jit_campus.png';
import sleepIcon from '../assets/sleep_icon.png';

const WelcomeModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show modal on page reload (component mount)
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 800);
        return () => clearTimeout(timer);
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
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(8px)'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{
                            background: 'white',
                            width: '100%',
                            maxWidth: '440px',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'white',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                color: '#64748b',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <X size={20} />
                        </button>

                        {/* Image Header */}
                        <div style={{ position: 'relative', height: '200px', width: '100%' }}>
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
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '100px',
                                background: 'linear-gradient(to top, white, transparent)'
                            }} />
                        </div>

                        {/* Content */}
                        <div style={{ padding: '0 32px 32px', textAlign: 'center' }}>
                            <div style={{
                                width: '100%',
                                overflow: 'hidden',
                                background: 'rgba(0, 78, 224, 0.05)',
                                borderRadius: '100px',
                                marginBottom: '20px',
                                position: 'relative',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid rgba(0, 78, 224, 0.1)'
                            }}>
                                <motion.div
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 15,
                                        ease: "linear"
                                    }}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#004ee0',
                                        fontWeight: 800,
                                        fontSize: '12px',
                                        letterSpacing: '0.02em',
                                        position: 'absolute',
                                        left: 0
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '40px' }}>
                                        <Code2 size={14} />
                                        <span>HACKATHON SEASON IS HERE — A 24 HOURS HACKATHON, "CODE TILL YOU DROP"</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '40px' }}>
                                        <Code2 size={14} />
                                        <span>HACKATHON SEASON IS HERE — A 24 HOURS HACKATHON, "CODE TILL YOU DROP"</span>
                                    </div>
                                </motion.div>
                            </div>

                            <h2 style={{
                                fontSize: '32px',
                                fontWeight: 900,
                                color: '#0f172a',
                                marginBottom: '8px',
                                lineHeight: 1
                            }}>
                                <span style={{ color: 'var(--primary)' }}>Hack@JIT</span> 1.0
                            </h2>

                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                padding: '10px 20px',
                                borderRadius: '100px',
                                marginBottom: '28px',
                                boxShadow: '0 10px 30px rgba(0, 78, 224, 0.08)',
                                border: '1px solid rgba(0, 78, 224, 0.1)',
                                fontWeight: 800,
                                fontSize: '14px'
                            }}>
                                <img src={sleepIcon} alt="Sleep Icon" style={{ width: '18px', height: '18px' }} />
                                <span>
                                    "404": <span style={{ color: '#004ee0' }}>Sleep Not Found</span>
                                </span>
                            </div>

                            <button
                                onClick={closeModal}
                                style={{
                                    width: '100%',
                                    maxWidth: '240px',
                                    margin: '0 auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '18px 24px',
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    borderRadius: '100px',
                                    background: '#22c55e',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 20px rgba(34, 197, 94, 0.15)'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 12px 25px rgba(34, 197, 94, 0.2)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(34, 197, 94, 0.15)';
                                }}
                            >
                                Let's Build Something
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;
