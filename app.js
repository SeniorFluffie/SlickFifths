const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const mongo = require('mongodb');
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');

// PAYPAL CONFIGURATION
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AQR01qkEucKZtMT8GeVw5FgCqSCwXILH2hK3U997jTqqqGSZhe_Q8NZTL6cIE-PUsCh950WqHaL_moky',
  'client_secret': 'ECa4l2l_s30Zl-J6wSaTl4u3Bq_BjnGLl0UllwP0JiPiD232HpMjR4Y1ewOqBXHsYsvwboaFgi3clmRe'
});

// SETUP DATABASE CONNECTION
mongoose.connect('mongodb://localhost/shoppingApp');
const db = mongoose.connection;

// LOAD WEBPAGES
const index = require('./routes/index');
const users = require('./routes/users');
const checkout = require('./routes/checkout');

// MOMENT CONFIGURATION -- FOR DATES
MomentHandler.registerHelpers(Handlebars);

// RUN SERVER
const app = express();

// SETUP VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

// SETUP EXPRESS MODULES
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// SET DIRECTORY
app.use(express.static(path.join(__dirname, 'public')));

// EXPRESS SESSION
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 120 * 60 * 1000} // 2 hours later experies the session
}));

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

// INITIALIZE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// EXPRESS VALIDATOR
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
    root          = namespace.shift(),
    formParam     = root;

    while(namespace.lenght)
      formParam += '[' + namespace.shift() + ']';

    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// FLASH CONFIGURATION (FOR MESSAGES)
app.use(flash());

// GLOBAL FLASH VARIABLES
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); // Pasport error message
  res.locals.user = req.user || null;
  next();
});

// GET WEBPAGES
app.use('/', index);
app.use('/users', users);
app.use('/checkout', checkout);

// CATCH 404 AND FORWARD ERROR
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
  // SET LOCALS, PROVIDING ERROR IN DEVELOPMENT
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // RENDER ERROR
  res.status(err.status || 500);
  res.render('error', {
    title: 'Something went wrong',
    customNavbar: 'registration-navbar',
    containerWrapper: 'container',
    errorStatus: err.status
  });
});

module.exports = app;
