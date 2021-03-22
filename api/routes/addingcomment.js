const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const MyPost = require('../models/mypost');
const comment = require('../models/comments');
const Post = require('../models/post');

router.post('/newcomment', (req, res, next)=>{
    const thiscomment = new comment({
        _id: mongoose.Types.ObjectId(),
        userid: req.body.userid,
        reply: [],
        rating: 0,
        like:[],
        postid: req.body.postid,
        comment: req.body.comment
    });
    console.log("ssss"+req.body.postid);
    Post.findById(req.body.postid).then(
        resultpost=>{
            if(typeof resultpost!='undefined'){
            resultpost.Comments.push(thiscomment);
            thiscomment.save().then(
                result=>{
                    resultpost.save().then(
                        res.status(201).json(
                            result
                        )
                    )
                }
            )
            }
        }
    ).catch(err=>console.log(err));
});

/*
 populate:{
            path: 'reply',
            model: 'Comments'
        }
*/ 
router.post('/getcomment/:commentid', (req,res,next)=>{
    const id=req.params.commentid;
    var limit = req.body.limit;
    var page =req.body.page
    Post.findById(id).populate({
        path: 'Comments',
        model: 'Comments'
       }).skip(page*limit).limit(limit)
    .then(
        resultpost=>{
            res.status(201).json(
                resultpost
            );
        }
    ).catch(err=>console.log(err));
})

router.post('/getrepliescomment/:commentid', (req,res,next)=>{
    const id=req.params.commentid;
    var limit = req.body.limit;
    var page =req.body.page
    comment.find({repliedtoid: id}).skip(page*limit).limit(limit)
    .then(
        resultpost=>{
            res.status(201).json(
                resultpost
            );
        }
    ).catch(err=>console.log(err));
})


router.post('/like/:commentid', (req,res,next)=>{
    const id=req.params.commentid;
    comment.findById(id)
    .then(
        resultpost=>{
            if(!resultpost.like.includes(req.body.userid)){
                resultpost.like.push(req.body.userid)
            }
            else{
                console.log("gggww");
            }
            resultpost.save().then(result1=>{
                res.status(201).json(
                    result1
                );
            }).catch(err=>console.log(err));
        }
    ).catch(err=>console.log(err));
})


router.post('/unlike/:commentid', (req,res,next)=>{
    const id=req.params.commentid;
    comment.findById(id)
    .then(
        resultpost=>{
            if(resultpost.like.includes(req.body.userid)){
                resultpost.like.remove(req.body.userid)
            }
            else{
                console.log("gggww");
            }
            resultpost.save().then(result1=>{
                res.status(201).json(
                    result1
                );
            }).catch(err=>console.log(err));
        }
    ).catch(err=>console.log(err));
})


router.post('/replycomment/current', (req, res, next)=>{
    const thiscomment = new comment({
        _id: mongoose.Types.ObjectId(),
        userid: req.body.userid,
        reply: [],
        rating: 0,
        postid: req.body.postid,
        comment: req.body.comment,
        repliedtoid: req.body.commentid,
        userid: req.body.userid
    });
    console.log("jjlllooooj")
    comment.findById(req.body.commentid).then(
        resultpost=>{
            console.log("jjj"+resultpost)
                resultpost.reply.push(thiscomment);
                resultpost.save().then(
                    result=>{
                        console.log("jjj")
                        thiscomment.save().then(
                            
                            res.status(201).json(
                                resultpost
                            )
                        )
                    }
                )
        }
    ).catch(err=>console.log(err));
});

module.exports =router;