const Grail = require('../models/grail');
const Category = require('../models/category');

function addGrail(req, res, next) {
  console.log('req.body', req.body)
  Grail.create({grail: req.body.grail}, function(err, grail) {
    grail.user.push(req.user);
    Category.create({category: req.body.category}, function(err, category) {
      category.grails.push(grail);
      category.save(function(err) {
        grail.category = category;
        grail.save(function(err) {
          req.user.grails.push(grail);
          req.user.save(function(err) {
            res.redirect('/grails');
          })
        })
      })
    })
  })
};

module.exports = {
  addGrail
};