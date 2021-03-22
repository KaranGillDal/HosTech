const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const MedicalReport=require('../models/medicalreports');

router.post('/newmedicalreport', (req, res, next) =>{
    const medicalreport = new MedicalReport({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        name: req.body.name,
        type: req.body.type,
        userid: req.body.userid,
        url: req.body.url,
        parentfolder: req.body.parentfolder,
        description: req.body.description,
    });
        console.log("ksksk")
    medicalreport.save().then(result=>{
        res.status(201).json(
            result
        )
    }).catch(err=>console.log(err))
          
});


router.post('/selectall', (req, res, next)=>{
    console.log("hello")
    const id=req.params.selectid;
    var limit = req.body.limit;
    var page =req.body.page
    MedicalReport.find({parentfolder: req.body.parentfolder}).sort({'date': -1}).
    skip(page*limit).limit(limit).then(
        reslt=>{
            console.log(reslt)
          res.status(200).json(
            reslt
          );
        }
      )
});



module.exports =router;