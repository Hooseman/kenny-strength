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
    req.app.get('db').post_user_create([user.username, user.lastname, user.email, user.phone, user.password, user.birth_date, user.clientaddress, user.city, user.zip, user.info]).then(result => {
      // If err, send err
      const user = result;
      
      if (!user) {
        return res.status(500)
          .send(user);
      }
      // Send user back without password.
      delete user.password;
      res.status(200)
        .send(user);
    });
  },

  registerSession: function (req, res) {
    var user = req.body;
    // Hash the users password for security
    req.app.get('db').post_session_create([req.params.user_id, user.next_trainer, user.next_class, user.next_time, user.next_session]).then(result => {
      // If err, send err
      const err = result;
      console.log("something");
      if (!err) {
        console.log(err);
        return res.status(500)
          .send(err);
      }
      res.status(200)
        .send(user);
        console.log("grabbed the data");
    });
  },

  updateClientSession: (req, res) => {
    var par = req.params;
    var user = req.body;
    app.get('db').update_user_session([par.id, user.next_trainer, user.next_class, user.next_time, user.next_session]).then(response => {
      res.status(200).send(response + "item updated succesfully")
    }).catch(err => console.log(err))
  },

  userCancelSession: (req, res) => {
    app.get('db').delete_client_session([req.params.id]).then(response => {
      res.status(200).send(response + "item removed succesfully")
    }).catch(err => console.log(err))
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

  clientSession: (req, res) => {
    app.get('db').get_client_sessions([req.params.user_id]).then(response => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
  },

  //end of export
}