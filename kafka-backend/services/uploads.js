const Users = require('../dbSchema/users');

function handle_request(msg, callback) {
  var res = {};

  if (msg.path === "user_uploads") {
    Users.findOne({ _id: msg.user_id }, (err, user) => {
      if (err) {
        console.log(err);
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (user) {
        user.user_image = msg.filename;
        user.save((err, updatedUser) => {
          if (err) {
            res.status = 500;
            res.message = "Database Error";
          }
          if (updatedUser) {
            res.status = 200;
            res.message = msg.filename;
          }
          callback(null, res);
        });
      }
    });
  }
  else if (msg.path === "restaurant_uploads") {
    Users.findOne({ _id: msg.user_id }, (err, user) => {
      if (err) {
        console.log(err);
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (user) {
        user.restaurant.res_image = msg.filename;
        user.save((err, updatedUser) => {
          if (err) {
            res.status = 500;
            res.message = "Database Error";
          }
          if (updatedUser) {
            res.status = 200;
            res.message = msg.filename;
          }
          callback(null, res);
        });
      }
    });
  }
};

exports.handle_request = handle_request;