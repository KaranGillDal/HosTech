const mongoose = require ('mongoose');

const TotalMessageScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    main_userprofid: {type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'},
    msg_last_sent: Number,
    total_msg: Number
});

module.exports = mongoose.model('TotalMessage', TotalMessageScheme);