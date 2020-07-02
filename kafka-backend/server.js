var connection = new require('./kafka/connection');
//topics files
var Signup = require('./services/signup');
var Cart = require('./services/cart');
var Orders = require('./services/orders');
var Messages = require('./services/messages');
var Profile = require('./services/profile');
var Login = require('./services/login');
var MenuItems = require('./services/menuitems');
var MenuSections = require('./services/menusections');
var Uploads = require('./services/uploads');
var Restaurant = require('./services/restaurant');
var Passport = require('./services/passport');

const { mongoDB } = require('./config');
const mongoose = require('mongoose');
const fs = require('fs');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 500,
    bufferMaxEntries: 0
  };

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

fs.readdirSync(__dirname + '/dbSchema').forEach(filename => {
    if (~filename.indexOf('.js')) {
        require(__dirname + '/dbSchema/' + filename)
    }
});

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Kafka Server is running ');
    consumer.on('message', function (message) {
        console.log('Message received for ' + topic_name);
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signup", Signup);
handleTopicRequest("cart", Cart);
handleTopicRequest("orders", Orders);
handleTopicRequest("messages", Messages);
handleTopicRequest("profile", Profile);
handleTopicRequest("login", Login);
handleTopicRequest("menu_items", MenuItems);
handleTopicRequest("menu_sections", MenuSections);
handleTopicRequest("uploads", Uploads);
handleTopicRequest("restaurant", Restaurant);
handleTopicRequest("passport", Passport);