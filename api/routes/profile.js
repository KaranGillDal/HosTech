const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const MyPost = require('../models/mypost');

router.post('/new-mypost', (req, res, next)=>{
    const mypost = new MyPost({
        _id: new mongoose.Types.ObjectId(),
        userid: req.body.userid
    });
    mypost.save().then(result=>{
        console.log("done");
        res.status(201).json(
            "done"
        );
    });
});

module.exports =router;