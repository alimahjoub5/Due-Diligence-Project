import React from 'react';
import { motion } from 'framer-motion';

const ContactHeroAnimation = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Connecting Nodes Network */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" className="fill-white" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Glowing Connection Beams */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent w-full"
                    style={{ top: `${20 + i * 30}%` }}
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '100%', opacity: [0, 1, 0] }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5
                    }}
                />
            ))}

            {/* Floating Icons representing Communication */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-12 h-12 border border-white/10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                        y: [0, -20, 0],
                        x: [0, Math.random() * 20 - 10, 0]
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 1
                    }}
                    style={{
                        top: `${Math.random() * 60 + 20}%`,
                        left: `${Math.random() * 80 + 10}%`
                    }}
                >
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                </motion.div>
            ))}
        </div>
    );
};

export default ContactHeroAnimation;
