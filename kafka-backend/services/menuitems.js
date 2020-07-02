const Users = require('../dbSchema/users');

function handle_request(msg, callback) {
  var res = {};

  if (msg.url === "/items") {
    Users.findOne({ _id: msg.user_id }, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
      }
      if (user) {
        var newMenuItem = {
          item_name: msg.item_name,
          item_description: msg.item_description,
          item_price: msg.item_price,
          item_image: msg.item_image,
          restaurant: user.restaurant._id
        };
  
        let sectionindex = user.restaurant.menu_sections.findIndex(menu_section => menu_section.menu_section_name === msg.menu_section_name);
        let itemindex = user.restaurant.menu_sections[sectionindex].menu_items.findIndex(menu_item => menu_item.item_name === msg.item_name);
        if (itemindex > -1) {
          res.status = 500;
          res.message = "ITEM_EXISTS";
          callback(null,res);
        }
        else {
          newMenuItem.menu_section = user.restaurant.menu_sections[sectionindex]._id;
          user.restaurant.menu_sections[sectionindex].menu_items.push(newMenuItem);
          user.save((err, updatedUser) => {
            if (err) {
              res.status = 500;
              res.message = "Database Error";
            }
            if (updatedUser) {
              res.status = 200;
              res.message = "ITEM_ADDED";
            }
            callback(null, res);
          });
        }
      }
    });
  }
  else if(msg.url === "/itemsupdate"){
    Users.findOne({ _id: msg.user_id }, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (user) {
        let sectionindex = user.restaurant.menu_sections.findIndex(menu_section => menu_section._id.toString() === msg.menu_section_id);
        let itemindex = user.restaurant.menu_sections[sectionindex].menu_items.findIndex(menu_item => menu_item._id.toString() === msg.item_id);
        let index = user.restaurant.menu_sections[sectionindex].menu_items.filter(menu_item => menu_item._id.toString() !== msg.item_id).findIndex(menu_item => menu_item.item_name === msg.item_name);
        if (index > -1) {
          res.status = 500;
          res.message = "ITEM_EXISTS";
          callback(null, res);
        }
        else {
          let updatedItem = user.restaurant.menu_sections[sectionindex].menu_items[itemindex];
          updatedItem.item_name = msg.item_name;
          updatedItem.item_description = msg.item_description;
          updatedItem.item_price = msg.item_price;
          updatedItem.item_image = msg.item_image;
          user.restaurant.menu_sections[sectionindex].menu_items[itemindex] = updatedItem;
          user.save((err, updatedUser) => {
            if (err) {
              res.status = 500;
              res.message = "Database Error";
            }
            if (updatedUser) {
              res.status = 200;
              res.message = "ITEM_UPDATED";
            }
            callback(null, res);
          });
        }
      }
    });
  }
  else if(msg.url === "/itemdelete"){
    Users.findOne({ _id: msg.user_id }, (err, user) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (user) {
        let sectionindex = user.restaurant.menu_sections.findIndex(menu_section => menu_section._id.toString() === msg.menu_section_id);
        let itemindex = user.restaurant.menu_sections[sectionindex].menu_items.findIndex(menu_item => menu_item._id.toString() === msg.item_id);
        if (itemindex > -1) {
          user.restaurant.menu_sections[sectionindex].menu_items.splice(itemindex, 1);
          user.save((err, updatedUser) => {
            if (err) {
              res.status = 500;
              res.message = "Database Error";
            }
            if (updatedUser) {
              res.status = 200;
              let itemObject = {
                status: "ITEM_DELETED",
                menu_sections: user.restaurant.menu_sections
              }
              res.message = JSON.stringify(itemObject);
            }
            callback(null, res);
          });
        }
      }
    });
  }
};

exports.handle_request = handle_request;