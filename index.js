const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var players = [];

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user is connected : ' + socket.id);

  players[players.length] = {socketid : socket.id};

  // A player disconnect
  socket.on('disconnect', () => {
    for (var i = 0; i < players.length; i++) {
      console.log( "A user is disconnected : " + players[i].socketid);
      if(players[i].socketid === socket.id){
        // send a message to all players with the ID
        io.emit('del', players[i].id);
        // delete the player
        players.splice(i, 1);
      }
    }
  });

  // A player move his mouse
  socket.on('position', (msg) => {
    msg = JSON.parse(msg);

    // check if player exists to update data
    for (var i = 0; i < players.length; i++) {
      if(players.length > 0){
        if(players[i].socketid === socket.id){
          players[i].x = msg.x;
          players[i].y = msg.y;
          players[i].id = msg.id;
        }
      }
    }
    // Send the data to all players
    io.emit('move', players);
  });
});

server.listen(3000, () => {
  console.clear();
  console.log('          Started!        ');
  console.log('  Listening on port 3000  ');
});
