//dependencies
const mongoose = require('mongoose');
const Profile = require('./profile.js');

//Schema
const userSchema = mongoose.Schema({



  profile: [Profile.schema]












const User = mongoose.model('User', userSchema);


//export
module.exports = User;
