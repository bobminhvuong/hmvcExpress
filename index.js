var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var indexRouter = require('./modules/home/router');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'modules/home/views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(function (req, res, next) {
    next(createError(404));
});

app.listen(3000);
console.log('serve is listening port ' + 3000);