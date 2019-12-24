const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google', {
    successRedirect: '/',
    failureRedirect: '/'
  }
))

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/students');
})

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Grail',
    user: req.user,
    name: req.query.name
  });
});

module.exports = router;
