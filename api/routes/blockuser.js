const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Userfollower = require('../models/userfollower');
const Userprofile = require('../models/userprofile');
const Follower = require('../models/followme');
const Following = require('../models/Ifollow');
const blocked = require('../models/blocked');
const userprofile = require('../models/userprofile');

router.post('/:userid', (req, res, next)=>{
    const id=req.params.userid;
    blocked.findOne({userid_mainuser: "test1"})
    .exec()
    .then(
        mainusr=>{
            mainusr.userid_blocked.push(id);
            
            userprofile.findOne({userid: id}).exec().then(  
                blockingusr=>{      
                    mainusr.blocked_userprofid.push(blockingusr._id);
                    console.log(id);
                    mainusr.save().then(
                        res.status(401).json(
                            "User blocked"
                        )
                    ).catch(err=>{
                        res.status(505).json(
                            "Unable to block the user requested 1"
                        );
                    })
                }
            ).catch(err=>{
                console.log(err);
                res.status(505).json(
                    "Unable to block the user requested 2"
                );
            });
        }
    ).catch(err=>{
        res.status(505).json(
            "Unable to block the user requested"
        );
    });
});

module.exports =router;