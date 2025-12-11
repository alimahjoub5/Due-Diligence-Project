import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
            <SEO
                title="404 - Page Not Found"
                description="The page you are looking for could not be found."
            />
            <div className="max-w-2xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-8">
                        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Page Not Found
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white rounded-sm font-bold uppercase tracking-wide hover:bg-[#b08d4b] transition-all shadow-md"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Go Home
                        </Link>
                        <Link
                            to="/services"
                            className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-sm font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-all"
                        >
                            <Search className="w-5 h-5 mr-2" />
                            Browse Services
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/services" className="text-accent hover:underline text-sm">Services</Link>
                            <Link to="/about" className="text-accent hover:underline text-sm">About</Link>
                            <Link to="/faq" className="text-accent hover:underline text-sm">FAQ</Link>
                            <Link to="/contact" className="text-accent hover:underline text-sm">Contact</Link>
                            <Link to="/blog" className="text-accent hover:underline text-sm">Blog</Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;


