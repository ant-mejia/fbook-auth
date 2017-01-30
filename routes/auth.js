// import modules and files
/*jshint esversion:6*/
const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

// route to register
router.get('/register', authHelpers.loginRedirect, (req, res) => {
  let user = null;
  if (req.user) {
    user = req.user.dataValues;
  }
  res.render('auth/register', {
    user: user,
    title: 'Register yur Fazbook Account'
  });
});

// create a new user
router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req, res)
    .then((response) => {
      console.log('registration successful');
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error'
      });
    });
});

// log in page
router.get('/login', authHelpers.loginRedirect, (req, res) => {
  let user = null;
  if (req.user) {
    user = req.user.dataValues;
  }
  res.render('auth/login', {
    user: user,
    title: 'title'
  });
});

// redirect on post
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
