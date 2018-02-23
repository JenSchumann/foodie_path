const express = require('express');
const router = express.Router();
const Profile = require('../models/profile.js');
const Restaurant = require('../models/restaurants.js');
const getYelpResponse = require('../bin/yelp.js');


//index route
router.get('/', function(req, res){
  Profile.find({}, function(err, foundProfile){
    res.json(foundProfile);
  });
});

//show route
router.get('/:id', (req, res)=> {
  Profile.find({_id : req.params.id }, function(err, foundProfile){
    res.send(foundProfile);
  });
});

//create route
router.post('/', function(req, res){
  // req.body.author = req.session.username;
  Profile.create(req.body, (err, createdProfile)=>{
    // User.findOneAndUpdate(
    //   { username: req.session.username },
    //   { $push: {profile: createdProfile}},
    //   { safe: true, upsert: true, new: true},
      (err, model)=>{
        console.log(err);
      }
    res.json(createdProfile);
  });
});


// Yelp Response route ========================

router.post('/getYelpResponse', (req, res) => {
  console.log('req.body: ', req.body);
  getYelpResponse(res, 'coffee', req.body);
});


module.exports = router;
