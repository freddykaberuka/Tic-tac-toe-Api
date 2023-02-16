var express = require('express');
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('gaming app');
});
app.listen(port, function () {
    console.log("server is listening at http://localhost:".concat(port));
});
