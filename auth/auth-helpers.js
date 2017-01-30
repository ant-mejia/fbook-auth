// import bcrypt and models
const bcrypt = require('bcryptjs');
const models = require('../db/models/index');

// uses bcyrpt to compare passwords
function comparePass(userPassword, databasePassword) {
	return bcrypt.compareSync(userPassword, databasePassword);
}

// login redirect
function loginRedirect(req, res, next) {
  // if user is already logged in
  if (req.user) return res.redirect('/user');

  return next();
}

// create a new user
function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  // user properties
  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(() => {
    res.redirect('/');
  });
}

// require user to be logged in
function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });

  return next();
}
// Export all my helper functions
module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser
}
