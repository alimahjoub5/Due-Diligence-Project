import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <div className="w-full font-sans">
            {/* Top Bar - Prime Check style */}
            <div className="bg-primary text-gray-300 py-2 text-xs border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="hidden sm:flex space-x-4">
                        <span className="opacity-80">Security Intelligence & Background Due Diligence</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/contact" className="hover:text-accent transition-colors flex items-center gap-2 font-semibold text-white">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Contact Expert Team
                        </Link>
                        <a href="tel:+216XXXXXXXX" className="hidden sm:inline hover:text-accent transition-colors font-bold">+216 XX XXX XXX</a>
                        <a href="mailto:info@checkmatesis.com" className="hidden sm:inline hover:text-accent transition-colors">info@checkmatesis.com</a>
                    </div>
                </div>
            </div>

            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                                <div className="bg-primary p-1.5 rounded-lg">
                                    <ShieldCheck className="h-7 w-7 text-accent" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-primary leading-none tracking-tight">Checkmate<span className="text-accent">Security</span></span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mt-0.5">Intelligent Services</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-sm font-bold uppercase tracking-wide transition-all duration-200 border-b-2 ${isActive
                                            ? 'text-accent border-accent'
                                            : 'text-primary border-transparent hover:text-accent hover:border-accent/30'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <Link
                                to="/contact"
                                className="ml-4 bg-accent text-white px-6 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-[#b08d4b] transition-all transform hover:-translate-y-0.5 shadow-sm"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden border-t border-gray-100">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-3 py-3 rounded-md text-base font-bold uppercase tracking-wide ${isActive
                                            ? 'bg-gray-50 text-accent border-l-4 border-accent'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-accent'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <Link
                                to="/contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center mt-4 bg-accent text-white px-4 py-3 rounded-sm text-base font-bold uppercase hover:bg-accent-hover transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
