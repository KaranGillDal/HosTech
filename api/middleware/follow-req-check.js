const jwt=require('jsonwebtoken');
const userprofile=require('../models/userprofile');
module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[0];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userDatadec=decoded;
        userprofile.find({userid: decoded.userid}).exec().then(doc=>{
            console.log(doc);
            console.log(req.body.userid);
            if(doc.length>=1 && req.body.userid==decoded.userid){
                console.log("HELLO");
                next();
            }
            else{
                return res.status(401).json({
                    "message": "Unable to create post"
                })
            }
        }).catch(err=>{console.log(err),
            res.status(401).json({
                "message": "Unable to create post"
            })
        });
    }
    catch(error){
        return res.status(401).json({
            "MESSAGE": "NOT ALLOWED"
        })
    }
};