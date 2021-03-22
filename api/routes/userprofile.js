const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Userprofile = require('../models/userprofile');
const Mypost=require('../models/mypost');
const Following = require('../models/Following');
const followme= require('../models/followme');
const Ifollow= require('../models/Ifollow');
const followrequest = require('../models/requests');
const Notification = require('../models/Notification');
const blockeduser = require('../models/blocked');
const Messages=require('../models/messages');
const TotalMessages=require('../models/Totalnumber');
const jwt=require('jsonwebtoken');

router.post('/newuser', (req, res, next)=>{
    console.log("ooooo")
    Userprofile.find({email: "test@gmail.com"})
    .exec()
    .then(result=>{
        if(result.length>=1){
            res.status(505).json(
                "The above id already exist"
            );
        }
        else{
                const _id=new mongoose.Types.ObjectId();
                const userprofile = new Userprofile({
                    _id: _id,
                    userid: _id,
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    verification: req.body.verification,
                    verified: false,
                    admin: false,
                    age: req.body.age,
                    diseases: req.body.diseases,
                    timesuffering: req.body.suffering,
                    reasontojoin: req.body.reasontojoin,
                    deviceid: req.body.deviceid,
                    gender: req.body.gender,
                    registeredas: req.body.registeredas,
                    profession: req.body.profession,
                    diseases: req.body.diseases,
                    deviceid: req.body.deviceid
                });
            
           
            const mypost = new Mypost({
                _id: new mongoose.Types.ObjectId(),
                userid: userprofile.userid,
                post:[]
            });
            const following = new Following({
                _id: new mongoose.Types.ObjectId(),
                userid: userprofile.userid,
                post:[]
            });
            const userfollowers = new followme({
                _id: new mongoose.Types.ObjectId(),
                main_userprofid: userprofile._id,
                userid_mainuser: userprofile.userid,
                follower_userprofid: [],
                userid_follower: []
            });
            const userfollowing = new Ifollow({
                _id: new mongoose.Types.ObjectId(),
                main_userprofid: userprofile._id,
                userid_mainuser: userprofile.userid,
                following_userprofid: [],
                userid_following: []
            });
            const Reqfollow = new followrequest({
                _id: mongoose.Types.ObjectId(),
                main_userprofid: userprofile._id,
                userid_mainuser: userprofile.userid,
                req_userprofid: [],
                userid_req: []
            });
            const userblocked = new blockeduser({
                _id: mongoose.Types.ObjectId(),
                main_userprofid: userprofile._id,
                userid_mainuser: userprofile.userid,
                blocked_userprofid: [],
                userid_blocked: [] 
            });
            const UserMessages = new Messages({
                _id: mongoose.Types.ObjectId(),
                main_userprofid: userprofile._id,
                mssagelist: []   
            });
            const TotUserMessages = new TotalMessages({
                _id: mongoose.Types.ObjectId(),
                main_userprofid: userprofile._id,
                msg_last_sent: 0,
                total_msg: 0   
            })
            const notifi = new Notification({
                _id: mongoose.Types.ObjectId(),
                notifications: [{'header': 'Welcome','body': 'Welcome'}]  
            })
            userprofile.save().then(doc =>{
                
                const token= jwt.sign(
                    {
                        userid: req.body.userid,
                        id: userprofile._id
                    },
                    "Speciallycreatedsecret"
                );
                console.log("here1")
                following.save().then(
                    mypost.save().then(
                        userfollowing.save().then(
                            userfollowers.save().then(
                                Reqfollow.save().then(
                                    userblocked.save().then(
                                        UserMessages.save().then(
                                            TotUserMessages.save().then(
                                                notifi.save().then(
                                                res.status(201).json({
                                                    token: token,
                                                    userid: _id,
                                                    name: req.body.name
                                                })
                                                ).catch(error=>console.log("Unable to create Notification user page"))
                                            ).catch(error=>console.log("Unable to create Total Messages user page"))
                                        ).catch(error=>console.log("Unable to create Messages user page"))
                                    ).catch(error=>console.log("Unable to create block user page"))
                                ).catch(error=>console.log("Unable to create follow request page"))
                            ).catch(error=>console.log("Unable to create follower page"))
                        ).catch(error=>console.log(error))
                    ).catch(error=>console.log("Unable to create mypost page"))
                ).catch(error=>console.log("Unable to create following page"))
            }).catch(err=>{
                console.log(err)
                res.status(505).json(
                    "Unable to register the user, Please try again"
                );
            });
        }
    }).catch(err=>{
        console.log(err)
        res.status(505).json(
            "Unable to register the user, Please try again"
        );
    });
});

module.exports =router;