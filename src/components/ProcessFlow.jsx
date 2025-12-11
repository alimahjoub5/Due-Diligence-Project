import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, ShieldCheck, Send } from 'lucide-react';

const ProcessFlow = () => {
    return (
        <div className="w-full h-48 relative flex items-center justify-center hidden md:flex mb-12">
            {/* Connecting Line connecting the steps */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
                <motion.div
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-accent to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Nodes */}
            <div className="relative z-10 flex justify-between w-full max-w-4xl px-8">
                {[
                    { icon: Send, label: "Inquiry" },
                    { icon: ShieldCheck, label: "Compliance" },
                    { icon: Search, label: "Investigation" },
                    { icon: FileText, label: "Reporting" }
                ].map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.2 }}
                        className="flex flex-col items-center"
                    >
                        <motion.div
                            className="w-16 h-16 rounded-full bg-primary border-2 border-accent/50 flex items-center justify-center relative shadow-[0_0_15px_rgba(176,141,75,0.2)]"
                            whileHover={{ scale: 1.1, borderColor: '#b08d4b' }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-full bg-accent/20"
                                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                            />
                            <step.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        {/* Dot on the line */}
                        <div className="w-3 h-3 bg-accent rounded-full mt-4 mb-2 shadow-lg z-20" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProcessFlow;
