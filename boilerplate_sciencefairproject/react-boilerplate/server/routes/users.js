var express = require('express'),
bodyParser = require('body-parser');
var multer = require('multer');
const request=require('request');

 
// #############################TO SAVE DATA########################################################################
const User=require('../Model/usermodel');
const Judge=require('../Model/judgemodel');
const router=express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
	 
	  // var upload_path=req.upload_path;
	  //cb-callback
    cb(null, './project_summery');  
    // cb(null, upload_path);  
  },
  filename: function (req, file, cb) {
	  // console.log(file);
	  // return false;
    cb(null,  file.fieldname + '_' + Date.now()+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
		//cb(null, raw.toString('hex') + path.extname(file.originalname));
	
	}
})
 //############################################## ASSIGN USER ID ##############################################


// var upload = multer({ storage: storage })
var upload = multer({ dest: 'uploads/' });
router.post('/register',upload.fields([{
           name: 'summery', maxCount: 1
         }, {
           name: 'form', maxCount: 1
         }]),function(req,res,next){
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
									 var project_id_value	;
			
						console.log("sclass"+req.body.s_class);
						var maxid = User.find({s_class:parseInt(req.body.s_class),category:parseInt(req.body.category)},{project_id:1,_id:0}).sort({project_id:-1}).limit(1).then( function(maxid){

							console.log("MaxId",maxid)

							
							if(maxid.length>0)
							{
								
								console.log("maxid123"+maxid[0].project_id);
							
								 project_id_value = maxid[0].project_id+ 1;
								req.body.project_id=project_id_value;

							console.log("in !maxid"+project_id_value);
								
								
							}
							else{
								console.log("maxidinelse"+maxid);
								 project_id_value = (parseInt(req.body.s_class)*10000)+parseInt(req.body.category)+1
								 console.log("entered"+project_id_value);
								//  req.project_id = project_id_value;
								 
								 req.body.project_id=project_id_value;
								 //console.log("entered"+project_id_value);
							}


							console.log("Project ID value going to be stored is ",req.body.project_id)

							User.create(req.body).then(function(newuser){ 
								if(newuser)
								{
								 
								 // console.log("b4 Assigning"+project_id);
								 // req.body.project_id=project_id;
								 // console.log("projectid"+req.body.project_id);
		 
							 
								 //console.log("table insert"+newuser.project_id);
						 
								 var user_email=newuser.teacher_email;
								 // lib to send email 
								 var text="";
								 var nodemailer = require('nodemailer');
								 //add unsecured email address
								 var transporter = nodemailer.createTransport({
									 
									host : 'smtpauth.usm.edu',
							            Port : 587,
							            Security : 'STARTTLS', 
							            auth: {
								
							              user: 'sciencefair',
							              pass: 'e2jsnx1im3d%'
						              },	
														socketTimeout: 60 * 1000 
												 });
									// setup email data with unicode symbols
								 let mailOptions = {
										from: 'sciencefair.region1@gmail.com', // sender address
									 to:user_email, // list of receivers
									 subject: 'Registration Mail', // Subject line
									 //text: 'Hello world?', // plain text body
									 html: '<div>Hi ' +newuser.teacher_f_name+' ,<p>Thank you for registering in Upper fair.<br/><br/> Below are registered Details:<br/>ProjectId  :' +newuser.project_id+ '<br/><br/>Project name  :' +newuser.project_title+ '<br/> Teacher name : '+newuser.teacher_f_name+' ' +newuser.teacher_last_name+'<br/> Teacher Email :'+newuser.teacher_email+'</p><br/><p>For any other questions email us at sciencefair.region1@gmail.com <br/>Or<br/>Region1msef@gmail.com</p></div>' // html body
								 };
									transporter.sendMail(mailOptions, function(error, info){
															 if (error) {
															 console.log(error);
															 } else {
															 console.log('Email sent: ' + info.response);
															 }
														 }); 
								 res.send({"status":true,"code":200,"message":"Registration is Sucessfull"});
								}
								else
								{
								 res.send({"status":false,"code":404,"message":"Failed to Register User Try Again"}); 
								}
								
						 });
							
							//console.log("now assigning:"+req.project_id);
						})

						//req.body.project_id=req.project_id_value;
						//console.log("now assigning:"+req.body.project_id);

	
				 
		  });
      		   
			// console.log("now assigning:"+req.body.project_id);   
	}
	else
	{
		res.send({"status":false,"code":404,"message":"Required Data is missing"});
	}
});
//###############################PROJECT SUMMARY###################################################################


