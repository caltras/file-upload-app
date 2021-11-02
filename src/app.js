const errorHandler = require("./utility/error.handler");
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const app = express();
const port = 3000

const fileRouter = require("./routes/file");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the File Upload Service');
});

app.use("/file", fileRouter);

app.use(function(req, res, next) {
    next(errorHandler(res, {code: 404, message: "Page not Found"}));
});

//STARTUP
// app.listen(() => {
//   console.log(`File Upload Service listening at http://localhost:${port}`)
// });
var server = http.createServer(app);

server.listen();
server.on('listening', onListening);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

module.exports = app;