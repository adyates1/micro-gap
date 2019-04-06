var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/public/stylesheets/style.css");
});
app.get('/public/images/banner.jpg', function(req, res) {
  res.sendFile(__dirname + "/public/images/banner.jpg");
});

io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('new request', function(request){
    console.log('Client Input: ' + msg);
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
