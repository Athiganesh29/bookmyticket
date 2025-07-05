const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// MongoDB Connection - Use environment variable for production
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/movie_tickets';

mongoose.connect(MONGODB_URI)
.then(() => console.log(`Connected to MongoDB at ${MONGODB_URI}`))
.catch(err => console.error('MongoDB connection error:', err));

// Import models
const Movie = require('./movies');
const User = require('./users');
const Booking = require('./bookings');
const Admin = require('./admins');

// Routes

// Get all movies
app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get movie by ID
app.get('/api/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User registration
app.post('/api/users/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({
            fullName,
            email,
            password // In production, hash the password
        });

        const savedUser = await user.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User login
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password (in production, compare hashed passwords)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create session data
        const sessionData = {
            userId: user._id,
            email: user.email,
            fullName: user.fullName,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        };

        res.json({
            message: 'Login successful',
            session: sessionData,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin registration
app.post('/api/admins/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        // Create new admin
        const admin = new Admin({
            fullName,
            email,
            password // In production, hash the password
        });
        const savedAdmin = await admin.save();
        res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                id: savedAdmin._id,
                fullName: savedAdmin.fullName,
                email: savedAdmin.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin login
app.post('/api/admins/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password (in production, compare hashed passwords)
        if (admin.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Create session data
        const sessionData = {
            adminId: admin._id,
            email: admin.email,
            fullName: admin.fullName,
            role: 'admin',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        };
        res.json({
            message: 'Login successful',
            session: sessionData,
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
    try {
        const { movieId, movieTitle, date, time, seats, total, userEmail } = req.body;
        
        const booking = new Booking({
            movieId,
            movieTitle,
            date,
            time,
            seats,
            total,
            userEmail,
            status: 'confirmed'
        });

        const savedBooking = await booking.save();
        
        res.status(201).json({
            message: 'Booking created successfully',
            booking: savedBooking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user bookings
app.get('/api/bookings/:userEmail', async (req, res) => {
    try {
        const bookings = await Booking.find({ userEmail: req.params.userEmail });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all bookings (admin)
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('movieId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update booking status
app.patch('/api/bookings/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.json({
            message: 'Booking updated successfully',
            booking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete booking
app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin-only: Create a new movie
app.post('/api/movies', async (req, res) => {
    try {
        const { adminId, role, title, description, poster, showtimes, rating, genre } = req.body;
        if (!adminId || role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized: Admins only' });
        }
        // Backend validation
        if (!title || !poster || !showtimes || isNaN(parseFloat(rating)) || !genre) {
            return res.status(400).json({
                message: 'Missing or invalid required fields',
                received: { title, poster, showtimes, rating, genre }
            });
        }
        const movie = new Movie({
            title: title.trim(),
            description: description || '',
            poster: poster.trim(),
            genre: genre.trim(),
            rating: parseFloat(rating),
            showtimes: showtimes.split(',').map(s => s.trim()).filter(s => s.length > 0)
        });
        const savedMovie = await movie.save();
        res.status(201).json({
            message: 'Movie created successfully',
            movie: savedMovie
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'main.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'signin.html'));
});

app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'booking.html'));
});

app.get('/ticket', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'ticket.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
