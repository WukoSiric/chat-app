const express = require('express');
const http = require('http'); 
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server); // Attach Socket.IO to the HTTP server


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log(`Connecting to database at ${process.env.MONGO_URI}`.substring(0, 50) + '...');
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => { 
        console.log('Connected to database');
    })
    .catch((err) => { 
        console.error(`Error connecting to the database. \n${err}`);
    });

// Example API Route
app.get('/api', (req, res) => {
    res.send('Hello from the backend!');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Socket.IO logic goes here
io.on('connection', (socket) => {
    console.log('a user connected');
});
