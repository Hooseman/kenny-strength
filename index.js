//Require statements//
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const config = require('./config.js');
// const passport = require('./passport');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//dotenv helps when going to production//
require('dotenv').config();

//Initialize express./
const app = module.exports = express();

//Create port
const port = process.env.PORT || 3000;

//===REQUIRE CONTROLLERS(BELOW APP.SET)========
const userCtrl = require('./backendCtrls/userCtrl');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

//Url string to connect to database
CONNECTION_STRING = config.CONNECTION_STRING;

//Initializes massive connection//
// const massiveServer = massive(process.env.CONNECTION_STRING).then(db => app.set('db', db))
massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
})
// app.set('db', massiveServer)

// //PASSPORT SETUP//
// const passport = require('./passport');
const bcrypt = require('bcryptjs');

//===POLICIES===========================
const isAuthed = (req, res, next) => {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

//===SESSION AND PASSPORT=====================
app.use(session({
  secret: config.secret,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, done) {
  app.get('db').get_user([username]).then(result => {
    const user = result[0];
    console.log(user);
    //VERIFY USERNAME EXISTS
    if (!user) {
      return done(null, 'Unauthorized')
    } else {
      console.log("found username")
    }
    //VERIFY PASSWORD MATCHES
    const validPassword = user.password;
    console.log(validPassword);
    if (!validPassword) {
      return done(null, 'Unauthorized')
    } else {
      console.log("found username")
    }
    //USER IS VERIFIED AND THEIR ID IS RETURNED
    return done(null, user.id)
  })
}))

passport.serializeUser((id, done) => {
  return done(null, id)
});

passport.deserializeUser((id, done) => {
  if (id === "Unauthorized") {
    return done(null, 'Unauthorized');
  }

  app.get('db').user_search_id([id]).then(result => {
    const user = result[0];
    return done(null, user);
  })
});

//===PASSPORT ENDPOINTS===================
app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}))

app.get('/logout', (req, res, next) => {
  req.logout();
  return res.status(200).send('logged out');
});

//===USER ENDPOINTS=========================
app.post('/register', userCtrl.register);
app.get('/me', isAuthed, userCtrl.me);

// app.get('/me', (req, res) => {
//   if (req.user) {
//     res.status(200).send(req.user);
//   } else {
//     res.status(401).send('Not Logged In');
//   }
// })

///ROUTES///

// endpoint tests
app.get('/test', userCtrl.test);
app.get('/get-user/:id', userCtrl.getUser);
app.post('/create', userCtrl.create);
app.get('/get-all-creds', userCtrl.getAllCreds);

///Listen on app///
app.listen(port, () => console.log(`listening on port ${port}`));