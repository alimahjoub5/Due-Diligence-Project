import React, { useState, useEffect } from 'react';
import { logsAPI } from '../../services/api';
import { Activity, Clock, User, Shield, FileText, Settings, Trash2, Edit, Plus, Filter, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    // Dummy data for development
    const dummyLogs = [
        { _id: '1', user: 'Admin User', action: 'create', target: 'Blog Post', details: 'Created post "Top 5 Security Risks"', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() }, // 5 mins ago
        { _id: '2', user: 'Admin User', action: 'update', target: 'Global Settings', details: 'Updated site description', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() }, // 2 hours ago
        { _id: '3', user: 'John Doe', action: 'login', target: 'system', details: 'Successful login', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }, // 1 day ago
        { _id: '4', user: 'Admin User', action: 'delete', target: 'Testimonial', details: 'Deleted testimonial from "Alice Corp"', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString() },
        { _id: '5', user: 'System', action: 'system', target: 'Backup', details: 'Automated database backup completed', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
    ];

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        setIsLoading(true);
        try {
            const response = await logsAPI.getAll();
            if (response.data && response.data.length > 0) {
                setLogs(response.data);
            } else if (process.env.NODE_ENV === 'development') {
                setLogs(dummyLogs);
            }
        } catch (error) {
            console.error("Failed to fetch logs:", error);
            if (process.env.NODE_ENV === 'development') setLogs(dummyLogs);
        } finally {
            setIsLoading(false);
        }
    };

    const getActionIcon = (action) => {
        switch (action) {
            case 'create': return <Plus size={16} className="text-green-400" />;
            case 'update': return <Edit size={16} className="text-blue-400" />;
            case 'delete': return <Trash2 size={16} className="text-red-400" />;
            case 'login': return <User size={16} className="text-accent" />;
            case 'system': return <Settings size={16} className="text-gray-400" />;
            default: return <Activity size={16} className="text-gray-400" />;
        }
    };

    const getActionColor = (action) => {
        switch (action) {
            case 'create': return 'bg-green-500/10 border-green-500/20';
            case 'update': return 'bg-blue-500/10 border-blue-500/20';
            case 'delete': return 'bg-red-500/10 border-red-500/20';
            case 'login': return 'bg-accent/10 border-accent/20';
            default: return 'bg-white/5 border-white/10';
        }
    };

    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.action === filter);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Activity Logs</h1>
                    <p className="text-gray-400 text-sm">Monitor system changes and user actions.</p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent text-sm"
                    >
                        <option value="all">All Actions</option>
                        <option value="create">Create</option>
                        <option value="update">Update</option>
                        <option value="delete">Delete</option>
                        <option value="login">Login</option>
                    </select>
                    <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 transition-colors text-sm">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl relative overflow-hidden">
                {/* Decorative timeline line */}
                <div className="absolute left-8 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-8 relative">
                        {filteredLogs.map((log, index) => (
                            <motion.div
                                key={log._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-6 relative"
                            >
                                {/* Timeline Dot */}
                                <div className={`relative z-10 w-5 h-5 rounded-full border-2 bg-[#0f172a] flex-shrink-0 mt-1 ${log.action === 'delete' ? 'border-red-500' :
                                        log.action === 'create' ? 'border-green-500' :
                                            log.action === 'login' ? 'border-accent' : 'border-gray-500'
                                    }`}></div>

                                <div className={`flex-1 p-4 rounded-lg border ${getActionColor(log.action)} hover:bg-white/5 transition-colors group`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="p-1 rounded bg-black/20 text-white">
                                                {getActionIcon(log.action)}
                                            </span>
                                            <span className="font-bold text-white uppercase tracking-wider text-xs">{log.action}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Clock size={12} />
                                            {new Date(log.timestamp).toLocaleString()}
                                        </div>
                                    </div>

                                    <p className="text-gray-300 text-sm mb-2">{log.details}</p>

                                    <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-white/5 pt-2 mt-2">
                                        <span className="flex items-center gap-1">
                                            <User size={12} /> {log.user}
                                        </span>
                                        {log.target && (
                                            <span className="flex items-center gap-1">
                                                <FileText size={12} /> {log.target}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityLogs;
