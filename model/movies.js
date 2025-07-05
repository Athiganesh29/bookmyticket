const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    poster: {
        type: String,
        required: true,
        trim: true
    },
    showtimes: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        default: ''
    },
    duration: {
        type: String,
        default: '2h 30m'
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create indexes for better performance
movieSchema.index({ title: 1 });
movieSchema.index({ genre: 1 });
movieSchema.index({ isActive: 1 });

module.exports = mongoose.model('Movie', movieSchema);
