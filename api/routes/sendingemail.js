const express=require('express');
const router=express.Router();

router.post('/', (req, res, next)=>{
const mailgun = require("mailgun-js");
console.log(req.body.code);
const DOMAIN = "send.brilliantoo.com";
const mg = mailgun({apiKey: "8a420408dbff19585dfbfe11337e2758-203ef6d0-1f0bfdf3", domain: DOMAIN});
const data = {
	from: "Verification <support@send.brilliantoo.com>",
	to: req.body.email,
	subject: "Code verification",
	text: " Hello, \n\nYour Verification Code for Diafriendie is "+req.body.code+"\n\n\nRegards,\nDiafriendie "
};
mg.messages().send(data, function (error, body) {
	res.status(200).json({
		body
	  });
});

})
module.exports = router;