var express = require('express')
var multer = require('multer')
const Judge = require('../Model/judgemodel')
const Project = require('../Model/projectmodel')
const Project_Score = require('../Model/project_scoremodel')
const router = express.Router()
const { check, validationResult } = require('express-validator/check');
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		// var upload_path=req.upload_path;

		cb(null, './form')
		// cb(null, upload_path);
	},
	fileproject_title: function(req, file, cb) {
		// console.log(file);
		// return false;
		cb(
			null,
			file.fieldproject_title +
				'_' +
				Date.now() +
				'.' +
				file.originalproject_title.split('.')[
					file.originalproject_title.split('.').length - 1
				]
		)
	},
})

var upload = multer({ storage: storage })
// var upload = multer({ dest: 'uploads/' });

//############################################# LOGIN CHECK ###################################################
router.post(
	'/login',
	upload.fields([
		{
			project_title: 'summery',
			maxCount: 1,
		},
		{
			project_title: 'form',
			maxCount: 1,
		},
	]),
	async function(req, res, next) {
		if (req.body) {
			console.log(req.body)
			const { login_email, login_password} = req.body
			await Judge.findOne(
				{ login_email: login_email},
				{ login_email: 1, _id: 1, name: 1 , password:1 }
			).then(async function(tdata) {
				console.log('tdata', tdata)
				console.log("login_password", login_password);
	//############### Password Verificartion #########################################
				const argon2 = require('argon2');
				if (tdata!=null) {
					console.log('tdata', tdata.login_email);
					const key =  await argon2.verify(tdata.password,login_password);
					if(key)
					{
						console.log("password is verified");
					res.json({
						status: true,
						code: 200,
						message: 'Login Done',
						judgedetails: tdata,
					})
				}
				} else {
					console.log('invalid login')
					res.json({
						status: false,
						code: 404,
						message: 'Invalid Login Detail',
					})
				}
			})
		} else {
			res.send({
				status: false,
				code: 404,
				message: 'Required Data is missing',
			})
		}
	}
)
//############################ FORGOT PASSWORD####################################
router.post(
	'/judgeforgot',
	//[check('login_email').isEmail()],
	function(req, res, next) {
		// const errors = validationResult(req);
        // if (!errors.isEmpty())
        //  {
        //      console.log("errros" , errors);
        //     return res.status(422)
        //                 .json({ errors: errors.array() });
        //  }
		if (req.body) {
			const {login_email} = req.body;
			Judge.findOne({ login_email: login_email }).then(function(tdata) {
				if (tdata) {
					var nodemailer = require('nodemailer');
					var transporter = nodemailer.createTransport({
						host: 'host name',
						Port:'port number',
						Security: '############',
						auth: {
							user: 'email address',
							pass: 'password',
						},
						socketTimeout: 60 * 1000,
					});
					let mailOptions = {
						from: 'email address', // sender address
						to: login_email, // list of receivers
						subject: 'Registration Mail', // Subject line
						//text: 'Hello world?', // plain text body
						html:
							'<div>MESSAGE</div>', // html body
					};
					transporter.sendMail(mailOptions, function(error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log('Email sent: ' + info.response);
						}
					});
					res.send({
						status: true,
						code: 200,
					});
				} else {
					res.send({
						status: false,
						code: 404,
						msg:'Judge Email not found',
					});
				}
			});
		} else {
			res.send({
				status: false,
				code: 404,
				msg:'Required Parameter missing',
			});
		}
	}
);


//####################################### UPLOAD FORM  #####################################################################
router.post('/uploadform', function(req, res, next) {
	if (req.body) {
		var upload = multer({
			storage: storage,
		}).single('formdoc')
		upload(req, res, function(err, result) {
			res.send({
				status: true,
				code: 200,
				file: req.file.fileproject_title,
			})
			// res.end();
			console.log(req.file.fileproject_title)
		})
	} else {
		res.send({
			status: false,
			code: 404,
			message: 'Required Data is missing',
		})
	}
})

//############################################# GET PROJECTS ###################################################
router.get('/projects', async (req, res) => {
	console.log("req", req.query);
	const { judgeId } = req.query
	console.log('Judge ID in project route: ', judgeId)
	const mockProjects = [];
	if (judgeId) 
	{
		const data = await Project.find(
			{ $or: [{ judge_id_1: judgeId }, { judge_id_2: judgeId }] },
			{
				_id: 1,
				project_id:1,
				project_title: 1,
				category: 1,
				class: 1,
				score_1: 1,
				score_2: 1,
				judge_id_1: 1,
				judge_id_2: 1,
			}
		)
			if(data)  {
				//console.log('Data:', data)
				if (data && data.length > 0) {
					res.status(200)
					res.json({ projects: data })
					
				} 
				else {
					res.status(200)
					res.json({ projects: mockProjects  })
	
				}
			}
			
			
			
	}
})


module.exports = router
