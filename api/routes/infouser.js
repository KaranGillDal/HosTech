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
    console.log("---->>>"+id)
    userprofile.findOne({userid: id}).exec().then(
        result=>{
            Follower.findOne({userid_mainuser: id})
            .populate({
                path: 'follower_userprofid',
                model: 'Userprofile',
                select: ['userid','profileimage', 'name'],
               }).exec()
            .then(
                followers=>{
                    Following.findOne({userid_mainuser: id})
                    .populate({
                        path: 'following_userprofid',
                        model: 'Userprofile',
                        select: ['userid','profileimage', 'name'],
                       }).exec().then(
                        followinguser=>{
                            blocked.findOne({userid_mainuser: id}).exec().then(
                                blockeduser=>{
                                    res.status(200).json(
                                        {
                                         "Blocked": blockeduser.userid_blocked,
                                         "Followers": followers.follower_userprofid,
                                         "Following": followinguser.following_userprofid
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            )
        }
    )
});

module.exports =router;