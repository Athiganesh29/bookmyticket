# Movie Ticket Booking System

A full-stack web application for booking movie tickets with admin and user interfaces.

## Features

- **User Features:**

  - Browse available movies
  - View movie details (title, genre, rating, showtimes)
  - Book tickets with seat selection
  - View booking history
  - User authentication

- **Admin Features:**
  - Add new movies with complete details
  - View all movies in the system
  - Manage movie information
  - Admin authentication

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (version 4.0 or higher)
- npm (comes with Node.js)

## Installation

1. **Clone or download the project**

   ```bash
   cd "D:\movies ticket"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create MongoDB data directory**
   ```bash
   mkdir -p "D:\movies ticket\data\db"
   ```

## Running the Application

### Option 1: Using the batch file (Recommended)

Simply double-click `start.bat` to start both MongoDB and the Node.js server.

### Option 2: Manual startup

1. **Start MongoDB**

   ```bash
   mongod --dbpath "D:\movies ticket\data\db"
   ```

2. **Start the Node.js server** (in a new terminal)

   ```bash
   node model/server.js
   ```

3. **Access the application**
   - Open your browser and go to: `http://localhost:3000`
   - Admin dashboard: `http://localhost:3000/model/admindashboard.html`

## Usage

### For Users:

1. Go to `http://localhost:3000`
2. Register or login
3. Browse available movies
4. Click "Book Now" on any movie
5. Select showtime and seats
6. Complete your booking

### For Admins:

1. Go to `http://localhost:3000/model/admindashboard.html`
2. Login with admin credentials
3. Add new movies with:
   - Title
   - Genre
   - Rating (1-5)
   - Poster URL
   - Description
   - Showtimes (comma-separated)
4. View all movies in the system

## File Structure

```
movies ticket/
├── model/
│   ├── server.js          # Main server file
│   ├── movies.js          # Movie schema
│   ├── users.js           # User schema
│   ├── bookings.js        # Booking schema
│   ├── admins.js          # Admin schema
│   └── admindashboard.html # Admin interface
├── main.html              # User home page
├── login.html             # Login page
├── booking.html           # Booking interface
├── ticket.html            # Ticket display
├── package.json           # Dependencies
└── start.bat             # Startup script
```

## API Endpoints

- `GET /api/movies` - Get all movies
- `POST /api/movies` - Add new movie (admin only)
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/admins/login` - Admin login
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:userEmail` - Get user bookings

## Troubleshooting

### MongoDB Connection Issues:

- Ensure MongoDB is installed and in your PATH
- Check that the data directory exists: `D:\movies ticket\data\db`
- Verify MongoDB is running on port 27017

### Server Issues:

- Check that all dependencies are installed: `npm install`
- Ensure port 3000 is not in use by another application
- Check console logs for error messages

### Movie Creation Issues:

- Ensure all required fields are filled in the admin form
- Check that rating is a number between 1-5
- Verify showtimes are comma-separated

## Recent Fixes

- ✅ Fixed MongoDB driver deprecation warnings
- ✅ Fixed duplicate schema index warnings
- ✅ Fixed movie genre and rating display issues
- ✅ Improved movie creation with proper validation
- ✅ Added debugging for better error tracking
- ✅ Created easy startup script

## Support

If you encounter any issues:

1. Check the console logs for error messages
2. Ensure all prerequisites are installed
3. Verify MongoDB is running
4. Check that all required fields are filled when adding movies
