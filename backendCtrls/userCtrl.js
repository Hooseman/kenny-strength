const app = require('../index');
// const db = app.get('db');
const bcrypt = require('bcryptjs');
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
module.exports = {
  register: function (req, res, next) {
    var user = req.body;
    console.log(user.password);
    // Hash the users password for security
    user.password = hashPassword(user.password);
    console.log(user.password);
    req.app.get('db').user_create([user.firstname, user.lastname, user.email, user.phone, user.password, user.birth_date, user.age, user.sex, user.clientaddress, user.zip, user.city, user.info], function (err, user) {
      // If err, send err
      if (err) {
        console.log(err);
        return res.status(500)
          .send(err);
      }
      // Send user back without password.
      delete user.password;
      res.status(200)
        .send(user);
    });
  },
  me: (req, res) => {
    console.log("made it");
    if (!req.user) return res.status(401).send('current user not defined');
    console.log(req.user);
    //remove password for security, do not send it back
    const user = req.user;
    console.log(user);
    delete user.password;
    //return user object without passwordreturn
    return res.status(200).json(user);
  },


  //   test endpoints

  test: (req, res) => {
    res.send("it worked")
  },

  getUser: (req, res) => {
    req.app.get('db').get_user().then(users => {
      res.status(200).send(users)
    }).catch(err => console.log(err))
  },

  getAllCreds: (req, res) => {
    req.app.get('db').get_clients_creds().then(users => {
      res.status(200).send(users)
    }).catch(err => console.log(err))
  },

  create: (req, res) => {
    const user = req.body;
    req.app.get('db').user_create([
      user.password, user.firstname, user.lastname, user.email, user.phone, user.birth_date, user.clientaddress, user.city, user.zip, user.info
    ]).then(users => {
      res.status(200).send(users)
    }).catch(err => console.log(err))
  }

  //end of export
}