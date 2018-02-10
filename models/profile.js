const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({

  author: {type:String, default: ''},
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },

  files: { type: String, default: '' },
  tasks: { type: String, default: '' },

  favoriteRecipes: String,
  favoriteRestaurants: String,
  comments: [{ type: String }]



});

const Profile = mongoose.model('Profile', smackSchema)


//exports
module.exports = Profile;
