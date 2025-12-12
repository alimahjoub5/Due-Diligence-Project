import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { testimonialAPI } from '../../services/api';
import { Plus, Edit, Trash2, X, Check, Search, MessageSquare, Star, User, Quote, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        text: '',
        rating: 5,
        isActive: true
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const response = await testimonialAPI.getAll();
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            if (process.env.NODE_ENV === 'development' && testimonials.length === 0) {
                setTestimonials([
                    { _id: '1', name: 'John Doe', role: 'Chief Executive Officer', company: 'Tech Corp Global', text: 'Checkmate Security provided outstanding service for our executive team protection.', rating: 5, isActive: true },
                    { _id: '2', name: 'Sarah Miller', role: 'HR Director', company: 'Logistics Inc', text: 'The background checks were thorough and delivered faster than expected. Highly recommended.', rating: 5, isActive: true },
                    { _id: '3', name: 'Michael Brown', role: 'Security Manager', company: 'Retail Solutions', text: 'Professional, discreet, and highly effective investigations.', rating: 4, isActive: false }
                ]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (testimonial = null) => {
        if (testimonial) {
            setFormData({
                name: testimonial.name,
                role: testimonial.role,
                company: testimonial.company,
                text: testimonial.text,
                rating: testimonial.rating,
                isActive: testimonial.isActive
            });
            setCurrentTestimonial(testimonial);
        } else {
            setFormData({
                name: '',
                role: '',
                company: '',
                text: '',
                rating: 5,
                isActive: true
            });
            setCurrentTestimonial(null);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentTestimonial) {
                await testimonialAPI.update(currentTestimonial._id, formData);
            } else {
                await testimonialAPI.create(formData);
            }
            setIsModalOpen(false);
            fetchTestimonials();
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Failed to save testimonial.');
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await testimonialAPI.update(id, { isActive: !currentStatus });
            // Optimistic update or refetch
            setTestimonials(testimonials.map(t =>
                t._id === id ? { ...t, isActive: !currentStatus } : t
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await testimonialAPI.delete(id);
                fetchTestimonials();
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                alert('Failed to delete testimonial.');
            }
        }
    };

    const filteredTestimonials = testimonials.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Testimonials</h1>
                    <p className="text-gray-400 text-sm">Manage client feedback and social proof.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg shadow-lg shadow-accent/20 flex items-center gap-2 transition-all hover:scale-105 font-medium"
                >
                    <Plus size={20} /> Add Testimonial
                </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search testimonials by name or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder-gray-500"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-20">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading testimonials...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTestimonials.map((t, index) => (
                        <motion.div
                            key={t._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-[#1e293b]/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 flex flex-col group hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-black p-[1px]">
                                        <div className="w-full h-full rounded-full bg-[#1e293b] flex items-center justify-center text-gray-400">
                                            <User size={20} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm group-hover:text-accent transition-colors">{t.name}</h3>
                                        <p className="text-xs text-gray-400 font-medium">{t.role}</p>
                                        <p className="text-xs text-gray-500">{t.company}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < t.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 mb-6 relative">
                                <Quote size={24} className="absolute -top-2 -left-2 text-accent/10 rotate-180" />
                                <p className="text-gray-300 text-sm italic leading-relaxed pl-4 border-l-2 border-accent/20">"{t.text}"</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div>
                                    <div>
                                        <button
                                            onClick={() => handleToggleStatus(t._id, t.isActive)}
                                            className={`
                                            text-xs px-3 py-1.5 rounded-full border flex items-center gap-1.5 font-medium transition-all
                                            ${t.isActive
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
                                                    : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                                                }
                                        `}
                                            title={t.isActive ? "Click to Hide" : "Click to Show"}
                                        >
                                            {t.isActive ? (
                                                <><Check size={12} /> Active</>
                                            ) : (
                                                <><X size={12} /> Hidden</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {/* Edit button removed: Moderation only */}
                                    <button
                                        onClick={() => handleDelete(t._id)}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {filteredTestimonials.length === 0 && (
                        <div className="col-span-full py-16 text-center text-gray-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                            <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="text-lg font-medium">No testimonials found.</p>
                            <p className="text-sm">Add your first client success story.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Glass Modal with Portal */}
            {isModalOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0f172a] w-full max-w-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-r from-accent/10 to-transparent">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                {currentTestimonial ? <Edit size={20} className="text-accent" /> : <Plus size={20} className="text-accent" />}
                                {currentTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors hover:bg-white/10 p-1 rounded">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Client Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Role / Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Company Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all pl-10"
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <Briefcase size={16} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Testimonial</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.text}
                                    onChange={e => setFormData({ ...formData, text: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-all resize-none"
                                    placeholder="What did the client say?"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-3">
                                    <label className="block text-gray-300 text-sm font-medium">Rating:</label>
                                    <div className="flex items-center gap-1 bg-black/30 rounded-lg p-1 border border-white/5">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, rating: star })}
                                                className={`p-1 transition-transform hover:scale-110 ${formData.rating >= star ? 'text-amber-400' : 'text-gray-600'}`}
                                            >
                                                <Star size={16} fill={formData.rating >= star ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
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
                                    {currentTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default TestimonialsManager;
