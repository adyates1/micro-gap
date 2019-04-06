var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/public/stylesheets/style.css");
});

io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('client-input', function(msg){
    console.log('Client Input: ' + msg);
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});