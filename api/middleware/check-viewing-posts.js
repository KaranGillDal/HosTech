const jwt=require('jsonwebtoken');
const Userfollower = require('../models/userfollower');
module.exports = (req, res, next)=>{
    console.log("test");
    try{
        console.log("test");
        const token = req.headers.authorization.split(" ")[0];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userDatadec=decoded;
        console.log(req.userDatadec);
        const id=req.params.userid;
        console.log(id);
        Userfollower.find({userid_Ifollowid: decoded.userid, userid_followmeid: id}).exec().then(doc =>{
            console.log(doc);
            if(doc.length>=1 || decoded.userid==id){
                console.log("id");
                next();
            }
            else{
                return res.status(401).json({
                    "MESSAGE": "NOT ALLOWED1"
                })
            }
        }).catch(err=>{console.log(err),
            res.status(401).json({
                "MESSAGE": "NOT ALLOWED2"
            })
        });
        next();
    }
    catch(error){
        return res.status(401).json({
            "MESSAGE": "NOT ALLOWED"
        })
    }
};