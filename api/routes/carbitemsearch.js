const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Carbsitem=require('../models/Carbsitem');
var SpellChecker = require('simple-spellchecker');
const { db } = require('../models/Carbsitem');
sw = require('stopword');


router.get('/get', (req, res, next)=>{
        var reslt=[{
            _id: 1,
            name:"Vegetable",
            image:"https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
            _id:2,
            name:"Chicken",
            image:"https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
            _id:4,
            name:"Desert",
            image:"https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
            _id:5,
            name:"Fruits",
            image:"https://images.pexels.com/photos/4838747/pexels-photo-4838747.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        } 
        ,
        {
            _id:6,
            name:"Dry Fruits",
            image:"https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        }    
    
    ]




          res.status(200).json(
            reslt
          );
});




module.exports =router;