import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "Navigating Global Data Privacy: Beyond GDPR",
            excerpt: "A comprehensive look at international data protection frameworks, including CCPA, LGPD, and PIPL, and how they impact global background screening.",
            date: "Oct 12, 2025",
            author: "Dr. Klaus Weber, Global Compliance Lead",
            category: "Compliance",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "The Rise of Digital Nomads: Screening a Remote Workforce",
            excerpt: "How to effectively verify candidates with employment history across multiple jurisdictions without compromising speed or accuracy.",
            date: "Sep 28, 2025",
            author: "Sarah Jenkins, HR Director",
            category: "Future of Work",
            image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Executive Integrity: The Cost of a Bad Hire",
            excerpt: "Why standard checks are insufficient for C-suite roles. The importance of deep-dive due diligence, reputational analysis, and conflict of interest checks.",
            date: "Sep 15, 2025",
            author: "Michael Chen, Senior Investigator",
            category: "Risk Management",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            title: "OSINT in Modern Vetting: Ethical Boundaries",
            excerpt: "Leveraging Open Source Intelligence to uncover risks while respecting candidate privacy and international labor laws.",
            date: "Aug 30, 2025",
            author: "Elena Petrova, Intelligence Specialist",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-20 font-sans">
            <SEO
                title="Global Intelligence Journal | Background Check Insights"
                description="Expert analysis on international hiring, cross-border compliance, and corporate risk management."
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-accent font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                        <Globe className="w-4 h-4" /> Global Intelligence Journal
                    </span>
                    <h1 className="text-4xl font-bold text-primary mt-3 mb-6">Latest Insights & News</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stay ahead of the curve with expert analysis on global background checks, compliance, and corporate risk management.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 uppercase tracking-wide rounded-sm">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {post.author}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                                    <Link to={`/blog/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <Link to={`/blog/${post.id}`} className="text-accent font-bold text-sm uppercase tracking-wide flex items-center group/btn">
                                    Read Analysis <ArrowRight className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
