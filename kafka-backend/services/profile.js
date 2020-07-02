const passwordHash = require('password-hash');
const Users = require('../dbSchema/users');

function handle_request(msg, callback) {
  var res = {};

  if (msg.path === "customer_get") {
    Users.findById(msg.user_id, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
      }
      if (user) {
        let userObject = {
          user_id: user._id,
          name: user.name,
          email_id: user.email_id,
          is_owner: user.is_owner,
          address: user.address,
          phone_number: user.phone_number,
          user_image: user.user_image
        };
        res.status = 200;
        res.message = JSON.stringify(userObject);
      }
      callback(null, res);
    });
  }
  else if (msg.path === "restaurant_get") {
    Users.findById(msg.user_id, (err, user) => {
      if (err) {
        resstatus = 500;
        res.message = "Database Error";
      }
      if (user) {
        let userObject = {
          user_id: user._id,
          name: user.name,
          email_id: user.email_id,
          is_owner: user.is_owner,
          address: user.address,
          phone_number: user.phone_number,
          user_image: user.user_image,
          res_name: user.restaurant.res_name,
          res_cuisine: user.restaurant.res_cuisine,
          res_zip_code: user.restaurant.res_zip_code,
          res_image: user.restaurant.res_image
        };
        res.status = 200;
        res.message = JSON.stringify(userObject);
      }
      callback(null, res);
    });
  }
  else if (msg.path === "customer_update") {
    var hashedPassword;
    if (msg.password && msg.password !== "") {
      hashedPassword = passwordHash.generate(msg.password);
    }

    Users.findById(msg.user_id, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (user) {
        Users.findOneAndUpdate({ _id: msg.user_id },
          {
            name: msg.name,
            password: hashedPassword || user.password,
            address: msg.address,
            phone_number: msg.phone_number,
            user_image: user.user_image
          },
          {
            new: true
          },
          (err, updatedUser) => {
            if (err) {
              res.status = 500;
              res.message = "Error in Data";
            }
            if (updatedUser) {
              res.status = 200;
              res.message = "CUSTOMER_UPDATED";
            }
            callback(null, res);
          }
        );
      }
    });
  }
  else if (msg.path === "restaurant_update") {
    var hashedPassword;
    if (msg.password && msg.password !== "") {
      hashedPassword = passwordHash.generate(msg.password);
    }

    Users.findById(msg.user_id, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (user) {
        Users.findOneAndUpdate({ _id: msg.user_id },
          {
            name: msg.name,
            password: hashedPassword || user.password,
            address: msg.address,
            phone_number: msg.phone_number,
            user_image: user.user_image,
            restaurant: {
              res_name: msg.res_name,
              res_zip_code: msg.res_zip_code,
              res_address: msg.address,
              res_phone_number: msg.phone_number,
              res_cuisine: msg.res_cuisine,
              res_image: user.restaurant.res_image,
              menu_sections: user.restaurant.menu_sections,
              owner_user: msg.user_id
            }
          },
          {
            new: true
          },
          (err, updatedUser) => {
            if (err) {
              res.status = 500;
              res.message = "Error in Data";
            }
            if (updatedUser) {
              res.status = 200;
              res.message = "RESTAURANT_UPDATED";
            }
            callback(null, res);
          }
        );
      }
    });
  }
};

exports.handle_request = handle_request;