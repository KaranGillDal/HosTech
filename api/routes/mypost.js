const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Post = require('../models/post');

router.get('/mypost', (req, res, next)=>{
    const id=req.params.postid;
    Post.findById(id).exec().then(doc =>{
        console.log(doc);
        res.status(201).json(
            doc
        );
    }).catch(err=>console.log(err));
});

module.exports =router;