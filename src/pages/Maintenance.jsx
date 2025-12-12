import React from 'react';
import { ShieldAlert, Clock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Maintenance = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-2xl text-center relative z-10 shadow-2xl"
            >
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                    <ShieldAlert size={48} className="text-red-400" />
                </div>

                <h1 className="text-4xl font-bold text-white mb-4">Under Maintenance</h1>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    We are currently performing scheduled maintenance to improve our security systems.
                    Access is temporarily restricted.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-black/20 p-6 rounded-xl border border-white/5 mb-8">
                    <div className="flex items-center gap-3">
                        <Clock className="text-accent" size={20} />
                        <div>
                            <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Estimated Time</span>
                            <span className="text-white font-medium">~ 2 Hours</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="text-accent" size={20} />
                        <div>
                            <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Contact Support</span>
                            <a href="mailto:support@checkmate.com" className="text-white font-medium hover:text-accent transition-colors">support@checkmate.com</a>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-600 uppercase tracking-widest font-mono">
                    System ID: MAINT-MODE-ACTIVE v2.4
                </p>
            </motion.div>
        </div>
    );
};

export default Maintenance;
