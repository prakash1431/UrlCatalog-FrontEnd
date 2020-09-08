const concurrently = require('concurrently');
const port = process.env.PORT || 4200;
var express = require('express');
var app = express();

concurrently(
    [
        {
            command: `npm run ng -- serve --port ${port} --open`,
            name: 'NG_SERVE',
            prefixColor: 'bgBlue.bold',
        },
    ],
    {
        prefix: 'name',
        killOthers: ['failure', 'success'],
    }
).then(success, failure);

function success() {
    console.log('Success');
}

function failure() {
    console.log('Failure');
}
//To run instance on port 4200 on Heroku cloud server
app.set(port);

//For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'App is running';
    response.send(result);
}).listen(app.get(port), function () {
    console.log('App is running, server is listening on port ', app.get(port));
});
