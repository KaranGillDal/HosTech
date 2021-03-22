const mongoose = require ('mongoose');

const IndMessageScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: String,
    type: String,
    sendto: String
});

module.exports = mongoose.model('IndMessage', IndMessageScheme);