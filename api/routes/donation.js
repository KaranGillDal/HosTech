const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const DonationItem = require('../models/donationitem');
const Userprofile = require('../models/userprofile');

const Carbsitem=require('../models/Carbsitem');

router.post('/createdonation', (req, res, next) =>{
    const donationItem = new DonationItem({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        images: req.body.images,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        medicationtype: req.body.medicationtype,
        owner: req.body.userid,
        contactdetails: req.body.contactdetails
    });
        console.log("ksksk")
        donationItem.save().then(result=>{
                res.status(201).json(
                    result
                )
           
        }).catch(err=>console.log(err))
          
});


router.post('/save/:userid', (req, res, next)=>{
    const id=req.params.userid;
    Userprofile.findById(id).exec().then(
        resp=>{
            DonationItem.findById(req.body.donationid).exec().then(
                donationres=>{
                    if(typeof resp.donationsaved!="undefined"){
                        if(!resp.donationsaved.includes(donationres._id)){
                            console.log("38")
                            resp.donationsaved.push(donationres)
                            resp.save().then(result1=>{
                                res.status(201).json(
                                    result1
                                );
                            }).catch(err=>console.log(err));
                        }
                        else{
                            console.log("47")
                            resp.save().then(result1=>{
                                res.status(201).json(
                                    "Already saved"
                                );
                            }).catch(err=>console.log(err));
                        }
                    }
                    else{
                        console.log("56")
                            resp.donationsaved=[donationres]
                            resp.donationsaved.push(donationres)
                            resp.save().then(result1=>{
                                res.status(201).json(
                                    result1
                                );
                            }).catch(err=>console.log(err));
                        }
                }
            )
        }
    )
})

router.post('/unsave/:userid', (req, res, next)=>{
    const id=req.params.userid;
    Userprofile.findById(id).exec().then(
        resp=>{
            DonationItem.findById(req.body.donationid).exec().then(
                donationres=>{
                    if(typeof resp.donationsaved!="undefined"){
                        if(resp.donationsaved.includes(donationres._id)){
                            console.log("38")
                            resp.donationsaved.remove(donationres)
                            resp.save().then(result1=>{
                                res.status(201).json(
                                    result1
                                );
                            }).catch(err=>console.log(err));
                        }
                        else{
                            console.log("47")
                            resp.save().then(result1=>{
                                res.status(201).json(
                                    "Already saved"
                                );
                            }).catch(err=>console.log(err));
                        }
                    }
                    else{
                            console.log("56")
                            resp.save().then(result1=>{
                                res.status(201).json(
                                    "ok"
                                );
                            }).catch(err=>console.log(err));
                        }
                }
            )
        }
    )
})



router.post('/selectall', (req, res, next)=>{
    console.log("hello")
    const id=req.params.selectid;
    var limit = req.body.limit;
    var page =req.body.page
    DonationItem.find().sort({'date': -1}).
    skip(page*limit).limit(limit).then(
        reslt=>{
            console.log(reslt)
          res.status(200).json(
            reslt
          );
        }
      )
});


router.get('/getdonation', (req, res, next)=>{
    var reslt=[{
        _id: 1,
        name:"Glucometer",
        image:"https://images.pexels.com/photos/1001897/pexels-photo-1001897.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    },
    {
        _id:2,
        name:"Insulin",
        image:"https://images.pexels.com/photos/6823483/pexels-photo-6823483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        _id:4,
        name:"Syringes",
        image:"https://images.pexels.com/photos/4210554/pexels-photo-4210554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        _id:3,
        name:"BP Monitor",
        image:"https://4.imimg.com/data4/MI/UM/MY-28276558/digital-bp-meter-machine-500x500.jpg"
    },
    {
        _id:5,
        name:"Weight Machine",
        image:"https://images-na.ssl-images-amazon.com/images/I/51TssoP1OTL._SL1010_.jpg"
    },

]




      res.status(200).json(
        reslt
      );
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
    DonationItem.find({
        $text: {
            $search: resultingstring
        }
    }, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).
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