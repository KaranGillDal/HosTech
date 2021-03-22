const mongoose = require ('mongoose');
const { text } = require('body-parser');
const CarbsitemScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: String,
    userid: String,
    image: [String],
    foodbrand: String,
    foodname1: String,
    foodname: String,
    quantity: Number,
    unit: String,
    carbs: Number,
    nutrition: [{name: String, quantity: Number}],
    tags: String,
    whocansee: String
}, { autoIndex: false });
CarbsitemScheme.index({foodbrand:'text', foodname:'text'})
var di = mongoose.model('Carbsitem', CarbsitemScheme);
di.syncIndexes();
module.exports = di