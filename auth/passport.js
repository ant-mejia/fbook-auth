// import passport and models
const passport = require('passport');
const models = require('../db/models/index');

module.exports = () => {
	//serialize user function
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// deserialize user function
	passport.deserializeUser((id, done) => {
		models.User.findById(id)
		.then((user) => { done(null, user); })
		.catch((err) => { done(err, null); });
	});
};
