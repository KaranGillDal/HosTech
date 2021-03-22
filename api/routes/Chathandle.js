const express=require('express');
const router=express.Router();
const Userprofile = require('../models/userprofile');
const mongoose=require('mongoose');
const Messages=require('../models/messages');
const TotalNumber=require('../models/Totalnumber');

router.post('/', (req, res, next)=>{
    console.log(req.body.userid);
    Userprofile.findOne({userid: req.body.userid}).exec().then(
        out=>{
            TotalNumber.findOne({main_userprofid: out._id}).exec().then(
                numt=>{
                    if(numt.total_msg!=numt.msg_last_sent || req.body.time=='first'){
                        Messages.findOne({main_userprofid: out._id})
                        .populate({ 
                            path: 'mssagelist',
                            populate: [{
                              path: 'main_userprofid',
                              model: 'Userprofile',
                              select: ['userid', 'profileimage'],
                            },{
                                path: 'latestmessage',
                                model: 'IndMessage'
                            }]
                         })
                        .exec().then(
                            result=>{
                                numt.msg_last_sent=numt.total_msg;
                                numt.save();
                                res.status(201).json(
                                    { 
                                        "Total Messages": numt.total_msg,
                                        "List": result.mssagelist
                                    }
                                );
                            }
                        )
                    }
                    else{
                        res.status(200).json(
                            {
                                "reply": "Nothing change"
                            }
                            
                        );
                    }
                }
            ).catch(
                error=>{
                    console.log(error);
                    res.status(404).json(
                        "Something went wrong"
                     );
                }
            )
        }
    ).catch(
        error=>{
            console.log(error);
            res.status(404).json(
                "Something went wrong"
             );
        }
    )
});


module.exports =router;