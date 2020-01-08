const Grail = require('../models/grail');
const Category = require('../models/category');
const User = require('../models/user');

async function addGrail(req, res, next) {
  console.log('req.body', req.body)
  const existingCategory = await Category.findOne({ category: req.body.category }).select('_id').lean();
  const existingGrail= await Grail.findOne({ grail: req.body.grail, category: existingCategory }).select('_id').lean();
  const existingUser= await User.findOne({ googleId: req.user.googleId, grails: existingGrail }).select('_id').lean();

  if (existingCategory) {
   console.log('category exists', existingCategory)
   if(existingGrail) {
     console.log('grail exists', existingGrail)
     if(existingUser) {
       console.log('user exists', existingUser)
       res.send('User with this grail exists')
     } else {
       Grail.findById(existingGrail, function(err, grail) {
         grail.users.push(req.user);
         grail.save(function(err) {
           req.user.grails.push(grail);
           req.user.save(function(err) {
             res.redirect('/grails');
           })
         })
       })
     }
   } else {
     Grail.create({ grail: req.body.grail }, function(err, grail) {
       grail.users.push(req.user);
       Category.findById(existingCategory, function(err, category) {
         category.grails.push(grail);
         grail.category = category;
         req.user.grails.push(grail);
         grail.save(function(err) {
           category.save(function(err) {
             req.user.save(function(err){
              res.redirect('/grails');
             })
           })
         })
       })
     })
   }
  } else {
    Grail.create({grail: req.body.grail}, function(err, grail) {
      grail.users.push(req.user);
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
  }
}

module.exports = {
  addGrail
};