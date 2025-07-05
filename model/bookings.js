const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    movieTitle: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    ticketNumber: {
        type: String,
        unique: true,
        default: function() {
            return 'TIX' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
        }
    }
}, {
    timestamps: true
});

// Create indexes for better performance
bookingSchema.index({ userEmail: 1 });
bookingSchema.index({ movieId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ bookingDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema); 