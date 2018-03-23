//Require statements//
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

//dotenv helps when going to production//
require('dotenv').config();

//Initialize express./
const app = module.exports = express();

//Create port
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + './public'));

//Url string to connect to database
CONNECTION_STRING : 'postgres://postgres:@localhost/justonperkins'

//Initializes massive connection//
let db = massive(process.env.CONNECTION_STRING).then(dbObject => {
    app.set('db', dbObject);
}).catch(err => console.log(err));

//PASSPORT SETUP//
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome " + req.query.username + '!!'));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
        cb(err, user);
    });
});

/*PASSPORT LOCAL AUTHENTICATION*/
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(first_name, password, done) {
        db.clients.findOne({
          first_name: first_name
        }, function(err, user) {
          if (err) {
            return done(err);
          }
  
          if (!user) {
            return done(null, false);
          }
  
          if (user.password != password) {
            return done(null, false);
          }
          return done(null, user);
        });
    }
));

app.post('/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username='+req.user.username);
  });

///ROUTES///
const userCtrl = require('./backendCtrls/userCtrl');

app.get('/test', function(req,res,next) {
    res.send('test worked');
});

app.get('/get-user/:user_id', function(req,res,next) {
    req.app.get('db').get_user().then(user => {
        res.status(200).send(user);
    })
});

// app.get('/get-user/:user_id', userCtrl.getUser);

app.get('/get-all', (req, res) => {
    req.app.get('db').get_clients().then(clients => {
        res.status(200).send(clients)
    });
});

///Listen on app///
app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {
    db: db
}