import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';

import { validateEmail, validatePassword } from '../utils/security';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login, user } = useAuth();

    // Redirect if already logged in
    React.useEffect(() => {
        if (user) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setIsLoading(true);
        // Simulator for now
        setTimeout(() => {
            setIsLoading(false);
            // In reality, verify credentials with API here
            login('dummy-token-12345');
            navigate('/admin/dashboard', { replace: true });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden p-4">
            <SEO title="Admin Login | Checkmate Security" description="Secure admin access." />

            {/* Background Effects matching AdminLayout */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
            >
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>

                <div className="text-center mb-10">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-20 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent/20 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                    >
                        <ShieldCheck className="w-10 h-10 text-accent" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-400 text-sm">Welcome back. Please authenticate.</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-accent/80 text-xs uppercase font-bold tracking-widest mb-2 pl-1">Email Access</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-accent transition-colors" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#0f172a]/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder-gray-600"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-accent/80 text-xs uppercase font-bold tracking-widest mb-2 pl-1">Security Key</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-accent transition-colors" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0f172a]/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder-gray-600"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-accent to-[#b08d4b] text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)]"
                    >
                        {isLoading ? (
                            <>Verifying <Loader className="w-5 h-5 animate-spin" /></>
                        ) : (
                            <>Authenticate Access <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                        )}
                    </motion.button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                        Checkmate SafeGuard Protocol v2.0
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
