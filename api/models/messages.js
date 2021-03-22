const mongoose = require ('mongoose');

const MessageScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    main_userprofid: {type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'},
    mssagelist: [{type: mongoose.Schema.Types.ObjectId, ref :'SingleMessage'}]
});

module.exports = mongoose.model('Message', MessageScheme);