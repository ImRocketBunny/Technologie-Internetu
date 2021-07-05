var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const gameRouter = require('./routes/gameRoute');
const platformRouter = require('./routes/platformRoute');
const releaseRouter = require('./routes/releaseRoute');
const gameApiRouter = require('./routes/api/GameApiRoute');
const platformApiRouter = require('./routes/api/PlatformApiRoute');
const releaseApiRouter = require('./routes/api/ReleaseApiRoute');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/game', gameRouter);
app.use('/platform',platformRouter);
app.use('/release', releaseRouter);
app.use('/api/games', gameApiRouter);
app.use('/api/platforms', platformApiRouter);
app.use('/api/releases', releaseApiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  //console.log(err.message);
});

module.exports = app;
