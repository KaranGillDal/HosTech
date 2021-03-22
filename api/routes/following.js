const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Following = require('../Db-Schemes/Following');

router.get('/:followingid', (req, res, next)=>{
    const id=req.params.postid;
    Following.findOne({userid: req.body.userid}).exec().then(doc =>{
        console.log(doc);
        res.status(201).json(
            doc
        );
    }).catch(err=>console.log(err));
});

module.exports =router;