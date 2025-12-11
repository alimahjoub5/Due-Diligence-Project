import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Search, Lock, UserCheck, FileText, Globe, CheckCircle, Users, Eye, AlertTriangle, Award, Phone, Building2 } from 'lucide-react';
import SEO from '../components/SEO';

const Services = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const securityServices = [
        {
            icon: UserCheck,
            title: "Identity Verification",
            desc: "Confirming the candidate is who they say they are, verifying ID documents and residency."
        },
        {
            icon: FileText,
            title: "Employment Verification",
            desc: "Validating past roles, dates of employment, and reasons for leaving directly with HR departments."
        },
        {
            icon: Award,
            title: "Education & Credential Checks",
            desc: "Verifying degrees, diplomas, and professional certifications directly with issuing institutions."
        },
        {
            icon: Globe,
            title: "Adverse Media & Internet Research",
            desc: "Identifying potential reputational risks or behavioral red flags in the public domain."
        },
        {
            icon: Shield,
            title: "Criminal Record Checks",
            desc: "Conducted where legally permissible and relevant to the specific job function (e.g., finance, security)."
        },
        {
            icon: Phone,
            title: "Reference Interviews",
            desc: "Professional inquiries to past supervisors to gauge performance and integrity beyond simple employment dates."
        }
    ];

    const intelligenceServices = [
        {
            icon: AlertTriangle,
            title: "Legal & Regulatory Red Flags",
            desc: "Checking for past litigation, bankruptcy filings, or regulatory sanctions that could impact your business."
        },
        {
            icon: Search,
            title: "Reputational Issues",
            desc: "Scanning for negative news, accusations of fraud, or unethical business practices in local and international media."
        },
        {
            icon: Building2,
            title: "Operational Verification",
            desc: "Confirming physical existence, operational capacity, and address verification to prevent shell company fraud."
        },
        {
            icon: Users,
            title: "Conflict of Interest",
            desc: "Identifying undisclosed links between your internal employees and the vendor or partner."
        },
        {
            icon: Lock,
            title: "Financial Integrity",
            desc: "Assessing creditworthiness and financial health where data is publicly available or permissive."
        }
    ];

    return (
        <div className="font-sans pt-20">
            <SEO
                title="Employee Background Screening & Checks | Checkmate Security"
                description="Professional pre-employment background checks for SMEs. Verify education, employment, and integrity compliantly. Fast, secure results."
                keywords="employee background screening, pre-employment checks, vendor due diligence, corporate intelligence, SME screening"
            />

            {/* Header */}
            <div className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Screening & Due Diligence Services
                    </motion.h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Make your next hire or partnership with confidence. Verified data and intelligence for better business decisions.
                    </p>
                </div>
            </div>

            {/* Section 1: Pre-Employment Screening */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-6">
                        <div className="p-3 bg-accent/10 rounded-full">
                            <Shield className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-primary">Pre-Employment Screening</h2>
                            <p className="text-gray-500">Comprehensive background checks for new hires.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {securityServices.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-gray-50 p-8 rounded-sm border border-gray-100 hover:border-accent hover:shadow-lg transition-all group"
                            >
                                <service.icon className="w-10 h-10 text-gray-400 group-hover:text-accent mb-6 transition-colors" />
                                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <div className="mt-12 text-center">
                            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-[#b08d4b] transition-all shadow-lg">
                                Request Screening Proposal
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Corporate Due Diligence */}
            <section className="py-20 bg-[#111827] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-12 border-b border-gray-800 pb-6">
                        <div className="p-3 bg-blue-500/10 rounded-full">
                            <Search className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Commercial Due Diligence</h2>
                            <p className="text-gray-400">Vendor verification and corporate intelligence.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {intelligenceServices.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#1f2937] p-8 rounded-sm border border-gray-700 hover:border-blue-400 hover:shadow-lg transition-all group"
                            >
                                <service.icon className="w-10 h-10 text-gray-400 group-hover:text-blue-400 mb-6 transition-colors" />
                                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-300 leading-relaxed text-sm">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <div className="mt-12 text-center">
                            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-white/5 transition-all">
                                Discuss Due Diligence
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
