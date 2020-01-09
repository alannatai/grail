const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');
const grailsController = require('../controllers/users-controller');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
};

router.post('/add-grail', isLoggedIn, usersController.addGrail);
router.post('/api/add-grail', isLoggedIn, usersController.addGrailApi);

router.put('/user/profile/:id', usersController.updateProfile);
router.get('/user/:id', usersController.show);

router.delete('/user/grails/:id', usersController.deleteGrailPost);

router.delete('/user/grail/:id', usersController.deleteGrail);
router.delete('/api/user/grail/:id', usersController.deleteGrailApi);

module.exports = router;