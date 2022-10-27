const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
// cors
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const indexRouter = require('./routes/index');        
const usersRouter = require('./routes/users');
const { send } = require('process');      

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));    // Not needed yet! --> dynamic react files
app.set('view engine', 'jade');

app.use(cors(corsOptions));

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tutor', require('./routes/tutor'));
app.use('/learners', require('./routes/learners'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.all('*', (req, res) => {
  res.status(404).send("<h1>404</h1>");
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
