const mongoose = require ('mongoose');
const AdoptionScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    images: [String],
    name: String,
    story: String,
    age: String,
    monthlycost: String,
    currency: String,
    medicines:[String],
    diseases:[String],
    fromhowlong: String,
    financial: String,
    medicaldata:[String],
    proofoffinancials:[String],
    approved: Boolean,
    deleted: Boolean,
    location: String,
    owner: String,
    contactdetails: String,
    savedby: [String]
});

AdoptionScheme.index({name:'text', diseases:'text', story: 'text'})
var di = mongoose.model('Adoption', AdoptionScheme);
di.syncIndexes();
module.exports = di