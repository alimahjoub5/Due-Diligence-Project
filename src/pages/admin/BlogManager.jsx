import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { blogAPI } from '../../services/api';
import { sanitizeInput } from '../../utils/security';
import { Plus, Edit, Trash2, X, Search, FileText, Image as ImageIcon, User, Tag, Calendar, ExternalLink, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogManager = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [activeTab, setActiveTab] = useState('write'); // 'write' or 'preview'

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        image: '',
        author: '',
        category: '',
        status: 'published' // 'published' or 'draft'
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await blogAPI.getAll();
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            if (process.env.NODE_ENV === 'development' && posts.length === 0) {
                setPosts([
                    { _id: '1', title: 'Top Security Trends 2024', slug: 'security-trends-2024', content: '# Top Security Trends\n\nCybersecurity is evolving at a rapid pace. Here are the **key trends** to watch:\n\n1. AI-driven threats\n2. Zero Trust Architecture\n3. Cloud Security', author: 'John Doe', category: 'Security', date: new Date().toISOString(), image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=2070', status: 'published' },
                    { _id: '2', title: 'Why Background Checks Matter', slug: 'why-background-checks', content: 'Hiring the right people is crucial. \n\n> "Trust, but verify."\n\nBackground checks help mitigate risks.', author: 'Jane Smith', category: 'HR', date: new Date(Date.now() - 86400000).toISOString(), image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1932', status: 'draft' },
                ]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (post = null) => {
        setActiveTab('write');
        if (post) {
            setFormData({
                title: post.title,
                slug: post.slug,
                content: post.content,
                image: post.image || '',
                author: post.author,
                category: post.category,
                status: post.status || 'published'
            });
            setCurrentPost(post);
        } else {
            setFormData({
                title: '',
                slug: '',
                content: '',
                image: '',
                author: 'Admin',
                category: '',
                status: 'published'
            });
            setCurrentPost(null);
        }
        setIsModalOpen(true);
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: !currentPost ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
        }));
    };

    const insertMarkdown = (prefix, suffix = '') => {
        const textarea = document.getElementById('content-editor');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = formData.content;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newContent = `${before}${prefix}${selection}${suffix}${after}`;
        setFormData({ ...formData, content: newContent });

        // Restore focus and selection (slightly tricky in React state updates, simplified here)
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    const calculateReadTime = (text) => {
        const wordsPerMinute = 200;
        const words = text ? text.split(/\s+/).length : 0;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sanitize data
        const sanitizedData = {
            ...formData,
            title: sanitizeInput(formData.title),
            slug: sanitizeInput(formData.slug),
            content: sanitizeInput(formData.content),
            image: sanitizeInput(formData.image),
            author: sanitizeInput(formData.author),
            category: sanitizeInput(formData.category),
        };

        try {
            if (currentPost) {
                await blogAPI.update(currentPost._id, sanitizedData);
            } else {
                await blogAPI.create(sanitizedData);
            }
            setIsModalOpen(false);
            fetchPosts();
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Failed to save blog post.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await blogAPI.delete(id);
                fetchPosts();
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Failed to delete post.');
            }
        }
    };

    const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const uniqueCategories = [...new Set(posts.map(p => p.category).filter(Boolean))];

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Blog Management</h1>
                    <p className="text-gray-400 text-sm">Create and manage your latest news and articles.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg shadow-lg shadow-accent/20 flex items-center gap-2 transition-all hover:scale-105 font-medium"
                >
                    <Plus size={20} /> Create New Post
                </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search posts by title or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder-gray-500"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-20">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading posts...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-[#1e293b]/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1"
                        >
                            {/* Image Preview */}
                            <div className="h-48 bg-black/40 relative overflow-hidden">
                                {post.image ? (
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                        <ImageIcon size={48} opacity={0.5} />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs text-white border border-white/10 backdrop-blur-md ${post.status === 'published' ? 'bg-green-500/80' : 'bg-gray-500/80'
                                        }`}>
                                        {post.status === 'published' ? 'Published' : 'Draft'}
                                    </span>
                                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-accent transition-colors">{post.title}</h3>

                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date || post.createdAt).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1 ml-auto text-accent/80">{calculateReadTime(post.content)}</span>
                                </div>

                                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                                    {post.content ? post.content.replace(/[#*`]/g, '') : "No content..."}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                    <span className="text-xs text-gray-500 font-mono">
                                        /{post.slug}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenModal(post)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Portal Modal */}
            {isModalOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md h-screen overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0f172a] w-full max-w-4xl rounded-xl border border-white/10 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-r from-accent/10 to-transparent flex-shrink-0">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                {currentPost ? <Edit size={20} className="text-accent" /> : <Plus size={20} className="text-accent" />}
                                {currentPost ? 'Edit Blog Post' : 'Create New Post'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors hover:bg-white/10 p-1 rounded">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                            {/* Top Grid: Title, Slug, Status */}
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-12 md:col-span-6">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={handleTitleChange}
                                        placeholder="Enter post title"
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Slug</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={formData.slug}
                                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 pl-10 pr-10 text-gray-300 focus:outline-none focus:border-accent transition-all font-mono text-sm"
                                        />
                                        <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }))}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent transition-colors"
                                            title="Regenerate Slug from Title"
                                        >
                                            <RefreshCw size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Second Grid: Category, Author, Status */}
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-12 md:col-span-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                                    <div className="relative">
                                        <input
                                            list="category-options"
                                            type="text"
                                            required
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            placeholder="e.g. Security"
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-accent transition-all"
                                        />
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                        <datalist id="category-options">
                                            {uniqueCategories.map(cat => (
                                                <option key={cat} value={cat} />
                                            ))}
                                        </datalist>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Author</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={formData.author}
                                            onChange={e => setFormData({ ...formData, author: e.target.value })}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-accent transition-all"
                                        />
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent transition-all appearance-none"
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>

                            {/* Markdown Editor Section */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-gray-300 text-sm font-medium">Content (Markdown)</label>
                                    <div className="flex bg-black/30 rounded-lg p-1 border border-white/10">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('write')}
                                            className={`px-3 py-1 rounded text-xs font-medium transition-all ${activeTab === 'write' ? 'bg-accent text-white' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            Write
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('preview')}
                                            className={`px-3 py-1 rounded text-xs font-medium transition-all ${activeTab === 'preview' ? 'bg-accent text-white' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            Preview
                                        </button>
                                    </div>
                                </div>

                                <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
                                    {/* Toolbar */}
                                    {activeTab === 'write' && (
                                        <div className="flex items-center gap-1 p-2 bg-white/5 border-b border-white/10">
                                            <button type="button" onClick={() => insertMarkdown('**', '**')} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="Bold"><strong>B</strong></button>
                                            <button type="button" onClick={() => insertMarkdown('*', '*')} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded italic" title="Italic">I</button>
                                            <div className="w-px h-4 bg-white/10 mx-1"></div>
                                            <button type="button" onClick={() => insertMarkdown('# ')} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="H1">H1</button>
                                            <button type="button" onClick={() => insertMarkdown('## ')} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="H2">H2</button>
                                            <div className="w-px h-4 bg-white/10 mx-1"></div>
                                            <button type="button" onClick={() => insertMarkdown('- ')} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="List">List</button>
                                            <button type="button" onClick={() => insertMarkdown('> ')} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="Quote">Quote</button>
                                            <button type="button" onClick={() => insertMarkdown('[', '](url)')} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="Link">Link</button>
                                        </div>
                                    )}

                                    {activeTab === 'write' ? (
                                        <textarea
                                            id="content-editor"
                                            rows="12"
                                            required
                                            value={formData.content}
                                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full bg-transparent p-4 text-white focus:outline-none font-mono text-sm leading-relaxed resize-y"
                                            placeholder="Write your article content here using Markdown..."
                                        />
                                    ) : (
                                        <div className="h-[320px] overflow-y-auto p-4 prose prose-invert max-w-none prose-sm">
                                            {/* Simple Markdown Rendering for Preview */}
                                            {formData.content.split('\n').map((line, i) => {
                                                if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mb-4 text-white">{line.replace('# ', '')}</h1>;
                                                if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mb-3 text-white mt-4">{line.replace('## ', '')}</h2>;
                                                if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-accent pl-4 italic text-gray-300 my-4">{line.replace('> ', '')}</blockquote>;
                                                if (line.startsWith('- ')) return <li key={i} className="ml-4 text-gray-300 mb-1 list-disc">{line.replace('- ', '')}</li>;
                                                if (line.trim() === '') return <br key={i} />;
                                                return <p key={i} className="text-gray-300 mb-2">{line}</p>;
                                            })}
                                            {!formData.content && <p className="text-gray-500 italic">Nothing to preview yet.</p>}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-12">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Featured Image URL</label>
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                placeholder="https://example.com/image.jpg"
                                                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-accent transition-all"
                                            />
                                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                        </div>
                                        {formData.image && (
                                            <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 bg-black/20 flex-shrink-0">
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="p-6 border-t border-white/10 bg-[#0f172a] flex gap-4 flex-shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="flex-1 py-3 bg-gradient-to-r from-accent to-accent-hover hover:to-accent text-white rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-accent/20 font-bold"
                            >
                                {currentPost ? 'Update Post' : 'Publish Post'}
                            </button>
                        </div>
                    </motion.div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default BlogManager;
