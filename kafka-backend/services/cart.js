const Orders = require('../dbSchema/orders');

function handle_request(msg, callback) {
    var res = {};

    var customer = {
        customer_id: msg.customer.user_id,
        customer_name: msg.customer.name,
        customer_address: msg.customer.address,
        customer_phone_number: msg.customer.phone_number,
        customer_image: msg.customer.user_image
    };

    var restaurant = {
        res_id: msg.restaurant._id,
        owner_user_id: msg.restaurant.owner_user,
        res_name: msg.restaurant.res_name,
        res_address: msg.restaurant.res_address,
        res_zip_code: msg.restaurant.res_zip_code,
        res_phone_number: msg.restaurant.res_phone_number,
        res_image: msg.restaurant.res_image
    };

    var newOrder = new Orders({
        sub_total: msg.sub_total,
        discount: msg.discount,
        delivery: msg.delivery,
        tax: msg.tax,
        total: msg.total,
        order_status: msg.order_status,
        order_date: new Date(Date.now()).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
        customer: customer,
        restaurant: restaurant,
        order_items: msg.cart_items
    });

    newOrder.save((err, order) => {
        if (err) {
            res.status = 500;
            res.message = "Error in Data";
        }
        else {
            res.status = 200;
            res.message = "ORDER_PLACED";
        }
        callback(null, res);
    });
};

exports.handle_request = handle_request;