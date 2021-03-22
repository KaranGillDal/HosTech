const mongoose = require ('mongoose');

const MedicalReportScheme=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   name: String,
   type: String,
   userid: String,
   url: String,
   parentfolder: String,
   description: String,
   date: Date,
});
MedicalReportScheme.index({name:'text', description:'text'})
module.exports = mongoose.model('MedicalReport', MedicalReportScheme);
