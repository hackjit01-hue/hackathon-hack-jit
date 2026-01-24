import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, FileText, CheckCircle, ArrowLeft, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

import regUsers from '../assets/reg_users.png';
import regLeader from '../assets/reg_leader.png';
import regTrophy from '../assets/reg_trophy.png';
import regLocation from '../assets/reg_location.png';
import regAccommodation from '../assets/reg_accommodation.png';
import regMentor from '../assets/reg_mentor.png';
import regPayment from '../assets/reg_payment.png';
import paymentQr from '../assets/payment_qr.jpg';
import websiteBg from '../assets/premium_clean_4k.png';

const RegistrationForm: React.FC = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showRulesModal, setShowRulesModal] = useState(false);
    const [rulesChecked, setRulesChecked] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const [formData, setFormData] = useState({
        teamName: '',
        leader: { name: '', phone: '', email: '', college: '', dept: '', gender: '' },
        member: { name: '', phone: '', email: '', college: '', dept: '', gender: '' },
        collegeDistrict: '',
        collegePincode: '',
        expectedArrivalDate: '',
        expectedArrivalTime: '12:00 AM',
        leaderAccommodation: 'No',
        memberAccommodation: 'No',
        accommodationDates: [] as string[],
        transactionId: '',
        totalFee: 250,
        mentor: { name: '', phone: '', gender: '', designation: '', organization: '' }
    });

    const genderOptions = ['Male', 'Female'];

    const hackathonRules = [
        "Each team should have maximum of two members.",
        "No participant can be part of more than one team.",
        "The hackathon will run for 24 hours (Feb 6, 11 AM - Feb 7, 11 AM).",
        "Submissions after 11:00 AM will not be accepted.",
        "All teams must be registered before the start time.",
        "Problem statement must be chosen from provided SDGs.",
        "The solution must align with hackathon objectives.",
        "Coding and development must begin only after 11:00 AM.",
        "Any form of reused projects will lead to disqualification.",
        "Teams must submit Source code, Abstract, and Presentation.",
        "Judging: Innovation, Problem-solving, Technical, Usability, Presentation.",
        "Any misconduct or violation will result in disqualification.",
        "The decision of the organizers and judges will be final."
    ];

    const requirements = [
        "Participants must bring their own laptops.",
        "Laptop chargers are mandatory for all participants.",
        "Required software, IDEs, and tools must be pre-installed.",
        "Participants must ensure their systems are in working condition.",
        "Participants should carry their college ID card for verification."
    ];

    useEffect(() => {
        const hasMember = !!formData.member.name.trim();
        let fee = 250; // Base fee for leader
        if (formData.leaderAccommodation === 'Yes') fee += 200;

        if (hasMember) {
            fee += 250; // Base fee for member
            if (formData.memberAccommodation === 'Yes') fee += 200;
        }

        setFormData(prev => ({ ...prev, totalFee: fee }));
    }, [formData.leaderAccommodation, formData.memberAccommodation, formData.member.name]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!accepted) {
            setShowRulesModal(true);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:5001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message || "Registration successful!");
                setFormData({
                    teamName: '',
                    leader: { name: '', phone: '', email: '', college: '', dept: '', gender: '' },
                    member: { name: '', phone: '', email: '', college: '', dept: '', gender: '' },
                    collegeDistrict: '',
                    collegePincode: '',
                    expectedArrivalDate: '',
                    expectedArrivalTime: '',
                    leaderAccommodation: 'No',
                    memberAccommodation: 'No',
                    accommodationDates: [],
                    transactionId: '',
                    totalFee: 250,
                    mentor: { name: '', phone: '', gender: '', designation: '', organization: '' }
                });
                setAccepted(false);
                setRulesChecked(false);
            } else {
                alert(data.error || "Registration failed.");
            }
        } catch (error) {
            alert("Connection error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAcceptRules = () => {
        if (rulesChecked) {
            setAccepted(true);
            setShowRulesModal(false);
        }
    };

    const inputStyle = (fieldName: string) => ({
        width: '100%',
        padding: '18px 24px',
        borderRadius: '20px',
        border: focusedField === fieldName
            ? '2px solid transparent'
            : '2px solid rgba(226, 232, 240, 0.8)',
        background: focusedField === fieldName
            ? 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #004ee0, #22c55e) border-box'
            : 'rgba(255, 255, 255, 0.9)',
        fontSize: '16px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        outline: 'none',
        boxShadow: focusedField === fieldName
            ? '0 8px 32px rgba(0, 78, 224, 0.15)'
            : '0 2px 8px rgba(0, 0, 0, 0.02)',
        fontWeight: 500
    });

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(24px)',
        padding: 'clamp(24px, 4vw, 40px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        marginBottom: '24px',
        boxShadow: '0 20px 60px rgba(0, 78, 224, 0.04), 0 0 0 1px rgba(0, 78, 224, 0.02)',
        position: 'relative' as const,
        overflow: 'hidden'
    };

    const renderInput = (label: string, field: string, parent: 'leader' | 'member' | null, type: string = 'text', placeholder: string = '', isRequired: boolean = true) => {
        const value = parent ? (formData as any)[parent][field] : (formData as any)[field];
        const fieldKey = parent ? `${parent}.${field}` : field;

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#475569',
                    marginBottom: '12px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                }}>{label} {isRequired && <span style={{ color: '#22c55e' }}>*</span>}</label>
                <input
                    type={type}
                    required={isRequired}
                    value={value}
                    onChange={(e) => {
                        let val = e.target.value;
                        if (type === 'tel' || field.toLowerCase().includes('phone')) {
                            val = val.replace(/\D/g, '').slice(0, 10);
                        } else if (field.toLowerCase().includes('pincode')) {
                            val = val.replace(/\D/g, '').slice(0, 6);
                        }

                        if (parent) {
                            setFormData(prev => ({
                                ...prev,
                                [parent]: { ...prev[parent], [field]: val }
                            }));
                        } else {
                            setFormData(prev => ({ ...prev, [field]: val }));
                        }
                    }}
                    onFocus={() => setFocusedField(fieldKey)}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle(fieldKey)}
                    placeholder={placeholder}
                />
            </div>
        );
    };

    const renderSectionHeader = (title: string, Icon: any, isImage: boolean = false) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <div style={{
                padding: '14px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
                backdropFilter: 'blur(10px)',
                borderRadius: '22px',
                color: 'var(--primary)',
                border: '1px solid rgba(255, 255, 255, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                boxShadow: '0 10px 25px rgba(0, 78, 224, 0.08)',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '26px',
                    padding: '2px',
                    background: 'linear-gradient(135deg, rgba(0, 78, 224, 0.1), rgba(34, 197, 94, 0.1))',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none'
                }} />
                {isImage ? (
                    <img src={Icon} alt={title} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                ) : (
                    <Icon size={26} />
                )}
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>{title}</h3>
        </div>
    );

    const RuleItem = ({ number, text }: { number: number; text: string }) => (
        <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            padding: '16px 20px',
            background: 'white',
            borderRadius: '20px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.2s ease'
        }}>
            <div style={{
                minWidth: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #004ee0 0%, #1883ff 100%)',
                color: 'white',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 800,
                flexShrink: 0,
                boxShadow: '0 4px 10px rgba(0, 78, 224, 0.2)'
            }}>
                {number}
            </div>
            <span style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', fontWeight: 600 }}>{text}</span>
        </div>
    );

    const RequirementItem = ({ text }: { text: string }) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 20px',
            background: '#fffbf5',
            borderRadius: '18px',
            border: '1px solid rgba(254, 215, 170, 0.8)',
            boxShadow: '0 4px 12px rgba(251, 146, 60, 0.05)'
        }}>
            <div style={{
                width: '12px',
                height: '12px',
                background: 'linear-gradient(135deg, #f97316, #fb923c)',
                borderRadius: '4px',
                flexShrink: 0,
                boxShadow: '0 2px 6px rgba(249, 115, 22, 0.3)'
            }}></div>
            <span style={{ fontSize: '15px', color: '#9a3412', lineHeight: '1.5', fontWeight: 600 }}>{text}</span>
        </div>
    );

    const selectStyle = {
        width: '100%',
        padding: '18px 24px',
        paddingRight: '48px',
        borderRadius: '20px',
        border: '2px solid rgba(226, 232, 240, 0.8)',
        background: 'rgba(255, 255, 255, 0.9)',
        fontSize: '16px',
        outline: 'none',
        cursor: 'pointer',
        appearance: 'none' as const,
        fontWeight: 600,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 16px center',
        backgroundSize: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.3s ease',
        color: '#1e293b'
    };

    return (
        <>
            {/* Rules Modal */}
            <AnimatePresence>
                {showRulesModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(12px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                        onClick={() => setShowRulesModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                                borderRadius: '32px',
                                maxWidth: '480px',
                                width: '100%',
                                maxHeight: '80vh',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            {/* Modal Header */}
                            <div style={{
                                padding: '16px 20px',
                                background: 'linear-gradient(135deg, #004ee0 0%, #1883ff 50%, #22c55e 100%)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FileText size={20} />
                                    Rules & Requirements
                                </h3>
                                <button
                                    onClick={() => setShowRulesModal(false)}
                                    style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '8px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <X size={18} color="white" />
                                </button>
                            </div>

                            {/* Modal Body - Scrollable */}
                            <div style={{
                                padding: '24px',
                                overflowY: 'auto',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}>
                                {/* Hackathon Rules */}
                                <div style={{
                                    background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                                    padding: '16px',
                                    borderRadius: '20px'
                                }}>
                                    <h4 style={{
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        marginBottom: '16px',
                                        fontSize: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        <ShieldCheck size={20} color="var(--primary)" />
                                        24-Hour Hackathon Rules
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {hackathonRules.map((rule, index) => (
                                            <RuleItem key={index} number={index + 1} text={rule} />
                                        ))}
                                    </div>
                                </div>

                                {/* Mandatory Requirements */}
                                <div style={{
                                    background: 'linear-gradient(135deg, #fff7ed, #fed7aa40)',
                                    padding: '16px',
                                    borderRadius: '20px'
                                }}>
                                    <h4 style={{
                                        fontWeight: 800,
                                        color: '#9a3412',
                                        marginBottom: '16px',
                                        fontSize: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        <img src={regTrophy} alt="Trophy" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        Mandatory Requirements
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {requirements.map((req, index) => (
                                            <RequirementItem key={index} text={req} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div style={{
                                padding: '24px',
                                borderTop: '1px solid rgba(226, 232, 240, 0.6)',
                                background: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    cursor: 'pointer',
                                    padding: '12px 16px',
                                    background: rulesChecked ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : '#f8fafc',
                                    borderRadius: '100px',
                                    border: rulesChecked ? '2px solid #22c55e' : '2px solid #e2e8f0',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={rulesChecked}
                                        onChange={(e) => setRulesChecked(e.target.checked)}
                                        style={{
                                            width: '26px',
                                            height: '26px',
                                            accentColor: '#22c55e',
                                            cursor: 'pointer',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <span style={{ fontWeight: 600, color: rulesChecked ? '#166534' : '#475569', fontSize: '13px' }}>
                                        I have read and accept all Rules & Requirements
                                    </span>
                                </label>

                                <div style={{ display: 'flex', gap: '14px' }}>
                                    <button
                                        type="button"
                                        onClick={() => setShowRulesModal(false)}
                                        style={{
                                            flex: 1,
                                            padding: '16px',
                                            background: '#f1f5f9',
                                            color: '#64748b',
                                            border: 'none',
                                            borderRadius: '100px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            fontSize: '15px'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAcceptRules}
                                        disabled={!rulesChecked}
                                        style={{
                                            flex: 2,
                                            padding: '16px',
                                            background: rulesChecked ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : '#94a3b8',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '100px',
                                            fontWeight: 700,
                                            cursor: rulesChecked ? 'pointer' : 'not-allowed',
                                            opacity: rulesChecked ? 1 : 0.7,
                                            fontSize: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            boxShadow: rulesChecked ? '0 8px 24px rgba(34, 197, 94, 0.3)' : 'none'
                                        }}
                                    >
                                        <CheckCircle size={20} />
                                        Accept & Continue
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Registration Page */}
            <section style={{
                minHeight: '100vh',
                padding: '160px 5% 80px',
                backgroundImage: `url(${websiteBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                position: 'relative',
                overflow: 'hidden'
            }}>

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        top: '100px',
                        left: '5%',
                        zIndex: 1100
                    }}
                >
                    <Link to="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 28px',
                        background: 'rgba(255, 255, 255, 1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '100px',
                        border: '1px solid rgba(226, 232, 240, 1)',
                        color: '#475569',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '15px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                </motion.div>

                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(36px, 6vw, 56px)',
                            fontWeight: 900,
                            marginBottom: '20px',
                            background: 'linear-gradient(135deg, #0f172a, #334155)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.03em'
                        }}>
                            Team Registration
                        </h1>
                        <p style={{
                            color: '#64748b',
                            fontSize: '18px',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: 1.7
                        }}>
                            An ISO certified institution dedicated to excellence in engineering education,
                            fostering innovation and professional integrity to shape a sustainable future.
                        </p>
                    </motion.div>

                    <form onSubmit={handleSubmit}>
                        {/* Team Identity */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={cardStyle}
                        >
                            {renderSectionHeader("Team Identity", regTrophy, true)}
                            {renderInput("Team Name", "teamName", null, "text", "Enter a unique name for your team")}
                        </motion.div>

                        {/* Team Leader */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={cardStyle}
                        >
                            {renderSectionHeader("Team Member 1 Details", regLeader, true)}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                                {renderInput("Full Name", "name", "leader", "text", "Team Member 1's full name")}
                                {renderInput("Mobile Number", "phone", "leader", "tel", "10-digit mobile number")}
                                {renderInput("Email ID", "email", "leader", "email", "personal@email.com")}
                                {renderInput("Department", "dept", "leader", "text", "e.g. Computer Science")}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
                                {renderInput("College Name", "college", "leader", "text", "Full institution name")}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#475569',
                                        marginBottom: '12px',
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase'
                                    }}>Gender <span style={{ color: '#22c55e' }}>*</span></label>
                                    <select
                                        required
                                        value={formData.leader.gender}
                                        onChange={(e) => setFormData(prev => ({ ...prev, leader: { ...prev.leader, gender: e.target.value } }))}
                                        style={selectStyle}
                                    >
                                        <option value="">Select Gender</option>
                                        {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Team Member */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={cardStyle}
                        >
                            {renderSectionHeader("Team Member 2 Details", regUsers, true)}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                                {renderInput("Full Name", "name", "member", "text", "Team Member 2's full name", false)}
                                {renderInput("Mobile Number", "phone", "member", "tel", "10-digit mobile number", false)}
                                {renderInput("Email ID", "email", "member", "email", "personal@email.com", false)}
                                {renderInput("Department", "dept", "member", "text", "e.g. Computer Science", false)}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
                                {renderInput("College Name", "college", "member", "text", "Full institution name", false)}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#475569',
                                        marginBottom: '12px',
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase'
                                    }}>Gender</label>
                                    <select
                                        required={false}
                                        value={formData.member.gender}
                                        onChange={(e) => setFormData(prev => ({ ...prev, member: { ...prev.member, gender: e.target.value } }))}
                                        style={selectStyle}
                                    >
                                        <option value="">Select Gender</option>
                                        {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Location & Travel */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={cardStyle}
                        >
                            {renderSectionHeader("Location & Arrival Details", regLocation, true)}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                                {renderInput("District of College", "collegeDistrict", null, "text", "e.g. Coimbatore")}
                                {renderInput("College Pincode", "collegePincode", null, "text", "6-digit pincode")}
                                {renderInput("Arrival Date", "expectedArrivalDate", null, "date")}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#475569',
                                        marginBottom: '12px',
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase'
                                    }}>Arrival Time <span style={{ color: '#22c55e' }}>*</span></label>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {/* Hour Select */}
                                        <select
                                            value={formData.expectedArrivalTime.split(':')[0] || '12'}
                                            onChange={(e) => {
                                                const parts = formData.expectedArrivalTime.split(':');
                                                const mins = parts[1]?.split(' ')[0] || '00';
                                                const ampm = parts[1]?.split(' ')[1] || 'AM';
                                                setFormData(prev => ({ ...prev, expectedArrivalTime: `${e.target.value}:${mins} ${ampm}` }));
                                            }}
                                            style={{ ...selectStyle, flex: 1, padding: '10px' }}
                                        >
                                            {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(h => (
                                                <option key={h} value={h}>{h}</option>
                                            ))}
                                        </select>

                                        {/* Minute Select */}
                                        <select
                                            value={formData.expectedArrivalTime.split(':')[1]?.split(' ')[0] || '00'}
                                            onChange={(e) => {
                                                const parts = formData.expectedArrivalTime.split(':');
                                                const hour = parts[0] || '12';
                                                const ampm = parts[1]?.split(' ')[1] || 'AM';
                                                setFormData(prev => ({ ...prev, expectedArrivalTime: `${hour}:${e.target.value} ${ampm}` }));
                                            }}
                                            style={{ ...selectStyle, flex: 1, padding: '10px' }}
                                        >
                                            {Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0')).map(m => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>

                                        {/* AM/PM Select */}
                                        <select
                                            value={formData.expectedArrivalTime.split(' ')[1] || 'AM'}
                                            onChange={(e) => {
                                                const parts = formData.expectedArrivalTime.split(' ')[0] || '12:00';
                                                setFormData(prev => ({ ...prev, expectedArrivalTime: `${parts} ${e.target.value}` }));
                                            }}
                                            style={{ ...selectStyle, flex: 1, padding: '10px' }}
                                        >
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Accommodation */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={cardStyle}
                        >
                            {renderSectionHeader("Accommodation", regAccommodation, true)}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <div style={{
                                    padding: '20px',
                                    background: 'rgba(236, 72, 153, 0.03)',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(236, 72, 153, 0.1)'
                                }}>
                                    <p style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899' }}></div>
                                        ACCOMMODATION FOR TEAM MEMBER 1 ({formData.leader.name || 'Team Member 1'})
                                    </p>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        {['Yes', 'No'].map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, leaderAccommodation: opt as any }))}
                                                style={{
                                                    flex: 1,
                                                    padding: '14px 20px',
                                                    borderRadius: '16px',
                                                    border: formData.leaderAccommodation === opt
                                                        ? '2px solid #ec4899'
                                                        : '2px solid rgba(226, 232, 240, 0.8)',
                                                    background: formData.leaderAccommodation === opt
                                                        ? 'rgba(236, 72, 153, 0.05)'
                                                        : 'white',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    fontSize: '14px',
                                                    color: formData.leaderAccommodation === opt ? '#db2777' : '#64748b',
                                                }}
                                            >
                                                {opt === 'Yes' ? '✓ Need' : '✗ No'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {formData.member.name.trim() && (
                                    <div style={{
                                        padding: '20px',
                                        background: 'rgba(236, 72, 153, 0.03)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(236, 72, 153, 0.1)'
                                    }}>
                                        <p style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899' }}></div>
                                            ACCOMMODATION FOR TEAM MEMBER 2 ({formData.member.name || 'Team Member 2'})
                                        </p>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            {['Yes', 'No'].map(opt => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, memberAccommodation: opt as any }))}
                                                    style={{
                                                        flex: 1,
                                                        padding: '14px 20px',
                                                        borderRadius: '16px',
                                                        border: formData.memberAccommodation === opt
                                                            ? '2px solid #ec4899'
                                                            : '2px solid rgba(226, 232, 240, 0.8)',
                                                        background: formData.memberAccommodation === opt
                                                            ? 'rgba(236, 72, 153, 0.05)'
                                                            : 'white',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        fontSize: '14px',
                                                        color: formData.memberAccommodation === opt ? '#db2777' : '#64748b',
                                                    }}
                                                >
                                                    {opt === 'Yes' ? '✓ Need' : '✗ No'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <p style={{ color: '#64748b', fontSize: '13px', fontStyle: 'italic', margin: 0 }}>
                                    Note: On-campus accommodation is available at ₹200 per person. Total fee will adjust automatically.
                                </p>
                            </div>
                        </motion.div>

                        {/* Mentor Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            style={cardStyle}
                        >
                            {renderSectionHeader("Mentor Details (Optional)", regMentor, true)}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(241, 245, 249, 0.8), rgba(226, 232, 240, 0.5))',
                                padding: '16px 20px',
                                borderRadius: '16px',
                                marginBottom: '24px',
                                border: '1px solid rgba(203, 213, 225, 0.5)'
                            }}>
                                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>
                                    If your team has an assigned mentor or faculty guide, you can provide their details here. This section is completely optional.
                                </p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#475569',
                                        marginBottom: '12px',
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase'
                                    }}>Mentor Name</label>
                                    <input
                                        type="text"
                                        value={formData.mentor.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, mentor: { ...prev.mentor, name: e.target.value } }))}
                                        style={{ ...inputStyle('mentor.name'), border: '2px solid rgba(226, 232, 240, 0.8)' }}
                                        placeholder="Dr. John Doe"
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#475569',
                                        marginBottom: '12px',
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase'
                                    }}>Mentor Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.mentor.phone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            setFormData(prev => ({ ...prev, mentor: { ...prev.mentor, phone: val } }));
                                        }}
                                        style={{ ...inputStyle('mentor.phone'), border: '2px solid rgba(226, 232, 240, 0.8)' }}
                                        placeholder="10-digit number"
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#475569',
                                        marginBottom: '12px',
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase'
                                    }}>Mentor Gender</label>
                                    <select
                                        value={formData.mentor.gender}
                                        onChange={(e) => setFormData(prev => ({ ...prev, mentor: { ...prev.mentor, gender: e.target.value } }))}
                                        style={selectStyle}
                                    >
                                        <option value="">Select Gender</option>
                                        {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#475569',
                                        marginBottom: '12px',
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase'
                                    }}>Designation</label>
                                    <input
                                        type="text"
                                        value={formData.mentor.designation}
                                        onChange={(e) => setFormData(prev => ({ ...prev, mentor: { ...prev.mentor, designation: e.target.value } }))}
                                        style={{ ...inputStyle('mentor.designation'), border: '2px solid rgba(226, 232, 240, 0.8)' }}
                                        placeholder="e.g. Assistant Professor"
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#475569',
                                        marginBottom: '12px',
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase'
                                    }}>Organization / College</label>
                                    <input
                                        type="text"
                                        value={formData.mentor.organization}
                                        onChange={(e) => setFormData(prev => ({ ...prev, mentor: { ...prev.mentor, organization: e.target.value } }))}
                                        style={{ ...inputStyle('mentor.organization'), border: '2px solid rgba(226, 232, 240, 0.8)' }}
                                        placeholder="Full organization name"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            style={cardStyle}
                        >
                            {renderSectionHeader("Payment & Verification", regPayment, true)}
                            <div style={{
                                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                                padding: '28px',
                                borderRadius: '28px',
                                marginBottom: '28px',
                                border: '1px solid rgba(191, 219, 254, 0.6)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                    <div style={{
                                        background: 'white',
                                        padding: '16px',
                                        borderRadius: '20px',
                                        boxShadow: '0 8px 24px rgba(37, 99, 235, 0.15)'
                                    }}>
                                        <ShieldCheck size={28} style={{ color: '#2563eb' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ color: '#1e40af', fontWeight: 800, fontSize: '20px', marginBottom: '6px' }}>Secure Payment Process</p>
                                        <p style={{ color: '#3b82f6', fontSize: '15px', lineHeight: '1.6' }}>
                                            To finalize your registration, please pay <strong>₹{formData.totalFee}</strong>.
                                            Scan the UPI ID using GPay, PhonePe, or Paytm.
                                        </p>
                                    </div>
                                </div>

                                <div style={{
                                    marginTop: '24px',
                                    padding: '24px',
                                    background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                                    borderRadius: '24px',
                                    border: '1px solid #e2e8f0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                                        <div style={{ flex: '1 1 200px' }}>
                                            <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, marginBottom: '6px' }}>UPI Payment Details</p>
                                            <p style={{
                                                fontWeight: 900,
                                                color: '#0f172a',
                                                fontSize: '18px',
                                                letterSpacing: '0.01em',
                                                marginBottom: '8px',
                                                wordBreak: 'break-all',
                                                lineHeight: 1.3
                                            }}>prasathkumartvb@okaxis</p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '14px', fontWeight: 600 }}>
                                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }}></div>
                                                    Prasathkumar V
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '14px', fontWeight: 600 }}>
                                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }}></div>
                                                    +91 9095330712
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{
                                            padding: '10px 18px',
                                            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            color: '#0284c7',
                                            fontSize: '13px',
                                            fontWeight: 800,
                                            boxShadow: '0 4px 12px -2px rgba(2, 132, 199, 0.1)',
                                            width: 'fit-content'
                                        }}>
                                            <Smartphone size={16} /> GPay / PhonePe / Paytm
                                        </div>
                                    </div>

                                    <div style={{
                                        padding: '24px',
                                        background: '#f8fafc',
                                        borderRadius: '20px',
                                        border: '1px solid #e2e8f0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '20px',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                    }}>
                                        <div style={{
                                            padding: '8px',
                                            background: 'white',
                                            borderRadius: '20px',
                                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                                            border: '1px solid #e2e8f0',
                                            maxWidth: '180px',
                                            width: '100%'
                                        }}>
                                            <img
                                                src={paymentQr}
                                                alt="Payment QR Code"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'block',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ fontWeight: 800, color: '#0f172a', fontSize: '16px', marginBottom: '4px' }}>Scan to Pay</p>
                                            <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Open any UPI app to scan and complete payment</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                background: 'rgba(34, 197, 94, 0.03)',
                                padding: '24px',
                                borderRadius: '24px',
                                border: '1px solid rgba(34, 197, 94, 0.1)',
                                marginBottom: '28px'
                            }}>
                                <h4 style={{ color: '#166534', fontSize: '15px', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment Guidelines</h4>
                                <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', fontSize: '14px', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <li>Registration fee collected via QR Code Scanner linked to secure UPI gateway.</li>
                                    <li>Scan the UPI ID above using any app (GPay / PhonePe / Paytm).</li>
                                    <li>Payment confirmation/screenshot is required for physical entry validation.</li>
                                    <li>Applicable for event fee, accommodation, or additional services.</li>
                                </ul>
                            </div>

                            {renderInput("Transaction ID / Reference Number", "transactionId", null, "text", "12-digit UPI Ref No (e.g. 4029...)")}

                            <div style={{
                                marginTop: '28px',
                                padding: '28px',
                                background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                                borderRadius: '28px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                border: '1px solid rgba(226, 232, 240, 0.8)',
                                flexWrap: 'wrap',
                                gap: '16px'
                            }}>
                                <div>
                                    <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 600 }}>Total Payable Amount</p>
                                    <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                                        Base: ₹250 × {formData.member.name.trim() ? 2 : 1}
                                        {(formData.leaderAccommodation === 'Yes' || formData.memberAccommodation === 'Yes') && (
                                            <> + Accommodation: ₹200 × {(formData.leaderAccommodation === 'Yes' ? 1 : 0) + (formData.member.name.trim() && formData.memberAccommodation === 'Yes' ? 1 : 0)}</>
                                        )}
                                    </p>
                                </div>
                                <span style={{
                                    fontSize: '32px',
                                    fontWeight: 900,
                                    background: 'linear-gradient(135deg, #0f172a, #334155)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>₹{formData.totalFee}</span>
                            </div>
                        </motion.div>

                        {/* Submit Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '20px',
                                padding: '40px 0'
                            }}
                        >
                            {accepted ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div style={{
                                        padding: '14px 28px',
                                        background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                                        borderRadius: '100px',
                                        border: '2px solid #22c55e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        color: '#166534',
                                        fontSize: '15px',
                                        fontWeight: 700,
                                        boxShadow: '0 4px 20px rgba(34, 197, 94, 0.15)'
                                    }}>
                                        <CheckCircle size={20} /> Rules Accepted
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowRulesModal(true)}
                                        style={{
                                            color: '#64748b',
                                            background: 'none',
                                            border: 'none',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        Read Again
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setShowRulesModal(true)}
                                    style={{
                                        color: '#004ee0',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        border: '1px solid rgba(0, 78, 224, 0.2)',
                                        borderRadius: '100px',
                                        padding: '12px 28px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(0, 78, 224, 0.05)'
                                    }}
                                >
                                    <FileText size={18} />
                                    Read Requirements & Accept Rules to register
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting || !accepted}
                                style={{
                                    width: 'fit-content',
                                    minWidth: '200px',
                                    padding: '14px 28px',
                                    fontSize: '15px',
                                    fontWeight: 800,
                                    borderRadius: '100px',
                                    background: accepted
                                        ? 'linear-gradient(135deg, #004ee0 0%, #1883ff 50%, #22c55e 100%)'
                                        : '#94a3b8',
                                    color: 'white',
                                    border: 'none',
                                    cursor: accepted ? 'pointer' : 'not-allowed',
                                    opacity: accepted ? 1 : 0.6,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    boxShadow: accepted
                                        ? '0 12px 40px rgba(0, 78, 224, 0.3)'
                                        : 'none',
                                    transition: 'all 0.3s ease',
                                    letterSpacing: '0.02em'
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div style={{
                                            width: '22px',
                                            height: '22px',
                                            border: '3px solid rgba(255,255,255,0.3)',
                                            borderTopColor: 'white',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Register Team
                                    </>
                                )}
                            </button>

                            {!accepted && (
                                <p style={{ fontSize: '14px', color: '#94a3b8', textAlign: 'center' }}>
                                    Please accept the rules to enable registration
                                </p>
                            )}
                        </motion.div>
                    </form>
                </div>

                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </section>
        </>
    );
};

export default RegistrationForm;
