/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    logger = require('mean-logger'),
    _ = require('underscore'),
    io = require('socket.io');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    auth = require('./config/middlewares/authorization'),
    mongoose = require('mongoose');

//Bootstrap db connection
var db = mongoose.connect(config.db);

//Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

//bootstrap passport config
require('./config/passport')(passport);

var app = express();

//express settings
require('./config/express')(app, passport, db);

//Bootstrap routes
require('./config/routes')(app, passport, auth);

//Start the app by listening on <port>
var port = process.env.PORT || config.port;
//app.listen(port);
var io = require('socket.io').listen(app.listen(port));
console.log('Express app started on port ' + port);

//Initializing logger
logger.init(app, passport, mongoose);


// Initalize socket.io
var msg=['mandag','tirsdag','onsdag','torsdag','fredag','lørdag','søndag'];
io.sockets.on('connection', function (socket) {
    console.log('io.socket connection');
    socket.emit('message', { message: "I'm starting now..." });
    setInterval(function(){
//        msg=_.shuffle(msg);
        socket.emit('message',  { message: _.shuffle(msg)[0] });
    }, 1000);

});



//expose app
exports = module.exports = app;
