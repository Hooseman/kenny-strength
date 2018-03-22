const app = require('../server.js');
const db = app.get('db');

  module.exports = {
    register_user: (req, res, next) => {
      db.userqueries.post_user([req.body.first_name, req.body.password, req.body.last_name, req.body.email, req.body.date_of_birth, req.body.age, req.body.sex, req.body.phone, req.body.useraddress, req.body.city, req.body.zip, req.body.info], (err, register_user) => {
        res.status(200).send(register_user);
      });
    },

    get_users: (req, res, next) => {
      db.userqueries.get_users( (err, get_users) => {
        res.status(200).send(get_users);
      });
    },

    test: (req, res, next) => {
      res.send("this worked");
    }
  };