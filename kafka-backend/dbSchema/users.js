const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurantsSchema = require('./restaurants');

var usersSchema = new Schema({
    name: {type: String, required: true},
    email_id: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    phone_number: {type: String, required: true},
    user_image: {type: String, default: null},
    is_owner: {type: Boolean, default: false},
    restaurant: restaurantsSchema
},
{
    versionKey: false
});

module.exports = mongoose.model('user', usersSchema);