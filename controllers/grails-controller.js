const User = require('../models/user');
const Grail = require('../models/grail');
const Category = require('../models/category');

function index(req, res, next) {
  console.log('req.query:', req.query)
  Category.find({}, function(err, categories) {
    Grail.find({})
    .populate('category')
    .exec(function(err, grails) {
      User.find({})
      .populate({ 
        path: 'grails', 
        populate: { path: 'category' }
      })
      .exec(function(err, users) {
        let sortCategoryKey = req.query.category;
        let sortUserKey = req.query.user;
        let userCards = [];
        let grailTally = [];
        let tallyTotal = 0;

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

        if(sortCategoryKey) {
          const result = userCards.filter(userCard => userCard.category === sortCategoryKey)
          userCards = result;

          grails.forEach(grail => {
            if(grail.category.category === sortCategoryKey && grail.users.length > 0) {
              let grailCount = {
                grail: grail.grail,
                value: grail.users.length
              }
              tallyTotal = tallyTotal + grail.users.length
              grailTally.push(grailCount)
            }
          })
          grailTally.forEach(grail => {
            grail.value = Math.floor((grail.value * 100 / tallyTotal) * 100) / 100 
          })
          grailTally.sort((a, b) => b.value - a.value);
        } else if(sortUserKey) {
          const result = userCards.filter(userCard => userCard.user === sortUserKey)
          userCards = result;
        } else {
          userCards.sort(function(a,b){
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });
        }
        
        res.render('grails/index', {
          grails,
          categories,
          title: 'Grail',
          user: req.user,
          users,
          userCards,
          sortCategoryKey,
          grailTally
        })
      })
    })
  })
}

function getGrailTally(req, res, next) {
  Grail.find({})
  .populate('category')
  .exec(function(err, grails){
    let sortCategoryKey = req.query.category;
    let grailTally;
    let tallyTotal = 0;

    grails.forEach(grail => {
      if(grail.category.category === sortCategoryKey ) {
        let grailCount = {
          grail: grail.grail,
          value: grail.users.length
        }
        tallyTotal = tallyTotal + grail.users.length
        grailTally.push(grailCount)
      }
    })
    grailTally.forEach(grail => {
      grail.value = Math.floor((grail.value * 100 / tallyTotal) * 100) / 100 
    })
    res.render('grails/index', {
      grailTally
    })
  })
}

module.exports = {
  index,
  getGrailTally
};