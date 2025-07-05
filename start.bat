@echo off
echo Starting Movie Ticket Booking System...
echo.

echo Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath \"D:\movies ticket\data\db\""

echo Waiting for MongoDB to start...
timeout /t 3 /nobreak > nul

echo Starting Node.js Server...
start "Node.js Server" cmd /k "cd /d \"D:\movies ticket\" && node model/server.js"

echo.
echo Application is starting...
echo MongoDB will be available at: mongodb://localhost:27017
echo Web application will be available at: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul 