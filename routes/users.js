var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Get login page
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login', bodyClass: 'registration'});
});

// GET sign in page
router.get('/signIn', function(req, res) {
  res.render('signIn', { title: 'signIn', bodyClass: 'registration'});
});

// POST sign in page
router.post('/signIn', function(req, res, next) {
  var username        = req.body.emailField;
  var fullName        = req.body.fullNameField;
  var password        = req.body.passwordField;
  var password        = req.body.passwordField;
  var verifyPassword  = req.body.verifyPasswordField;

  req.checkBody('fullNameField', 'Full name is required').notEmpty();
  req.checkBody('emailField', 'Email is required').notEmpty();
  req.checkBody('emailField', 'Email is not valid').isEmail();
  req.checkBody('passwordField', 'Password is required').notEmpty();
  req.checkBody('passwordField', 'Passwords have to match').equals(req.body.verifyPasswordField);

  var errors = req.validationErrors();
  if (errors) {
    res.render('signIn', {
      errors:errors,
      title: 'Sign In',
      bodyClass: 'registration'
    });
  } else {
    var newUser = new User({
      username    : username,
      password    : password,
      fullname    : fullName
    });

    User.createUser(newUser, function(err, user) {
      if(err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and you can login');
    res.redirect('/users/login');

    console.log("User created with following information")
    console.log("Username", username);
    console.log("Password", password);
    console.log("Verify Password", verifyPassword);
  }
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.getUserByUsername(username, function(err, user) {
    if(err) throw err;
    if(!user)
    return done(null, false, {message: 'Unknown User'});

    User.comparePassword(password, user.password, function(err, isMatch) {
      if(err) throw err;
      if(isMatch)
      return done(null, user);
      else
      return done(null, false, {message: 'Invalid password'});
    });
  });
}));

// SERIALIZE USER
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// DESERIALIZE USER
passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// LOG-IN POST REQUEST
router.post('/login',
passport.authenticate('local',{successRedirect:'/', failureRedirect: '/users/login', failureFlash: true}),
function(req, res) {
  res.redirect('/');
});

// LOG-OUT POST REQUEST
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
})

module.exports = router;
