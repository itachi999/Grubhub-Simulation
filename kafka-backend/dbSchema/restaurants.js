const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const menuSectionsSchema = require('./menusections');

var restaurantsSchema = new Schema({
    res_name: {type: String, required: true},
    res_zip_code: {type: String, required: true},
    res_cuisine: {type: String, required: true},
    res_image: {type: String},
    res_address: {type: String, required: true},
    res_phone_number: {type: String, required: true},
    owner_user: {type: Schema.Types.ObjectId, ref: 'user'},
    menu_sections: [menuSectionsSchema]
},
{
    versionKey: false
});

module.exports = restaurantsSchema;