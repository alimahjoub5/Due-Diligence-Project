import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, ArrowRight, CheckCircle, Search, FileText, Globe, Users, Clock, Award, ChevronRight, Phone, Building2, UserCheck } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import SEO from '../components/SEO';
import HeroAnimation from '../components/HeroAnimation';
import ProcessFlow from '../components/ProcessFlow';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const CountUpStats = ({ value, label, suffix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);

    return (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => {
                animate(0, value, {
                    duration: 2,
                    onUpdate: (latest) => setDisplayValue(Math.floor(latest))
                });
            }}
        >
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                {displayValue}{suffix}
            </div>
            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">{label}</div>
        </motion.div>
    );
};

const Home = () => {
    return (
        <div className="flex flex-col font-sans overflow-x-hidden">
            <SEO
                title="Pre-Employment Due Diligence Services in Europe | Checkmate Security"
                description="Reliable pre-employment background checks and SME due diligence services. Reduce hiring risks with compliant, professional screening."
                keywords="pre-employment due diligence, background checks, employee screening, SME due diligence, risk-based hiring"
            />
            {/* Hero Section */}
            <section className="bg-primary text-white relative overflow-hidden min-h-[85vh] flex items-center">
                {/* Advanced Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#1e293b] to-transparent opacity-60"></div>
                    {/* The Symbolic Animation */}
                    <div className="absolute top-1/2 -right-[10%] -translate-y-1/2 w-[700px] h-[700px] opacity-80 pointer-events-none hidden lg:block">
                        <HeroAnimation />
                    </div>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-accent/10 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            x: [0, -50, 0],
                            y: [0, 50, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[80px]"
                    />
                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="max-w-4xl"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-accent text-xs font-bold uppercase tracking-wider mb-8 shadow-2xl">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            Global Intelligence & Security
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
                            Pre-Employment<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Due Diligence</span> & <br />
                            <span className="text-accent relative inline-block">
                                Smart Hiring
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="absolute bottom-2 left-0 h-3 bg-accent/20 -z-10 -skew-x-12"
                                />
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl border-l-4 border-accent pl-8 ml-2">
                            Secure your business with professional, compliant, and discreet screening services. We help SMEs in Europe make confident hiring decisions by verifying candidate integrity.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5">
                            <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-sm font-bold uppercase tracking-widest text-white bg-accent hover:bg-[#b08d4b] transition-all shadow-lg hover:shadow-accent/40 rounded-sm hover:-translate-y-1 relative overflow-hidden group">
                                <span className="relative z-10">Request Consultation</span>
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                            </Link>
                            <a href="tel:+216XXXXXXXX" className="inline-flex items-center justify-center px-10 py-5 border border-white/10 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-all rounded-sm backdrop-blur-sm group">
                                <Phone className="mr-3 w-4 h-4 text-accent group-hover:scale-110 transition-transform" /> Call Us Now
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">Our Services</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3">What We Do</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: UserCheck, title: "Pre-employment Checks", desc: "Verify credentials, employment history, and professional integrity." },
                            { icon: Search, title: "Enhanced Due Diligence", desc: "Deep-dive research for C-level executives and sensitive roles." },
                            { icon: Building2, title: "Vendor & Partner Screening", desc: "Assess the legitimacy and reputation of new business partners." },
                            { icon: Shield, title: "SME Due Diligence", desc: "Tailored risk assessments designed for small and mid-sized enterprises." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 border border-gray-100 hover:border-accent hover:shadow-lg transition-all rounded-sm group bg-gray-50"
                            >
                                <item.icon className="w-10 h-10 text-primary group-hover:text-accent mb-4 transition-colors" />
                                <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Typical Use Cases */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">Real World Scenarios</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3">Typical Use Cases</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[
                            { title: "The Critical Executive Hire", text: "You are hiring a new CFO. Our enhanced due diligence ensures they have a clean financial track record and verified history." },
                            { title: "The Remote Tech Specialist", text: "You are onboarding a developer with access to core IP. We verify their identity and past employment to prevent insider threats." },
                            { title: "The New Supplier", text: "You are about to sign a major contract with a boutique vendor. We check their corporate standing and reputation to ensure they can deliver." },
                            { title: "The Rapid Scale-Up", text: "You need to screen 10 new employees quickly. Our pre-employment background checks scale with your hiring needs." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 shadow-sm border-l-4 border-accent hover:shadow-lg transition-all"
                            >
                                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-sm font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all rounded-sm">
                            Discuss Your Scenario
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Checkmate */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3">Why Companies Choose Checkmate</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Expert & Discreet", text: "We conduct all checks with the highest level of confidentiality and professionalism." },
                            { icon: FileText, title: "Legally Compliant", text: "Strict adherence to GDPR and local data protection regulations across Europe." },
                            { icon: Building2, title: "Focus on SMEs", text: "Flexible, project-based solutions designed for the agility of smaller businesses." },
                            { icon: CheckCircle, title: "Actionable Intelligence", text: "We provide clear insights to support your risk-based hiring decisions." },
                            { icon: Clock, title: "Fast Turnaround", text: "Receive accurate reports in a timely manner to keep your hiring pipeline moving." },
                            { icon: Users, title: "Human-Led Research", text: "We combine technology with experienced analyst review to catch nuance." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-8 rounded-sm hover:shadow-lg transition-all group border border-gray-100">
                                <item.icon className="w-10 h-10 text-gray-400 group-hover:text-accent mb-4 transition-colors" />
                                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section className="py-24 bg-primary text-white relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">How It Works</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-3">Streamlined Vetting Process</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
                    </div>

                    {/* Animated Flow Visualization */}
                    <div className="mb-12">
                        <ProcessFlow />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Inquiry & Scope", text: "You tell us about the role or partner you need vetted." },
                            { step: "02", title: "Consent & Compliance", text: "We ensure all necessary consents are obtained legally." },
                            { step: "03", title: "Investigation", text: "Analysts conduct thorough checks using open-source & official records." },
                            { step: "04", title: "Reporting", text: "You receive a confidential report with clear findings." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                viewport={{ once: true }}
                                className="relative p-6 border border-white/10 rounded-sm bg-white/5 hover:bg-white/10 transition-colors group"
                            >
                                <div className="text-6xl font-bold text-white/5 absolute -top-6 -right-2 group-hover:text-accent/10 transition-colors">{item.step}</div>
                                <div className="hidden md:block absolute -top-16 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-accent/50 to-transparent"></div> {/* Connector to the flow line */}
                                <h3 className="text-xl font-bold text-accent mb-3 relative z-10">{item.title}</h3>
                                <p className="text-gray-400 text-sm relative z-10">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-6">
                        {[
                            { q: "Is pre-employment screening legal in Europe?", a: "Yes, when conducted properly. We strictly follow GDPR and national laws, ensuring checks are relevant to the role and proportional." },
                            { q: "How long does a background check take?", a: "Standard pre-employment checks typically take 2–5 business days. Enhanced due diligence for senior roles may take slightly longer." },
                            { q: "What information do I need to provide?", a: "We typically need the candidate’s resume/CV and signed consent. We will provide you with the necessary consent forms." },
                            { q: "Do you work with small businesses?", a: "Absolutely. Our services are designed for SMEs. You can outsource background checks on a case-by-case basis." },
                            { q: "What happens if you find something negative?", a: "We report the factual findings to you confidentially, allowing you to make an informed, risk-based hiring decision." }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-gray-50 p-6 rounded-sm border border-gray-200">
                                <h3 className="font-bold text-primary text-lg mb-2">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Make Confident Hiring Decisions?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Contact our team for a compliant, professional screening proposal or a free consultation on our due diligence services.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/contact"
                            className="inline-block bg-accent text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-[#b08d4b] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            Contact Us
                        </Link>
                        <a
                            href="tel:+216XXXXXXXX"
                            className="inline-block border border-gray-600 text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all"
                        >
                            Call Us Now
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};



export default Home;
