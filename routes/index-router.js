const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.redirect('/grails');
});

router.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', 
  passport.authenticate('google', {
    successRedirect: '/grails',
    failureRedirect: '/grails'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
