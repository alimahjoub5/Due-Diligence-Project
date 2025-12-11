import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Brand & Desc */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="h-8 w-8 text-accent" />
                            <span className="text-xl font-bold text-white">Checkmate Security</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Trusted background checks and due diligence for corporate clients. We ensure you hire with confidence and mitigate risk.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">Services</h3>
                        <ul className="space-y-2">
                            <li><Link to="/services" className="text-gray-400 hover:text-white text-sm">Background Checks</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-white text-sm">Employee Integrity</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-white text-sm">Vendor Screening</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-white text-sm">Custom Investigations</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">Why Choose Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">Contact</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="h-5 w-5 text-accent shrink-0" />
                                <span>Global Operations Center<br />International Financial District</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone className="h-5 w-5 text-accent shrink-0" />
                                <span>+216 XX XXX XXX (24/7 Support)</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="h-5 w-5 text-accent shrink-0" />
                                <span>info@checkmatesis.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center bg-primary">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Checkmate Security and Intelligent Services. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {/* Social placeholders */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
