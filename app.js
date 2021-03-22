const express = require('express');
const mongoose = require('mongoose');
const app = express();
const post = require('./api/routes/posts');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./api/routes/profile')
const signup=require('./api/routes/userprofile')
const follow=require('./api/routes/userfollower')
const myfollowing=require('./api/routes/myfollowing')
const followrequest = require('./api/models/requests');
const blocking=require('./api/routes/blockuser')
const viewprofile=require('./api/routes/viewprofile')
const addingcomment=require('./api/routes/addingcomment')
const requesthand=require('./api/routes/requesthanding')
const chathandle=require('./api/routes/Chathandle')
const msgsend=require('./api/routes/SendMsg')
const Userprofile = require('./api/models/userprofile');
const Report = require('./api/models/report')
const TopPost =require('./api/Db-Schemes/TopPost')
const Trending =require('./api/Db-Schemes/Trending')
const Post =require('./api/models/post')
const sendemail=require('./api/routes/sendingemail')
const crypto=require('crypto')
const multer=require('multer')
const GridFsStorage=require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const imageget=require('./imagehandle/imagesget')
const viewchat=require('./api/routes/Viewchat')
const userinfo=require('./api/routes/infouser')
const checking=require('./api/routes/checking')
const trending=require('./api/routes/trending')
const carbitementering=require('./api/routes/Carbentering')
const carbitemsearch=require('./api/routes/carbitemsearch')
const Notification= require('./api/models/Notification')
const donation=require('./api/routes/donation')
const talkinghosi=require('./api/routes/talkinghosi')
const addingbook= require('./api/routes/addingbook')
const medicalreport = require('./api/routes/medicalreport')
const medicaladoption =require('./api/routes/medicaladoption')
const discussion = require('./api/routes/discussion')
var ObjectId = mongoose.Types.ObjectId;



app.use(morgan('dev'));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(res.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const url=`mongodb+srv://HosTech_CEO:8PkRXBMFcJBlZkZa@cluster0.lpykc.mongodb.net/HosTechDB?retryWrites=true&w=majority`
const connection=mongoose.connect(url, {
    useNewUrlParser : true    },
    err => {
    if (err){
        console.error('Error11: ' + err)
    }
    else{
        console.log('Connected to MongoDb')
    }
})

let gfs
mongoose.connection.once('open', () => {
    // Init stream
    console.log("test");
    gfs = Grid(mongoose.connection.db, mongoose.mongo);  
    gfs.collection('uploads');
  });
const storage = new GridFsStorage({
    url: `mongodb+srv://HosTech_CEO:8PkRXBMFcJBlZkZa@cluster0.lpykc.mongodb.net/HosTechDB?retryWrites=true&w=majority`,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
          const filename = file.originalname;
          console.log("hh");
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
      });
    }
  });
const upload=multer({storage});


  

app.use('/talkinghosi', talkinghosi)
app.use('/carbitemsearch', carbitemsearch);
app.use('/signup', signup);
app.use('/carbentering', carbitementering);
app.use('/donation', donation)
app.use('/posts', post);
app.use('/follow', follow);
app.use('/followreq', requesthand);
app.use('/block', blocking);
app.use('/viewprofile', viewprofile);
app.use('/comment', addingcomment);
app.use('/Following', myfollowing);
app.use('/profile', profile);
app.use('/directchat', chathandle);
app.use('/messages', msgsend);
app.use('/viewchat', viewchat);
app.use('/userinfo', userinfo);
app.use('/sendemail', sendemail)
app.use('/login', checking)
app.use('/trending', trending)
app.use('/addingbook', addingbook)
app.use('/medicalreport', medicalreport)
app.use('/medicaladoption', medicaladoption)
app.use('/discussion', discussion)
app.post('/report', (req, res, next)=>{
  const report = new Report({
    _id: new mongoose.Types.ObjectId(),
    userid: req.body.userid,
    report: req.body.report,
  });
  report.save()
    res.status(201).json(
      "Ok"
    )
 
})
app.post('/verifyusersp/:userid', (req,res,next)=>{
  const mailgun = require("mailgun-js");
  const id=req.params.userid;
  Userprofile.find({userid: id}).exec().then(
    result=>{
      const DOMAIN = "send.brilliantoo.com";
      const mg = mailgun({apiKey: "8a420408dbff19585dfbfe11337e2758-203ef6d0-1f0bfdf3", domain: DOMAIN});
      const data = {
        from: "Verification <support@send.brilliantoo.com>",
        to: "gillpag102@gmail.com",
        subject: "User Verification Urgent",
        text: " Hello, \n\nPlease verify me, My name is: "+result[0].name+ " my email: "+result[0].email+"\n\n\nRegards,\n"
      };
      mg.messages().send(data, function (error, body) {
        res.status(201).json({
          updated: 'OK'
      })
      });
    }
  )

})
app.post('/notification', (req, res, next)=>{
  Notification.find({userid: req.body.userid}).exec().then(
    result=>{
      res.status(201).json(
        result
      )
    }
  )
})

