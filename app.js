/**
 * Created by kalko on 20.02.17.
 */
var express = require('express'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser');

var server = require('http').Server(app);

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit:1000000}));

app.use(express.static(__dirname + '/public'));

var router = require('./router/router'),
    port = 9020;

console.log(new Date());

app.use('/', router);

server.listen(port);


console.info('Listening on port ' + (process.env.PORT || port) + '...\n');