router.post('/uploaddoc',function(req,res,next){
	if(req.body)
	{
		console.log("in upload doc"+req.body);
		var upload = multer({
		storage: storage
		}).single('summarydoc')
		upload(req, res, function(err,result) {


			//Append the file information to mongodb 

			//console.log("File Name of uploaded cfile is ",req.file.filename)

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


//#################################################CONTACT##########################################################


router.post('/contact',upload.fields([{
           name: 'summery', maxCount: 1
         }, {
           name: 'form', maxCount: 1
         }]),function(req,res,next){
	if(req.body)
	{   
		const Contact=require('../Model/contactmodel');
		var tdata= Contact.findOne().sort({_id:-1}).select({_id:1}).then(function(tdata){
		if (tdata) {
                   var countuser=tdata._id+1;
                 }else {
                   var countuser=1;
                 }

                   if (countuser=='') {
                       var countuser=1;
                   }
                    // req.body.user_id=countuser;
                   req.body._id=countuser;
				     console.log(req.body);
					Contact.create(req.body).then(function(newuser){
					 if(newuser)
					 {
						 var user_email=newuser.email;
						// lib to send email 
						var text="";
						var nodemailer = require('nodemailer');
						var transporter = nodemailer.createTransport({
							service: 'gmail',
							auth: {
							user: 'sciencefai.region1@gmail.com',
							pass: 'donthack@123'
							}
										});
						 // setup email data with unicode symbols
						let mailOptions = {
							 from: 'sciencefair.region1@gmail.com', // sender address
							to:user_email, // list of receivers
							subject: 'Queries related to upperfair Region1', // Subject line
							//text: 'Hello world?', // plain text body
							html: '<div>Hello '+newuser.name+',</br><p> MSEF REGION-I Team has recieved your query , will get back to you soon<br/>Thank you for contacting us </p></div>' // html body
						};
						 transporter.sendMail(mailOptions, function(error, info){
												  if (error) {
													console.log(error);
												  } else {
													console.log('Email sent: ' + info.response);
												  }
												}); 
						 res.send({"status":true,"code":200,"message":"Query is Posted"});
					 }
					 else
					 {
						res.send({"status":false,"code":404,"message":"Failed to create Contact"});
					 }
			});
		});
	}
	else
	{   
		res.send({"status":false,"code":404,"message":"Required Data is missing"});
	}
	
	
});//function closing


//################################################JUDGE REGISTRATION#########################################################
router.post('/judgeregister',function(req,res,next){
			 if(req.body)
			 {
				console.log("requestbody",req.body);
				var j_assigned_count = req.body.j_assigned_count = 0;
				 var login_email=req.body.login_email;
				 console.log("login email", login_email);
				 //db search
				 Judge.findOne({login_email:login_email}).then(function(tdata){
					console.log("tdata",tdata);
					 if(tdata)
					{
					
							res.send({"status":false,"code":400,"message":"Email id already Exit"});
					}
					else
					{
						   var tdata= Judge.findOne().sort({_id:-1}).select({_id:1}).then(function(tdata){
			   
			    if (tdata) {
									console.log("tdata",tdata);
                   var countuser=tdata._id+1;
                 }else {
                   var countuser=1;
                 }

                   if (countuser=='') {
                       var countuser=1;
                   }
                   
						req.body._id=countuser;
				    Judge.create(req.body).then(function(newuser){
						if(newuser)
						{
							console.log("new entry"+newuser);
							 var admin_email= newuser.login_email;
							
						// 	var nodemailer = require('nodemailer');
						// 	var transporter = nodemailer.createTransport({
						// 		host : 'smtpauth.usm.edu',
						// 	            Port : 587,
						// 	            Security : 'STARTTLS', 
						// 	            auth: {
								
						// 	              user: 'sciencefair',
						// 	              pass: 'e2jsnx1im3d%'
						//               },	
						// 								socketTimeout: 60 * 1000 
						// 				});
						
							// let mailOptions = {
							// 	 from: 'sciencefair.region1@gmail.com', // sender address
							// 	to:admin_email, // list of receivers
							// 	subject: 'Registration Mail', // Subject line
		
							// 	html: '<div>Thank you for signing up with our "Region-I UpperFair",this email serves as your confirmation.<br/> <p> Judge Registration Details are as below <br/> <br/>JUDGE NAME : '+newuser.name+ '<br/> <br/> EMAIL: '+newuser.login_email+ '<br/><br/> PASSWORD: '+newuser.password+'<br/><br/>Please save this message as it contains you username and password for the judging platform.<br/>A separate email will be sent at a later day with more information.</br></br> Feel free to contact us at<b> region1msef@gmail.com </b> with any additional questions. </p></div>' // html body
							// };
							//  transporter.sendMail(mailOptions, function(error, info){
							// 						  if (error) {
							// 							console.log(error);
							// 						  } else {
							// 							console.log('Email sent: ' + info.response);
							// 					  }
							// 					}); 
							console.log("new user" , newuser)
							res.json({"status":true,"code":200,"message":"Email fresh","user":newuser});
						}
						  });
						   });
						 
						
					}
				 });
			 }
			 else
			 {
				 res.send({"status":false,"code":404,"message":"Required Data is missing"});
			 }
			
		 });


 //#########################################################################################################



	router.get('/userlist',upload.fields([{
           name: 'summery', maxCount: 1
         }, {
           name: 'form', maxCount: 1
         }]),function(req,res,next){
			 User.find({}).sort({user_id:-1}).then(function(userdata){
			 if(userdata)
			 {
				res.send({"status":true,"code":200,"message":"Data found","data":userdata});
			 }
			  else
			 {
				 res.send({"status":false,"code":404,"message":"No User Register Yet"});
			 }
			 });
		 });
	// email check 
	router.get('/emailcheck',upload.fields([{
           name: 'summery', maxCount: 1
         }, {
           name: 'form', maxCount: 1
         }]),function(req,res,next){
			 var user_email=req.query.email;
			 if(req.body)
			 {
				 User.findOne({email:user_email}).sort({user_id:-1}).then(function(userdata){
					 if(userdata)
					 {
						res.send({"status":true,"code":200,"message":"Email Address is already used","s_code":201});
					 }
					  else
					 {
						 res.send({"status":true,"code":200,"message":"Email Not used","s_code":200});
					 }
				 }); 
			 }
			 else
			 {
				res.send({"status":false,"code":404,"message":"No User Register Yet"}); 
			 }
			
		 });   

//############################ FORGOT PASSWORD####################################		 
	router.post('/judgeforgot',upload.fields([{
           name: 'summery', maxCount: 1
         }, {
           name: 'form', maxCount: 1
         }]),function(req,res,next){
			 if(req.body)
			 {
				 var login_email=req.body.email;
				 Judge.findOne({login_email:login_email}).then(function(tdata){
					 if(tdata)
					 {
						 var nodemailer = require('nodemailer');
							var transporter = nodemailer.createTransport({
								host : 'smtpauth.usm.edu',
							            Port : 587,
							            Security : 'STARTTLS', 
							            auth: {
								
							              user: 'sciencefair',
							              pass: 'e2jsnx1im3d%'
						              },	
														socketTimeout: 60 * 1000 

										  }
										);
						 let mailOptions = {
								 from: 'sciencefair.region1@gmail.com', // sender address
								to:login_email, // list of receivers
								subject: 'Registration Mail', // Subject line
								//text: 'Hello world?', // plain text body
								html: '<div>HI,</br><p> ScienceFair "Region-I Upperfair" <br/> Judge login details<br/> <br/> Email :'+login_email+'<br/><br/>Password :'+tdata.password+'</p> <br/>Thank you,<br/>Region-I MSEF</div>' // html body
							};
							 transporter.sendMail(mailOptions, function(error, info){
													  if (error) {
														console.log(error);
													  } else {
														console.log('Email sent: ' + info.response);
												  }
												}); 
						 res.send({"status":true,"code":200,"message":"Detail are shared over email"}); 
					 }
					 else
					 {
						 res.send({"status":false,"code":404,"message":"Email id not found"}); 
					 }
				 });
			 }
			 else
			 {
				 res.send({"status":false,"code":404,"message":"Required Parameter missing"}); 
			 }
		 });

module.exports=router;