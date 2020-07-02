const Users = require('../dbSchema/users');

function handle_request(msg, callback) {
  var res = {};

  if (msg.path === "get_sections") {
    Users.findById(msg.user_id, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
      }
      if (user) {
        res.status = 200;
        if (user.restaurant.menu_sections.length) {
          res.message = JSON.stringify(user.restaurant.menu_sections);
        }
        else {
          res.message = "NO_RECORD";
        }
      }
      callback(null, res);
    });
  }
  else if (msg.path === "add_section") {
    Users.findById(msg.user_id, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (user) {
        var newMenuSection = {
          menu_section_name: msg.menu_section_name,
          restaurant: user.restaurant._id
        };
  
        let index = user.restaurant.menu_sections.findIndex(menu_section => menu_section.menu_section_name === msg.menu_section_name);
        if (index > -1) {
          res.status = 500;
          res.message = "SECTION_EXISTS";
          callback(null, res);
        }
        else {
          user.restaurant.menu_sections.push(newMenuSection);
          user.save((err, updatedUser) => {
            if (err) {
              res.status = 500;
              res.message = "Database Error";
            }
            if (updatedUser) {
              res.status = 200;
              res.message = "SECTION_ADDED";
            }
            callback(null, res);
          });
        }
      }
    });
  }
  else if (msg.path === "update_section") {
    Users.findById(msg.user_id, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (user) {
        let index = user.restaurant.menu_sections.findIndex(menu_section => menu_section.menu_section_name === msg.menu_section_name && menu_section._id.toString() !== msg._id);
        if (index > -1 && user.restaurant.menu_sections[index]._id !== msg._id) {
          res.status = 500;
          res.message = "SECTION_EXISTS";
          callback(null, res);
        }
        else {
          let sectionIndex = user.restaurant.menu_sections.findIndex(menu_section => menu_section._id.toString() === msg._id);
          user.restaurant.menu_sections[sectionIndex].menu_section_name = msg.menu_section_name;
          user.save((err, updatedUser) => {
            if (err) {
              res.status = 500;
              res.message = "Database Error";
            }
            if (updatedUser) {
              res.status = 200;
              res.message = "SECTION_UPDATED";
            }
            callback(null, res);
          });
        }
      }
    });
  }
  else if (msg.path === "delete_section") {
    Users.findById(msg.user_id, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (user) {
        let index = user.restaurant.menu_sections.findIndex(menu_section => menu_section._id.toString() === msg._id);
        if (index > -1) {
          user.restaurant.menu_sections.splice(index, 1);
          user.save((err, updatedUser) => {
            if (err) {
              res.status = 500;
              res.message = "Database Error";
            }
            if (updatedUser) {
              res.status = 200;
              res.message = "SECTION_DELETED";
            }
            callback(null, res);
          });
        }
      }
    });
  }
};

exports.handle_request = handle_request;