// const app = require('../index.js');
// let db;

// setImmediate(() => {
// 	db = app.get('db');
// });

// module.exports = {
// getUser: (req, res, next) => {
// 	db.get_user([
// 		req.params.user_id
// 	]), (err, result) => {
// 		if (err) {
// 			console.log('get user endpoint error: ', err);
// 		}
// 		else {
// 		  res.send(result)
// 		}
// 	  }
// }

// };