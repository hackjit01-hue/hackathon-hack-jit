import React from 'react';
import { motion } from 'framer-motion';

const Schedule: React.FC = () => {
    const timelineData = [
        {
            time: "10:30 AM",
            event: "Opening Ceremony",
            description: "Kickstarting the innovation journey with a welcome address and event overview.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2L6 7v7c0 5.25 4.25 10.19 10 11.5 5.75-1.31 10-6.25 10-11.5V7l-10-5z" stroke="#004ee0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="#004ee0" fillOpacity="0.2" stroke="#004ee0" strokeWidth="2" />
                    <path d="M12 22s1-2 4-2 4 2 4 2" stroke="#004ee0" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            time: "11:00 AM",
            event: "Hackathon Begins",
            description: "The clock starts ticking. Participants begin building, brainstorming, and innovating.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="6" width="24" height="20" rx="3" stroke="#22c55e" strokeWidth="2.5" />
                    <path d="M10 12l-3 4 3 4M22 12l3 4-3 4M18 10l-4 12" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            )
        },
        {
            time: "11:30 AM",
            event: "Refreshments",
            description: "Quick fuel to keep the momentum and creativity flowing.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 11h14a2 2 0 0 1 2 2v8a6 6 0 0 1-6 6H11a6 6 0 0 1-6-6v-8a2 2 0 0 1 2-2z" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M23 14h2a3 3 0 0 1 0 6h-2" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 4c0 2-1 3-1 5M15 4c0 2-1 3-1 5M20 4c0 2-1 3-1 5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            time: "01:00 PM",
            event: "Lunch Break",
            description: "Networking and relaxation over a hearty meal.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="12" stroke="#0ea5e9" strokeWidth="2.5" fill="#0ea5e9" fillOpacity="0.1" />
                    <path d="M12 12v8M14 12v8M10 12v8M20 12c0 4.418-1.5 8-1.5 8s-1.5-3.582-1.5-8V10h3v2z" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            time: "04:00 PM",
            event: "Mentor Review Session",
            description: "Teams receive critical feedback and guidance from industry experts.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="5" width="22" height="22" rx="4" stroke="#8b5cf6" strokeWidth="2.5" />
                    <path d="M10 13l4 4 8-8" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 21h14M9 25h10" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            time: "05:00 PM",
            event: "Refreshments",
            description: "Evening energy boost for the final sprint.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 11h14a2 2 0 0 1 2 2v8a6 6 0 0 1-6 6H11a6 6 0 0 1-6-6v-8a2 2 0 0 1 2-2z" stroke="#f43f5e" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M23 14h2a3 3 0 0 1 0 6h-2" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 4c0 2-1 3-1 5M15 4c0 2-1 3-1 5M20 4c0 2-1 3-1 5" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            time: "08:00 PM",
            event: "Dinner",
            description: "Refuel, regroup, and strategize for overnight progress.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12h24v4a12 12 0 0 1-24 0v-4z" fill="#ec4899" fillOpacity="0.1" stroke="#ec4899" strokeWidth="2.5" />
                    <path d="M8 8v4M16 8v4M24 8v4" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            time: "Night",
            event: "Night Stay",
            description: "Overnight accommodation provided in the college hostel, with separate facilities for boys and girls.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 22h24M7 22v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M7 16h18" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M12 12V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            )
        },
        {
            time: "08:00 AM",
            event: "Breakfast",
            isNextDay: true,
            description: "Fresh start to energize teams for the final push.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 26a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke="#f59e0b" strokeWidth="2.5" />
                    <path d="M16 11v5l3 3" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="16" cy="16" r="3" fill="#f59e0b" fillOpacity="0.3" />
                </svg>
            )
        },
        {
            time: "11:00 AM",
            event: "Hackathon Ends",
            isNextDay: true,
            description: "Final submissions completed and projects locked.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4v24M6 4l18 7-18 7" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            time: "01:00 PM",
            event: "Prize Distribution & Closing",
            isNextDay: true,
            description: "Winners announced, certificates distributed, and event formally concluded.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" stroke="#fbbf24" strokeWidth="2.5" fill="#fbbf24" fillOpacity="0.1" strokeLinejoin="round" />
                    <path d="M10 26h12" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            )
        }
    ];

    return (
        <section id="schedule" style={{
            padding: '80px 5%',
            background: 'transparent',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <motion.h3
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 'clamp(18px, 2vw, 22px)',
                            fontWeight: 600,
                            color: '#64748b',
                            marginBottom: '12px',
                            letterSpacing: '0.01em'
                        }}
                    >
                        Think <span style={{ color: '#004ee0' }}>Big</span>, Build <span style={{ color: '#004ee0' }}>Bold</span>
                    </motion.h3>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 'clamp(24px, 4vw, 36px)',
                            fontWeight: 900,
                            color: '#0f172a',
                            letterSpacing: '-0.03em',
                            margin: 0
                        }}
                    >
                        Hackathon <span style={{ color: '#004ee0' }}>Roadmap</span>
                    </motion.h2>
                </div>

                <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gap: '24px' }}>
                        {timelineData.map((item: any, index: number) => {
                            const showDayLabel = item.isNextDay && (index === 0 || !timelineData[index - 1].isNextDay);

                            return (
                                <React.Fragment key={index}>
                                    {showDayLabel && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            style={{
                                                padding: '30px 0 10px 40px',
                                                fontSize: '18px',
                                                fontWeight: 900,
                                                color: '#004ee0',
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '15px'
                                            }}
                                        >
                                            <div style={{ width: '40px', height: '2px', background: '#004ee0' }}></div>
                                            Next Day
                                        </motion.div>
                                    )}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, x: -20 }}
                                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        style={{
                                            zIndex: 1
                                        }}
                                    >
                                        {/* Unified Content Card */}
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: '24px',
                                            alignItems: 'center',
                                            background: 'white',
                                            padding: '24px 32px',
                                            minHeight: '100px',
                                            width: '100%',
                                            borderRadius: '48px',
                                            border: '1px solid #f1f5f9',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)',
                                            textAlign: 'left'
                                        }}>
                                            {/* Icon Container */}
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                background: '#f8fafc',
                                                borderRadius: '24px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                border: '1px solid #f1f5f9'
                                            }}>
                                                {item.icon}
                                            </div>

                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '16px',
                                                    marginBottom: '8px',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    <div style={{
                                                        padding: '6px 14px',
                                                        background: 'rgba(0, 78, 224, 0.1)',
                                                        color: '#004ee0',
                                                        borderRadius: '100px',
                                                        fontSize: '14px',
                                                        fontWeight: 800,
                                                        letterSpacing: '0.02em'
                                                    }}>
                                                        {item.time}
                                                    </div>
                                                    <h4 style={{
                                                        fontFamily: "'Outfit', sans-serif",
                                                        fontSize: 'clamp(18px, 2vw, 22px)',
                                                        fontWeight: 800,
                                                        color: '#0f172a',
                                                        margin: 0
                                                    }}>
                                                        {item.event}
                                                    </h4>
                                                </div>
                                                <p style={{
                                                    fontSize: '15px',
                                                    fontWeight: 500,
                                                    color: '#64748b',
                                                    lineHeight: 1.6,
                                                    margin: 0
                                                }}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Premium Typography Imports */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
            `}</style>
        </section>
    );
};

export default Schedule;
