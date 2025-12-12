import React from 'react';
import { motion } from 'framer-motion';

const FAQHeroAnimation = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Question Marks */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: -50, opacity: [0, 0.4, 0], x: Math.sin(i) * 30 }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: "linear"
                    }}
                    className="absolute text-accent/10 font-serif font-bold select-none"
                    style={{
                        fontSize: `${Math.random() * 100 + 50}px`,
                        left: `${Math.random() * 80 + 10}%`,
                        top: '100%'
                    }}
                >
                    ?
                </motion.div>
            ))}

            {/* Search Beam Effect */}
            <motion.div
                initial={{ rotate: -45, x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                className="absolute top-0 w-32 h-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl transform origin-top-left"
            />
        </div>
    );
};

export default FAQHeroAnimation;
