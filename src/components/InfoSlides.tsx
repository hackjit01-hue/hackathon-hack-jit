import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sdgs = [
    { id: 1, title: "No Poverty", color: "#e5243b", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-01-1024x1024.png" },
    { id: 2, title: "Zero Hunger", color: "#dda63a", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-02-1024x1024.png" },
    { id: 3, title: "Good Health", color: "#4c9f38", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-03-1024x1024.png" },
    { id: 4, title: "Quality Education", color: "#c5192d", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-04-1024x1024.png" },
    { id: 5, title: "Gender Equality", color: "#ff3a21", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-05-1024x1024.png" },
    { id: 6, title: "Clean Water", color: "#26bde2", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-06-1024x1024.png" },
    { id: 7, title: "Affordable Energy", color: "#fcc30b", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-07-1024x1024.png" },
    { id: 8, title: "Decent Work", color: "#a21942", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-08-1024x1024.png" },
    { id: 9, title: "Industry/Innovation", color: "#fd6925", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-09-1024x1024.png" },
    { id: 10, title: "Reduced Inequality", color: "#dd1367", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-10-1024x1024.png" },
    { id: 11, title: "Sustainable Cities", color: "#fd9d24", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-11-1024x1024.png" },
    { id: 12, title: "Responsible Consumption", color: "#bf8b2e", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-12-1024x1024.png" },
    { id: 13, title: "Climate Action", color: "#3f7e44", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-13-1024x1024.png" },
    { id: 14, title: "Life Below Water", color: "#0a97d9", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-14-1024x1024.png" },
    { id: 15, title: "Life on Land", color: "#56c02b", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-15-1024x1024.png" },
    { id: 16, title: "Peace & Justice", color: "#00689d", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-16-1024x1024.png" },
    { id: 17, title: "Partnerships", color: "#19486a", img: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-17-1024x1024.png" }
];

const InfoSlides: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="about" style={{
            padding: 'clamp(60px, 8vh, 100px) 5%',
            background: 'transparent',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Green Background Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '1000px',
                height: '1000px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.04) 0%, transparent 70%)',
                zIndex: 0,
                filter: 'blur(100px)',
                pointerEvents: 'none'
            }} />

            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 60px)', position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', marginBottom: '16px', fontWeight: 800 }}>The 17 Global Goals</h2>
                <p style={{ color: '#64748b', maxWidth: '700px', margin: '0 auto', fontSize: 'clamp(15px, 1.8vw, 18px)', fontWeight: 500 }}>
                    Your project must align with one or more of the UN Sustainable Development Goals.
                    Innovation starts with solving these global challenges.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(100px, 15vw, 140px), 1fr))',
                gap: 'clamp(12px, 2vw, 20px)',
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                {sdgs.map((sdg) => (
                    <motion.div
                        key={sdg.id}
                        whileHover={{ y: -8, scale: 1.08 }}
                        className="glass-card"
                        style={{
                            padding: '0',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflow: 'visible',
                            background: 'white',
                            border: 'none',
                            borderRadius: isMobile ? '24px' : '32px',
                            boxShadow: `0 10px 25px ${sdg.color}60`,
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            cursor: 'pointer'
                        }}
                    >
                        <img
                            src={sdg.img}
                            alt={sdg.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                borderRadius: isMobile ? '24px' : '32px'
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default InfoSlides;
