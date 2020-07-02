const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customer = {
    customer_id: {type: String, required: true},
    customer_name: {type: String, required: true},
    customer_address: {type: String, required: true},
    customer_phone_number: {type: String, required: true},
    customer_image: {type: String}
};

var restaurant = {
    res_id: {type: String, required: true},
    owner_user_id: {type: String, required: true},
    res_name: {type: String, required: true},
    res_address: {type: String, required: true},
    res_zip_code: {type: String, required: true},
    res_phone_number: {type: String, required: true},
    res_image: {typpe: String}
};

var messages = {
    sender_id: {type: String, required: true},
    receiver_id: {type: String, required: true},
    sender_name: {type: String, required: true},
    receiver_name: {type: String, required: true},
    sender_image: {type: String},
    message_content: {type: String, required: true},
    message_time: {type: String, required: true}
}

var itemsSchema = new Schema({
    item_name: {type: String, required: true},
    item_price: {type: String, required: true},
    item_quantity: {type: String, required: true},
},
{
    versionKey: false
});

var ordersSchema = new Schema({
    customer: customer,
    restaurant: restaurant,
    messages: [messages],
    sub_total: {type: String, required: true},
    discount: {type: String, required: true},
    delivery: {type: String, required: true},
    tax: {type: String, required: true},
    total: {type: String, required: true},
    order_status: {type: String, required: true},
    order_date: {type: String, required: true},
    order_items: [itemsSchema],
},
{
    versionKey: false
});

module.exports = mongoose.model('order', ordersSchema);