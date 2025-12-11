const mongoose = require('mongoose');

const globalSettingSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed, // Can be string, number, boolean, or object
        required: true
    },
    description: {
        type: String
    },
    group: {
        type: String, // e.g., 'contact', 'social', 'seo'
        default: 'general'
    }
}, { timestamps: true });

module.exports = mongoose.model('GlobalSetting', globalSettingSchema);
