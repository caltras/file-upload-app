const errorHandler = require("./utility/error.handler");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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
app.listen(port, () => {
  console.log(`File Upload Service listening at http://localhost:${port}`)
});

module.exports = app;