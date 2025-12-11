import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Shield, Globe, Clock, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactHeroAnimation from '../components/ContactHeroAnimation';


const Contact = () => {
    const location = useLocation();
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [csrfToken] = useState(() => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    });
    const [lastSubmissionTime, setLastSubmissionTime] = useState(() => {
        const stored = localStorage.getItem('form_last_submission');
        return stored ? parseInt(stored, 10) : 0;
    });

    useEffect(() => {
        if (location.state?.service) {
            setFormData(prev => ({
                ...prev,
                message: `I am interested in the ${location.state.service} service. Please provide a quote.`
            }));
        }
    }, [location.state]);

    const sanitizeInput = (input) => {
        if (typeof input !== 'string') return '';
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<[^>]+>/g, '')
            .trim();
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const checkRateLimit = () => {
        const now = Date.now();
        const timeSinceLastSubmission = now - lastSubmissionTime;
        const minTimeBetweenSubmissions = 60000;

        if (timeSinceLastSubmission < minTimeBetweenSubmissions) {
            const remainingSeconds = Math.ceil((minTimeBetweenSubmissions - timeSinceLastSubmission) / 1000);
            setErrors({
                rateLimit: `Please wait ${remainingSeconds} seconds before submitting again.`
            });
            return false;
        }
        return true;
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (formData.name.length > 100) {
            newErrors.name = 'Name is too long';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        } else if (formData.email.length > 255) {
            newErrors.email = 'Email is too long';
        }

        if (formData.company && formData.company.length > 200) {
            newErrors.company = 'Company name is too long';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        } else if (formData.message.length > 5000) {
            newErrors.message = 'Message is too long (maximum 5000 characters)';
        }

        const spamPatterns = [
            /http[s]?:\/\//i,
            /www\./i,
            /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi
        ];

        const suspiciousLinks = spamPatterns[0].test(formData.message) || spamPatterns[1].test(formData.message);
        const multipleEmails = (formData.message.match(spamPatterns[2]) || []).length > 1;

        if (suspiciousLinks || multipleEmails) {
            newErrors.message = 'Please remove links or multiple email addresses from your message';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = sanitizeInput(value);
        setFormData({ ...formData, [name]: sanitizedValue });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!checkRateLimit()) return;
        if (!validateForm()) return;

        const formDataObj = new FormData(e.target);
        if (formDataObj.get('bot-field')) {
            console.log('Bot detected');
            return;
        }

        const submittedToken = formDataObj.get('csrf-token');
        if (submittedToken !== csrfToken) {
            setErrors({ csrf: 'Security validation failed. Please refresh the page and try again.' });
            return;
        }

        const formStartTime = formDataObj.get('form-start-time');
        if (formStartTime) {
            const timeSpent = Date.now() - parseInt(formStartTime, 10);
            if (timeSpent < 3000) {
                setErrors({ timing: 'Please take your time filling out the form.' });
                return;
            }
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const now = Date.now();
            localStorage.setItem('form_last_submission', now.toString());
            setLastSubmissionTime(now);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', company: '', message: '' });
            if (formRef.current) {
                const startTimeInput = formRef.current.querySelector('[name="form-start-time"]');
                if (startTimeInput) startTimeInput.value = Date.now().toString();
            }
        } catch (error) {
            setErrors({ submit: 'An error occurred. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <SEO
                title="Contact Checkmate Security | Global Inquiries"
                description="Get a confidential quote for global background checks. We support HR teams and Risk Managers worldwide."
            />
            {/* Contact Hero Section */}
            <div className="bg-primary text-white py-24 relative overflow-hidden">
                <ContactHeroAnimation />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 skew-x-12 transform translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Let's Start the <span className="text-accent">Conversation</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Ready to secure your hiring process? Our team is standing by to provide a tailored proposal for your due diligence needs.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-700 leading-relaxed space-y-4">
                <h2 className="text-2xl font-bold text-primary">What to include for the fastest response</h2>
                <p>
                    Share the role type, seniority, and relevant countries for the check. Let us know your desired turnaround time and any specific compliance requirements (GDPR, etc.). The more context we receive, the more precisely we can scope lawful checks and provide pricing. All details remain confidential.
                </p>
                <p>
                    Typical checks close in 3–5 business days, though international cases vary by jurisdiction. We will give you a realistic timeline and a candidate-friendly communication template so the process stays transparent and respectful.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-sm shadow-lg h-full">
                        <h3 className="text-xl font-bold text-primary mb-8 border-b border-gray-100 pb-4">Contact Information</h3>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-accent shrink-0">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Global HQ</p>
                                    <p className="text-gray-800 font-medium text-lg">International Financial District</p>
                                    <p className="text-xs text-gray-400 mt-1">Operations Worldwide</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-accent shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Email</p>
                                    <p className="text-gray-800 font-medium text-lg">info@checkmatesis.com</p>
                                    <p className="text-xs text-gray-400 mt-1">24/7 Inquiry Support</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-accent shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                                    <p className="text-gray-800 font-medium text-lg">+216 XX XXX XXX</p>
                                    <p className="text-xs text-gray-400 mt-1">Mon-Fri, 9am - 6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-accent shrink-0">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Support Hours</p>
                                    <p className="text-gray-800 font-medium text-lg">24/7 Global</p>
                                    <p className="text-xs text-gray-400 mt-1">Multi-lingual Support Available</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-sm shadow-lg">
                        {isSubmitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-2">Request Received</h3>
                                <p className="text-gray-600">Thank you. One of our senior analysts will contact you shortly to discuss your requirements.</p>
                                <button onClick={() => setIsSubmitted(false)} className="mt-8 text-accent font-bold hover:underline">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                                <input type="hidden" name="csrf-token" value={csrfToken} />
                                <input type="hidden" name="form-start-time" value={Date.now()} />
                                <div className="hidden" aria-hidden="true">
                                    <label>
                                        Don't fill this out:
                                        <input type="text" name="bot-field" tabIndex="-1" autoComplete="off" />
                                    </label>
                                </div>

                                {(errors.rateLimit || errors.csrf || errors.timing || errors.submit) && (
                                    <div className="bg-red-50 border border-red-200 rounded-sm p-4 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-red-800 mb-1">Security Notice</p>
                                            <p className="text-sm text-red-700">
                                                {errors.rateLimit || errors.csrf || errors.timing || errors.submit}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            minLength={2}
                                            maxLength={100}
                                            className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Business Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            maxLength={255}
                                            className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            placeholder="john@company.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        name="company"
                                        maxLength={200}
                                        className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all ${errors.company ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        placeholder="Company Ltd"
                                        value={formData.company}
                                        onChange={handleChange}
                                        autoComplete="organization"
                                    />
                                    {errors.company && (
                                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.company}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        How can we help? <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows="4"
                                        minLength={10}
                                        maxLength={5000}
                                        className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-y ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        placeholder="Tell us about your screening needs..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                    <div className="flex justify-between items-center mt-1">
                                        {errors.message ? (
                                            <p className="text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.message}
                                            </p>
                                        ) : (
                                            <p className="text-xs text-gray-400">
                                                {formData.message.length}/5000 characters
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-sm">
                                    <Shield className="w-4 h-4 text-accent" />
                                    <span>Your data is encrypted and protected. We never share your information.</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full md:w-auto bg-accent text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-all shadow-md flex items-center justify-center gap-2 ${isSubmitting
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-[#b08d4b] hover:shadow-lg'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Request <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-400 mt-4 text-center md:text-left">
                                    By submitting this form, you agree to our{' '}
                                    <a href="/privacy" className="text-accent hover:underline">privacy policy</a>.
                                    Data is processed in compliance with GDPR.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Global Coverage Section to replace Office Location */}
            {/* Global Coverage Section */}
            <div className="bg-primary text-white py-24 relative overflow-hidden">
                {/* Animated Background Pattern */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #b08d4b 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Rotating Globe/Radar Effect (Abstract) */}
                <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                        className="w-[600px] h-[600px] border-[40px] border-dashed border-accent rounded-full"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-accent font-bold uppercase tracking-widest text-sm"
                        >
                            Worldwide Coverage
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold mt-3 mb-6"
                        >
                            Global Reach, Local Expertise
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
                        >
                            We operate where you operate. With strategic operational hubs and a vetted network of partners in over 180 countries, we deliver intelligence without borders.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Region Cards with Staggered Animation */}
                        {[
                            { region: "Europe", cities: ["London (HQ)", "Frankfurt", "Paris"], icon: Globe, rotation: 0 },
                            { region: "Americas", cities: ["New York", "Toronto", "São Paulo"], icon: Globe, rotation: 90 },
                            { region: "Asia Pacific", cities: ["Singapore", "Tokyo", "Sydney"], icon: Globe, rotation: 180 },
                            { region: "ME & Africa", cities: ["Dubai", "Riyadh", "Cape Town"], icon: Globe, rotation: -90 },
                        ].map((item, index) => (
                            <motion.div
                                key={item.region}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm hover:bg-white/10 hover:border-accent/50 transition-colors duration-300 relative overflow-hidden"
                            >
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform relative z-10">
                                    <item.icon className="w-6 h-6" style={{ transform: `rotate(${item.rotation}deg)` }} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white relative z-10">{item.region}</h3>
                                <ul className="text-gray-400 space-y-2 text-sm relative z-10">
                                    {item.cities.map((city, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-accent' : 'bg-gray-600'}`}></span>
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
