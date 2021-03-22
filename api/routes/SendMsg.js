const express=require('express');
const router=express.Router();
const Userprofile = require('../models/userprofile');
const mongoose=require('mongoose');
const Messages=require('../models/messages');
const TotalNumber=require('../models/Totalnumber');
const SingMsg=require('../models/Singlemessages');
const Indmsg=require('../models/Individualmessage')
const e = require('express');

router.post('/normal/:userid', (req, res, next)=>{
    const id=req.params.userid;
    console.log("here152222222");
    Userprofile.findOne({userid: id}).exec().then(
        out=>{
            console.log(req.body.id+"here22222"+out.userid);
            SingMsg.find({main_userprofid: { $all : [out._id, req.body.id] }, type: 'normal'}).exec().then(
                result=>{
                    console.log(result)
                    if(result.length!=0){
                        console.log("here");
                            const indmsg = new Indmsg({
                                _id: mongoose.Types.ObjectId(),
                                message: req.body.message,
                                type: "Not-read",
                                sendto: id   
                            });
                            indmsg.save().then(
                                resul=>{
                                    result[0].latestmessage=indmsg;
                                    result[0].mssages.push(indmsg);
                                    result[0].save();
                                    console.log("herekkkkk"+result[0]);
                                }
                            )
                            TotalNumber.findOne({main_userprofid: out._id}).exec().then(
                                res1=>{
                                    res1.total_msg=res1.total_msg+1;
                                    res1.save();
                                }
                            ).catch(
                                error=>{
                                    console.log("---"+error);
                                }
                            )
                            TotalNumber.findOne({main_userprofid: req.body.id}).exec().then(
                                res1=>{
                                    res1.total_msg=res1.total_msg+1;
                                    res1.save()
                                }
                            ).catch(
                                error=>{
                                    console.log("=="+error);
                                }
                            )
                            console.log("last111");
                            res.status(201).json(
                                { 
                                    "Done": req.body.message
                                }
                            );
                    }
                    else{
                        console.log("here33");
                        const indmsg = new Indmsg({
                            _id: mongoose.Types.ObjectId(),
                            message: req.body.message,
                            type: "Not-read" ,
                            sendto: id   
                        });
                        const Singlemsg = new SingMsg({
                            _id: mongoose.Types.ObjectId(),
                            main_userprofid: [out._id, req.body.id],
                            mssages: [],
                            type: 'normal'
                        });
                        indmsg.save().then(
                            resul=>{
                                Singlemsg.mssages.push(indmsg);
                                Singlemsg.latestmessage=indmsg;
                                Singlemsg.save();
                            }
                        )
                        Messages.findOne({main_userprofid: out._id}).exec().then(
                            
                            output=>{
                                console.log(output)
                                output.mssagelist.push(Singlemsg._id);
                                output.save();
                            }
                        )
                        Messages.findOne({main_userprofid: req.body.id}).exec().then(
                            output=>{
                                console.log(output)
                                output.mssagelist.push(Singlemsg._id);
                                output.save();
                            }
                        )
                        TotalNumber.findOne({main_userprofid: out._id}).exec().then(
                            res1=>{
                                res1.total_msg++;
                                res1.save();
                            }
                        ).catch(
                            error=>{
                                console.log(error);
                            }
                        )
                        TotalNumber.findOne({main_userprofid: req.body.id}).exec().then(
                            res1=>{
                                res1.total_msg++;
                                res1.save()
                            }
                        ).catch(
                            error=>{
                                console.log(error);
                            }
                        )
                        res.status(201).json(
                            { 
                                "Done": req.body.message
                            }
                        );
                    }
                }
            ).catch(
                error=>{
                    console.log(error);
                }
            )
        }
    ).catch(
        error=>{
            console.log(error);
            res.status(404).json(
                "Something went wrong"
             );
        }
    )
});






router.post('/anon/', (req, res, next)=>{
    const id=req.body.senduserid;
    console.log("here123");
    Userprofile.findOne({userid: id}).exec().then(
        out=>{
            console.log("hii");
            SingMsg.find({_id: req.body.chatid}).exec().then(
                result=>{
                    console.log("hii------>>>>>>>>>"+ result+out._id+req.body.id+"  "+req.body.chatid);
                    if(result.length!=0 && !req.body.start){
                            console.log("here");
                            const indmsg = new Indmsg({
                                _id: mongoose.Types.ObjectId(),
                                message: req.body.message,
                                type: "Not-read",
                                sendto: id   
                            });
                            indmsg.save().then(
                                resul=>{
                                    result[0].latestmessage=indmsg;
                                    result[0].mssages.push(indmsg);
                                    result[0].save();
                                }
                            )
                            TotalNumber.findOne({main_userprofid: out._id}).exec().then(
                                res1=>{
                                    res1.total_msg=res1.total_msg+1;
                                    res1.save();
                                }
                            ).catch(
                                error=>{
                                    console.log(error);
                                }
                            )
                            TotalNumber.findOne({main_userprofid: req.body.id}).exec().then(
                                res1=>{
                                    res1.total_msg=res1.total_msg+1;
                                    res1.save()
                                }
                            ).catch(
                                error=>{
                                    console.log(error);
                                }
                            )
                            console.log("last");
                            res.status(201).json(
                                { 
                                    "Done": req.body.message
                                }
                            );
                    }
                    else{
                        console.log("here33");
                        const indmsg = new Indmsg({
                            _id: mongoose.Types.ObjectId(),
                            message: req.body.message,
                            type: "Not-read" ,
                            sendto: id   
                        });
                        const Singlemsg = new SingMsg({
                            _id: mongoose.Types.ObjectId(),
                            main_userprofid: [out._id, req.body.id],
                            mssages: [],
                            type:'anon',
                            Createby: req.body.userid
                        });
                        console.log("imhere")
                        indmsg.save().then(
                            resul=>{
                                Singlemsg.mssages.push(indmsg);
                                Singlemsg.latestmessage=indmsg;
                                Singlemsg.save();
                            }
                        )
                        Messages.findOne({main_userprofid: out._id}).exec().then(
                            output=>{
                                output.mssagelist.push(Singlemsg._id);
                                output.save();
                            }
                        )
                        Messages.findOne({main_userprofid: req.body.id}).exec().then(
                            output=>{
                                output.mssagelist.push(Singlemsg._id);
                                output.save();
                            }
                        )
                        TotalNumber.findOne({main_userprofid: out._id}).exec().then(
                            res1=>{
                                res1.total_msg++;
                                res1.save();
                            }
                        ).catch(
                            error=>{
                                console.log(error);
                            }
                        )
                        TotalNumber.findOne({main_userprofid: req.body.id}).exec().then(
                            res1=>{
                                res1.total_msg++;
                                res1.save()
                            }
                        ).catch(
                            error=>{
                                console.log(error);
                            }
                        )
                        res.status(201).json(
                            { 
                                "Done": req.body.message
                            }
                        );
                    }
                }
            ).catch(
                error=>{
                    console.log(error);
                }
            )
        }
    ).catch(
        error=>{
            console.log(error);
            console.log("hii3");
            res.status(404).json(
                "Something went wrong"
             );
        }
    )
});


module.exports =router;