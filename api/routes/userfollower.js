const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Userfollower = require('../models/userfollower');
const Userprofile = require('../models/userprofile');
const Follower = require('../models/followme');
const Following = require('../models/Ifollow');
const followrequest = require('../models/requests');

router.post('/:userid', (req, res, next)=>{
    const id=req.params.userid;
    req.userDatadec={
        id:req.body.id,
        userid:req.body.userid
    }
    Following.find({_id: req.userDatadec.id}).exec().then(
        output=>{
            if(output.length>0){
                if(output.userid_following.includes(id)){
                    return res.status(201).json(
                        "Already Following"
                    );
                }
            }
        }
    )
    Userprofile.find({userid: id})
    .exec()
    .then(
        followusr=>{
            if(followusr.length==0){
                res.status(505).json(
                    "Not possible"
                );
            }
            else{

                        followrequest.findOne({userid_mainuser: id}).exec().then(
                            reqst=>{
                                if(!reqst.req_userprofid.includes(req.userDatadec.id)){
                                        reqst.req_userprofid.push(req.userDatadec.id);
                                        reqst.userid_req.push(req.userDatadec.userid);
                                        reqst.save();
                                        Userprofile.findOne({userid: req.userDatadec.userid})
                                        .exec()
                                        .then(
                                            myusr=>{
                                                myusr.followreq.push(id);
                                                myusr.save()
                                            }
                                        )
                                        res.status(201).json(
                                            "Request sent Succefully"
                                        );
                                }
                                else{
                                    res.status(201).json(
                                        "Request already sent"
                                    );
                                }
                            }
                        )
            
            }
        }
    )
});

router.post('/remove/:userid', (req, res, next)=>{
    const id=req.params.userid;
    req.userDatadec={
        id:req.body.id,
        userid:req.body.userid
    }
    Following.find({_id: req.userDatadec.id}).exec().then(
        output=>{
            if(output.length>0){
                if(output.userid_following.includes(id)){
                    return res.status(201).json(
                        "Already Following"
                    );
                }
            }
        }
    )
    Userprofile.find({userid: id})
    .exec()
    .then(
        followusr=>{
            if(followusr.length==0){
                res.status(505).json(
                    "Not possible"
                );
            }
            else{

                        followrequest.findOne({userid_mainuser: id}).exec().then(
                            reqst=>{
                                //console.log(reqst.req_userprofid+"  "+req.userDatadec.id);
                                if(reqst.userid_req.includes(req.userDatadec.userid)){
                                       reqst.req_userprofid.splice(reqst.req_userprofid.indexOf(req.userDatadec.id),1);
                                       reqst.userid_req.splice(reqst.userid_req.indexOf(req.userDatadec.userid),1);
                                        
                                        reqst.save();
                                        Userprofile.findOne({userid: req.userDatadec.userid})
                                        .exec()
                                        .then(
                                            myusr=>{
                                               
                                                myusr.followreq.splice(myusr.followreq.indexOf(id+""),1)
                                                myusr.save()
                                            }
                                        )
                                        res.status(201).json(
                                            "Request removed Succefully"
                                        );
                                }
                                else{
                                    res.status(201).json(
                                        "No request"
                                    );
                                }
                            }
                        )
            
            }
        }
    )
});

module.exports =router;