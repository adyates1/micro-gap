var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nodemailer = require('nodemailer');

const port = process.env.PORT || '80';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Microgaptravel@gmail.com',
        pass: 'Startupweekend06!'
    }
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/style.css', function (req, res) {
    res.sendFile(__dirname + "/public/stylesheets/style.css");
});
app.get('/public/images/banner.jpg', function (req, res) {
    res.sendFile(__dirname + "/public/images/banner.jpg");
});

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('new request', function (request) {

        var mailOptions = {
            from: 'Microgaptravel@gmail.com',
            to: 'Microgaptravel@gmail.com',
            subject: 'New Request From ' + request.userName,
            html: ('<h1>New Request From ' + request.userName + '</h1>' +
                '<p>Travel point: ' + request.travelPoint +
                '<br>Break options:<ul>' +
                '<li>City Break: '+request.breakOptions.cityBreak+'</li>' +
                '<li>Beach Break: '+request.breakOptions.beachBreak+'</li>' +
                '<li>Adventure Break: '+request.breakOptions.adventureBreak+'</li>' +
                '</ul>'+
                'Weekend date: ' + request.weekendDate +'<br>'+
                'Budget: ' + request.budget +
                '</p><br><p>Contact them: '+request.userEmail+ '</p>')
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
