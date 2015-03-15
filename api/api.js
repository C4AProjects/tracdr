/**
 * Created by haythem on 12/03/2015.
 */
var API = {}
var config;
var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/users');
//var device = require('./routes/devices');
/*var company = require('./routes/company');
 var fleet = require('./routes/fleet');*/

var path = require('path');

var favicon = require('serve-favicon');
var  expressJwt = require('express-jwt');
 jwt = require('jsonwebtoken');
secret="trackDr@2015"
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var compress = require('compression');
var app = express();
app.use(methodOverride());
/*app.use(session({ resave: true,
    saveUninitialized: true,
    secret: 'trackDR@2015' }));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static("website"));
app.use(compress());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/secured', expressJwt({secret:  secret}));
app.use(function(err, req, res, next){
    if (err.constructor.name === 'UnauthorizedError') {
        res.send(401, 'Unauthorized');
    }
});

app.get('/', function(req, res){
    res.sendfile("website/index.html");
});

app.get('/api', function(req, res){
    res.send("trackDr Api v1.0");
});


INFO("Loading Auth Route")
require('./route/authRoute')(app)


INFO("Loading Dorctor Route")
require('./route/doctorRoute')(app)

INFO("Loading Patient Route")
require('./route/patientRoute')(app)

INFO("Loading Notification Route")
require('./route/notificationRoute')(app)

INFO("Loading Appointment Route")
require('./route/appointmentRoute')(app)

app.listen(4000, function(){
    INFO('listening on *:4000');
});


module.exports = API;