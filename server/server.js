const express = require('express');
const http = require('http'); 
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})


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

function getRandomUsername() {
    const filePath = path.join(__dirname, 'usernames.txt');
    const usernames = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
    const randomIndex = Math.floor(Math.random() * usernames.length);
    return usernames[randomIndex];
}

app.get('/generateUsername', (req, res) => {
    const username = getRandomUsername(); 
    res.json({username})
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Socket.IO logic goes here
io.on('connection', (socket) => {
    console.log(socket.id + ' connected');

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected'); 
    })

    socket.on('message', ({username, message}) => {
        console.log(username + ': ' + message);
        io.emit('message', {username, message});
    })
});
