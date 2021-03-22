const mongoose = require ('mongoose');

const NotificationScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid: String,
    notifications: [{'header': String, 'body':String}],
});

module.exports = mongoose.model('Notification', NotificationScheme);