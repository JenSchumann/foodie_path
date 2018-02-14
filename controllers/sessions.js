const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/login', function(req, res, next){
  res.render('sessions/login.ejs', { message: req.session.message || ''})
});

router.get('/register', function(req, res, next){
  res.render('sessions/register.ejs', {})
});

// router.get('/new', function(req, res){
//   res.render('sessions/new.ejs');
// });

router.post('/login', (req, res, next) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.message = '';
        req.session.username = req.body.username;
        req.session.logged = true;
        console.log(req.session);
        // res.redirect('/');
        res.render('./users/account.ejs')
        // res.render('./users/show.ejs');
      } else {
        console.log('else in bcrypt compare');
        req.session.message = "Username or password are incorrect";
        res.redirect('/sessions/login')
      }
    } else {
      req.session.message = "username or password are incorrect";
      res.redirect('/sessions/login')
    }
  });
});

router.post('/register', (req, res, next) => {
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  User.create(userDbEntry, (err, user) => {
    console.log(user);
    req.session.username = user.username;
    req.session.logged = true;
    res.redirect('/')
  });
})
//
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      res.redirect('/')
  });
});

router.delete('/', function(req, res) {
  req.session.destroy(function(){
    res.redirect('/');
  });
});

module.exports = router;
