const app = require('../index');
const bcrypt = require('bcryptjs');
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
module.exports = {

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

  adminInfo: (req, res) => {
    app.get('db').get_admin([req.params.id]).then(response => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
  },

  getTrainers: (req, res) => {
    req.app.get('db').get_trainers().then(response => {
      res.status(200).send(response)
    }).catch(err => console.log(err))
  }
};