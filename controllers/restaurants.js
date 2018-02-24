const express = require('express');
const router = express.Router();
const Restaurants = require('../models/restaurants.js');
const Profile = require('../models/profile.js');
const getYelpResponse = require('../bin/yelp.js');






router.get('/', function(req, res){
    Restaurants.find({}, function(err, foundRestaurants){
        res.json(foundRestaurants);
});
});

router.post('/', (req,res)=>{
    Restaurants.create(req.body, function(err, createdRestaurant){
      Profile.findOne({Profilename: req.session.Profilename}, (err, foundProfile) => {
        console.log(foundProfile);
        foundProfile.Restaurants.push(createdRestaurant)
        foundProfile.save((err, data) => {
          res.json(createdRestaurant);
        });
      });
  });
});

router.delete('/:id', function(req, res){
  Restaurants.findByIdAndRemove(req.params.id, function(err, deletedRestaurant){
        res.json(deletedRestaurant);
  });
});


router.put('/:id', (req, res)=>{
  Restaurants.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedRestaurant)=>{
        res.json(updatedRestaurant);
  });
});


// Yelp Response route ========================

router.post('/getYelpResponse', (req, res) => {
  console.log('req.body: ', req.body);
  getYelpResponse(res, 'coffee', req.body);
});




module.exports = router;
