var express = require('express'),
bodyParser = require('body-parser');
var multer = require('multer');
const request=require('request');
// to save data
const Judge=require('../Model/judgemodel');
const router=express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
	 
	  // var upload_path=req.upload_path;
	  
    cb(null, './form');  
    // cb(null, upload_path);  
  },
  filename: function (req, file, cb) {
	  // console.log(file);
	  // return false;
    cb(null,  file.fieldname + '_' + Date.now()+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})
 
var upload = multer({ storage: storage })
// var upload = multer({ dest: 'uploads/' });


//############################################# LOGIN CHECK ###################################################
router.post('/login',upload.fields([{
	name: 'summery', maxCount: 1
  }, {
	name: 'form', maxCount: 1
  }]),function(req,res,next){
    if(req.body)
	{
		// console.log(req.body);
		
		var login_email=req.body.login_email;
		var login_password=req.body.login_password;
		Judge.find({login_email:login_email,password:login_password},{login_email:1 ,_id:0, name:1}).then(function(tdata){
		
		
		
		
			console.log("tdata",tdata);
			if(tdata.length>0)
			{
				console.log("tdata",tdata[0].login_email);
				console.log("Response Email",tdata[0].name);
				//res.send({status:true,"code":200,"message":"Login Done","email":login_email});
				res.send({status:true,code:200, name: tdata[0].name});
			}
			else
			{
				console.log("invalid login")
				res.json({"status":false,"code":404,"message":"Invalid Login Detail"});
			}
		 });
	}
	else
	{
		res.send({"status":false,"code":404,"message":"Required Data is missing"});
	}
	
});


//####################################### UPLOAD FORM  #####################################################################
router.post('/uploadform',function(req,res,next){
	if(req.body)
	{
		var upload = multer({
		storage: storage
		}).single('formdoc')
		upload(req, res, function(err,result) {
			res.send({"status":true,"code":200,"file":req.file.filename});
			// res.end();
			 console.log(req.file.filename);
		})
		

	}
	else
	{   
		res.send({"status":false,"code":404,"message":"Required Data is missing"});
	}

});
module.exports=router;