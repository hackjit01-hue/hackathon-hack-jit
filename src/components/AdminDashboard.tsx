import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Users, ShieldCheck, Lock, RefreshCw, Trophy, LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState<string | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            console.log('Admin authenticated with token');
            setIsAuthenticated(true);
            fetchStats(token);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await response.json();
            if (response.ok) {
                setIsAuthenticated(true);
                localStorage.setItem('adminToken', data.token);
                fetchStats(data.token);
            } else {
                setError('Invalid password');
            }
        } catch (err) { setError('Connection error'); }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminToken');
        setPassword('');
        setError('');
        navigate('/');
    };

    const fetchStats = async (token: string) => {
        try {
            const response = await fetch('http://localhost:5001/api/candidates/stats', {
                headers: { 'x-admin-password': token }
            });
            const data = await response.json();
            if (response.ok) setStats(data);
        } catch (err) { console.error('Stats error'); }
    };

    const handleStatus = async (id: string, newStatus: string) => {
        setStatusLoading(id);
        const token = localStorage.getItem('adminToken') || '';
        try {
            await fetch(`http://localhost:5001/api/candidates/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'x-admin-password': token },
                body: JSON.stringify({ status: newStatus })
            });
            fetchStats(token);
        } finally { setStatusLoading(null); }
    };

    const handleDownload = async () => {
        setLoading(true);
        const token = localStorage.getItem('adminToken') || '';
        try {
            const res = await fetch('http://localhost:5001/api/candidates/export', { headers: { 'x-admin-password': token } });
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'Hackathon_Teams.xlsx'; a.click();
        } finally { setLoading(false); }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
                <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', width: '400px', textAlign: 'center' }}>
                    <Lock size={32} style={{ color: 'var(--primary)', marginBottom: '20px' }} />
                    <h2 style={{ marginBottom: '8px' }}>Staff Portal</h2>
                    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Enter access code to manage teams</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            autoFocus
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid #e2e8f0', marginBottom: '16px', fontSize: '16px', textAlign: 'center', letterSpacing: '4px' }}
                            placeholder="••••••"
                        />
                        {error && <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>{error}</p>}
                        <button type="submit" style={{ width: '100%', padding: '16px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0, 78, 224, 0.2)' }}>Login Securely</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '40px 5%', background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <h1 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900 }}>Team Control Center</h1>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: '#fee2e2',
                                color: '#ef4444',
                                padding: '10px 20px',
                                borderRadius: '100px',
                                border: 'none',
                                fontWeight: 700,
                                fontSize: '14px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                    <button onClick={handleDownload} disabled={loading} style={{ background: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '16px', border: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 20px rgba(0, 78, 224, 0.15)' }}>
                        {loading ? 'Exporting...' : 'Export Teams to Excel'} <Download size={20} />
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                    <StatCard icon={<Users size={24} />} label="Total Teams" value={stats?.total || 0} color="#3b82f6" />
                    <StatCard icon={<ShieldCheck size={24} />} label="Verified" value={stats?.verified || 0} color="#10b981" />
                    <StatCard icon={<Trophy size={24} />} label="Slots Left" value={50 - (stats?.total || 0)} color="#f59e0b" />
                </div>

                <div style={{ background: 'white', borderRadius: '32px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Team Verification Queue</h2>
                        <p style={{ color: '#64748b', fontSize: '15px' }}>Real-time list of new registrations requiring action</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {stats?.recentlyAdded?.length > 0 ? (
                            stats.recentlyAdded.map((team: any) => (
                                <div key={team._id} style={{ padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', transition: 'all 0.2s ease' }}>
                                    <div>
                                        <p style={{ fontWeight: 900, fontSize: '20px', color: '#0f172a', marginBottom: '4px' }}>{team.teamName || 'Unnamed Team'}</p>
                                        <p style={{ color: '#475569', fontWeight: 500 }}>{team.leader?.name || 'No Leader'} & {team.member?.name || 'No Member'}</p>
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, background: team.status === 'Verified' ? '#dcfce7' : team.status === 'Rejected' ? '#fee2e2' : '#fef3c7', color: team.status === 'Verified' ? '#166534' : team.status === 'Rejected' ? '#991b1b' : '#92400e', padding: '6px 12px', borderRadius: '8px' }}>
                                                {team.status || 'Pending'}
                                            </span>
                                            <span style={{ fontSize: '13px', color: '#004ee0', fontWeight: 800, background: 'rgba(0, 78, 224, 0.05)', padding: '6px 12px', borderRadius: '8px' }}>
                                                💰 ₹{team.totalFee || 0}
                                            </span>
                                            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, background: '#f8fafc', padding: '6px 12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                                                🆔 {team.transactionId || 'No ID'}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        {statusLoading === team._id ? <RefreshCw className="animate-spin" size={24} style={{ color: 'var(--primary)' }} /> : (
                                            <>
                                                {team.status !== 'Verified' && (
                                                    <button
                                                        onClick={() => handleStatus(team._id, 'Verified')}
                                                        style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)' }}
                                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                    >
                                                        Verify
                                                    </button>
                                                )}
                                                {team.status !== 'Rejected' && (
                                                    <button
                                                        onClick={() => handleStatus(team._id, 'Rejected')}
                                                        style={{ background: 'white', color: '#ef4444', border: '1px solid #fee2e2', padding: '12px 20px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease' }}
                                                        onMouseOver={(e) => e.currentTarget.style.background = '#fff1f2'}
                                                        onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
                                <Users size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                                <p style={{ fontSize: '18px', fontWeight: 500 }}>No teams registered yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }: { icon: any, label: string, value: any, color: string }) => (
    <div style={{ background: 'white', padding: '28px', borderRadius: '32px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <div style={{ width: '64px', height: '64px', background: `${color}10`, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color, boxShadow: `0 8px 16px ${color}10` }}>{icon}</div>
        <div><p style={{ color: '#64748b', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p><p style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{value}</p></div>
    </div>
);

export default AdminDashboard;
