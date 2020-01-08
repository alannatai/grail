const Grail = require('../models/grail');
const Category = require('../models/category');
const User = require('../models/user');

function show(req, res, next) {
  Category.find({}, function(err, categories) {
    Grail.find({}, function(err, grails) {
      User.findById(req.params.id)
      .populate({ 
        path: 'grails', 
        populate: { path: 'category' }
      })
      .exec(function(err, user) {
        let userCards = [];
          user.grails.forEach(userGrail => {
            let newUserCard = { 
              user: user.name, 
              avatar: user.avatar,
              category: userGrail.category.category, 
              grails: [],
              updatedAt: userGrail.updatedAt
            }
            let cardExists = false;
            //can be replaced with find
            userCards.forEach(userCard => {
              if(userGrail.category.category === userCard.category && user.name === userCard.user) {
                userCard.grails.push(userGrail.grail);
                cardExists = true;
              }
            })
            if(!cardExists ) {
                newUserCard.grails.push(userGrail.grail)
                userCards.push(newUserCard);
            }
        })
        userCards.sort(function(a,b){
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        console.log(userCards)
        res.render('grails/show', {
          grails,
          categories,
          title: 'Grail',
          user: req.user,
          userCards    
        })
      }) 
    })
  })
}

async function addGrail(req, res, next) {
  console.log('req.body', req.body)
  const existingCategory = await Category.findOne({ category: req.body.category }).select('_id').lean();
  const existingGrail= await Grail.findOne({ grail: req.body.grail, category: existingCategory }).select('_id').lean();
  const existingUser= await User.findOne({ googleId: req.user.googleId, grails: existingGrail }).select('_id').lean();

  if (existingCategory) {
   if(existingGrail) {
     if(existingUser) {
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
         grail.category = category;
         req.user.grails.push(grail);
         grail.save(function(err) {
          req.user.save(function(err){
            res.redirect('/grails');
          })
         })
       })
     })
   }
  } else {
    Grail.create({grail: req.body.grail}, function(err, grail) {
      grail.users.push(req.user);
      Category.create({category: req.body.category}, function(err, category) {
        grail.category = category;
        grail.save(function(err) {
          req.user.grails.push(grail);
          req.user.save(function(err) {
            res.redirect('/grails');
          })
        })
      })
    })
  }
}

module.exports = {
  addGrail,
  show
};