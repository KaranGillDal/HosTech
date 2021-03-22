const express=require('express');
const router=express.Router();
const Userprofile = require('../models/userprofile');
const mongoose=require('mongoose');
const Messages=require('../models/Singlemessages');
const TotalNumber=require('../models/Totalnumber');
const jwt=require('jsonwebtoken');

router.post('/:chkmet', (req, res, next)=>{
    const id=req.params.chkmet;
    console.log(id);
    console.log(req.body.input)
    console.log(req.body.pascode)
    if(id=='email'){
        Userprofile.find({email: req.body.input, passcode: req.body.pascode}).exec().then(
            result=>{
                if(result.length>0){
                    const token= jwt.sign(
                        {
                            userid: result[0].userid,
                            id: result[0]._id
                        },
                        "Speciallycreatedsecret"
                    );
                    res.status(201).json({
                        token: token,
                        userid: result[0].userid,
                        id: result[0]._id,
                        profileimage: result[0].profileimage,
                        name: result[0].name,
                        access: 'OK'
                    })
                }
                else{
                    res.status(401).json({
                        access: 'Not Allowed'
                    })
                }
            }
        )
    }
    else if(id=='phone'){
        Userprofile.find({phone: req.body.input, passcode: req.body.pascode}).exec().then(
            result=>{
                if(result.length>0){
                    const token= jwt.sign(
                        {
                            userid: result[0].userid,
                            id: userprofile._id
                        },
                        "Speciallycreatedsecret"
                    );
                    res.status(201).json({
                        token: token,
                        userid: result[0].userid,
                        id: result[0]._id,
                        profileimage: result[0].profileimage,
                        name: result[0].name,
                        access: 'OK'
                    })
                }
                else{
                    res.status(401).json({
                        access: 'Not Allowed'
                    })
                }
            }
        )
        
    }
    else{
        Userprofile.find({userid: req.body.input, passcode: req.body.pascode}).exec().then(
            result=>{
                if(result.length>0){
                    const token= jwt.sign(
                        {
                            userid: result[0].userid,
                            id: result[0]._id
                        },
                        "Speciallycreatedsecret"
                    );
                    res.status(201).json({
                        token: token,
                        userid: result[0].userid,
                        id: result[0]._id,
                        profileimage: result[0].profileimage,
                        name: result[0].name,
                        access: 'OK'
                    })
                }
                else{
                    res.status(401).json({
                        access: 'Not Allowed'
                    })
                }
            }
        )
    }
    
});

module.exports =router;