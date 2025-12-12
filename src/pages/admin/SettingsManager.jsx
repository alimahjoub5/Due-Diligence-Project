import React, { useState, useEffect } from 'react';
import { settingAPI } from '../../services/api'; // Ensure this endpoint exists
import { sanitizeInput } from '../../utils/security';
import { Save, Globe, Phone, Share2, Shield, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsManager = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const [notification, setNotification] = useState(null);

    const [settings, setSettings] = useState({
        siteName: 'Checkmate Security',
        description: 'Secure your hiring with Checkmate Security. The #1 GDPR & BDSG compliant background check service in Germany. We offer criminal record verification, corporate due diligence, and pre-employment screening. Fast, reliable, and discreet.',
        keywords: 'background checks germany, führungszeugnis, pre-employment screening, corporate due diligence, BDSG compliance, criminal record check germany, employment verification, background check service europe, checkmate security, background checks berlin',
        logo: 'https://checkmatesis.com/images/logo-og.png',
        analyticsId: '',
        email: 'contact@checkmatesecurity.com',
        phone: '+49 69 1234 5678',
        address: 'Neue Mainzer Str. 52-58, 60311 Frankfurt am Main, Germany',
        facebook: 'https://facebook.com/checkmatesis',
        twitter: 'https://twitter.com/checkmatesis',
        linkedin: 'https://linkedin.com/company/checkmatesis',
        linkedin: 'https://linkedin.com/company/checkmatesis',
        maintenanceMode: false,
        googleVerification: ''
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const response = await settingAPI.get();
            // If response.data is empty (first run), we keep default state
            if (response.data) {
                setSettings(prev => ({ ...prev, ...response.data }));
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            // In dev mode, we just keep the defaults if API fails
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setNotification(null);

        // Sanitize settings
        const sanitizedSettings = Object.keys(settings).reduce((acc, key) => {
            // Only sanitize strings, leave booleans/others alone
            acc[key] = typeof settings[key] === 'string' ? sanitizeInput(settings[key]) : settings[key];
            return acc;
        }, {});

        try {
            await settingAPI.update(sanitizedSettings);
            setNotification({ type: 'success', message: 'Settings saved successfully!' });
            setTimeout(() => setNotification(null), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            setNotification({ type: 'error', message: 'Failed to save settings.' });
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'contact', label: 'Contact Info', icon: Phone },
        { id: 'social', label: 'Social Media', icon: Share2 },
        { id: 'system', label: 'System', icon: Shield },
    ];

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Global Settings</h1>
                <p className="text-gray-400">Manage your website's core configuration and contact details.</p>
            </div>

            {/* Notification Toast */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`fixed top-10 right-10 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-400' : 'bg-red-500/20 border border-red-500/50 text-red-400'
                        }`}
                >
                    {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="font-medium">{notification.message}</span>
                </motion.div>
            )}

            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                {/* Tabs Header */}
                <div className="flex border-b border-white/10 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-accent bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-8">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {activeTab === 'general' && (
                            <>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Website Name</label>
                                    <input
                                        type="text"
                                        name="siteName"
                                        value={settings.siteName}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Site Description (SEO)</label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        value={settings.description}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">SEO Keywords (comma separated)</label>
                                    <textarea
                                        name="keywords"
                                        rows="2"
                                        value={settings.keywords}
                                        onChange={handleChange}
                                        placeholder="background checks, security, germany, ..."
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Logo URL</label>
                                        <input
                                            type="text"
                                            name="logo"
                                            value={settings.logo}
                                            onChange={handleChange}
                                            placeholder="https://example.com/logo.png"
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Google Analytics ID</label>
                                        <input
                                            type="text"
                                            name="analyticsId"
                                            value={settings.analyticsId}
                                            onChange={handleChange}
                                            placeholder="G-XXXXXXXXXX"
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Google Search Console Verification</label>
                                        <input
                                            type="text"
                                            name="googleVerification"
                                            value={settings.googleVerification}
                                            onChange={handleChange}
                                            placeholder="Paste the code from the meta tag content here (e.g. wD8SQ...)"
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-all"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'contact' && (
                            <>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Contact Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={settings.email}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={settings.phone}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Office Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={settings.address}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                            </>
                        )}

                        {activeTab === 'social' && (
                            <>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Facebook URL</label>
                                    <input
                                        type="text"
                                        name="facebook"
                                        value={settings.facebook}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Twitter / X URL</label>
                                    <input
                                        type="text"
                                        name="twitter"
                                        value={settings.twitter}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">LinkedIn URL</label>
                                    <input
                                        type="text"
                                        name="linkedin"
                                        value={settings.linkedin}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                            </>
                        )}

                        {activeTab === 'system' && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                                <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                                    <Shield size={20} /> Danger Zone
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-white font-medium">Maintenance Mode</h4>
                                        <p className="text-gray-400 text-sm">Disable access to the public site.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="maintenanceMode"
                                            checked={settings.maintenanceMode}
                                            onChange={handleChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                    </label>
                                </div>
                            </div>
                        )}

                        <div className="pt-6 border-t border-white/10 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="bg-gradient-to-r from-accent to-accent-hover text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {isSaving ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </motion.div>
                </form>
            </div>
        </div>
    );
};

export default SettingsManager;
