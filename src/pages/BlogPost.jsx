import React from 'react';
import DOMPurify from 'dompurify';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Linkedin, Twitter, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const BlogPost = () => {
    const { id } = useParams();

    // Mock data matching Blog.jsx
    const posts = [
        {
            id: 1,
            title: "Navigating Global Data Privacy: Beyond GDPR",
            content: `
                <p class="mb-6">For multinational corporations, managing background screening compliance used to mean simply adhering to the GDPR. Today, the landscape is far more fragmented and complex.</p>
                <h3 class="text-2xl font-bold text-primary mb-4">The Global Patchwork</h3>
                <p class="mb-6">From Brazil's LGPD to China's PIPL, and California's CCPA/CPRA, data privacy laws are evolving rapidly. Each framework brings its own requirements for data residency, subject rights, and consent mechanisms.</p>
                <p class="mb-6"><strong>China's PIPL (Personal Information Protection Law)</strong>, for instance, places strict conditions on cross-border data transfer. Companies verifying candidates in China must ensure they have specific consent and potentially undergo a security assessment by the CAC (Cyberspace Administration of China) before moving data offshore.</p>
                <h3 class="text-2xl font-bold text-primary mb-4">A Unified Compliance Strategy</h3>
                <p class="mb-6">Rather than treating each jurisdiction as a silo, successful global HR teams are adopting a 'highest common denominator' approach. By applying the strictest principles (often GDPR) as a baseline and then layering on local specifics (like US FCRA disclosure forms or UK Right to Work checks), organizations can build a resilient screening program.</p>
                <p>Checkmate Security's platform is built to handle this complexity, automatically applying the correct consent forms and data routing rules based on the candidate's location and citizenship.</p>
            `,
            date: "Oct 12, 2025",
            author: "Dr. Klaus Weber, Global Compliance Lead",
            category: "Compliance",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 2,
            title: "The Rise of Digital Nomads: Screening a Remote Workforce",
            content: `
                <p class="mb-6">The concept of a 'local hire' is becoming obsolete. With the rise of digital nomads and fully remote teams, candidates often present employment histories that span three continents in as many years.</p>
                <h3 class="text-2xl font-bold text-primary mb-4">The Verification Challenge</h3>
                <p class="mb-6">Verifying a candidate who worked for a US tech company while living in Bali and then freelanced for a UK agency requires a new approach to background checks. Traditional providers often struggle with these multi-jurisdictional profiles, leading to long delays.</p>
                <h3 class="text-2xl font-bold text-primary mb-4">Best Practices for Remote Vetting</h3>
                <ul class="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Global ID Verification:</strong> Use biometric ID checks to ensure the person you interview on Zoom is the person you hire, preventing 'deepfake' interviews.</li>
                    <li><strong>International Criminal Checks:</strong> conducting checks not just where the company is based, but where the candidate has physically resided.</li>
                    <li><strong>Direct Source Verification:</strong> Relying on digital records often fails with international freelance work; direct contact with previous clients or HR departments is crucial.</li>
                </ul>
                <p>Embracing a global workforce requires a screening partner who thinks globally. Speed and accuracy are paramount to securing top talent before competitors do.</p>
            `,
            date: "Sep 28, 2025",
            author: "Sarah Jenkins, HR Director",
            category: "Future of Work",
            image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 3,
            title: "Executive Integrity: The Cost of a Bad Hire",
            content: `
                <p class="mb-6">A standard criminal record check is insufficient for a C-suite executive. At the leadership level, the risks are not just about safety—they are about reputation, strategy, and fiduciary responsibility.</p>
                <h3 class="text-2xl font-bold text-primary mb-4">Deep-Dive Due Diligence</h3>
                <p class="mb-6">Our investigative team recently flagged a candidate for a CFO role who had no criminal record but was heavily involved in two previous companies that filed for bankruptcy under suspicious circumstances. This information, found through civil litigation searches and regulatory filings, saved our client millions.</p>
                 <h3 class="text-2xl font-bold text-primary mb-4">What to Look For</h3>
                <ul class="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Undeclared Directorships:</strong> Hidden conflicts of interest.</li>
                    <li><strong>Civil Litigation History:</strong> A pattern of lawsuits or contract disputes.</li>
                    <li><strong>Regulatory Sanctions:</strong> Bans or fines from financial regulators (SEC, FCA, BaFin).</li>
                    <li><strong>CV Inflation:</strong> Exaggerating degrees or tenure is surprisingly common even at the C-level.</li>
                </ul>
                <p>When the stakes are high, deep intelligence is the only insurance policy that matters.</p>
            `,
            date: "Sep 15, 2025",
            author: "Michael Chen, Senior Investigator",
            category: "Risk Management",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 4,
            title: "OSINT in Modern Vetting: Ethical Boundaries",
            content: `
                <p class="mb-6">Open Source Intelligence (OSINT) allows employers to see the side of a candidate that doesn't appear on a CV—their public digital footprint. However, relying on social media for hiring decisions is a legal minefield.</p>
                 <h3 class="text-2xl font-bold text-primary mb-4">The 'Right to Privacy' vs. Due Diligence</h3>
                 <p class="mb-6">In many jurisdictions, including Germany and France, employers are prohibited from using social media data unless it is professional in nature (e.g., LinkedIn). Reviewing a candidate's private Facebook or Instagram could lead to discrimination claims.</p>
                 <h3 class="text-2xl font-bold text-primary mb-4">Ethical Screening Protocols</h3>
                 <p class="mb-6">We conduct OSINT searches through a strict ethical filter:</p>
                 <ul class="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Professional Relevance:</strong> We only flag information that poses a direct risk to the company (e.g., hate speech, violence, admission of illegal acts).</li>
                    <li><strong>Protected Characteristics:</strong> We redact information related to religion, sexuality, political affiliation, or health status to prevent unconscious bias in the hiring process.</li>
                    <li><strong>Validation:</strong> We verify that the profile actually belongs to the candidate to avoid cases of mistaken identity.</li>
                </ul>
                 <p>Used correctly, OSINT is a powerful tool for cultural additive hiring. Used poorly, it is a liability.</p>
             `,
            date: "Aug 30, 2025",
            author: "Elena Petrova, Intelligence Specialist",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
        }
    ];

    const post = posts.find(p => p.id === parseInt(id));

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
                <SEO
                    title="Article Not Found | Checkmate Security"
                    description="The requested article could not be found."
                />
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Article not found</h2>
                    <Link to="/blog" className="text-accent mt-4 inline-block hover:underline">Return to Blog</Link>
                </div>
            </div>
        );
    }

    // Strip HTML tags for description
    const strippedContent = post.content.replace(/<[^>]+>/g, '');
    const description = strippedContent.substring(0, 160) + '...';

    return (
        <div className="bg-gray-50 min-h-screen py-12 font-sans">
            <SEO
                title={post.title}
                description={description}
                keywords={`${post.category}, international background checks, global compliance, hiring`}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Button */}
                <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-accent font-medium mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Intelligence Journal
                </Link>

                {/* Article Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-accent font-bold uppercase tracking-widest text-xs bg-accent/10 px-3 py-1 rounded-full">{post.category}</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-primary mt-4 mb-6 leading-tight">{post.title}</h1>

                    <div className="flex items-center justify-between border-b border-gray-200 pb-8 mb-8">
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="font-medium text-gray-900">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="text-gray-400 hover:text-[#0077b5] transition-colors"><Linkedin className="w-5 h-5" /></button>
                            <button className="text-gray-400 hover:text-[#1DA1F2] transition-colors"><Twitter className="w-5 h-5" /></button>
                            <button className="text-gray-400 hover:text-[#4267B2] transition-colors"><Facebook className="w-5 h-5" /></button>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors"><Share2 className="w-5 h-5" /></button>
                        </div>
                    </div>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12 rounded-sm overflow-hidden shadow-lg"
                >
                    <img src={post.image} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
                </motion.div>

                {/* Content */}
                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                >
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
                </motion.article>

                {/* Footer / Disclaimer */}
                <div className="mt-16 bg-white p-6 rounded-sm border-l-4 border-accent shadow-sm">
                    <p className="text-sm text-gray-500 italic">
                        <strong>Disclaimer:</strong> The information provided in this article is for informational purposes only. Laws vary by jurisdiction. Please consult with legal counsel before implementing global screening programs.
                    </p>
                </div>

                <div className="mt-12 text-center">
                    <h3 className="text-xl font-bold text-primary mb-4">Ready to mitigate your hiring risks?</h3>
                    <Link to="/contact" className="inline-block bg-accent text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-[#b08d4b] transition-all shadow-md">
                        Contact Us Today
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
