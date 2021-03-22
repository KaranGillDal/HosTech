const express=require('express');
const router=express.Router();
const Userprofile = require('../models/userprofile');
const mongoose=require('mongoose');
const Messages=require('../models/Singlemessages');
const TotalNumber=require('../models/Totalnumber');

router.get('/:chatid', (req, res, next)=>{
    const id=req.params.chatid;
    Messages.findOne({_id: id})
    .populate([
       {
        path: 'main_userprofid',
        model: 'Userprofile',
        select: ['userid','email'],
       },
       'mssages',
       'latestmessage'
    ])
    .exec().then(
        result=>{
            console.log(result);
            result.latestmessage.type='read';
           // result.mssages[result.mssages.length-1].type='read'
            result.latestmessage.save().then(
                res.status(201).json(
                    { 
                        result
                    }
                )
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