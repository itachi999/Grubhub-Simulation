const Users = require('../dbSchema/users');

function handle_request(msg, callback) {
    var res = {};

    if (msg.path === "restaurant_detail") {
        Users.findOne({ "restaurant._id": msg.res_id }, (err, restaurantuser) => {
            if (err) {
                res.status = 500;
                res.message = "Database Error";
            }
            if (restaurantuser) {
                res.status = 200;
                res.message = JSON.stringify(restaurantuser.restaurant);
            }
            callback(null, res);
        });
    }
    else if (msg.path === "restaurant_search") {
        Users.find({ is_owner: 1 }, (err, restaurantusers) => {
            if (err) {
                res.status = 500;
                res.message = "Database Error";
            }
            let restaurants = restaurantusers.map(user => user.restaurant);
            let searchresults = [];
            if (msg.searchinput === "_") {
                searchresults = restaurants;
            } else {
                restaurants.map(restaurant => {
                    if ((restaurant.res_name.toLowerCase().includes(msg.searchinput) || restaurant.res_cuisine.toLowerCase().includes(msg.searchinput)) && !searchresults.includes(restaurant))
                        searchresults.push(restaurant);
                    restaurant.menu_sections.map(menu_section => {
                        menu_section.menu_items.map(menu_item => {
                            if ((menu_item.item_name.toLowerCase().includes(msg.searchinput) || menu_item.item_description.toLowerCase().includes(msg.searchinput)) && !searchresults.includes(restaurant))
                                searchresults.push(restaurant);
                        });
                    });
                });
            }
            res.status = 200;
            if (searchresults.length > 0) {
                res.message = JSON.stringify(searchresults);
            }
            else {
                res.message = "NO_RECORD";
            }
            callback(null,res);
        });
    }
};

exports.handle_request = handle_request;