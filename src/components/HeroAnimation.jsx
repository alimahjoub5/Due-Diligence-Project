import React from 'react';
import { motion } from 'framer-motion';

const HeroAnimation = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center opacity-90 mx-auto">
            {/* Outer Rotating Ring (Data Stream) */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-accent/20 opacity-50"
            />

            {/* Inner Counter-Rotating Ring */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-[300px] rounded-full border-[2px] border-t-accent/40 border-r-transparent border-b-accent/40 border-l-transparent opacity-60"
            />

            {/* Pulsing Core Glow */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[200px] h-[200px] bg-accent/20 rounded-full blur-3xl"
            />

            {/* The Shield Emblem (Symbolizing Security) */}
            <motion.svg
                width="160"
                height="180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            >
                {/* Shield Outline */}
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="stroke-white/80 fill-primary/30" />
            </motion.svg>

            {/* The Checkmark (Symbolizing Verification/Success - "Checkmate") */}
            <motion.svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1"
            >
                <motion.polyline
                    points="20 6 9 17 4 12"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                    className="drop-shadow-[0_0_10px_#b08d4b]"
                />
            </motion.svg>

            {/* Scanning Line Effect */}
            <motion.div
                initial={{ top: "20%", opacity: 0 }}
                animate={{ top: ["20%", "80%", "20%"], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute w-[140px] h-[2px] bg-accent blur-[2px] z-30 shadow-[0_0_8px_#b08d4b]"
            />

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent rounded-full opacity-60"
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                        scale: [0, 1, 0],
                        x: Math.cos(i) * 120,
                        y: Math.sin(i) * 120
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    );
};

export default HeroAnimation;
