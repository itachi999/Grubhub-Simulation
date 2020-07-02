const passwordHash = require('password-hash');
const Users = require('../dbSchema/users');

function handle_request(msg, callback) {
  var res = {};

  Users.findOne({ email_id: msg.email_id }, (err, user) => {
    if (err) {
      res.status = 500;
      res.message = "Database Error";
    }
    if (!user) {
      res.status = 401;
      res.message = "NO_USER";
    }
    else {
      if (passwordHash.verify(msg.password, user.password)) {
        const payload = {_id: user._id, name: user.name, email_id: user.email_id, is_owner: user.is_owner };
        res.status = 200;
        res.message = payload;
      }
      else {
        res.status = 401;
        res.message = "INCORRECT_PASSWORD";
      }
    }
    callback(null, res);
  });
};

exports.handle_request = handle_request;