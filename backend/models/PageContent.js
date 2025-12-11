const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true, // e.g., 'home', 'about', 'services'
    },
    section: {
        type: String,
        required: true, // e.g., 'hero', 'mission', 'contact-info'
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true, // Can be a string, or an object with multiple fields (title, subtitle, text, etc.)
    },
}, {
    timestamps: true,
});

// Compound index to ensure unique section per page
pageContentSchema.index({ page: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('PageContent', pageContentSchema);
