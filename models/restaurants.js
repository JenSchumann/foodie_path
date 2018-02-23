const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: String,
    rating: Number,
    price: String,
    address1: String

});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
