//dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

//for testing purposes during set up
//index route
app.get('/', (req, res)=>{
  res.send('fight the hangry; eat w/metabolic mindfulness.. ommmm');
});

// app.get('/foodie', (request, response) => {
//     response.send('Foodies Love Food!');
// });

//controllers
const profileController = require('./controllers/profile.js');
app.use('/profile', profileController);






//mongoose connection
mongoose.connect('mongodb://localhost:27017/foodie');
mongoose.connection.once('open', function(){
  console.log('Foodie Path connected to mongoose...');
});

//port
app.listen(3000, ()=>{
    console.log("Foodie Path listens for those who are strong in the paleo force");
});