const jwt=require('jsonwebtoken');

app.get('/requests/:userid', (req, res,next)=>{
  const id=req.params.userid;
  followrequest.findOne({userid_mainuser: id})
  .populate({
    path: 'follower_userprofid',
    model: 'Userprofile',
    select: ['userid','profileimage', 'name'],
   })
  .exec().then(
    reqst=>{
      res.status(201).json(
        reqst
      );
    })
})


app.post('/updateprofile/:userid', (req, res, next)=>{
  const id=req.params.userid;
  Userprofile.find({userid: id}).exec().then(
    result=>{
      result[0].name=req.body.name;
      result[0].bio=req.body.bio;
      result[0].thoughtlike=req.body.thought;
      result[0].skills=req.body.skill;
      result[0].interests=req.body.interests;
      result[0].location=req.body.location
      result[0].save()
      res.status(201).json({
        updated: 'OK'
    })
    }
  )
})

app.post('/updateprofile/skills/:userid', (req, res, next)=>{
  const id=req.params.userid;
  Userprofile.find({userid: id}).exec().then(
    result=>{
      result[0].skills=req.body.skill;
      result[0].save()
      res.status(201).json({
        updated: 'OK'
    })
    }
  )
})
app.post('/updateprofile/thought/:userid', (req, res, next)=>{
  const id=req.params.userid;
  Userprofile.find({userid: id}).exec().then(
    result=>{
      result[0].thoughtlike=req.body.thought;
      result[0].save()
      res.status(201).json({
        updated: 'OK'
    })
    }
  )
})
app.post('/updateprofile/userinfo/:userid', (req, res, next)=>{
  const id=req.params.userid;
  Userprofile.find({userid: id}).exec().then(
    result=>{
      result[0].profession=req.body.profession;
      result[0].age=req.body.age;
      result[0].gender=req.body.gender;
      result[0].timediabetes=req.body.timediabetes;
      result[0].degree=req.body.degree;
      result[0].timeeducator=req.body.timeeducator;
      result[0].location=req.body.location
      result[0].save()
      res.status(201).json({
        updated: 'OK'
    })
    }
  )
})
app.post('/updatepassword/:chk', (req,res)=>{
  const id=req.params.chk;
  console.log(id);
  console.log(req.body.input)
  console.log(req.body)
  if(id=='email'){
      Userprofile.find({email: req.body.input}).exec().then(
          result=>{
              if(result.length>0){
                  result[0].passcode=req.body.passcode
                  result[0].save()
                  const token= jwt.sign(
                      {
                          userid: result[0].userid,
                          id: result[0]._id
                      },
                      "Speciallycreatedsecret"
                  );
                  console.log()
                  res.status(201).json({
                      token: token,
                      userid: result[0].userid,
                      profileimage: result[0].profileimage,
                      name: result[0].name,
                      access: 'OK'
                  })
              }
              else{
                  res.status(401).json({
                      access: 'Not Allowed'
                  })
              }
          }
      )
  }
  if(id=='phone'){
      Userprofile.find({phone: req.body.input}).exec().then(
          result=>{
              if(result.length>0){
                result[0].passcode=req.body.passcode
                  result[0].save()
                  const token= jwt.sign(
                      {
                          userid: result[0].userid,
                          id: result[0]._id
                      },
                      "Speciallycreatedsecret"
                  );
                  res.status(201).json({
                      token: token,
                      userid: result[0].userid,
                      profileimage: result[0].profileimage,
                      name: result[0].name,
                      access: 'OK'
                  })
              }
              else{
                  res.status(401).json({
                      access: 'Not Allowed'
                  })
              }
          }
      )
      
  }
  if(id=='userid'){
    Userprofile.find({userid: req.body.userid}).exec().then(
      result=>{
          if(result.length>0){
              result[0].passcode=req.body.passcode
              result[0].save()
             
              res.status(201).json({
                  access: 'OK'
              })
          }
          else{
              res.status(401).json({
                  access: 'Not Allowed'
              })
          }
      }
  )
  }
})
app.get('/alluserid', (req,res)=>{
  Userprofile.find({}, {_id:0, userid:1, profileimage:1, profession:1, name:1}).exec().then(
    response=>{
      res.status(200).json({
        response
      });
    }
  )
})

