const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
var gcm = require('node-gcm');
const DonationItem = require('../models/donationitem');
const DiscussionPost =require('../models/discussionpost')

router.post('/creatediscussionpost', (req, res, next) =>{
  const discussionpost = new DiscussionPost({
      _id: new mongoose.Types.ObjectId(),
      date: new Date(),
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      Comments: [],
      upvotes: [],
      downvotes: [],
      userid: req.body.userid,
      images: req.body.images,
      verifiedusers:[],
      verified: false
  });

  discussionpost.save().then(result=>{
      res.status(201).json(
       "Successful"
      );
  }).catch(err=>console.log(err))

  
});


router.get('/sendnot', (req, res,next)=>{
  var sender = new gcm.Sender('AAAAmRhZ4SA:APA91bExiVZw6bVkDik6MkH1V2OyVwGsVOvi7b416PO8QGRlp_bSWBRTm68wEAJclgNX_gmYZNgh99NSKG-YWMYXRGZutcoFsSiET5iEhuIXio-vaxprCZcyEEDXYBI6drGSyBVUQFWD');
  var message = new gcm.Message({
    data: { key1: 'msg1' }
  });
  var regTokens = ['f6MdJtpARG2PZvrmamxoUM:APA91bHSzLeVrijGITK3P_wlBTXiSSlIBmDKiwjAjLwFQ6yIb9STp8Qv3mS2SS73QQQwSJsAxWdhrcD3X0E4eTlv_XHUZGuYUp4HeAgeJjxkyDoY2c3cfGH1ZhNnp-HL8ulZSlfAGPWE'];
  sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if (err) console.error(err);
    else console.log(response);
  });
})

router.post('/selectall', (req, res, next)=>{
    console.log("hello")
    const id=req.params.selectid;
    var limit = req.body.limit;
    var page =req.body.page
    DiscussionPost.find().sort({'date': -1}).
    skip(page*limit).limit(limit).then(
        reslt=>{
            console.log(reslt)
          res.status(200).json(
            reslt
          );
        }
      )
});


router.get('/getdiscussionimage', (req, res, next)=>{
    var reslt=["https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/3184286/pexels-photo-3184286.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"]


    var item = reslt[Math.floor(Math.random() * reslt.length)];

      res.status(200).json(
        item
      );
});



router.get('/populartopics', (req, res, next)=>{
  var reslt=[{
      _id: 1,
      name:"Covid-19",
      image:"https://images.pexels.com/photos/3902732/pexels-photo-3902732.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  {
      _id:2,
      name:"Diabetes",
      image:"https://images.pexels.com/photos/5469026/pexels-photo-5469026.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  },
  {
      _id:4,
      name:"Diet\nManagement",
      image:"https://images.pexels.com/photos/6401655/pexels-photo-6401655.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  },
  {
      _id:3,
      name:"Yoga",
      image:"https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },

]

    res.status(200).json(
      reslt
    );
});




module.exports =router;