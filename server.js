const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve the client-side HTML file
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Event handler for a new client connection
io.on('connection', function(socket) {
  console.log('A user connected');

  // Event handler for receiving chat messages from a client
  socket.on('chatMessage', function(message) {
    io.emit('chatMessage', message); // Broadcast the message to all connected clients
  });

  // Event handler for a client disconnection
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(3001, function() {
  console.log('Server listening on port 3001');
});

