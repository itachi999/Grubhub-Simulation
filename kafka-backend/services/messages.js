const Orders = require('../dbSchema/orders');

function handle_request(msg, callback) {
  var res = {};

  if (msg.method === "GET") {
    Orders.findById(msg.order_id, (err, order) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
      }
      if (order) {
        let messages = order.messages;
        res.status = 200;
        if (messages.length > 0) {
          res.message = JSON.stringify(messages);
        }
        else {
          res.message = "NO_MESSAGES";
        }
      }
      callback(null, res);
    });
  }
  else if (msg.method === "POST") {
    Orders.findById(msg.order_id, (err, order) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (order) {
        let newMessage = {
          message_content: msg.message,
          sender_id: msg.sender_id,
          receiver_id: msg.receiver_id,
          sender_name: msg.sender_name,
          receiver_name: msg.receiver_name,
          sender_image: msg.sender_image,
          message_time: new Date(Date.now()).toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
        };
        order.messages.push(newMessage);
        order.save((err, updatedOrder) => {
          if(err){
            console.log(err);
            res.status = 500;
            res.message = "Database Error";
          }
          if(updatedOrder){
            res.status = 200;
            res.message = "MESSAGE_SENT";
          }
          callback(null, res);
        });
      }
    });
  }
};

exports.handle_request = handle_request;