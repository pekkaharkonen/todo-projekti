var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require ('fs'); //


//var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks'); //

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//tasks = []; //

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 fs.readFile("tasks.json", (err, data) => {
   tasks = JSON.parse(data); //
 });

//app.use('/', indexRouter);
app.use('/api/tasks', tasksRouter); //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handlergit
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
