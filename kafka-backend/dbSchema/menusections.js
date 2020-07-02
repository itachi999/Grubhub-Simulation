const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const menuItemsSchema = require('./menuitems');

var menuSectionsSchema = new Schema({
    menu_section_name: {type: String, required: true},
    restaurant: {type: Schema.Types.ObjectId},
    menu_items: [menuItemsSchema]
},
{
    versionKey: false
});

module.exports = menuSectionsSchema;