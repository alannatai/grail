const User = require('../models/user');

function index(req, res, next) {
  res.render('grails/index', {
    title: 'Grail',
    user: req.user,
    name: req.query.name
  })
}

module.exports = {
  index
};