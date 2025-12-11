import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Building2, User, Award, CheckCircle, Globe2, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Testimonials = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        roleCompany: '',
        location: '',
        rating: '5',
        experience: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [csrfToken] = useState(() => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    });
    const [lastSubmissionTime, setLastSubmissionTime] = useState(() => {
        const stored = localStorage.getItem('testimonial_last_submission');
        return stored ? parseInt(stored, 10) : 0;
    });

    const testimonials = [
        {
            id: 1,
            name: "Thomas Müller",
            role: "Global HR Director",
            company: "EuroFinance Corp",
            companyType: "Financial Services",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
            location: "Zurich / London",
            rating: 5,
            text: "Checkmate Security's attention to international data laws gave us the confidence to centralize our screening. Their ability to navigate diverse regulatory landscapes, from GDPR in Europe to local laws in Asia, saved us months of internal legal work. The reports are consistent, verified, and always timely.",
            highlight: "Global Compliance",
            industry: "Finance"
        },
        {
            id: 2,
            name: "Sarah Jenkins",
            role: "Head of Talent Acquisition",
            company: "Innovate Tech",
            companyType: "Technology",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
            location: "San Francisco",
            rating: 5,
            text: "Fast, accurate, and incredibly responsive. They helped us scale our engineering team by verifying degrees and employment across four continents. The dashboard is intuitive, and their support team operates 24/7, which is crucial for our distributed hiring managers.",
            highlight: "International Scale",
            industry: "Technology"
        },
        {
            id: 3,
            name: "Andreas Schmidt",
            role: "Chief Legal Officer",
            company: "AutoMotion Group",
            companyType: "Automotive",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            location: "Munich",
            rating: 5,
            text: "Navigating Works Council requirements in Germany while maintaining global standards was a challenge until we partnered with them. Every check is documented with a clear lawful basis, making audits simple. Their privacy-first approach is the gold standard.",
            highlight: "Legal Precision",
            industry: "Automotive"
        },
        {
            id: 4,
            name: "Dr. Elena Rossi",
            role: "Compliance & Risk Lead",
            company: "PharmaGlobal",
            companyType: "Pharmaceuticals",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
            location: "Milan",
            rating: 5,
            text: "In our industry, there is no room for error. Checkmate Security provides the depth of due diligence we require for executive hires. Their investigative research goes beyond simple database checks, providing real integrity insights we can trust.",
            highlight: "Executive Vetting",
            industry: "Pharmaceuticals"
        },
        {
            id: 5,
            name: "Michael Chen",
            role: "VP of People Operations",
            company: "LogisticsWorld",
            companyType: "Logistics",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
            location: "Singapore",
            rating: 5,
            text: "We hire rapidly in high-turnover hubs. Checkmate's automated API integration allowed us to cut our time-to-hire by 40% while maintaining strict background checks. Their support for multiple languages makes candidate communication seamless.",
            highlight: "Speed & Tech",
            industry: "Logistics"
        },
        {
            id: 6,
            name: "Lisa Fischer",
            role: "Founder",
            company: "NextGen Startups",
            companyType: "Venture Capital",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
            location: "Berlin",
            rating: 5,
            text: "As we expand into new markets, we need a partner who understands local nuances. Checkmate offers that expertise. They don't just sell data; they provide advice on what is legally permissible to ask in each new country we enter.",
            highlight: "Strategic Partnership",
            industry: "Venture Capital"
        }
    ];

    const stats = [
        { number: "2,000+", label: "Global Clients Served" },
        { number: "180+", label: "Countries Covered" },
        { number: "98%", label: "Client Retention Rate" },
        { number: "24/7", label: "Support Availability" }
    ];

    const sanitizeInput = (input) => {
        if (typeof input !== 'string') return '';
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<[^>]+>/g, '')
            .trim();
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
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.roleCompany.trim()) newErrors.roleCompany = 'Role & Company is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
        else if (formData.experience.length < 10) newErrors.experience = 'Please write at least 10 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = sanitizeInput(value);
        setFormData({ ...formData, [name]: sanitizedValue });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!checkRateLimit()) return;
        if (!validateForm()) return;

        const formDataObj = new FormData(e.target);
        if (formDataObj.get('bot-field')) return;

        if (formDataObj.get('csrf-token') !== csrfToken) {
            setErrors({ csrf: 'Security validation failed.' });
            return;
        }

        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const now = Date.now();
            localStorage.setItem('testimonial_last_submission', now.toString());
            setLastSubmissionTime(now);
            setIsSubmitted(true);
            setFormData({ name: '', roleCompany: '', location: '', rating: '5', experience: '' });
        } catch (error) {
            setErrors({ submit: 'An error occurred.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <SEO
                title="Client Testimonials | Trusted by Global Leaders"
                description="Read why multinational HR teams and compliance officers choose Checkmate Security for international background screening."
                keywords="client testimonials, global background checks, customer reviews, international HR feedback"
            />

            {/* Header */}
            <div className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-center mb-6">
                            <Award className="w-16 h-16 text-accent" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Leaders Worldwide</h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            See what Global HR Directors and Compliance Officers say about our international screening services.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white border-b border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-sm shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 relative group"
                        >
                            {/* Quote Icon */}
                            <Quote className="w-10 h-10 text-accent opacity-20 absolute top-6 right-6 group-hover:opacity-40 transition-opacity" />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.4,
                                            delay: (idx * 0.1) + (i * 0.1),
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20
                                        }}
                                    >
                                        <Star
                                            className={`w-5 h-5 ${i < testimonial.rating ? "text-accent fill-accent" : "text-gray-200 fill-gray-100"}`}
                                            strokeWidth={i < testimonial.rating ? 0 : 1.5}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 leading-relaxed mb-6 italic relative z-10 text-sm">
                                "{testimonial.text}"
                            </p>

                            {/* Highlight Badge */}
                            <div className="mb-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent/10 text-accent">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    {testimonial.highlight}
                                </span>
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                    loading="lazy"
                                />
                                <div className="flex-1">
                                    <div className="font-bold text-primary text-sm">{testimonial.name}</div>
                                    <div className="text-xs text-gray-600">{testimonial.role}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Building2 className="w-3 h-3 text-gray-400" />
                                        <span className="text-xs text-gray-500">{testimonial.company}</span>
                                        <span className="text-gray-300 text-xs">•</span>
                                        <Globe2 className="w-3 h-3 text-gray-400" />
                                        <span className="text-xs text-gray-500">{testimonial.location}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Submission Form Section */}
            <div className="bg-white border-t border-gray-200 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">Share Your Story</span>
                        <h2 className="text-3xl font-bold text-primary mt-3 mb-4">We Value Your Feedback</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Your experience helps us maintain our high standards of global compliance and service excellence.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-sm p-8 shadow-inner border border-gray-100 relative overflow-hidden">
                        {isSubmitted ? (
                            <div className="text-center p-12">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-2">Thank you!</h3>
                                <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                                <button onClick={() => setIsSubmitted(false)} className="mt-6 text-accent font-bold hover:underline">
                                    Submit another review
                                </button>
                            </div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                                <input type="hidden" name="csrf-token" value={csrfToken} />
                                <div className="hidden" aria-hidden="true">
                                    <label>
                                        Don't fill this out:
                                        <input type="text" name="bot-field" tabIndex="-1" autoComplete="off" />
                                    </label>
                                </div>

                                {(errors.rateLimit || errors.csrf || errors.submit) && (
                                    <div className="bg-red-50 border border-red-200 rounded-sm p-4 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-red-800 mb-1">Security Notice</p>
                                            <p className="text-sm text-red-700">
                                                {errors.rateLimit || errors.csrf || errors.submit}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Role & Company <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="roleCompany"
                                            value={formData.roleCompany}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all ${errors.roleCompany ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="HR Director, Tech Corp"
                                        />
                                        {errors.roleCompany && <p className="text-red-500 text-xs mt-1">{errors.roleCompany}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all ${errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                                            placeholder="London, UK"
                                        />
                                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                                        <div className="flex gap-2 py-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, rating: star.toString() })}
                                                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                                    onMouseEnter={() => { /* Optional: Add hover state logic if needed */ }}
                                                >
                                                    <Star
                                                        className={`w-8 h-8 ${parseInt(formData.rating) >= star ? "text-accent fill-accent" : "text-gray-300"}`}
                                                        strokeWidth={parseInt(formData.rating) >= star ? 0 : 1.5}
                                                    />
                                                </button>
                                            ))}
                                            <input type="hidden" name="rating" value={formData.rating} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Experience <span className="text-red-500">*</span></label>
                                    <textarea
                                        name="experience"
                                        rows="4"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all ${errors.experience ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                                        placeholder="Share your experience working with Checkmate Security..."
                                    ></textarea>
                                    {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-accent text-white py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-all shadow-md flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#b08d4b]'}`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
                                </button>
                                <p className="text-xs text-gray-400 text-center mt-4">
                                    By submitting, you grant us permission to feature your feedback on our website.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Join our Global Network
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            Experience the same level of service, compliance, and accuracy that has made us the trusted choice for Fortune 500 companies.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-accent text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-[#b08d4b] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            Request a Consultation
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
