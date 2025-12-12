import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Globe, Shield, Clock, Search } from 'lucide-react';
import SEO from '../components/SEO';
import FAQHeroAnimation from '../components/FAQHeroAnimation';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-gray-200 rounded-sm mb-4 bg-white overflow-hidden hover:border-accent/50 transition-colors">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none bg-white hover:bg-gray-50/50 transition-colors"
            >
                <span className="font-bold text-lg text-primary pr-8">{question}</span>
                <span className={`p-2 rounded-full shrink-0 ${isOpen ? 'bg-accent/10 text-accent' : 'bg-gray-50 text-gray-400'} transition-all`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 bg-gray-50/30">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            question: "Is background screening legal internationally?",
            answer: "Yes, but the regulatory landscape varies significantly by region. In Europe (GDPR), screenings must be strictly relevant to the role. In the US (FCRA), specific disclosure and authorization protocols apply. We manage these complexities for you, ensuring every check is conducted with the appropriate lawful basis and consent mechanisms required for that specific jurisdiction."
        },
        {
            question: "How do you handle data privacy across different borders?",
            answer: "We adhere to a 'Privacy by Design' framework. Data is processed and stored in compliance with local residency laws (e.g., hosting EU data within the EU). We utilize standard contractual clauses and rigorous vendor vetting to ensure that candidate information remains protected, regardless of where the check originates or where the candidate has lived."
        },
        {
            question: "What is the typical turnaround time for a global check?",
            answer: "Domestic checks often complete within 2-4 business days. International verifications can vary; for example, verifying a degree from a university in a time zone with paper-based archives may take longer (5-10 days). We provide real-time updates and estimated completion dates for every component so you can manage hiring expectations."
        },
        {
            question: "Do I need the candidate's consent?",
            answer: "In almost all jurisdictions, candidate consent is a mandatory requirement or a best practice. We provide compliant consent forms (available in multiple languages) that inform the candidate of their rights and the scope of the check, ensuring transparency and reducing legal risk for your organization."
        },
        {
            question: "Can you verify education and employment in any language?",
            answer: "Yes. Our global team and network of partners have native language capabilities in major business languages (English, German, French, Spanish, Mandarin, Arabic, etc.). For documents in other languages, we utilize certified translation services to ensuring accurate verification of credentials."
        },
        {
            question: "How do you verify a candidate's criminal history globally?",
            answer: "Criminal record availability depends on local laws. In some countries, we can search court records directly. In others (like Germany or certain parts of Asia), the candidate must obtain a certificate themselves. We guide the candidate through this process and validate the authenticity of the document they provide, ensuring it hasn't been altered."
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <SEO
                title="Global Background Check FAQs | International Compliance"
                description="Common questions about international background screening. Legal compliance, turnaround times, and global data privacy standards."
            />
            {/* Header */}
            <div className="bg-primary text-white py-24 relative overflow-hidden">
                <FAQHeroAnimation />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 skew-x-12 transform translate-x-1/2"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                            Navigating the complexities of global hiring and due diligence.
                        </p>

                        {/* Functional Search Bar */}
                        <div className="max-w-lg mx-auto relative group">
                            <div className="absolute inset-0 bg-accent/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-4 flex items-center text-left text-gray-300 focus-within:bg-white/20 focus-within:border-accent/50 transition-all">
                                <Search className="w-5 h-5 mr-3 text-accent" />
                                <input
                                    type="text"
                                    placeholder="Search for a topic..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Intro Content */}
            <div className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
                <p className="text-gray-700 leading-relaxed text-lg mb-8 max-w-3xl mx-auto">
                    International background screening requires balancing thoroughness with candidate privacy and local laws. Below are answers to the most common questions we receive from legal, HR, and compliance teams operating across borders.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                    <div className="bg-white p-6 rounded-sm shadow-sm border-t-2 border-accent">
                        <Globe className="w-8 h-8 text-accent mb-4" />
                        <h3 className="font-bold text-primary mb-2">Global Coverage</h3>
                        <p className="text-sm text-gray-600">Capabilities in 180+ countries and territories.</p>
                    </div>
                    <div className="bg-white p-6 rounded-sm shadow-sm border-t-2 border-primary">
                        <Shield className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-bold text-primary mb-2">Compliance First</h3>
                        <p className="text-sm text-gray-600">GDPR, FCRA, and local privacy law adherence.</p>
                    </div>
                    <div className="bg-white p-6 rounded-sm shadow-sm border-t-2 border-gray-400">
                        <Clock className="w-8 h-8 text-gray-400 mb-4" />
                        <h3 className="font-bold text-primary mb-2">Fast Turnaround</h3>
                        <p className="text-sm text-gray-600">Technology-driven process for speed and accuracy.</p>
                    </div>
                </div>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-3xl mx-auto px-4 pb-20">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, idx) => (
                        <FAQItem
                            key={idx}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={idx === openIndex}
                            onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
                        />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No questions found matching your search.
                    </div>
                )}
            </div>

            {/* CTA */}
            <div className="bg-white py-16 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">Have a specific compliance question?</h2>
                    <p className="text-gray-600 mb-8">
                        Our compliance experts are available to discuss your specific regional requirements.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-[#b08d4b] transition-all">
                        Contact Compliance Team
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
