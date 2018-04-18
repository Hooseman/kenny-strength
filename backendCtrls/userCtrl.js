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
    // Hash the users password for security
    user.password = hashPassword(user.password);
    console.log(user.password);
    req.app.get('db').user_create([user.username, user.lastname, user.email, user.phone, user.password, user.birth_date, user.age, user.sex, user.clientaddress, user.city, user.zip, user.info]).then(result => {
      // If err, send err
      const err = result;
      console.log(err);
      if (!err) {
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

  registerSession: function (req, res, next) {
    var user = req.body;
    // Hash the users password for security
    req.app.get('db').session_create([user.next_trainer,user.next_class, user.next_time, user.next_session]).then(result => {
      // If err, send err
      const err = result;
      console.log("something");
      if (!err) {
        console.log(err);
        return res.status(500)
          .send(err);
      }
      // Send user back without password.
      res.status(200)
        .send(user);
        console.log("grabbed the data");
    });
  },

  me: (req, res) => {
    if (!req.user) return res.status(401).send('current user not defined');
    //remove password for security, do not send it back
    const user = req.user;
    console.log(user);
    delete user.password;
    //return user object without passwordreturn
    return res.status(200).json(user);
    console.log(user);
  },

  info: (req, res) => {
    app.get('db').get_client([req.params.id]).then(response => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
  },

  getTrainers: (req, res) => {
    req.app.get('db').get_trainers().then(response => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
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