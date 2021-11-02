const errorHandler = require("./utility/error.handler");
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const app = express();
const port = 3000

const fileRouter = require("./routes/file");
const MongoDbService = require('./services/db/');

const FileService = require("./services/file.service");
const FileUploadService = require("./services/file.upload.service");


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the File Upload Service');
});

const mongoService = new MongoDbService("files");

app.use("/file", fileRouter(new FileService(mongoService), new FileUploadService(mongoService)));

app.use(function(req, res, next) {
    next(errorHandler(res, {code: 404, message: "Page not Found"}));
});

//STARTUP
var server = http.createServer(app);

server.listen(port);
server.on('listening', onListening);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

module.exports = server;