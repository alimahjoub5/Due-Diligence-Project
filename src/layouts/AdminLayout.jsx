import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    HelpCircle,
    MessageSquare,
    MessageSquareQuote,
    Settings,
    LogOut,
    Menu,
    X,
    Briefcase,
    Globe,
    ShieldCheck,
    Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
        { path: '/admin/services', icon: Briefcase, label: 'Services' },
        { path: '/admin/faqs', icon: HelpCircle, label: 'FAQs' },
        { path: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
        { path: '/admin/blog', icon: FileText, label: 'Blog' },
        { path: '/admin/settings', icon: Settings, label: 'Global Settings' },
        { path: '/admin/logs', icon: Activity, label: 'Activity Logs' },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-primary text-gray-100 overflow-hidden font-sans relative">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#1e293b] to-transparent opacity-60"></div>
                <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[80px]" />
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            {/* Sidebar */}
            <aside
                className={`
                    ${isSidebarOpen ? 'w-64' : 'w-20'} 
                    bg-black/20 backdrop-blur-xl border-r border-white/10 transition-all duration-300 flex flex-col fixed md:relative z-30 h-full shadow-2xl
                `}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-center border-b border-white/5 bg-white/5 backdrop-blur-sm">
                    {isSidebarOpen ? (
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-8 h-8 text-accent" />
                            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light tracking-wider">
                                CHECKMATE
                            </span>
                        </div>
                    ) : (
                        <ShieldCheck className="w-8 h-8 text-accent" />
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 group relative overflow-hidden
                                    ${isActive
                                        ? 'bg-gradient-to-r from-accent/20 to-transparent text-accent font-medium border-l-2 border-accent'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-accent' : 'text-gray-400 group-hover:text-accent transition-colors'}`} />
                                {isSidebarOpen && <span className="relative z-10">{item.label}</span>}

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity z-0" />

                                {!isSidebarOpen && (
                                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#0B1120] text-gray-200 text-xs rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl backdrop-blur-md">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/5 bg-black/10">
                    <Link
                        to="/"
                        target="_blank"
                        className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-400 hover:bg-white/5 hover:text-white transition-all mb-2 group"
                    >
                        <Globe className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                        {isSidebarOpen && <span>Visit Website</span>}
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="w-5 h-5" />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* Topbar */}
                <header className="h-20 bg-primary/30 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <h2 className="text-xl font-medium text-white opacity-90 hidden md:block">
                            Admin Dashboard
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-sm font-medium text-white">Admin User</span>
                            <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">Super Admin</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-amber-700 p-[2px] shadow-lg shadow-accent/20 cursor-pointer hover:scale-105 transition-transform">
                            <div className="w-full h-full rounded-full bg-[#0B1120] flex items-center justify-center text-accent font-bold">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-8 relative scroll-smooth custom-scrollbar">
                    <div className="max-w-7xl mx-auto pb-10">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
