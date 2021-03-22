const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const conn=require('../app');

router.get('/', (req, res, next)=>{
    mongoode.connection.once('open', () => {
        // Init stream
        gfs = Grid(connection.db, mongoose.mongo);  
        gfs.collection('uploads');
      });
    Post.findById(id).exec().then(doc =>{
        console.log(doc);
        res.status(201).json(
            doc
        );
    }).catch(err=>console.log(err));
});

module.exports =router;