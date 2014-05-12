/* global describe, it, before, beforeEach, after, afterEach, module, console, setTimeout, require, __dirname  */
'use strict';

/**
 * Module dependencies.
 */
// set up ========================
// create our app w/ express
var express = require('express'),
    fs = require('fs'),
    _ = require('underscore'),
    io = require('socket.io'),
    mongoose = require('mongoose'),
    app = express();

// define model =================
var Todo = mongoose.model('Todo', {
    text: String
});
// configuration =================

mongoose.connect('mongodb://127.0.0.1/mokklook'); 	// connect to mongoDB database on modulus.io


app.configure(function () {
    app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 						// log every request to the console
//    app.use(express.bodyParser());
    app.use(express.urlencoded());                          // pull information from html in POST
    app.use(express.json());
    app.use(express.methodOverride()); 						// simulate DELETE and PUT
    app.use(require('prerender-node'));                     //Allow your Javascript apps to be crawled perfectly by search engines.

});

// Express routes
require('./app/routes.js')(app);


// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");

