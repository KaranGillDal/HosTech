const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Userfollower = require('../models/userfollower');
const Userprofile = require('../models/userprofile');
const Follower = require('../models/followme');
const Following = require('../models/Ifollow');
const blocked = require('../models/blocked');
const userprofile = require('../models/userprofile');

router.get('/:userid', (req, res, next)=>{
    const id=req.params.userid;
    console.log(id);
    userprofile.findOne({userid: id}).exec().then(
        result=>{              
            res.status(200).json(
                result
              );                   
        }
    )
});

module.exports =router;