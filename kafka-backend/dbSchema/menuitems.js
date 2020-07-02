const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var menuItemsSchema = new Schema({
    item_name: {type: String, required: true},
    item_description: {type: String, required: true},
    item_price: {type: String, required: true},
    menu_section: {type: Schema.Types.ObjectId},
    item_image: {type: String}
},
{
    versionKey: false
});

module.exports = menuItemsSchema;