const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    companyType: {
        type: String
    },
    location: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String // URL
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    highlight: {
        type: String
    },
    industry: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
