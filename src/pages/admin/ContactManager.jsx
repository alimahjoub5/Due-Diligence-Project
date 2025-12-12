import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';
import { Mail, Trash2, CheckCircle, Search, Clock, User, Building2, AlertCircle, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactManager = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Dummy data for development if API fails or returns empty
    const dummyMessages = [
        { _id: '1', name: 'John Doe', email: 'john@example.com', company: 'Tech Corp', serviceInterest: 'Pre-employment Checks', message: 'We are looking to screen 50 new candidates next month. Can you provide a quote?', status: 'new', createdAt: new Date().toISOString() },
        { _id: '2', name: 'Sarah Smith', email: 'sarah@startuplab.io', company: 'Startup Lab', serviceInterest: 'SME Due Diligence', message: 'Interested in your due diligence services for a new partnership we are exploring.', status: 'read', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { _id: '3', name: 'Michael Brown', email: 'm.brown@invest.com', company: 'Invest Group', serviceInterest: 'Enhanced Due Diligence', message: 'Urgent request for C-level background checks.', status: 'replied', createdAt: new Date(Date.now() - 172800000).toISOString() },
    ];

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const response = await contactAPI.getAll();
            if (response.data && response.data.length > 0) {
                setMessages(response.data);
            } else if (process.env.NODE_ENV === 'development') {
                setMessages(dummyMessages);
            }
        } catch (error) {
            console.error("Failed to fetch messages:", error);
            if (process.env.NODE_ENV === 'development') setMessages(dummyMessages);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await contactAPI.delete(id);
                setMessages(messages.filter(m => m._id !== id));
                if (selectedMessage?._id === id) setSelectedMessage(null);
            } catch (error) {
                console.error("Failed to delete message:", error);
                // Optimistic update for dev
                setMessages(messages.filter(m => m._id !== id));
            }
        }
    };

    const handleMarkAsRead = async (msg) => {
        if (msg.status === 'new') {
            try {
                // await contactAPI.update(msg._id, { status: 'read' }); // API might not support this yet
                setMessages(messages.map(m => m._id === msg._id ? { ...m, status: 'read' } : m));
            } catch (error) {
                console.error("Failed to update status:", error);
            }
        }
    };

    const openMessage = (msg) => {
        setSelectedMessage(msg);
        handleMarkAsRead(msg);
    };

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.serviceInterest?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'bg-accent/80 text-white';
            case 'read': return 'bg-gray-500/20 text-gray-400';
            case 'replied': return 'bg-green-500/20 text-green-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Inbox</h1>
                    <p className="text-gray-400 text-sm">Manage incomings inquiries and support requests.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-2 w-full md:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none text-white focus:ring-0 pl-10 pr-4 w-full md:w-64 placeholder-gray-500"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Message List */}
                <div className={`flex-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex flex-col overflow-hidden ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                        <span className="text-gray-400 text-sm font-medium">{filteredMessages.length} Messages</span>
                        <button onClick={fetchMessages} className="text-accent hover:text-white transition-colors text-sm flex items-center gap-1">
                            <Clock size={14} /> Refresh
                        </button>
                    </div>

                    <div className="overflow-y-auto custom-scrollbar flex-1">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : filteredMessages.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">
                                <Mail size={48} className="mx-auto mb-4 opacity-20" />
                                <p>No messages found.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {filteredMessages.map((msg) => (
                                    <div
                                        key={msg._id}
                                        onClick={() => openMessage(msg)}
                                        className={`p-4 hover:bg-white/5 cursor-pointer transition-colors group relative ${selectedMessage?._id === msg._id ? 'bg-white/10 border-l-4 border-accent' : msg.status === 'new' ? 'bg-accent/5' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`font-medium ${msg.status === 'new' ? 'text-white' : 'text-gray-300'}`}>{msg.name}</h3>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="text-sm text-accent/80 mb-1">{msg.serviceInterest || 'General Inquiry'}</div>
                                        <p className="text-sm text-gray-500 line-clamp-2 pr-8">{msg.message}</p>

                                        {msg.status === 'new' && (
                                            <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent"></span>
                                        )}

                                        <button
                                            onClick={(e) => handleDelete(msg._id, e)}
                                            className="absolute bottom-4 right-4 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Message Detail View */}
                <div className={`flex-[1.5] bg-[#0f172a]/80 backdrop-blur-xl rounded-xl border border-white/10 flex flex-col overflow-hidden ${!selectedMessage ? 'hidden lg:flex items-center justify-center text-gray-500' : 'flex absolute inset-0 z-20 lg:static'}`}>
                    {selectedMessage ? (
                        <>
                            <div className="p-6 border-b border-white/10 flex justify-between items-start bg-black/20">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-xl uppercase border border-white/10 shadow-lg">
                                        {selectedMessage.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                            {selectedMessage.name}
                                            <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${getStatusColor(selectedMessage.status)}`}>
                                                {selectedMessage.status}
                                            </span>
                                        </h2>
                                        <div className="flex flex-col text-sm text-gray-400 mt-1">
                                            <span className="flex items-center gap-2"><Mail size={12} /> {selectedMessage.email}</span>
                                            {selectedMessage.company && <span className="flex items-center gap-2"><Building2 size={12} /> {selectedMessage.company}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleDelete(selectedMessage._id, { stopPropagation: () => { } })} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                    <button onClick={() => setSelectedMessage(null)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg lg:hidden" title="Close">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                                <div className="mb-8 p-4 rounded-lg bg-accent/5 border border-accent/10">
                                    <h4 className="text-xs uppercase font-bold text-accent mb-2 tracking-widest">Inquiry Type</h4>
                                    <p className="text-lg text-white font-medium">{selectedMessage.serviceInterest || 'General Inquiry'}</p>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <h4 className="text-xs uppercase font-bold text-gray-500 mb-4 tracking-widest">Message Content</h4>
                                    <p className="text-gray-300 whitespace-pre-line leading-relaxed text-base">
                                        {selectedMessage.message}
                                    </p>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-4">
                                    <p className="text-xs text-gray-600 font-mono">
                                        Sent: {new Date(selectedMessage.createdAt).toLocaleString()} <br />
                                        ID: {selectedMessage._id}
                                    </p>

                                    <div className="flex gap-3">
                                        <a href={`mailto:${selectedMessage.email}`} className="bg-white text-primary px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 w-fit">
                                            <ExternalLink size={16} /> Reply via Email
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <Mail size={64} className="mx-auto mb-4 opacity-10" />
                            <p>Select a message to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactManager;
