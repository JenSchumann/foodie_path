const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

//index route to all users //need to flesh out an admin user for this functionality in the future
router.get('/', (req, res)=> {
  User.find({}, (err, foundUsers)=> {
    res.json(foundUsers);
  });
});

//login verification route
router.get('/verifyLogin', (req, res)=> {
  if(req.session.logged) {
    User.findOne({ username: req.session.username}, (err, user)=> {
      res.json(user)
    });
  } else {
          req.session.message = "Username or Password are incorrect";
          res.json(req.session.message)
  };
});

//register new user - post route
router.post('/register', (req, res)=>{
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  User.create(userDbEntry, (err, user)=> {
    req.session.message = '';
    req.session.username = user.username;
    req.session.logged = true;
    res.json(req.session.logged);
  });
});

//login user - post route
router.post('/login', (req, res)=> {
  User.findOne({ username: req.body.username }, (err, user)=> {
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.message = '';
        req.session.username = req.body.username;
        req.session.logged = true;
        res.json(req.session.logged);
      } else {
        req.session.message = "Incorrect Username &/or Password";
        res.json(req.session.message);
      }
    } else {
      req.session.message = "Incorrect Username &/or Password";
      res.json(req.session.message);
    }
  });
});

//logout user route
router.get('/logout', (req, res)=> {
  req.session.destroy(function(err){
    req.session = false;
    console.log('User Logged Out');
    res.json(req.session);
  });
});

//show route.... need to figure out user will "see" their profile ==> user icon on nav if logged in leads to user modal?
router.get('/:id', (req, res)=> {
  User.find({ _id: req.params.id }, function(err, foundUser)
  {
    res.json(foundUser)
  });
});

//edit route
router.get('/verifyLogin', (req, res)=> {
  if(req.session.logged){
    User.findOne({ username: req.session.username }, (err, user)=> {
      res.json(updatedUser);
    });
  } else {
    console.log('get route to verifyLogin for edit');
  };
});

// need to verify that this is working properly
router.put('/:verifyLogin', (req, res)=> {
  if(req.session.logged){
    User.findByIdAndUpdate(req.params.id, req.body, { new: true },
    (err, user)=> {
      console.log('updated user profile');
      res.json(updatedUser);
    });
  } else {
    res.send('error');
    console.log('error in put/:verifyLogin');
  };
});

//delete user route
router.delete('/:id', (req, res)=> {
  User.findByIdAndRemove(req.params.id, (err, deletedUser)=> {
    res.json(deletedUser);
  });
});


module.exports = router;
