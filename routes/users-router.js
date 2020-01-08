const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');
const grailsController = require('../controllers/users-controller');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
};

router.post('/add-grail', isLoggedIn, usersController.addGrail);

router.get('/grails/:id', usersController.show);

module.exports = router;