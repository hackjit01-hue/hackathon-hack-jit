import React from 'react';
import { motion } from 'framer-motion';
import regTrophy from '../assets/reg_trophy.png';
import prizeRunner from '../assets/prize_runner.png';
import prizeSecondRunner from '../assets/prize_second_runner.png';

const Prizes: React.FC = () => {
    const cardTransition: any = { type: 'spring', damping: 20, stiffness: 100 };

    return (
        <section id="prizes" style={{ padding: 'clamp(60px, 8vh, 100px) 5% clamp(160px, 20vh, 240px)', background: 'transparent', position: 'relative' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 60px)' }}
            >
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', marginBottom: '16px', fontWeight: 900, letterSpacing: '-0.03em' }}>
                    Prizes & Recognition
                </h2>
                <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto', fontSize: '15px', fontWeight: 500, lineHeight: 1.6 }}>
                    Recognizing excellence and providing platform for the most innovative solutions to thrive.
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                maxWidth: '1100px',
                margin: '0 auto'
            }}>
                {/* 1st Prize */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={cardTransition}
                    whileHover={{ y: -12, scale: 1.02 }}
                    style={{
                        padding: '48px 32px',
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        borderRadius: '48px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 30px 60px -12px rgba(0, 78, 224, 0.12), 0 18px 36px -18px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '-20%',
                        right: '-20%',
                        width: '200px',
                        height: '200px',
                        background: 'radial-gradient(circle, rgba(0, 78, 224, 0.1) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '28px',
                        border: '1px solid white',
                        boxShadow: '0 10px 20px rgba(0, 78, 224, 0.08)'
                    }}>
                        <img src={regTrophy} alt="Winner" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                    </div>

                    <span style={{
                        fontSize: '15px',
                        fontWeight: 900,
                        color: '#004ee0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        marginBottom: '12px',
                        background: 'rgba(0, 78, 224, 0.08)',
                        padding: '6px 16px',
                        borderRadius: '100px'
                    }}>Winner</span>

                    <div style={{
                        fontSize: '48px',
                        fontWeight: 900,
                        color: '#0f172a',
                        marginBottom: '16px',
                        letterSpacing: '-0.04em',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '4px'
                    }}>
                        <span style={{ fontSize: '24px', opacity: 0.5 }}>₹</span>10,000
                    </div>

                    <div style={{
                        fontSize: '17px',
                        fontWeight: 800,
                        color: 'white',
                        background: 'linear-gradient(135deg, #004ee0 0%, #1883ff 100%)',
                        padding: '14px 28px',
                        borderRadius: '24px',
                        width: '100%',
                        boxShadow: '0 8px 20px rgba(0, 78, 224, 0.2)'
                    }}>
                        Internship + Stipend
                    </div>
                </motion.div>

                {/* 2nd Prize */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...cardTransition, delay: 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    style={{
                        padding: '48px 32px',
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        borderRadius: '48px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 30px 60px -12px rgba(22, 163, 74, 0.1), 0 18px 36px -18px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '-20%',
                        right: '-20%',
                        width: '200px',
                        height: '200px',
                        background: 'radial-gradient(circle, rgba(22, 163, 74, 0.1) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f0fff4 100%)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '28px',
                        border: '1px solid white',
                        boxShadow: '0 10px 20px rgba(22, 163, 74, 0.08)'
                    }}>
                        <img src={prizeRunner} alt="Runner Up" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                    </div>

                    <span style={{
                        fontSize: '15px',
                        fontWeight: 900,
                        color: '#16a34a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        marginBottom: '12px',
                        background: 'rgba(22, 163, 74, 0.08)',
                        padding: '6px 16px',
                        borderRadius: '100px'
                    }}>Runner Up</span>

                    <div style={{
                        fontSize: '48px',
                        fontWeight: 900,
                        color: '#0f172a',
                        marginBottom: '16px',
                        letterSpacing: '-0.04em',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '4px'
                    }}>
                        <span style={{ fontSize: '24px', opacity: 0.5 }}>₹</span>6,000
                    </div>

                    <div style={{
                        fontSize: '17px',
                        fontWeight: 800,
                        color: 'white',
                        background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                        padding: '14px 28px',
                        borderRadius: '24px',
                        width: '100%',
                        boxShadow: '0 8px 20px rgba(22, 163, 74, 0.2)'
                    }}>
                        Internship + Perks
                    </div>
                </motion.div>

                {/* 3rd Prize */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...cardTransition, delay: 0.2 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    style={{
                        padding: '48px 32px',
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        borderRadius: '48px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 30px 60px -12px rgba(124, 58, 237, 0.1), 0 18px 36px -18px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '-20%',
                        right: '-20%',
                        width: '200px',
                        height: '200px',
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f5f0ff 100%)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '28px',
                        border: '1px solid white',
                        boxShadow: '0 10px 20px rgba(124, 58, 237, 0.08)'
                    }}>
                        <img src={prizeSecondRunner} alt="Second Runner Up" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                    </div>

                    <span style={{
                        fontSize: '15px',
                        fontWeight: 900,
                        color: '#7c3aed',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        marginBottom: '12px',
                        background: 'rgba(124, 58, 237, 0.08)',
                        padding: '6px 16px',
                        borderRadius: '100px'
                    }}>Second Runner</span>

                    <div style={{
                        fontSize: '48px',
                        fontWeight: 900,
                        color: '#0f172a',
                        marginBottom: '16px',
                        letterSpacing: '-0.04em',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '4px'
                    }}>
                        <span style={{ fontSize: '24px', opacity: 0.5 }}>₹</span>4,000
                    </div>

                    <div style={{
                        fontSize: '17px',
                        fontWeight: 800,
                        color: 'white',
                        background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                        padding: '14px 28px',
                        borderRadius: '24px',
                        width: '100%',
                        boxShadow: '0 8px 20px rgba(124, 58, 237, 0.2)'
                    }}>
                        SWAGS & Rewards
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Prizes;
