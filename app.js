var express = require('express')
var app = express()
const port = 3000
var players = [];

app.use(express.static('views'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/', function(req, res) {
  obj = {
    'id': req.body.id,
    'x': req.body.x,
    'y': req.body.y
  }
  flag = false;
  for (var i = 0; i < players.length; i++) {
    // if player exists
    if(players.length > 0){
      if(players[i].id === req.body.id){
        players[i].x = req.body.x;
        players[i].y = req.body.y;
        flag = true;
      }
    }
  }
  // if player doesn't exists
  if(!flag){
    players[players.length] = req.body;
  }
  console.log(players.length);
  res.send(players);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
