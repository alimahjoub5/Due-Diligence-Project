import React from 'react';
import {
    Users,
    Briefcase,
    MessageCircle,
    CheckCircle,
    Clock,
    AlertCircle,
    ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, icon: Icon, color = "accent", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-accent/30 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500`}>
            <Icon size={80} className={`text-${color}`} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-${color}/20 to-transparent border border-${color}/10 text-${color}`}>
                    <Icon size={24} className="text-accent" />
                </div>
                {change && (
                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${change.startsWith('+') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {change}
                    </span>
                )}
            </div>

            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
            </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
);

const ActivityItem = ({ title, time, type }) => (
    <div className="flex items-start gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group cursor-pointer">
        <div className={`
            w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:scale-110 transition-transform duration-300
            ${type === 'success' ? 'bg-green-500/10 text-green-400' : ''}
            ${type === 'warning' ? 'bg-yellow-500/10 text-yellow-400' : ''}
            ${type === 'info' ? 'bg-blue-500/10 text-blue-400' : ''}
        `}>
            {type === 'success' && <CheckCircle size={18} />}
            {type === 'warning' && <AlertCircle size={18} />}
            {type === 'info' && <MessageCircle size={18} />}
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{title}</h4>
            <span className="text-xs text-gray-500 flex items-center gap-1 mt-1 group-hover:text-gray-400">
                <Clock size={10} /> {time}
            </span>
        </div>
        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
            <ArrowUpRight size={16} />
        </button>
    </div>
);

const Dashboard = () => {
    return (
        <div>
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Dashboard Overview</h1>
                    <p className="text-gray-400">Welcome back, Admin. System status is stable.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-all">
                        Download Report
                    </button>
                    <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-bold rounded-lg shadow-lg shadow-accent/20 transition-all hover:scale-105">
                        New Action
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Active Services"
                    value="12"
                    change="+2 this week"
                    icon={Briefcase}
                    delay={0.1}
                />
                <StatCard
                    title="Total FAQs"
                    value="24"
                    change="+4 new"
                    icon={MessageCircle}
                    delay={0.2}
                />
                <StatCard
                    title="Testimonials"
                    value="48"
                    change="+12% growth"
                    icon={Users}
                    delay={0.3}
                />
                <StatCard
                    title="Pending Needs"
                    value="3"
                    change="Action req."
                    icon={AlertCircle}
                    color="red-500"
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="lg:col-span-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl"
                >
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Clock size={18} className="text-accent" /> Recent Activity
                        </h2>
                        <button className="text-xs text-accent hover:text-accent-light bg-accent/10 px-3 py-1 rounded-full border border-accent/20 transition-all hover:bg-accent/20">
                            View All History
                        </button>
                    </div>
                    <div className="divide-y divide-white/5">
                        <ActivityItem
                            title="New testimonial received from 'Corporate Client X'"
                            time="2 hours ago"
                            type="success"
                        />
                        <ActivityItem
                            title="Service 'Background Checks' updated"
                            time="5 hours ago"
                            type="info"
                        />
                        <ActivityItem
                            title="3 new FAQ entries drafted"
                            time="Yesterday"
                            type="warning"
                        />
                        <ActivityItem
                            title="System settings updated"
                            time="2 days ago"
                            type="info"
                        />
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl h-fit"
                >
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <ArrowUpRight size={18} className="text-accent" /> Quick Actions
                    </h2>
                    <div className="space-y-4">
                        <button className="w-full py-4 px-4 bg-gradient-to-r from-accent/20 to-accent/5 hover:from-accent/30 hover:to-accent/10 border border-accent/20 text-accent rounded-lg transition-all flex items-center justify-between group">
                            <span className="font-medium flex items-center gap-3">
                                <Briefcase size={18} /> Add New Service
                            </span>
                            <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                        <button className="w-full py-4 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all flex items-center justify-between group">
                            <span className="font-medium flex items-center gap-3">
                                <MessageCircle size={18} /> Manage Testimonials
                            </span>
                            <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                        <button className="w-full py-4 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all flex items-center justify-between group">
                            <span className="font-medium flex items-center gap-3">
                                <Users size={18} /> Update FAQs
                            </span>
                            <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                <CheckCircle size={40} className="text-blue-500" />
                            </div>
                            <h4 className="text-blue-400 font-bold mb-1 text-sm relative z-10">System Status</h4>
                            <p className="text-blue-300/70 text-xs relative z-10">All systems operational. Database connected.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
