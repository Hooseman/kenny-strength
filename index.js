const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const config = require('./config.js');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './public'));

CONNECTION_STRING : 'postgres://postgres:@localhost/justonperkins'

var db = massive(process.env.CONNECTION_STRING).then(dbObject => {
    app.set('db', dbObject);
}).catch(err => console.log(err));

// const passport = require('./passport.js')

// const isAuthed = (req, res, next) => {
//   if (!req.isAuthenticated()) return res.status(401).send();
//   return next();
// };

// app.use(session({
//   secret: config.sessionSecret,
//   saveUninitialized: false,
//   resave: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// LOGIN
// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/me'
// }));

app.get('/api/test', function(req,res,next) {
    res.send('test worked');
})

app.get('/api/getAll', (req, res) => {
      req.app.get('db').get_clients().then(clients => {
        res.status(200).send(clients)
      })
  })

app.listen(port, () => console.log(`listening on port ${port}`));