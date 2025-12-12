import React, { useState, useEffect } from 'react';
import { faqAPI } from '../../services/api';
import { sanitizeInput } from '../../utils/security';
import { Plus, Edit, Trash2, X, Check, Search, HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQManager = () => {
    const [faqs, setFaqs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFaq, setCurrentFaq] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: 'General',
        order: 0,
        isActive: true
    });

    const categoryOptions = ['General', 'Company', 'Services', 'Pricing', 'Legal'];

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        setIsLoading(true);
        try {
            const response = await faqAPI.getAll();
            setFaqs(response.data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            if (process.env.NODE_ENV === 'development' && faqs.length === 0) {
                setFaqs([
                    { _id: '1', question: 'What services do you offer?', answer: 'We offer comprehensive background checks and intelligence gathering services tailored for corporate clients.', category: 'Services', order: 1, isActive: true },
                    { _id: '2', question: 'How long does a background check take?', answer: 'Typically 24-48 hours for standard checks, but deep-dive investigations may take longer depending on complexity.', category: 'General', order: 2, isActive: true },
                    { _id: '3', question: 'Is my data secure?', answer: 'Yes, we use enterprise-grade encryption and follow strict data protection protocols.', category: 'Legal', order: 3, isActive: false }
                ]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (faq = null) => {
        if (faq) {
            setFormData({
                question: faq.question,
                answer: faq.answer,
                category: faq.category,
                order: faq.order,
                isActive: faq.isActive
            });
            setCurrentFaq(faq);
        } else {
            setFormData({
                question: '',
                answer: '',
                category: 'General',
                order: faqs.length + 1,
                isActive: true
            });
            setCurrentFaq(null);
        }
        setIsModalOpen(true);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sanitize data
        const sanitizedData = {
            ...formData,
            question: sanitizeInput(formData.question),
            answer: sanitizeInput(formData.answer),
            category: sanitizeInput(formData.category),
        };

        try {
            if (currentFaq) {
                await faqAPI.update(currentFaq._id, sanitizedData);
            } else {
                await faqAPI.create(sanitizedData);
            }
            setIsModalOpen(false);
            fetchFaqs();
        } catch (error) {
            console.error('Error saving FAQ:', error);
            alert('Failed to save FAQ.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await faqAPI.delete(id);
                fetchFaqs();
            } catch (error) {
                console.error('Error deleting FAQ:', error);
                alert('Failed to delete FAQ.');
            }
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">FAQ Management</h1>
                    <p className="text-gray-400 text-sm">Create and organize frequently asked questions.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg shadow-lg shadow-accent/20 flex items-center gap-2 transition-all hover:scale-105 font-medium"
                >
                    <Plus size={20} /> Add New FAQ
                </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder-gray-500"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-20">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading FAQs...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredFaqs.map((faq, index) => (
                            <motion.div
                                key={faq._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`
                                    bg-[#1e293b]/50 backdrop-blur-sm rounded-xl border transition-all duration-300 overflow-hidden
                                    ${expandedId === faq._id ? 'border-accent/40 shadow-lg shadow-accent/5 bg-[#1e293b]/80' : 'border-white/10 hover:border-white/20'}
                                `}
                            >
                                <div
                                    className="flex items-center justify-between p-5 cursor-pointer"
                                    onClick={() => toggleExpand(faq._id)}
                                >
                                    <div className="flex items-center gap-5 flex-1">
                                        <div className={`
                                            p-3 rounded-lg text-accent transition-colors duration-300
                                            ${expandedId === faq._id ? 'bg-accent text-white' : 'bg-accent/10'}
                                        `}>
                                            <HelpCircle size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-medium transition-colors ${expandedId === faq._id ? 'text-accent' : 'text-white'}`}>
                                                {faq.question}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className="text-xs text-blue-300 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 uppercase tracking-wide font-medium">
                                                    {faq.category}
                                                </span>
                                                <div className={`w-1.5 h-1.5 rounded-full ${faq.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                <span className={`text-xs ${faq.isActive ? 'text-green-400' : 'text-red-400'}`}>
                                                    {faq.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                            <button
                                                onClick={() => handleOpenModal(faq)}
                                                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(faq._id)}
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className={`p-1 rounded-full bg-white/5 transition-transform duration-300 ${expandedId === faq._id ? 'rotate-180 bg-white/10' : ''}`}>
                                            <ChevronDown size={20} className="text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {expandedId === faq._id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden bg-black/20 border-t border-white/5"
                                        >
                                            <div className="p-6 pt-4">
                                                <div className="flex gap-4">
                                                    <div className="mt-1">
                                                        <MessageCircle size={18} className="text-gray-500" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-gray-300 leading-relaxed text-sm">
                                                            {faq.answer}
                                                        </p>
                                                        <div className="mt-4 flex items-center justify-end">
                                                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Display Order: {faq.order}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredFaqs.length === 0 && (
                        <div className="py-16 text-center text-gray-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                            <HelpCircle size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="text-lg font-medium">No FAQs found.</p>
                            <p className="text-sm">Add a new question to get started.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Glass Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0f172a] w-full max-w-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-r from-accent/10 to-transparent">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                {currentFaq ? <Edit size={20} className="text-accent" /> : <Plus size={20} className="text-accent" />}
                                {currentFaq ? 'Edit FAQ' : 'Add New FAQ'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors hover:bg-white/10 p-1 rounded">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Question</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.question}
                                    onChange={e => setFormData({ ...formData, question: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    placeholder="e.g. How do I start?"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                                <div className="relative">
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white appearance-none focus:outline-none focus:border-accent"
                                    >
                                        {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <ChevronDown size={16} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Answer</label>
                                <textarea
                                    required
                                    rows="6"
                                    value={formData.answer}
                                    onChange={e => setFormData({ ...formData, answer: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-all resize-none"
                                    placeholder="Provide a detailed answer..."
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-3">
                                    <label className="block text-gray-300 text-sm font-medium">Display Order:</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-20 bg-black/30 border border-white/10 rounded-lg p-2 text-white text-center focus:border-accent outline-none"
                                    />
                                </div>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="sr-only"
                                        />
                                        <div className={`w-10 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-accent' : 'bg-gray-700'}`}></div>
                                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                    </div>
                                    <span className={`text-sm font-medium transition-colors ${formData.isActive ? 'text-white' : 'text-gray-500'}`}>
                                        {formData.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </label>
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-gradient-to-r from-accent to-accent-hover hover:to-accent text-white rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-accent/20 font-bold"
                                >
                                    {currentFaq ? 'Update FAQ' : 'Create FAQ'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default FAQManager;
