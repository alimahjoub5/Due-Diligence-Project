import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'false');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-7xl mx-auto bg-white rounded-sm shadow-2xl border-t-4 border-accent p-6 md:flex items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-accent" />
                                We value your privacy
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link to="/privacy" className="text-accent underline hover:text-primary transition-colors">Privacy Policy</Link> to learn more.
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex gap-4 shrink-0">
                            <button
                                onClick={handleDecline}
                                className="px-6 py-2.5 border border-gray-300 rounded-sm text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Essential Only
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2.5 bg-accent text-white rounded-sm text-sm font-bold uppercase tracking-wide hover:bg-[#b08d4b] transition-colors shadow-lg"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
