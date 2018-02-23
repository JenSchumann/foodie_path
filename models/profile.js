//dependencies
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurants.js');

//Schema
const profileSchema = mongoose.Schema({

  author: {type:String, default: ''},
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: '' },
  alias: { type: String, default: '' },
  headline: { type: String, default: '' },
  bio: { type: String, default: '' },
  dietPreference: { type: String, default: '' },

  files: { type: String, default: '' },
  tasks: { type: String, default: '' },

  favoriteRecipes: String,
  favoriteRestaurants: [Restaurant.schema],
  comments: [{ type: String }]

});

const Profile = mongoose.model('Profile', profileSchema)


//exports
module.exports = Profile;