app.get('/allemailid', (req,res)=>{
  Userprofile.find({}, {email:1, _id:0, phone:1, userid:1}).exec().then(
    response=>{
      res.status(200).json({
        response
      });
    }
  )
})
var fs=require('fs')
app.use(express.static(__dirname+'/api/staticfolder/html'));
app.get('/privacypolicy', (req,res)=>{
  res.writeHead(200, {'Content-Type': 'text/html'});
 fs.readFile('./api/staticfolder/html/Policy.html', null, function(error,data){
   if(error){

   }
   else{
     res.write(data);
   }
   res.end()
 });
})
app.get('/termsofuse', (req,res)=>{
  res.writeHead(200, {'Content-Type': 'text/html'});
 fs.readFile('./api/staticfolder/html/Terms.html', null, function(error,data){
   if(error){

   }
   else{
     res.write(data);
   }
   res.end()
 });
})

app.get('/contact', (req,res)=>{
  res.writeHead(200, {'Content-Type': 'text/html'});
 fs.readFile('./api/staticfolder/html/Contact.html', null, function(error,data){
   if(error){

   }
   else{
     res.write(data);
   }
   res.end()
 });
})


app.get('/', (req,res)=>{
  res.writeHead(200, {'Content-Type': 'text/html'});
 fs.readFile('./api/staticfolder/html/Home.html', null, function(error,data){
   if(error){

   }
   else{
     res.write(data);
   }
   res.end()
 });
})

app.get('/communityguidelines', (req,res)=>{
  res.writeHead(200, {'Content-Type': 'text/html'});
 fs.readFile('./api/staticfolder/html/Community.html', null, function(error,data){
   if(error){

   }
   else{
     res.write(data);
   }
   res.end()
 });
})
app.get('/allphone', (req,res)=>{
  Userprofile.find({}, {phone:1, _id:0}).exec().then(
    response=>{
      res.status(200).json({
        response
      });
    }
  )
})

app.post('/Recent/:selectid', (req,res)=>{
  const id=req.params.selectid;
    var limit = req.body.limit;
    var page =req.body.page
  Post.find().sort({'date': -1}).skip(page*limit).limit(limit).then(
    reslt=>{
      console.log(reslt);
      res.status(200).json(
        reslt
      );
    }
  )  
})

