const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const DonationItem = require('../models/donationitem');
const Adoption =require('../models/medicaladoption')
const Carbsitem=require('../models/Carbsitem');

router.post('/createadoption', (req, res, next) =>{
    const adoptionItem = new Adoption({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        images: req.body.images,
        name: req.body.name,
        story: req.body.story,
        age: req.body.age,
        monthlycost: req.body.monthlycost,
        currency: req.body.currency,
        medicines: req.body.medicines,
        diseases: req.body.diseases,
        fromhowlong: req.body.fromhowlong,
        medicaldata:req.body.medicaldata,
        proofoffinancials:req.body.proofoffinancials,
        contactdetails: req.body.contactdetails,
        approved: false,
        deleted: false,
        location: req.body.location,
        owner: req.body.userid,
        savedby:[]
    });
        console.log("ksksk")
        adoptionItem.save().then(result=>{
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
    Adoption.find().sort({'date': -1}).
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