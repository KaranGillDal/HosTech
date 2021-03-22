const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Userfollower = require('../models/userfollower');
const Userprofile = require('../models/userprofile');
const Follower = require('../models/followme');
const Following = require('../models/Ifollow');
const followrequest = require('../models/requests');

router.post('/accept/:userid', (req, res, next)=>{
    const id=req.params.userid;
    req.userDatadec={
        id:req.body.id,
        userid:req.body.userid
    }

    followrequest.findOne({userid_mainuser: req.userDatadec.userid}).exec().then(
        reqst=>{
            if(reqst.userid_req.includes(id)){
                Follower.findOne({userid_mainuser: req.userDatadec.userid}).exec().then(
                    output=>{
                        if(output.userid_follower.includes(id)){
                            return res.status(201).json(
                                "Already a Follower"
                            );
                        }
                        else{
                            console.log(reqst);
                            Userprofile.findOne({userid: id}).exec().then(
                                out=>{
                                    console.log(out);
                                    reqst.req_userprofid.remove(out._id);
                                    reqst.userid_req.remove(id);
                                    reqst.save();
                                    output.follower_userprofid.push(out._id);
                                    output.userid_follower.push(id);
                                    output.save();
                                    Following.findOne({userid_mainuser: id}).exec().then(
                                        followingus=>{
                                            followingus.following_userprofid.push(req.userDatadec.id);
                                            followingus.userid_following.push(req.userDatadec.userid);
                                            followingus.save();
                                            res.status(201).json(
                                                "Request accepted Succefully"
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
                            
                        }
                    }
                )
            }
            else{
                res.status(201).json(
                    "No request from that user"
                );
            }
        }
    )
    
});
router.post('/reject/:userid', (req, res, next)=>{
    const id=req.params.userid;
    req.userDatadec={
        id:req.body.id,
        userid:req.body.userid
    }

    followrequest.findOne({userid_mainuser: req.userDatadec.userid}).exec().then(
        reqst=>{
            if(reqst.userid_req.includes(id)){
                Follower.findOne({userid_mainuser: req.userDatadec.userid}).exec().then(
                    output=>{
                        if(output.userid_follower.includes(id)){
                            return res.status(201).json(
                                "Already a Follower"
                            );
                        }
                        else{
                            console.log(reqst);
                            Userprofile.findOne({userid: id}).exec().then(
                                out=>{
                                    console.log(out);
                                    reqst.req_userprofid.remove(out._id);
                                    reqst.userid_req.remove(id);
                                    reqst.save();
                                
                                            res.status(201).json(
                                                "Request removed Succefully"
                                            );
                                        
                                    
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
                    }
                )
            }
            else{
                res.status(201).json(
                    "No request from that user"
                );
            }
        }
    )
    
});
module.exports =router;