app.post('/Top/:selectid',(req,res)=>{
  const id=req.params.selectid;
  if(id!='All'){
    var limit = req.body.limit;
    var page =req.body.page
    console.log("wwwwwww"+id);
  TopPost.aggregate([
    {$unwind : "$post"},
    {$lookup: {
      from: 'posts',
      localField: 'post',
      foreignField: '_id',
      as: 'post'
  }},
    { $match: { 'post.type' : id } },
]).skip(page*limit).limit(limit).then(
    reslt=>{
      console.log(reslt);
      res.status(200).json(
        reslt
      );
    }
  )
  }
  else{
    var limit = req.body.limit;
    var page =req.body.page
    console.log("====>>"+limit+page);
    TopPost.aggregate([
      {$unwind : "$post"},
      {$lookup: {
        from: 'posts',
        localField: 'post',
        foreignField: '_id',
        as: 'post'
    }}
  ]).skip(page*limit).limit(limit).then(
       reslt=>{
         //console.log(reslt);
        res.status(200).json(
          reslt
        );
      }
    )
  }
})
app.post('/firstinititae', (req, res)=>{
  console.log(req.body.file)
  const topost = new TopPost({
    _id: mongoose.Types.ObjectId(),
    post: []   
  });
  topost.save().then(doc =>{
    res.status(200).json({
    });
  }).catch(err=>{console.log(err)})
})

app.post('/trendinginititae', (req, res)=>{
  const trending = new Trending({
    _id: mongoose.Types.ObjectId(),
    post: []   
  });
  trending.save().then(doc =>{
    res.status(200).json({
      id: trending._id
    });
  }).catch(err=>{console.log(err)})
})

app.post('/trendingpost', (req, res)=>{
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    date: new Date(),
    header: req.body.header,
    post: req.body.post,
    type: req.body.type,
    Added: req.body.added,
    Comments: [],
    Rating: [],
    AverageRating:0,
    Suggestions: [],
    TotalRating:0,
    userid: req.body.userid,
    authorization: req.body.authorization,
    tags: req.body.tags,
    awards: [],
    anonymous: req.body.anonymous,
    imageurl: "https://diafriendie.herokuapp.com/pic/"+req.body.imageurl
});
    post.save().then(
            Trending.findById('5f9017d343ee0e0004340bf3').exec().then(doc =>{
              console.log(doc);
              doc.post.push(post)
                doc.save().then(result =>{
                  res.status(201).json(
                  
                  );
                }).catch(err=>{console.log(err)})
    
          }).catch(err=>console.log(err))
    )
 
})

app.post('/uploadpostpic', upload.single('file'),(req, res)=>{
    console.log("helloaa");  
    console.log(req.file.id);
    res.status(200).json({
      file: req.file.id
    });
});
app.post('/uploadpostpic/more', upload.array('file', 2), (req, res, next) => {
  console.log(req.file.id);
  res.status(200).json({
    file: req.file.id
  });
})

app.post('/uploaduserdp', upload.single('file'),(req, res)=>{
  console.log("hello"); 
  console.log(req.body.userid);  
  Userprofile.findOne({userid: req.body.userid}).exec().then(
    out=>{
      out.profileimage="https://diafriendie.herokuapp.com/pic/"+req.file.id;
      out.save()
    }
  )
  console.log(req.file.id)
  res.json({file:req.file.id})
});


app.get('/uploaduserdp/blank/:userid',(req, res)=>{
  console.log(req.params.userid)
  Userprofile.findOne({userid: req.params.userid}).exec().then(
    out=>{
      out.profileimage="https://diafriendie.herokuapp.com/pic/5f9017f243ee0e0004340bf4"
      out.save()
    }
  )
  //console.log(req.file.id)
  res.json("ok")
});

app.get('/pic/:picid', (req,res)=>{
          const id=req.params.picid;
          console.log("hello"); 
          let o_id = new ObjectId(id);
          gfs.files.findOne({ "_id": o_id }, (err, file) => {
            // Check if the input is a valid image or not
            
            if (!file || file.length === 0) {
              return res.status(404).json({
                err: 'No file exists'
              });
            }
            // If the file exists then check whether it is an image
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
              // Read output to browser
              const readstream = gfs.createReadStream(file.filename);
              readstream.pipe(res);
            } else {
              const readstream = gfs.createReadStream(file.filename);
              readstream.pipe(res);
            }
          });
          console.log("hello"); 
  });
  

app.use((res,req,next)=>{
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});



module.exports = app;