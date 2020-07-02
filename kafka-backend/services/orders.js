const Orders = require('../dbSchema/orders');

function handle_request(msg, callback) {
  var res = {};

  if (msg.path === "get_customer_pending_orders") {
    Orders.find({ "customer.customer_id": msg.user_id }, (err, orders) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
      }
      if (orders) {
        let pending_orders = orders.filter(order => order.order_status !== 'ORDER_CANCELLED' && order.order_status !== 'ORDER_DECLINED' && order.order_status !== 'DELIVERED');
        res.status = 200;
        if (pending_orders && pending_orders.length > 0) {
          res.message = JSON.stringify(pending_orders);
        }
        else {
          res.message = "NO_PENDING_ORDERS";
        }
      }
      callback(null, res);
    });
  }
  else if (msg.path === "get_customer_completed_orders") {
    Orders.find({ "customer.customer_id": msg.user_id }, (err, orders) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
      }
      if (orders) {
        let completed_orders = orders.filter(order => order.order_status === 'ORDER_CANCELLED' || order.order_status === 'ORDER_DECLINED' || order.order_status === 'DELIVERED');
        res.status = 200;
        if (completed_orders && completed_orders.length > 0) {
          res.message = JSON.stringify(completed_orders);
        }
        else {
          res.message = "NO_COMPLETED_ORDERS";
        }
      }
      callback(null, res);
    });
  }
  else if (msg.path === "get_restaurant_pending_orders") {
    Orders.find({ "restaurant.owner_user_id": msg.user_id }, (err, orders) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
      }
      if (orders) {
        let pending_orders = orders.filter(order => order.order_status !== 'ORDER_CANCELLED' && order.order_status !== 'ORDER_DECLINED' && order.order_status !== 'DELIVERED');
        res.status = 200;
        if (pending_orders && pending_orders.length > 0) {
          res.message = JSON.stringify(pending_orders);
        }
        else {
          res.message = "NO_PENDING_ORDERS";
        }
      }
      callback(null, res);
    });
  }
  else if (msg.path === "get_restaurant_completed_orders") {
    Orders.find({ "restaurant.owner_user_id": msg.user_id }, (err, orders) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
      }
      if (orders) {
        let completed_orders = orders.filter(order => order.order_status === 'ORDER_CANCELLED' || order.order_status === 'ORDER_DECLINED' || order.order_status === 'DELIVERED');
        res.status = 200;
        if (completed_orders && completed_orders.length > 0) {
          res.message = JSON.stringify(completed_orders);
        }
        else {
          res.message = "NO_COMPLETED_ORDERS";
        }
      }
      callback(null, res);
    });
  }
  else if (msg.path === "update_order_status") {
    Orders.findById(msg.order_id, (err, order) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (order) {
        order.order_status = msg.order_status;
        order.save((err, updatedOrder) => {
          if (err) {
            console.log(err);
            res.status = 500;
            res.message = "Database Error";
          }
          if (updatedOrder) {
            res.status = 200;
            res.message = "STATUS_UPDATED";
          }
          callback(null, res);
        });
      }
    });
  }
};

exports.handle_request = handle_request;