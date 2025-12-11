const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const FAQ = require('./models/FAQ');
const Testimonial = require('./models/Testimonial');
const GlobalSetting = require('./models/GlobalSetting');
const PageContent = require('./models/PageContent');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.log(err));

const seedData = async () => {
    try {
        // Clear existing data
        await Service.deleteMany({});
        await FAQ.deleteMany({});
        await Testimonial.deleteMany({});
        await GlobalSetting.deleteMany({});
        await PageContent.deleteMany({});

        console.log('Cleared existing data...');

        // --- Services ---
        const services = [
            {
                title: "Pre-employment Checks",
                description: "Verify credentials, employment history, and professional integrity.",
                icon: "UserCheck",
                category: "Security",
                order: 1
            },
            {
                title: "Enhanced Due Diligence",
                description: "Deep-dive research for C-level executives and sensitive roles.",
                icon: "Search",
                category: "Intelligence",
                order: 2
            },
            {
                title: "Vendor & Partner Screening",
                description: "Assess the legitimacy and reputation of new business partners.",
                icon: "Building2",
                category: "SME",
                order: 3
            },
            {
                title: "SME Due Diligence",
                description: "Tailored risk assessments designed for small and mid-sized enterprises.",
                icon: "Shield",
                category: "SME",
                order: 4
            }
        ];
        await Service.insertMany(services);
        console.log('Services seeded.');

        // --- FAQs ---
        const faqs = [
            {
                question: "Is pre-employment screening legal in Europe?",
                answer: "Yes, when conducted properly. We strictly follow GDPR and national laws, ensuring checks are relevant to the role and proportional.",
                category: "Legal"
            },
            {
                question: "How long does a background check take?",
                answer: "Standard pre-employment checks typically take 2–5 business days. Enhanced due diligence for senior roles may take slightly longer.",
                category: "General"
            },
            {
                question: "What information do I need to provide?",
                answer: "We typically need the candidate’s resume/CV and signed consent. We will provide you with the necessary consent forms.",
                category: "General"
            },
            {
                question: "Do you work with small businesses?",
                answer: "Absolutely. Our services are designed for SMEs. You can outsource background checks on a case-by-case basis.",
                category: "Business"
            },
            {
                question: "What happens if you find something negative?",
                answer: "We report the factual findings to you confidentially, allowing you to make an informed, risk-based hiring decision.",
                category: "Process"
            }
        ];
        await FAQ.insertMany(faqs);
        console.log('FAQs seeded.');

        // --- Testimonials ---
        const testimonials = [
            {
                name: "Thomas Müller",
                role: "Global HR Director",
                company: "EuroFinance Corp",
                companyType: "Financial Services",
                location: "Zurich / London",
                rating: 5,
                text: "Checkmate Security's attention to international data laws gave us the confidence to centralize our screening. Their ability to navigate diverse regulatory landscapes, from GDPR in Europe to local laws in Asia, saved us months of internal legal work.",
                highlight: "Global Compliance",
                industry: "Finance",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
            },
            {
                name: "Sarah Jenkins",
                role: "Head of Talent Acquisition",
                company: "Innovate Tech",
                companyType: "Technology",
                location: "San Francisco",
                rating: 5,
                text: "Fast, accurate, and incredibly responsive. They helped us scale our engineering team by verifying degrees and employment across four continents. The dashboard is intuitive, and their support team operates 24/7.",
                highlight: "International Scale",
                industry: "Technology",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
            },
            {
                name: "Andreas Schmidt",
                role: "Chief Legal Officer",
                company: "AutoMotion Group",
                companyType: "Automotive",
                location: "Munich",
                rating: 5,
                text: "Navigating Works Council requirements in Germany while maintaining global standards was a challenge until we partnered with them. Every check is documented with a clear lawful basis, making audits simple.",
                highlight: "Legal Precision",
                industry: "Automotive",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
            },
            {
                name: "Dr. Elena Rossi",
                role: "Compliance & Risk Lead",
                company: "PharmaGlobal",
                companyType: "Pharmaceuticals",
                location: "Milan",
                rating: 5,
                text: "Checkmate Security provides the depth of due diligence we require for executive hires. Their investigative research goes beyond simple database checks, providing real integrity insights we can trust.",
                highlight: "Executive Vetting",
                industry: "Pharmaceuticals",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
            },
            {
                name: "Michael Chen",
                role: "VP of People Operations",
                company: "LogisticsWorld",
                companyType: "Logistics",
                location: "Singapore",
                rating: 5,
                text: "Checkmate's automated API integration allowed us to cut our time-to-hire by 40% while maintaining strict background checks. Their support for multiple languages makes candidate communication seamless.",
                highlight: "Speed & Tech",
                industry: "Logistics",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop"
            },
            {
                name: "Lisa Fischer",
                role: "Founder",
                company: "NextGen Startups",
                companyType: "Venture Capital",
                location: "Berlin",
                rating: 5,
                text: "As we expand into new markets, we need a partner who understands local nuances. Checkmate offers that expertise. They don't just sell data; they provide advice on what is legally permissible to ask in each new country we enter.",
                highlight: "Strategic Partnership",
                industry: "Venture Capital",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
            }
        ];
        await Testimonial.insertMany(testimonials);
        console.log('Testimonials seeded.');

        // --- Global Settings ---
        const settings = [
            { key: 'site_name', value: 'Checkmate Security', group: 'general' },
            { key: 'contact_email', value: 'info@checkmatesis.com', group: 'contact' },
            { key: 'contact_phone', value: '+216 XX XXX XXX', group: 'contact' },
            { key: 'support_hours', value: '24/7 Global Support', group: 'contact' },
            { key: 'address_hq', value: 'International Financial District', group: 'contact' },
            { key: 'social_linkedin', value: 'https://linkedin.com/company/checkmate', group: 'social' },
            { key: 'hero_title_home', value: 'Pre-Employment Due Diligence & Smart Hiring', group: 'marketing' }
        ];
        await GlobalSetting.insertMany(settings);
        console.log('Global Settings seeded.');

        console.log('--- SEEDING COMPLETE ---');
        process.exit();

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
