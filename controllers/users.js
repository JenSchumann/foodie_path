const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  User.find({}, (err, foundUsers) => {
    res.json(foundUsers);
  });
});
// 
// router.get('/new', (req, res) => {
//   res.render('users/new.ejs');
// });
//
// router.post('/', (req, res) => {
//   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//   User.create(req.body, function(err, createdUser){
//     res.redirect('/');
//   });
// });

// login verification
router.get('/verifyLogin', (req, res) => {
  if(req.session.logged) {
    User.findOne({ username: req.session.username}, (err, user) => {
      res.json(user)
    });
  } else {
    req.session.message = "Username or Password are incorrect";
  };
});

// register new user
router.post('/register', (req, res) => {
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  User.create(userDbEntry, (err, user) => {
    req.session.message = '';
    req.session.username = user.username;
    req.session.logged = true;
    res.json(req.session.logged);
  });
});

// login user
router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username}, (err, user) => {
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)) {
        req.session.message = '';
        req.session.username = req.body.username;
        req.session.logged = true;
        res.json(req.session.logged);
      } else {
        req.session.message = "Incorrect Username and/or Password";
        res.json(req.session.message);
      }
    } else {
      req.session.message = "Incorrect Username and/or Password";
      res.json(req.session.message);
    }
  });
});

// logout
router.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    req.session = false;
    console.log('User Logged Out');
    res.json(req.session);
  });
});

//show
router.get('/:id', (req, res) => {
  User.find({ _id: req.params.id }, function(err, foundUser) {
    res.json(foundUser)
  });
});

// edit
router.get('/verifyLogin', (req, res) => {
  if(req.session.logged) {
    User.findOne({ username: req.session.username }, (err, user) => {
      res.json(updatedUser);
    });
  } else {
    console.log('get route in verifyLogin for edit');
  };
});

// verify working
router.put('/:verifyLogin', (req, res) => {
  if(req.session.logged) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
      console.log('updated user profile');
      res.json(updatedUser);
    });
  } else {
    res.send('error');
    console.log('error in put/:verifyLogin');
  };
});

// delete user
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    res.json(deletedUser);
  });
});

module.exports = router;
