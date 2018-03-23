// PASSPORT //
var passport = require('passport');
var LocalStrategy = require('passport-local')
	.Strategy;

// BCRYPT //
var bcrypt = require('bcryptjs');

// APP //
var app = require('./index');
var db = app.get('db');

// VERIFY PASSWORD //
function verifyPassword(submitedPass, userPass) {
	return bcrypt.compareSync(submitedPass, userPass);
}

// RUN WHEN LOGGING IN //
passport.use(new LocalStrategy({
	usernameField: 'first_name',
	passwordField: 'password'
}, function(first_name, password, done) {

	db.clients.findOne({first_name: first_name}, function(err, user) {
    console.log("user found: ", user);
		// user = user[0];

		// If err, return err
		if (err) {
      console.log("ERROR: ", err);
      done(err);
    }

		// If no user if found, return false
		if (!user) {
      console.log("ERROR: NO USER");
      return done(null, false);
    }

		// If user is found, check to see if passwords match. If so, return user
		if (verifyPassword(password, user.password)) {
      console.log("VERIFYING...");
      return done(null, user);
    }

    console.log("NO MATCH.");
		// If no match, return false
		return done(null, false);
	});
}));

// Puts the user on the session
passport.serializeUser(function(user, done) {
	done(null, user.user_id);
});
passport.deserializeUser(function(id, done) {
	db.clients.findOne({user_id: id}, function(err, user) {
    console.log("deserialized: ", user);
		done(err, user);
	});
});

module.exports = passport;