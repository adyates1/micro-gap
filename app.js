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
                'Availability: ' + request.availiability +'<br>'+
                'Budget: ' + request.budget +
                '</p><br><p>Contact them: '+request.userEmail+ '</p>')
        };
        var weekletterOptions = {
            from: 'Microgaptravel@gmail.com',
            to: request.userEmail,
            subject: "Your microgap request has been received!",
            html: ('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
                '<html xmlns:v="urn:schemas-microsoft-com:vml">\n' +
                '\n' +
                '<head>\n' +
                '  <meta http-equiv="content-type" content="text/html; charset=UTF-8">\n' +
                '  <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">\n' +
                '  <meta name="viewport" content="width=600,initial-scale = 2.3,user-scalable=no">\n' +
                '  <!--[if !mso]><!-->\n' +
                '  <link href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700" rel="stylesheet">\n' +
                '  <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,700" rel="stylesheet">\n' +
                '  <!--<![endif]-->\n' +
                '  <title>microgap.net</title>\n' +
                '  <!--[if gte mso 9]>\n' +
                '    <style>\n' +
                '      body {\n' +
                '      font-family:arial,sans-serif !important;\n' +
                '      }\n' +
                '    </style>\n' +
                '    <![endif]-->\n' +
                '\n' +
                '  <style type="text/css">\n' +
                '    body {\n' +
                '      width: 100%;\n' +
                '      background-color: #ffffff;\n' +
                '      margin: 0;\n' +
                '      padding: 0;\n' +
                '      -webkit-font-smoothing: antialiased;\n' +
                '      mso-margin-top-alt: 0;\n' +
                '      mso-margin-bottom-alt: 0;\n' +
                '      mso-padding-alt: 0 0 0 0;\n' +
                '    }\n' +
                '\n' +
                '    p,\n' +
                '    h1,\n' +
                '    h2,\n' +
                '    h3,\n' +
                '    h4 {\n' +
                '      margin-top: 0;\n' +
                '      margin-bottom: 0;\n' +
                '      padding-top: 0;\n' +
                '      padding-bottom: 0;\n' +
                '    }\n' +
                '\n' +
                '    span.preheader {\n' +
                '      display: none;\n' +
                '      font-size: 1px;\n' +
                '    }\n' +
                '\n' +
                '    html {\n' +
                '      width: 100%;\n' +
                '    }\n' +
                '\n' +
                '    table {\n' +
                '      font-size: 14px;\n' +
                '      border: 0;\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .main-header {\n' +
                '        font-size: 20px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .main-section-header {\n' +
                '        font-size: 28px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .show {\n' +
                '        display: block !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .hide {\n' +
                '        display: none !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .align-center {\n' +
                '        text-align: center !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .no-bg {\n' +
                '        background: none !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .main-image img {\n' +
                '        width: 440px !important;\n' +
                '        height: auto !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .divider img {\n' +
                '        width: 440px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .container590 {\n' +
                '        width: 440px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .container580 {\n' +
                '        width: 400px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .main-button {\n' +
                '        width: 220px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .section-img img {\n' +
                '        width: 320px !important;\n' +
                '        height: auto !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 640px) {\n' +
                '      .team-img img {\n' +
                '        width: 100% !important;\n' +
                '        height: auto !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 479px) {\n' +
                '      .main-header {\n' +
                '        font-size: 18px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 479px) {\n' +
                '      .main-section-header {\n' +
                '        font-size: 26px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 479px) {\n' +
                '      .divider img {\n' +
                '        width: 280px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 479px) {\n' +
                '      .container590 {\n' +
                '        width: 280px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 479px) {\n' +
                '      .container590 {\n' +
                '        width: 280px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 479px) {\n' +
                '      .container580 {\n' +
                '        width: 260px !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '    @media only screen and (max-width: 479px) {\n' +
                '      .section-img img {\n' +
                '        width: 280px !important;\n' +
                '        height: auto !important;\n' +
                '      }\n' +
                '\n' +
                '    }\n' +
                '\n' +
                '  </style>\n' +
                '</head>\n' +
                '\n' +
                '<body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">\n' +
                '  <!-- pre-header -->\n' +
                '  <table style="display:none !important;">\n' +
                '    <tr>\n' +
                '      <td>\n' +
                '        <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;max-width:0px;opacity:0;">\n' +
                '          Your weekly travel newsletter, made speciall and only for you.\n' +
                '        </div>\n' +
                '      </td>\n' +
                '    </tr>\n' +
                '  </table>\n' +
                '  <!-- pre-header end -->\n' +
                '  <!-- header -->\n' +
                '  <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff">\n' +
                '    <tr>\n' +
                '      <td align="center">\n' +
                '        <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">\n' +
                '          <tr>\n' +
                '            <td height="25" style="font-size:25px;line-height:25px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="left">\n' +
                '              <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">\n' +
                '                <tr>\n' +
                '                  <td align="left" height="100" style="height:70px;">\n' +
                '                    <a href="https://microgap.net" style="display:block;border-style:none !important;border:0 !important;"><img border="0" style="display: block; width: 200px;" src="https://i.ibb.co/0y9SKS7/microgap-logo-black.png" alt=""></a>\n' +
                '                  </td>\n' +
                '                  <td align="right" style="color:#ff3366;font-size:24px;font-family:Quicksand, Calibri, sans-serif;font-weight:700;letter-spacing:3px;line-height:35px;" class="main-header">\n' +
                '                    <div style="line-height:50px;">\n' +
                '                      <span style="opacity: 0.9; ">weekly newsletter</span>\n' +
                '                    </div>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="25" style="font-size:25px;line-height:25px;"> </td>\n' +
                '          </tr>\n' +
                '        </table>\n' +
                '      </td>\n' +
                '    </tr>\n' +
                '  </table>\n' +
                '  <!-- end header -->\n' +
                ' <img src="'+request.profileUrl+'"> <h2>Hi '+request.userName+'</h2>' +
                '  <!-- big image section -->\n' +
                '  <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" class="bg_color">\n' +
                '    <tr>\n' +
                '      <td align="center">\n' +
                '        <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">\n' +
                '          <tr>\n' +
                '            <td align="center" class="section-img">\n' +
                '              <a href="https://microgap.net" style="border-style:none !important;display:block;border:0 !important;"><img src="https://i.ibb.co/3ytRsnY/i-Stock-000025412524-XXLarge-1.jpg" style="display: block; width: 590px;" width="590" border="0"\n' +
                '                  alt=""></a>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="20" style="font-size:20px;line-height:20px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center" style="color:#343434;font-size:24px;font-family:Quicksand, Calibri, sans-serif;font-weight:700;letter-spacing:3px;line-height:35px;" class="main-header">\n' +
                '              <div style="line-height:35px;">\n' +
                '                Your personalised <span style="color: #2ec4b6;">weekly</span> life\n' +
                '              </div>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center">\n' +
                '              <table border="0" width="40" align="center" cellpadding="0" cellspacing="0" bgcolor="#eeeeee">\n' +
                '                <tr>\n' +
                '                  <td height="2" style="font-size:2px;line-height:2px;"> </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="20" style="font-size:20px;line-height:20px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center">\n' +
                '              <table border="0" width="400" align="center" cellpadding="0" cellspacing="0" class="container590">\n' +
                '                <tr>\n' +
                '                  <td align="center" style="color:#888888;font-size:16px;font-family:\'Work Sans\', Calibri, sans-serif;line-height:24px;">\n' +
                '                    <div style="line-height:24px;">\n' +
                '                      Summer is comming and we got some amazing opportunities for your next weekend trip.\n' +
                '                    </div>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="25" style="font-size:25px;line-height:25px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center">\n' +
                '              <table border="0" align="center" width="160" cellpadding="0" cellspacing="0" bgcolor="#2ec4b6">\n' +
                '                <tr>\n' +
                '                  <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                  <td align="center" style="color:#ffffff;font-size:14px;font-family:\'Work Sans\', Calibri, sans-serif;line-height:26px;">\n' +
                '                    <div style="line-height:26px;">\n' +
                '                      <a href="http://microgap.net" style="color:#ffffff;text-decoration:none;">Travel now</a>\n' +
                '                    </div>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                  <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '        </table>\n' +
                '      </td>\n' +
                '    </tr>\n' +
                '  </table>\n' +
                '  <!-- end section -->\n' +
                '  <!-- ======= divider ======= -->\n' +
                '  <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff">\n' +
                '    <tr class="hide">\n' +
                '      <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <td height="50" style="font-size:50px;line-height:50px;"> </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <!-- ======= divider  ======= -->\n' +
                '      <td align="center" class="divider">\n' +
                '        <img height="1" width="590" border="0" style="display: block; width: 590px; height: 1px;" src="http://i.imgur.com/S6VbJRx.png" alt="">\n' +
                '      </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <td height="60" style="font-size:60px;line-height:60px;"> </td>\n' +
                '    </tr>\n' +
                '  </table>\n' +
                '  <!-- ======= end divider ======= -->\n' +
                '  <!-- big image section -->\n' +
                '  <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" class="bg_color">\n' +
                '    <tr>\n' +
                '      <td align="center">\n' +
                '        <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">\n' +
                '          <tr>\n' +
                '            <td align="center" class="section-img">\n' +
                '              <a href="https://microgap.net" style="border-style:none !important;display:block;border:0 !important;"><img src="https://i.ibb.co/z4byGbV/i-Stock-585173962.jpg" style="display: block; width: 590px;" width="590" border="0" alt=""></a>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="20" style="font-size:20px;line-height:20px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center" style="color:#343434;font-size:24px;font-family:Quicksand, Calibri, sans-serif;font-weight:700;letter-spacing:3px;line-height:35px;" class="main-header">\n' +
                '              <div style="line-height:35px;">\n' +
                '                <span style="color: #2ec4b6;">ITALY</span>\n' +
                '              </div>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center">\n' +
                '              <table border="0" width="40" align="center" cellpadding="0" cellspacing="0" bgcolor="#eeeeee">\n' +
                '                <tr>\n' +
                '                  <td height="2" style="font-size:2px;line-height:2px;"> </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="20" style="font-size:20px;line-height:20px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center">\n' +
                '              <table border="0" width="400" align="center" cellpadding="0" cellspacing="0" class="container590">\n' +
                '                <tr>\n' +
                '                  <td align="center" style="color:#888888;font-size:16px;font-family:\'Work Sans\', Calibri, sans-serif;line-height:24px;">\n' +
                '                    <div style="line-height:24px;">\n' +
                '                      Drink the best coffee in the world,\n' +
                '                      <br> just a weekend away of you.\n' +
                '                      <br>\n' +
                '                    </div>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="25" style="font-size:25px;line-height:25px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center">\n' +
                '              <table border="0" align="center" width="160" cellpadding="0" cellspacing="0" bgcolor="#2ec4b6">\n' +
                '                <tr>\n' +
                '                  <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                  <td align="center" style="color:#ffffff;font-size:14px;font-family:\'Work Sans\', Calibri, sans-serif;line-height:26px;">\n' +
                '                    <div style="line-height:26px;">\n' +
                '                      <a href="https://microgap.net" style="color:#ffffff;text-decoration:none;">TRAVEL NOW</a>\n' +
                '                    </div>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                  <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '        </table>\n' +
                '      </td>\n' +
                '    </tr>\n' +
                '  </table>\n' +
                '  <!-- end section -->\n' +
                '  <!-- ======= divider ======= -->\n' +
                '  <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff">\n' +
                '    <tr class="hide">\n' +
                '      <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <td height="50" style="font-size:50px;line-height:50px;"> </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <!-- ======= divider  ======= -->\n' +
                '      <td align="center" class="divider">\n' +
                '        <img height="1" width="590" border="0" style="display: block; width: 590px; height: 1px;" src="http://i.imgur.com/S6VbJRx.png" alt="">\n' +
                '      </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <td height="60" style="font-size:60px;line-height:60px;"> </td>\n' +
                '    </tr>\n' +
                '  </table>\n' +
                '  <!-- ======= end divider ======= -->\n' +
                '  <!-- big image section -->\n' +
                '  <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" class="bg_color">\n' +
                '    <tr>\n' +
                '      <td align="center">\n' +
                '        <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">\n' +
                '          <tr>\n' +
                '            <td align="center" class="section-img">\n' +
                '              <a href="https://microgap.net" style="border-style:none !important;display:block;border:0 !important;"><img src="https://i.ibb.co/x7YLfVt/i-Stock-1009129430.jpg" style="display: block; width: 590px;" width="590" border="0" alt=""></a>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="20" style="font-size:20px;line-height:20px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center" style="color:#343434;font-size:24px;font-family:Quicksand, Calibri, sans-serif;font-weight:700;letter-spacing:3px;line-height:35px;" class="main-header">\n' +
                '              <div style="line-height:35px;">\n' +
                '                <span style="color: #2ec4b6;">SPAIN</span>\n' +
                '              </div>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center">\n' +
                '              <table border="0" width="40" align="center" cellpadding="0" cellspacing="0" bgcolor="#eeeeee">\n' +
                '                <tr>\n' +
                '                  <td height="2" style="font-size:2px;line-height:2px;"> </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="20" style="font-size:20px;line-height:20px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center">\n' +
                '              <table border="0" width="400" align="center" cellpadding="0" cellspacing="0" class="container590">\n' +
                '                <tr>\n' +
                '                  <td align="center" style="color:#888888;font-size:16px;font-family:\'Work Sans\', Calibri, sans-serif;line-height:24px;">\n' +
                '                    <div style="line-height:24px;">\n' +
                '                      Meditate in the paradise,<br>just a weekend away from you.\n' +
                '\n' +
                '                    </div>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td height="25" style="font-size:25px;line-height:25px;"> </td>\n' +
                '          </tr>\n' +
                '          <tr>\n' +
                '            <td align="center">\n' +
                '              <table border="0" align="center" width="160" cellpadding="0" cellspacing="0" bgcolor="#2ec4b6">\n' +
                '                <tr>\n' +
                '                  <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                  <td align="center" style="color:#ffffff;font-size:14px;font-family:\'Work Sans\', Calibri, sans-serif;line-height:26px;">\n' +
                '                    <div style="line-height:26px;">\n' +
                '                      <a href="https://microgap.net" style="color:#ffffff;text-decoration:none;">TRAVEL NOW</a>\n' +
                '                    </div>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                  <td height="10" style="font-size:10px;line-height:10px;"> </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '        </table>\n' +
                '      </td>\n' +
                '    </tr>\n' +
                '  </table>\n' +
                '  <!-- end section -->\n' +
                '  <!-- contact section -->\n' +
                '  <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" class="bg_color">\n' +
                '    <tr class="hide">\n' +
                '      <td height="25" style="font-size:25px;line-height:25px;"> </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <td height="40" style="font-size:40px;line-height:40px;"> </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <td height="60" style="border-top:1px solid #e0e0e0;font-size:60px;line-height:60px;"> </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <td align="center">\n' +
                '        <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590 bg_color">\n' +
                '          <tr>\n' +
                '            <td>\n' +
                '              <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;" class="container590">\n' +
                '                <tr>\n' +
                '                  <!-- logo -->\n' +
                '                  <td align="left">\n' +
                '                    <a href="https://microgap.net" style="display:block;border-style:none !important;border:0 !important;"><img width="80" border="0" style="display: block; width: 150px;" src="https://i.ibb.co/0y9SKS7/microgap-logo-black.png" alt=""></a>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                  <td height="25" style="font-size:25px;line-height:25px;"> </td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                  <td align="left" style="color:#888888;font-size:14px;font-family:\'Work Sans\', Calibri, sans-serif;line-height:23px;" class="text_color">\n' +
                '                    <div style="color:#333333;font-size:14px;font-family:\'Work Sans\', Calibri, sans-serif;font-weight:600;mso-line-height-rule:exactly;line-height:23px;">\n' +
                '                      Email us: <br><a href="mailto:" style="color:#888888;font-size:14px;font-family:\'Hind Siliguri\', Calibri, \'Sans-serif\';font-weight:400;">microgaptravel@gmail.com</a>\n' +
                '                    </div>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '              <table border="0" width="2" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;" class="container590">\n' +
                '                <tr>\n' +
                '                  <td width="2" height="10" style="font-size:10px;line-height:10px;"></td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '              <table border="0" width="200" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;" class="container590">\n' +
                '                <tr>\n' +
                '                  <td class="hide" height="45" style="font-size:45px;line-height:45px;"> </td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                  <td height="15" style="font-size:15px;line-height:15px;"> </td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                  <td>\n' +
                '                    <table border="0" align="right" cellpadding="0" cellspacing="0">\n' +
                '                      <tr>\n' +
                '                        <td>\n' +
                '                          <a href="https://www.facebook.com/Microgap-414772229088549/" style="display:block;border-style:none !important;border:0 !important;"><img width="30" border="0" style="display: block;" src="https://i.imgur.com/PpXsPqR.png"\n' +
                '                              alt=""></a>\n' +
                '                        </td>\n' +
                '                        <td>    </td>\n' +
                '                        <td>\n' +
                '                          <a href="https://plus.google.com/u/0/b/107863090883699620484/107863090883699620484/posts" style="display:block;border-style:none !important;border:0 !important;"><img width="24" border="0" style="display: block;" src="https://i.imgur.com/rcPkXtU.png"\n' +
                '                              alt=""></a>\n' +
                '                        </td>\n' +
                '                      </tr>\n' +
                '                    </table>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '        </table>\n' +
                '      </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <td height="60" style="font-size:60px;line-height:60px;"> </td>\n' +
                '    </tr>\n' +
                '  </table>\n' +
                '  <!-- end section -->\n' +
                '  <!-- footer ====== -->\n' +
                '  <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4">\n' +
                '    <tr>\n' +
                '      <td height="25" style="font-size:25px;line-height:25px;"> </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <td align="center">\n' +
                '        <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">\n' +
                '          <tr>\n' +
                '            <td>\n' +
                '              <table border="0" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;" class="container590">\n' +
                '                <tr>\n' +
                '                  <td align="left" style="font-size:24;font-family:\'Work Sans\', Calibri, sans-serif;line-height:24px;">\n' +
                '                    <div style="line-height:24px;">\n' +
                '                      <span style="color: #2ec4b6;">EXPLORE EXPERIENCE RELAX</span>\n' +
                '                    </div>\n' +
                '                  </td>\n' +
                '                </tr>\n' +
                '              </table>\n' +
                '            </td>\n' +
                '          </tr>\n' +
                '        </table>\n' +
                '      </td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '      <td height="25" style="font-size:25px;line-height:25px;"> </td>\n' +
                '    </tr>\n' +
                '  </table>\n' +
                '  <!-- end footer ====== -->\n' +
                '</body>\n' +
                '\n' +
                '</html>')
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        transporter.sendMail(weekletterOptions, function (error, info) {
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
