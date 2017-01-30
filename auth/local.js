// import passport, LocalStrategy, init, models, authHelpers

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

const options = {};

// initialize passport
init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  // check to see if the username exists
  models.User.findAll({
    where: {
      username
    }
  })
  .then((user) => {
  	// if the user is not found
    if (user[0] === undefined) {
      return done(null, false);
    }
    // if the password is incorrect
    if (!authHelpers.comparePass(password, user[0].dataValues.password)) {
      return done(null, false);
    } else {
    // if login is successful
      return done(null, user[0].dataValues);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;
