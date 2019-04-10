var express = require('express'),
bodyParser = require('body-parser');
var multer = require('multer');
const request=require('request');

// to save data
const User=require('../Model/usermodel');
const router=express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
	 
	  // var upload_path=req.upload_path;
	  
    cb(null, './project_summery');  
    // cb(null, upload_path);  
  },
  filename: function (req, file, cb) {
	  // console.log(file);
	  // return false;
    cb(null,  file.fieldname + '_' + Date.now()+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})
 
// var upload = multer({ storage: storage })
var upload = multer({ dest: 'uploads/' });
router.post('/register',function(req,res,next){
	 // return false;    
	 
	if(req.body)
	{
		console.log(req.body);
		  var tdata= User.findOne().sort({user_id:-1}).select({_id:1,user_id:1}).then(function(tdata){
			    // console.log(tdata);
			    if (tdata) {
                   var countuser=tdata.user_id+1;
                 }else {
                   var countuser=1;
                 }

                   if (countuser=='') {
                       var countuser=1;
                   }
                    req.body.user_id=countuser;
                   req.body._id=countuser;
				 //  console.log(req.body);
				    var project_id=req.project_id=Date.now();
				 User.create(req.body).then(function(newuser){
					 if(newuser)
					 {
						// var user_email=req.body.email;
						// var user_email='click4mayank@gmail.com';
						var user_email=newuser.email;
						// lib to send email 
						var text="";
						var nodemailer = require('nodemailer');
						var transporter = nodemailer.createTransport({
										  service: 'gmail',
										  auth: {
											user: 'sciencefair.region1@gmail.com',
											pass: 'donthack@123'
										  }
										});
						 // setup email data with unicode symbols
						let mailOptions = {
							 from: 'sciencefair.region1@gmail.com', // sender address
							to:user_email, // list of receivers
							subject: 'Registration Mail', // Subject line
							//text: 'Hello world?', // plain text body
							html: '<div>HI,</br><p>Thank you for registering in Upper fair at msseicencefairs.com. Every Project is assigned with a unique project Id, which acts as team’s address till the result day of science fair. Assigned Project ID:'+project_id+'</p><p>For any other questions email us at sciencefair.region1@gmail.com</p></div>' // html body
						};
						 transporter.sendMail(mailOptions, function(error, info){
												  if (error) {
													console.log(error);
												  } else {
													console.log('Email sent: ' + info.response);
												  }
												}); 
						res.send({"status":true,"code":200,"message":"Registration done succcessfully"});
					 }
					 else
					 {
						res.send({"status":false,"code":404,"message":"Failed to Register User Try Again"}); 
					 }
					 
				});
		  });
      		   
       
	}
	else
	{
		res.send({"status":false,"code":404,"message":"Required Data is missing"});
	}
});
router.post('/uploaddoc',function(req,res,next){
	if(req.body)
	{
		var upload = multer({
		storage: storage
		}).single('summerydoc')
		upload(req, res, function(err,result) {
			res.send({"status":true,"code":200,"file":req.file.filename});
			// res.end();
			// console.log(req.file.filename);
		})
		

	}
	else
	{   
		res.send({"status":false,"code":404,"message":"Required Data is missing"});
	}

});

module.exports=router;