const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Carbsitem=require('../models/Carbsitem');
var SpellChecker = require('simple-spellchecker');
const { db } = require('../models/Carbsitem');
sw = require('stopword');

router.post('/createcarbsitem', (req, res, next) =>{
    const post = new Carbsitem({
        _id: new mongoose.Types.ObjectId(),
        date: new Date(),
        userid: req.body.userid,
        image: req.body.image,
        foodname: req.body.foodname,
        foodname1: req.body.foodname1,
        foodbrand: req.body.foodbrand,
        quantity: req.body.quantity,
        unit: req.body.unit,
        carbs: req.body.carbs,
        nutrition: req.body.nutrition,
        tags:req.body.tags,
        whocansee: req.body.whocansee
    });
    post.save().then(
              res.status(201).json({
                status:"ok"
              })

      ).catch(err=>console.log(err))
   
});
router.post('/select/:selectid', (req, res, next)=>{
    console.log("hello")
    const id=req.params.selectid;
    var limit = req.body.limit;
    var page =req.body.page
    console.log(page+"  "+limit)
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