const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Trending =require('../Db-Schemes/Trending')
const Post = require('../models/post')

router.post('/', (req, res, next)=>{
    const id=req.params.postid;
    var limit = req.body.limit;
    var page =req.body.page
    Trending.aggregate([
      {$lookup: {
        from: 'posts',
        localField: 'post',
        foreignField: '_id',
        as: 'post'
    }},
    {$unwind : "$post"},
  ]).sort({'post.date': -1}).skip(page*limit).limit(limit).exec().then(doc =>{
        res.status(201).json(
            doc
        );
    }).catch(err=>console.log(err));
});
router.post('/select/:selectid', (req, res, next)=>{
    const id=req.params.selectid;;
    var limit = 5;
    var page =0
    Post.aggregate([
        { $match: 
            { 
                $or:[{'type' : {'$regex':id, '$options': 'i' }},{'header' : {'$regex': id, '$options': 'i' }}, {'post' : {'$regex': id, '$options': 'i' }}]
        } 
    },
    ]).sort({'post.date': -1}).skip(page*limit).limit(limit).then(
        reslt=>{
          console.log(reslt);
          res.status(200).json(
            reslt
          );
        }
      )
});

module.exports =router;