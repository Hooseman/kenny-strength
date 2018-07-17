const app = require('../index');
const bcrypt = require('bcryptjs');
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
module.exports = {

  // create a new trainer

  registerAdmin: function (req, res, next) {
    var user = req.body;
    // Hash the users password for security
    user.password = hashPassword(user.password);
    req.app.get('db').post_admin_create([user.username, user.lastname, user.email, user.phone, user.password, user.birth_date, user.clientaddress, user.city, user.zip, user.info]).then(result => {
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

  registerTrainer: function (req, res, next) {
    var user = req.body;
    // Hash the users password for security
    user.password = hashPassword(user.password);
    req.app.get('db').post_trainer([user.username, user.lastname, user.email, user.phone, user.password, user.birth_date, user.clientaddress, user.city, user.zip, user.info]).then(result => {
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

  registerSuper: function (req, res, next) {
    var user = req.body;
    // Hash the users password for security
    req.app.get('db').post_super([user.username, user.lastname]).then(result => {
      // If err, send err
      const err = result;

      console.log(err);
      if (!err) {
        console.log(err);
        return res.status(500)
          .send(err);
      }
    });
  },

  registerTrainerId: function (req, res) {
    var user = req.body;
    // Hash the users password for security
    req.app.get('db').post_trainer_id([user.next_trainer, user.next_class, user.next_time, user.next_session]).then(result => {
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

  adminPayment: (req, res) => {
    var par = req.params;
    var user = req.body;
    app.get('db').update_payment([par.id, user.payment]).then(response => {
      res.status(200).send(response)
      console.log(response);
    }).catch(err => console.log(err))
  },

  deleteSession: (req, res) => {
    console.log("hit");
    app.get('db').delete_client_session([req.params.id]).then(response => {
      res.status(200).send(response + "item removed succesfully")
    }).catch(err => console.log(err))
  },
  

  adminPermission: (req, res) => {
    app.get('db').get_secret_key([req.params.id]).then(response => {
      const user = response;
      console.log("success")
      res.status(200).send(response)
    }).catch(err => console.log(err))
  },

  adminInfo: (req, res) => {
    app.get('db').get_admin([req.params.id]).then(response => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
  },

  getTrainers: (req, res) => {
    req.app.get('db').get_trainers().then(response => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
  },

  adminSession: (req, res) => {
    app.get('db').get_admin_sessions([req.params.user_id]).then(response => {
      console.log(response);
      res.status(200).send(response)
    }).catch(err => console.log(err))
  },
};