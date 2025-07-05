const mongoose = require('mongoose');
const Movie = require('./movies');

// Sample movie data
const moviesData = [
    {
        title: "RETRO",
        genre: "Action, Adventure, Drama",
        rating: 4.8,
        poster: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/retro-et00426563-1735202760.jpg",
        showtimes: ["10:00 AM", "2:30 PM", "7:00 PM", "10:30 PM"],
        description: "A thrilling action-packed adventure that takes you on a journey through time.",
        duration: "2h 15m"
    },
    {
        title: "THUG LIFE",
        genre: "Action, Adventure, Drama",
        rating: 4.7,
        poster: "https://images.herzindagi.info/image/2023/Nov/thug-life-movie-poster.jpg",
        showtimes: ["11:00 AM", "3:30 PM", "8:00 PM"],
        description: "An intense drama about life on the streets and the choices we make.",
        duration: "2h 30m"
    },
    {
        title: "INTERSTELLAR",
        genre: "Action, Crime, Drama",
        rating: 4.6,
        poster: "https://tse1.mm.bing.net/th/id/OIP.IuuohBMqKkT8LCNUWL4W3QHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        showtimes: ["12:00 PM", "4:30 PM", "9:00 PM"],
        description: "A mind-bending journey through space and time.",
        duration: "2h 49m"
    },
    {
        title: "KUBERA",
        genre: "Action, Adventure, Drama",
        rating: 4.5,
        poster: "https://tse4.mm.bing.net/th/id/OIP.HSDKY-9z8X33kaTVv_Yn5wAAAA?r=0&w=265&h=375&rs=1&pid=ImgDetMain&o=7&rm=3",
        showtimes: ["1:00 PM", "5:30 PM", "9:30 PM"],
        description: "An epic adventure filled with action and drama.",
        duration: "2h 20m"
    },
    {
        title: "Top Gun: Maverick",
        genre: "Action, Drama",
        rating: 4.9,
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
        showtimes: ["10:30 AM", "2:00 PM", "6:30 PM", "10:00 PM"],
        description: "The long-awaited sequel to the classic Top Gun, featuring high-flying action and drama.",
        duration: "2h 11m"
    },
    {
        title: "Jurassic World: Dominion",
        genre: "Action, Adventure, Sci-Fi",
        rating: 4.3,
        poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
        showtimes: ["11:30 AM", "3:00 PM", "7:30 PM"],
        description: "The epic conclusion to the Jurassic World trilogy.",
        duration: "2h 27m"
    }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movie_tickets')
.then(async () => {
    console.log('Connected to MongoDB at mongodb://localhost:27017/movie_tickets');
    
    try {
        // Clear existing movies
        await Movie.deleteMany({});
        console.log('Cleared existing movies');
        
        // Insert new movies
        const movies = await Movie.insertMany(moviesData);
        console.log(`Successfully seeded ${movies.length} movies`);
        
        // Display the seeded movies
        movies.forEach(movie => {
            console.log(`- ${movie.title} (${movie.genre})`);
        });
        
        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
})
.catch(err => {
    console.error('MongoDB connection error:', err);
}); 