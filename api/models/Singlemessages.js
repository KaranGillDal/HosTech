const mongoose = require ('mongoose');

const SingleMessageScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    main_userprofid: [{type: mongoose.Schema.Types.ObjectId, ref :'Userprofile'}],
    mssages: [{type: mongoose.Schema.Types.ObjectId, ref :'IndMessage'}],
    latestmessage: {type: mongoose.Schema.Types.ObjectId, ref :'IndMessage'},
    type: String,
    Createby: String
});

module.exports = mongoose.model('SingleMessage', SingleMessageScheme);