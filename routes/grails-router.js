const express = require('express');
const router = express.Router();
const grailsController = require('../controllers/grails-controller');

router.get('/grails', grailsController.index);

module.exports = router;