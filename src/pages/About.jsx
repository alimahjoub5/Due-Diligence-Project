import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Clock, Award, FileText, BadgeCheck, Building2, Lock, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
    return (
        <div className="bg-white font-sans">
            <SEO
                title="About Checkmate Security | Global Background Screening Experts"
                description="Your trusted partner for international background checks. Combining investigative diligence with strict global data protection standards."
            />
            {/* Header */}
            <div className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Expertise Without Borders</h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            We combine investigative diligence with strict international data protection standards to deliver precise hiring intelligence worldwide.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Our Story & Mission */}
            <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">Who We Are</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-6">Precision Intelligence, Global Standards</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Checkmate Security was verified to provide multinational companies with a background screening partner that understands the delicate balance between thorough diligence and strict data privacy.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            In a regulatory environment shaped by GDPR, FCRA, and other local laws, compliance is not optional. We act as your trusted processor, ensuring that every check is lawful, necessary, and conducted with the highest respect for candidate rights across all jurisdictions.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-accent/20 rounded-sm transform rotate-3"></div>
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                            alt="Corporate Office"
                            className="relative rounded-sm shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </div>

            {/* Methodology & Assurance */}
            <div className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <h3 className="text-2xl font-bold text-primary">How we work</h3>
                        <p>
                            Every mandate begins with a lawful-basis review. We align each check with local data protection laws, document necessity, and create a compliance pathway suitable for your region. Our analysts follow a dual-control model: one researcher gathers source data while another validates and documents evidence. This reduces errors and creates an auditable trail that stands up to internal or external review.
                        </p>
                        <p>
                            We apply the principle of proportionality. Identity, education, and employment checks are tailored to the seniority of the role and local customs. We never collect more than is required, and we redact sensitive data when it is not needed for the hiring decision.
                        </p>
                        <p>
                            Quality is checked before delivery. Each report contains source references, timestamps, and clear outcomes (verified, discrepancies, pending). If we encounter delays with institutions, we proactively communicate realistic timelines so hiring teams can plan with clarity.
                        </p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <h3 className="text-2xl font-bold text-primary">Assurance for stakeholders</h3>
                        <p>
                            HR and Talent Acquisition receive structured findings that map to job requirements. Legal teams receive the compliance narrative, including lawful basis, consent language, and data minimization steps. Risk Managers receive transparency on scope, methods, and candidate communications. Executives receive a concise risk summary highlighting issues that could impact reputation, operations, or regulatory posture.
                        </p>
                        <p>
                            We also support post-hire governance. If you need periodic re-checks for regulated roles, we schedule them in a privacy-first way and provide employee-friendly notices to maintain trust.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary">The Values That Drive Us</h2>
                        <div className="w-20 h-1 bg-accent mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-8 shadow-sm border-t-4 border-accent text-center">
                            <div className="w-12 h-12 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 text-accent">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-primary mb-3">Privacy</h3>
                            <p className="text-gray-600 text-sm">We treat personal data with the highest protection level. Privacy by design is our default.</p>
                        </div>
                        <div className="bg-white p-8 shadow-sm border-t-4 border-primary text-center">
                            <div className="w-12 h-12 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 text-primary">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-primary mb-3">Compliance</h3>
                            <p className="text-gray-600 text-sm">We navigate the complex landscape of international labor law guidelines for you.</p>
                        </div>
                        <div className="bg-white p-8 shadow-sm border-t-4 border-gray-800 text-center">
                            <div className="w-12 h-12 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-800">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-primary mb-3">Precision</h3>
                            <p className="text-gray-600 text-sm">Uncompromising standards of accuracy. We double-verify every piece of information.</p>
                        </div>
                        <div className="bg-white p-8 shadow-sm border-t-4 border-accent text-center">
                            <div className="w-12 h-12 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 text-accent">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-primary mb-3">Speed</h3>
                            <p className="text-gray-600 text-sm">Business moves fast. Our verified intelligence is delivered with actionable speed.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Certifications & Memberships */}
            <div className="bg-white py-24 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">Trust & Compliance</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-4">Certifications & Memberships</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our commitment to excellence is validated by industry certifications and active participation in professional organizations.
                        </p>
                        <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {/* GDPR Compliance */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-sm border border-gray-200 hover:border-accent hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-accent/10 transition-colors shrink-0">
                                    <Lock className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-primary">GDPR Compliant</h3>
                                        <BadgeCheck className="w-5 h-5 text-accent" />
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Fully compliant with General Data Protection Regulation (GDPR). All data processing activities are regularly audited for international standards.
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                        <CheckCircle2 className="w-4 h-4 text-accent" />
                                        <span>Data Sovereignty</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* ISO Certification */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-sm border border-gray-200 hover:border-accent hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-accent/10 transition-colors shrink-0">
                                    <Award className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-primary">ISO 27001</h3>
                                        <BadgeCheck className="w-5 h-5 text-accent" />
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Certified Information Security Management System (ISMS) ensuring the highest standards of data security, confidentiality, and integrity.
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                        <CheckCircle2 className="w-4 h-4 text-accent" />
                                        <span>Information Security</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Professional Association */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-sm border border-gray-200 hover:border-accent hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-accent/10 transition-colors shrink-0">
                                    <Building2 className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-primary">PBSA Member</h3>
                                        <BadgeCheck className="w-5 h-5 text-accent" />
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Member of the Professional Background Screening Association, adhering to industry best practices and ethics.
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                        <CheckCircle2 className="w-4 h-4 text-accent" />
                                        <span>Industry Ethics</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Additional Compliance Info */}
                    <div className="bg-primary/5 border border-accent/20 rounded-sm p-8 mt-12">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                                <Shield className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-3">Ongoing Compliance & Audits</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Our certifications are not static achievements—they represent an ongoing commitment to excellence. We undergo regular third-party audits, maintain continuous monitoring of regulatory changes, and invest in staff training to ensure we remain at the forefront of data protection and security standards globally.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                                        <span>Annual Security Audits</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                                        <span>Quarterly Compliance Reviews</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                                        <span>Continuous Staff Training</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Teaser */}
            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-primary mb-12">Expertise You Can Bank On</h2>
                <div className="inline-block bg-primary text-white p-10 rounded-sm max-w-3xl">
                    <p className="text-lg italic leading-relaxed opacity-90">
                        "Our mission is to bring absolute clarity to hiring decisions across the globe, empowering secure and informed leadership."
                    </p>
                    <div className="mt-8 font-bold text-accent">— Managing Director</div>
                </div>
            </div>
        </div>
    );
};

export default About;
