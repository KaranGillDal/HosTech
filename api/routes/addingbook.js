const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const AddingBook=require('../models/AddingBook');
var SpellChecker = require('simple-spellchecker');
const { db } = require('../models/Carbsitem');
sw = require('stopword');

router.post('/addlogs', (req, res, next) =>{

    var fulldate=req.body.date.split("T")[0]
    var now = new Date(req.body.date)
    var now1 = new Date(req.body.time)
    console.log(now.toISOString().split("T")[0]+"T"+now1.toISOString().split('T').slice(1).join('T'))
    var fulltime=now.toISOString().split("T")[0]+"T"+now1.toISOString().split('T').slice(1).join('T')
    const log = new AddingBook({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        time: req.body.time,
        fulltime: fulltime,
        bloodsugar: req.body.bloodsugar,
        bloodsugarunit: req.body.bloodsugarunit,
        bpsystolic: req.body.bpsystolic,
        bpdiastolic: req.body.bpdiastolic,
        weight: req.body.weight,
        weightunits: req.body.weightunits,
        medicine:req.body.medicine,
        exercise: req.body.exercise,
        mood:req.body.mood,
        note: req.body.note,
        noteimages: req.body.noteimages,
        carbsintake: req.body.carbsintake,
        userid: req.body.userid,
        mycarblist: req.body.mycarblist,
        bloodpressurediastoliccondition: req.body.diastoliclevel,
        bloodpressuresystoliccondition: req.body.systoliclevel,
        bloodsugarcondition: req.body.sugarlevel
    });
    log.save().then(
              res.status(201).json({
                status:"ok"
              })

      ).catch(err=>console.log(err))
   
});
router.post('/getlogs', (req, res, next) =>{
  var limit = req.body.limit;
  var page =req.body.page
    AddingBook.find().sort( { "fulltime": -1 } ).skip(page*limit).limit(limit).then(
        reslt=>{
            console.log(reslt)
          res.status(200).json(
            reslt
          );
        }
      )
   
});

router.post('/getstatistics', (req, res, next) =>{
  var current_date=new Date();
  current_date.setDate(current_date.getDate()-this.state.getdaynumber);
  console.log(current_date)
  console.log(current_date)
  var fulldata=current_date.toISOString().split("T")[0]+"T"+"18:30:00.000Z"
  console.log(fulldata)
  AddingBook.find({"fulltime" : { $gt : fulldata }}).sort( { "fulltime": -1 } ).then(
      reslt=>{
        res.status(200).json(
          reslt
        );  
      }
    )
});

// "$bloodsugarcondition"

router.post('/count', (req, res, next) =>{
  var current_date=new Date();
  current_date.setDate(current_date.getDate()-req.body.getdaynumber);
  console.log(current_date)
  console.log(current_date)
  var fulldata=current_date.toISOString().split("T")[0]+"T"+"18:30:00.000Z"
  console.log(fulldata)
  AddingBook.aggregate([ 
    {
      $match:{
        fulltime :{
          $gt : new Date(fulldata)
        },
        bloodsugar: {$gt:  0}
      }
    },
    { $group: { 
        _id: null, 
        total: { 
            $sum: "$bloodsugar" 
        },
        totalCount: { 
          $sum: 1
        } 
    } 
} ] ).then(
      reslt=>{
        res.status(200).json(
          reslt
        );  
      }
    )
});


router.post('/latestbloodsugar', (req, res, next) =>{
  AddingBook.find({bloodsugar: {$gt:  0}}).sort( { "fulltime": -1 } ).skip(0).limit(1).then(
      reslt=>{
        res.status(200).json({
          sugar: reslt[0].bloodsugar,
          unit: reslt[0].bloodsugarunit
          }
        );  
      }
    )
});






router.post('/bpcount', (req, res, next) =>{
  var current_date=new Date();
  current_date.setDate(current_date.getDate()-req.body.getdaynumber);
  console.log(current_date)
  console.log(current_date)
  var fulldata=current_date.toISOString().split("T")[0]+"T"+"18:30:00.000Z"
  console.log(fulldata)
  AddingBook.aggregate([ 
    {
      $match:{
        fulltime :{
          $gt : new Date(fulldata)
        },
        bpsystolic: {$gt:  '0'}
      }
    },
    { $group: { 
        _id: null, 
        Systolic: { 
            $sum: { $toInt: "$bpsystolic" }
        },
        Diastolic: { 
          $sum: { $toInt: "$bpdiastolic" }
        },
        totalCount: { 
          $sum: 1
        } 
    } 
} ] ).then(
      reslt=>{
        res.status(200).json(
          reslt
        );  
      }
    )
});



router.post('/lowupcount', (req, res, next) =>{
  var current_date=new Date();
  current_date.setDate(current_date.getDate()-req.body.getdaynumber);
  console.log(current_date)
  console.log(current_date)
  var fulldata=current_date.toISOString().split("T")[0]+"T"+"18:30:00.000Z"
  console.log(fulldata)
  AddingBook.aggregate([ 
    {
      $match:{
        fulltime :{
          $gt : new Date(fulldata)
        },
        bloodsugar: {$gt:  0}
      }
    },
    { $group: { 
        _id: "$bloodsugarcondition", 
        totalCount: { 
          $sum: 1
        } 
    } 
} ] ).then(
      reslt=>{
        res.status(200).json(
          reslt
        );  
      }
    )
});

router.post('/exercisestatistic', (req, res, next) =>{
  var current_date=new Date();
  current_date.setDate(current_date.getDate()-req.body.getdaynumber);
  console.log(current_date)
  console.log(current_date)
  var fulldata=current_date.toISOString().split("T")[0]+"T"+"18:30:00.000Z"
  console.log(fulldata)
  AddingBook.aggregate([ 
    {
      $match:{
        $expr: {$gt: [{$size: "$exercise"}, 0]}
      }
      
    },
    {
      $unwind: "$exercise"
    },
    { 
      $group: { 
      _id: null, 
      totalhours: { 
          $sum: "$exercise.hours" 
      },
      totalminutes: { 
        $sum: "$exercise.minutes" 
      },
    } 
  }
    
 ] ).then(
      reslt=>{
        res.status(200).json(
          reslt
        );  
      }
    )
});

router.get('/select/:selectid', (req, res, next)=>{
    console.log("hello")
    const id=req.params.selectid;
    var limit = 5;
    var page =0
    const oldString = id.split(' ')
    const newString = sw.removeStopwords(oldString)
    console.log(newString)
    var resultingstring="";
    var i;
        for (i = 0; i < newString.length; i++) { 
            resultingstring += ""+newString[i]+" "
        }
      
        console.log(resultingstring)
    Carbsitem.find({
        $text: {
            $search: resultingstring
        }
    }).
    skip(page*limit).limit(limit).then(
        reslt=>{
            console.log(reslt)
          res.status(200).json(
            reslt
          );
        }
      )
});
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports =router;