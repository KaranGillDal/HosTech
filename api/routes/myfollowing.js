const express=require('express');
const router=express.Router();
const Following = require('../models/Following');

router.get('/:userid/:filter', (req, res, next)=>{
    const id=req.body.userid;
    const id1=req.params.userid;
    const id2=req.params.filter;
    console.log(id1+" "+id2)
    if(id2=='All'){
            Following.findOne({userid: id1})
            .populate('post')
            .exec()
            .then(doc =>{
                console.log(doc);
                res.status(201).json(
                    doc
                );
            }).catch(err=>{console.log(err);
                res.status(404).json(
                    "Something went wrong"
                );
            });}
    else{
    Following.findOne({userid: id1})
    .populate({
        path:'post',
        match: { type:  id2}
      })
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(201).json(
            doc
        );
    }).catch(err=>{console.log(err);
        res.status(404).json(
            "Something went wrong"
        );
    });
    }
});

module.exports =router;