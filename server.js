//dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const user = require('./models/users.js');
require('dotenv').config()

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'givemeallthefoodsanddiets',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static('public'));

//controllers
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const profileController = require('./controllers/profile.js');
app.use('/profile', profileController);

const restaurantController = require('./controllers/restaurants.js');
app.use('/restaurants', restaurantController);

// Fixes mongoose promise deprecation warning
mongoose.Promise = global.Promise;

//for testing purposes during set up
//index route
app.get('/', (req, res)=>{
  res.send('fight the hangry; eat w/metabolic mindfulness.. ommmm');

  //   // res.render('index.ejs', {
  //   currentUser: req.session.currentuser
  // });
});

// app.get('/foodie', (request, response) => {
//     response.send('Foodies Love Food!');
// });








app.use(express.static('public'));

//mongoose connection
mongoose.connect('mongodb://localhost:27017/foodie');
mongoose.connection.once('open', function(){
  console.log('Foodie Path connected to mongoose...');
});

//port
app.listen(3000, ()=>{
    console.log("Foodie Path listens for those who are strong in the paleo force");
});
