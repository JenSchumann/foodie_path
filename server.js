//dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'givemeallthefoodsanddiets',
  resave: false,
  saveUninitialized: false
}));

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

//for testing purposes during set up
//index route
app.get('/', (req, res)=>{
  // res.send('fight the hangry; eat w/metabolic mindfulness.. ommmm');
  res.render('index.ejs', {
    currentUser: req.session.currentuser
  });
});

// app.get('/foodie', (request, response) => {
//     response.send('Foodies Love Food!');
// });

//controllers
const profileController = require('./controllers/profile.js');
app.use('/profile', profileController);





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
