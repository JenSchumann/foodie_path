//dependencies
const mongoose = require('mongoose');
const Profile = require('./profile.js');
const Restaurant = require('./restaurants.js');

//Schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  profile: [Profile.schema],
  restaurant: [Restaurant.schema]
});











const User = mongoose.model('User', userSchema);


//export
module.exports = User;
