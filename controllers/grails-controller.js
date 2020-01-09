const User = require('../models/user');
const Grail = require('../models/grail');
const Category = require('../models/category');

function index(req, res, next) {
  console.log('req.query.category', req.query.category)
  Category.find({}, function(err, categories) {
    Grail.find({}, function(err, grails) {
      User.find({})
      .populate({ 
        path: 'grails', 
        populate: { path: 'category' }
      })
      .exec(function(err, users) {
        let sortKey = req.query.category;
        let userCards = [];
        users.forEach(user => {
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
        })
        if(sortKey) {
          const result = userCards.filter(userCard => userCard.category == sortKey)
          userCards = result;
        } else {
          userCards.sort(function(a,b){
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });
        }
        
        console.log(userCards)
        res.render('grails/index', {
          grails,
          categories,
          title: 'Grail',
          user: req.user,
          users,
          userCards,
          sortKey
        })
      })
    })
  })
}

module.exports = {
  index
};