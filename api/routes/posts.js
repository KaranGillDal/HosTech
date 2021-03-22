const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Post = require('../models/post');
const MyPost = require('../models/mypost');
const Following = require('../models/Following');
const followers = require('../models/followme');
const TopPost =require('../Db-Schemes/TopPost');
const postcheckauth = require('../middleware/check-viewing-posts');
const createpostcheck = require('../middleware/check-create-post');

router.get('/getpost/:postid', (req, res, next)=>{
    Post.findById(req.params.postid).populate('Comments').exec().then(
        post=>{
            res.status(201).json(
                post
            );
        }
    )
})

router.post('/verify/:userid', (req, res, next)=>{
    Post.findById(req.body.postid).exec().then(
        post=>{
            post.verifiedusers.push(req.params.userid)
            post.verified= true
            post.save()
            res.status(201).json(
                post
            );
        }
    )
})

router.post('/userid/:userid', (req, res, next)=>{
    
    const id=req.params.userid;
    if(req.body.filter!='All'){
    MyPost.findOne({userid: id})
    .populate({
        path:'post',
        match: { type:  req.body.filter}
      })
    .exec().then(doc =>{
        console.log(doc);
        res.status(201).json(
            doc
        );
    }).catch(err=>console.log(err));}
    else{
        MyPost.findOne({userid: id})
        .populate({
            path:'post'
          })
        .exec().then(doc =>{
            console.log(doc);
            res.status(201).json(
                doc
            );
        }).catch(err=>console.log(err));
    }
});

router.get('/following/:userid',(req,res,next)=>{
    const id=req.params.userid;
    Following.findOne({userid: id}).exec().then( 
        out=>{
            res.status(201).json(
                out
            );
        }
    ).catch( res.status(404).json(
        {
            "error": "Something went wrong"
        }
    ));
});

router.post('/like/:userid', (req, res, next)=>{
    const id=req.params.userid;
    Post.findById(req.body.postid).exec().then(
        resp=>{
            resp.like+=resp.like
            if(!resp.likelist.includes(id)){
                console.log("ggg");
                resp.likelist.push(id)
            }
            else{
                console.log("gggww");
            }
            resp.save().then(result1=>{
                res.status(201).json(
                    result1
                );
            }).catch(err=>console.log(err));
        }
    )
})

router.post('/unlike/:userid', (req, res, next)=>{
    const id=req.params.userid;
    Post.findById(req.body.postid).exec().then(
        resp=>{
            resp.like+=resp.like
            if(resp.likelist.includes(id)){
                console.log("ggg");
                resp.likelist.remove(id)
            }
            else{
                console.log("gggww");
            }
            resp.save().then(result1=>{
                res.status(201).json(
                    result1
                );
            }).catch(err=>console.log(err));
        }
    )
})

router.post('/rating', (req, res, next)=>{
    Post.findById(req.body.postid).exec().then(
        resp=>{
            if(resp.Rating.findIndex(el => el.userid === req.body.userid)>-1){
                console.log("dd");
                let trating=resp.TotalRating+req.body.rating
                resp.AverageRating=Math.round(trating/((resp.Rating.length+1)*5))
                resp.Rating[findIndex(el => el.userid === req.body.userid)]=({userid: req.body.userid, rating: req.body.rating})
                resp.TotalRating=resp.TotalRating+req.body.rating
                resp.save().then(result1=>{
                    res.status(201).json(
                        result1
                    );
                }).catch(err=>console.log(err));
            }
            else{
                let trating=resp.TotalRating+req.body.rating
                resp.AverageRating=Math.round(trating/((resp.Rating.length+1)*5))
                resp.Rating.push({userid: req.body.userid, rating: req.body.rating})
                resp.TotalRating=resp.TotalRating+req.body.rating
                resp.save().then(result1=>{
                    res.status(201).json(
                        result1
                    );
                }).catch(err=>console.log(err));
            }
        }
    )
})

router.post('/createpost', (req, res, next) =>{
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        date: new Date(),
        header: req.body.header,
        post: req.body.post,
        type: req.body.type,
        Added: req.body.added,
        Comments: [],
        Rating: [],
        like: 0,
        likelist:[],
        AverageRating:0,
        Suggestions: [],
        TotalRating:0,
        userid: req.body.userid,
        userimage: req.body.userimage,
        authorization: req.body.authorization,
        tags: req.body.tags,
        awards: [],
        verified: false,
        anonymous: req.body.anonymous,
        imageurl: req.body.imageurl
    });
    console.log("llllll")
    MyPost.findOne({userid: req.body.userid})
    .populate('post')
    .exec()
    .then(doc =>{
        post.save().then(result=>{
            doc.post.push(post._id);
            doc.save().then(result1=>{
                res.status(201).json(
                    result1
                );
            }).catch(err=>console.log(err));
            if(req.body.authorization == "Private"){
                followers.findOne({userid_mainuser: req.body.userid}).exec().then(
                    result =>{
                        const userfollower = result.userid_follower;
                        console.log("------"+userfollower);
                        console.log("------"+req.body.userid);
                        console.log("hhhh");
                        for(var i=0; i<userfollower.length; i++){
                            Following.findOne({userid: userfollower[i]}).exec().then( 
                                out=>{
                                    console.log(out);
                                    out.post.push(post);
                                    out.save();
                                }
                            ).catch(err=>console.log(err));
                        }
                    }
                )
            }
            else{
                followers.findOne({userid_mainuser: req.body.userid}).exec().then(
                    result =>{
                        const userfollower = result.userid_follower;
                        console.log("------"+userfollower+ req.body.userid);
                        console.log("hhhh");
                        for(var i=0; i<userfollower.length; i++){
                            Following.findOne({userid: userfollower[i]}).exec().then( 
                                out=>{
                                    console.log(out);
                                    out.post.push(post);
                                    out.save();
                                }
                            ).catch(err=>console.log(err));
                        }
                    }
                )
                TopPost.findById('5f9017cd43ee0e0004340bf2').exec().then(
                    res=>{
                        res.post.push(post);
                        res.save();
                    }
                ).catch(err=>console.log(err));
            }
        }).catch(err=>console.log(err));
    }).catch(err=>console.log(err));
});



router.post('/select/:selectid', (req, res, next)=>{
    const id=req.params.selectid;
    var limit = req.body.limit;
    var page =req.body.page
    const oldString = id.split(' ')
    const newString = sw.removeStopwords(oldString)
    var resultingstring="";
    var i;
        for (i = 0; i < newString.length; i++) { 
            resultingstring += ""+newString[i]+" "
        }
      
        console.log(resultingstring)
    Post.find({
        $text: {
            $search: resultingstring
        }
    }).sort( { score: { $meta: "textScore" } } ).
    skip(page*limit).limit(limit).then(
        reslt=>{
          res.status(200).json(
            reslt
          );
        }
      )
});



module.exports =router;