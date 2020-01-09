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
              categoryId: userGrail.category._id, 
              grails: [],
              updatedAt: userGrail.updatedAt
            }
            let cardExists = false;
            //can be replaced with find
            userCards.forEach(userCard => {
              if(userGrail.category.category === userCard.category && user.name === userCard.user) {
                userCard.grails.push({ grail: userGrail.grail, _id: userGrail._id });
                cardExists = true;
              }
            })
            if(!cardExists ) {
                newUserCard.grails.push({ grail: userGrail.grail, _id: userGrail._id })
                userCards.push(newUserCard);
            }
        })
        userCards.sort(function(a,b){
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
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

async function _addGrail(req, res, onSuccessCb) {
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
            if (!err) {
              onSuccessCb();
            }
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
            if (!err) {
              onSuccessCb();
            }
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
            if (!err) {
              onSuccessCb();
            }
          })
        })
      })
    })
  }
}

function addGrail(req, res) {
  _addGrail(req, res, () => res.redirect(`/grails`));
};

function addGrailApi(req, res) {
  console.log('res');
  _addGrail(req, res, () => res.send('Success'));
}

function _deleteGrail(req, res, onSuccessCb) {
  Grail.findById(req.params.id, function(err, grail) {
    req.user.grails.splice(req.user.grails.indexOf(req.params.id), 1);
    grail.users.splice(grail.users.indexOf(req.user._id), 1);
    req.user.save(function(err) {
      grail.save(function(err) {
        if (!err) {
          onSuccessCb();
        }
      })
    })
  });
}

function deleteGrail(req, res) {
  _deleteGrail(req, res, () => res.redirect(`/user/${req.user._id}`));
};

function deleteGrailApi(req, res) {
  console.log('res');
  _deleteGrail(req, res, () => res.send('Success'));
}

function deleteGrailPost(req, res) {
  Grail.find({ category: req.params.id }, function(err, grails) {
    grails.forEach(grail => {
      req.user.grails.splice(req.user.grails.indexOf(grail._id), 1);
      grail.users.splice(grail.users.indexOf(req.user._id), 1);
    })
    req.user.save(function(err) {
      const promises = grails.map((grail) => grail.save());
      Promise.all(promises).then(() => res.redirect(`/user/${req.user._id}`));
    })  
  });
};

module.exports = {
  addGrail,
  addGrailApi,
  show,
  deleteGrail,
  deleteGrailApi, 
  deleteGrailPost
};