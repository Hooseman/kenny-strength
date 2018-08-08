//Require statements//
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const config = require('./config.js');
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
const trainerCtrl = require('./backendCtrls/trainerCtrl');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

//Url string to connect to database
CONNECTION_STRING = config.CONNECTION_STRING;

//Initializes massive connection//
massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
})

// //PASSPORT SETUP//
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
    //VERIFY USERNAME EXISTS
    if (!user) {
      return done(null, 'Unauthorized')
    } else {
      // console.log(user)
    }
    //VERIFY PASSWORD MATCHES
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return done(null, 'Unauthorized')
    } else {
      // console.log(user)
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
    console.log();
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

//===LOGIN ENDPOINTS=========================
app.get('/me', isAuthed, userCtrl.me);

// USER ENDPOINTS
app.post('/register', userCtrl.register);
app.post('/register-session/:user_id/:username', userCtrl.registerSession);
app.get('/user-info/:id', userCtrl.info);
app.get('/client-session/:user_id', userCtrl.clientSession);
app.put('/update-session/:id', userCtrl.updateClientSession);
app.delete('/remove-session/:id', userCtrl.userCancelSession);

// ADMIN ENDPOINTS
app.get('/trainers', trainerCtrl.getTrainers);
app.get('/get-user-info/:user_id', trainerCtrl.getUserInfo);
app.get('/get-all-sessions', trainerCtrl.getAllSessions);
app.get('/admin-session/:user_id', trainerCtrl.adminSession);
app.post('/register-admin', trainerCtrl.registerAdmin);
app.post('/register-trainer-id', trainerCtrl.registerTrainerId);
app.post('/register-trainer', trainerCtrl.registerTrainer);
app.post('/register-super', trainerCtrl.registerSuper);
app.post('/admin-permission/:secret_key', trainerCtrl.adminPermission);
app.put('/admin-payment/:id', trainerCtrl.adminPayment);
app.get('/admin-info/:id', trainerCtrl.adminInfo);
// app.post('/admin-check', trainerCtrl.adminCheck);
// app.put('/change-session:id', adminCtrl.changeSession);
app.delete('/admin-session-cancel/:id', trainerCtrl.deleteSession);


///Listen on app///
app.listen(port, () => console.log(`listening on port ${port}`));