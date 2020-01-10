const express = require('express');
const router = express.Router();
const grailsController = require('../controllers/grails-controller');

router.get('/grails', grailsController.index);

router.get('/grails', grailsController.getGrailTally);

module.exports = router;