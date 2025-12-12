import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../../services/api';
import { sanitizeInput } from '../../utils/security';
import { Plus, Edit, Trash2, X, Check, Search, Shield, Info, Briefcase, Lock, UserCheck, FileSearch } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'Shield',
        category: 'Security',
        order: 0,
        isActive: true
    });

    const categoryOptions = ['Security', 'Intelligence', 'SME'];

    const iconMap = {
        Shield: Shield,
        Info: Info,
        Briefcase: Briefcase,
        Lock: Lock,
        UserCheck: UserCheck,
        FileSearch: FileSearch
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const response = await serviceAPI.getAll();
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
            if (process.env.NODE_ENV === 'development' && services.length === 0) {
                setServices([
                    { _id: '1', title: 'Background Checks', description: 'Comprehensive background verification services for corporate clients.', icon: 'Shield', category: 'Security', order: 1, isActive: true },
                    { _id: '2', title: 'Due Diligence', description: 'In-depth corporate investigations and intelligence gathering.', icon: 'Briefcase', category: 'Intelligence', order: 2, isActive: true },
                    { _id: '3', title: 'Risk Assessment', description: 'Identifying potential security threats and vulnerabilities.', icon: 'Lock', category: 'Security', order: 3, isActive: false }
                ]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (service = null) => {
        if (service) {
            setFormData({
                title: service.title,
                description: service.description,
                icon: service.icon,
                category: service.category,
                order: service.order,
                isActive: service.isActive
            });
            setCurrentService(service);
        } else {
            setFormData({
                title: '',
                description: '',
                icon: 'Shield',
                category: 'Security',
                order: services.length + 1,
                isActive: true
            });
            setCurrentService(null);
        }
        setIsModalOpen(true);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sanitize data
        const sanitizedData = {
            ...formData,
            title: sanitizeInput(formData.title),
            description: sanitizeInput(formData.description),
            category: sanitizeInput(formData.category),
        };

        try {
            if (currentService) {
                await serviceAPI.update(currentService._id, sanitizedData);
            } else {
                await serviceAPI.create(sanitizedData);
            }
            setIsModalOpen(false);
            fetchServices();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Failed to save service.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await serviceAPI.delete(id);
                fetchServices();
            } catch (error) {
                console.error('Error deleting service:', error);
                alert('Failed to delete service.');
            }
        }
    };

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Services Management</h1>
                    <p className="text-gray-400 text-sm">Manage your service offerings and categories.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg shadow-lg shadow-accent/20 flex items-center gap-2 transition-all hover:scale-105 font-medium"
                >
                    <Plus size={20} /> Add New Service
                </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder-gray-500"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-20">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading services...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service, index) => {
                        const IconComponent = iconMap[service.icon] || Shield;

                        return (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="group bg-[#1e293b]/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-accent/40 hover:bg-[#1e293b]/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 flex flex-col h-full"
                            >
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-accent/10 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                            <IconComponent size={24} />
                                        </div>
                                        <div className={`px-2 py-1 rounded text-xs font-medium border ${service.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                            {service.isActive ? 'Active' : 'Inactive'}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{service.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">{service.description}</p>

                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category:</span>
                                        <span className="text-xs text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                                            {service.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-white/5 bg-black/20 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Order: {service.order}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenModal(service)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors group-hover:bg-white/5"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service._id)}
                                            className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                    {filteredServices.length === 0 && (
                        <div className="col-span-full py-16 text-center text-gray-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                            <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="text-lg font-medium">No services found.</p>
                            <p className="text-sm">Try adjusting your search or add a new service.</p>
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
                                {currentService ? <Edit size={20} className="text-accent" /> : <Plus size={20} className="text-accent" />}
                                {currentService ? 'Edit Service' : 'Add New Service'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors hover:bg-white/10 p-1 rounded">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Service Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    placeholder="e.g. Executive Protection"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
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
                                            <Briefcase size={16} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Icon</label>
                                    <div className="relative">
                                        <select
                                            value={formData.icon}
                                            onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white appearance-none focus:outline-none focus:border-accent"
                                        >
                                            {Object.keys(iconMap).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-accent">
                                            {React.createElement(iconMap[formData.icon] || Shield, { size: 16 })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-all resize-none"
                                    placeholder="Describe the service..."
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
                                    {currentService ? 'Update Service' : 'Create Service'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ServicesManager;
