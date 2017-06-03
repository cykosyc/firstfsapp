"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var opn = require("opn");
// import API from backend
var cars_1 = require("./routes/api/cars");
var app = express();
var port = 8080;
var path = require('path');
var connection_string = 'mongodb://nick:98765@ds161159.mlab.com:61159/sampledb_ns';
mongoose.connect(connection_string).then(function () {
    console.log('Successful connection made to ' + connection_string);
})["catch"](function (err) {
    console.log(connection_string + ' cannot be resolved');
});
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./www/'));
// mount api
app.use('/v1/api/cars', cars_1["default"]);
app.get('/', function (req, res) {
    res.sendfile(path.resolve('www/views/index.html'));
});
app.get('*', function (req, res) {
    res.sendfile(path.resolve('www/views/404.html'));
});
app.listen(port, function () {
    console.log('listening on port ' + port);
    opn('http://localhost:' + port);
});
