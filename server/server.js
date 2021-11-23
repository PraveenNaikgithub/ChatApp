const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');
app.use(cors());

const botName = 'ChatCord Bot';

//Run when a client connects
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ name, room }) => {
    const user = userJoin(socket.id, name, room);
    socket.join(user.room);
    //Welcome current User
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord'));

    //Brodacast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`),
        user.username
      );
  });

  //Listen for chat message
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('servermessage', formatMessage(user.username, msg));
  });

  //This runs when a user disconnects
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'A user has left the chat'));
  });
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
