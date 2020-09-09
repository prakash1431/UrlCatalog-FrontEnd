var express = require('express');
var app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/UrlCatalog-FrontEnd'));

app.listen(process.env.PORT || 5000);

//path location strategy

app.get('/*', function (req, resp) {
    resp.sendFile(path.join(__dirname + '/dist/index.html'));
});

console.log('listening to port');
