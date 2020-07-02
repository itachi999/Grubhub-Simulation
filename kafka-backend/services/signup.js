const passwordHash = require('password-hash');
const Users = require('../dbSchema/users');

function handle_request(msg, callback) {
  var res = {};

  if (msg.url === "/customer") {
    var hashedPassword = passwordHash.generate(msg.password);

    var newUser = new Users({
      name: msg.name,
      email_id: msg.email_id,
      password: hashedPassword,
      address: msg.address,
      phone_number: msg.phone_number
    });

    Users.findOne({ email_id: msg.email_id }, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Error in Data";
        callback(null, res);
      }
      if (user) {
        res.status = 500;
        res.message = "USER_EXISTS";
        callback(null, res);
      }
      else {
        newUser.save((err, data) => {
          if (err) {
            res.status = 500;
            res.message = "Error in Data";
            callback(null, res);
          }
          else {
            res.status = 200;
            res.message = "USER_ADDED";
            callback(null, res);
          }
        });
      }
    });
  }
  else if (msg.url === "/restaurant") {
    var hashedPassword = passwordHash.generate(msg.password);

    var newUser = new Users({
      name: msg.name,
      email_id: msg.email_id,
      password: hashedPassword,
      address: msg.address,
      phone_number: msg.phone_number,
      is_owner: true
    });

    var newRestaurant = {
      res_name: msg.res_name,
      res_cuisine: msg.res_cuisine,
      res_zip_code: msg.res_zip_code,
      res_address: msg.address,
      res_phone_number: msg.phone_number,
      owner_user: newUser._id
    };

    newUser.restaurant = newRestaurant;

    Users.findOne({ email_id: msg.email_id }, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Error in Data";
        callback(null, res);
      }
      if (user) {
        res.status = 500;
        res.message = "USER_EXISTS";
        callback(null, res);
      }
      else {
        newUser.save((err, data) => {
          if (err) {
            res.status = 500;
            res.message = "Error in Data";
          }
          else {
            res.status = 200;
            res.message = "USER_ADDED";
          }
          callback(null, res);
        });
      }
    });
  }
};

exports.handle_request = handle_request;