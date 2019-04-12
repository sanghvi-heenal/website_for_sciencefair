var express = require('express'),
	bodyParser = require('body-parser');
var multer = require('multer');
const request = require('request');
const util = require('util');

// #############################TO SAVE DATA########################################################################
const User = require('../Model/usermodel');
const Judge = require('../Model/judgemodel');
const Project = require('../Model/projectmodel');
const Project_Score = require('../Model/project_scoremodel');
const router = express.Router();

//#################################################CONTACT##########################################################
router.post(
	'/contact',
	upload.fields([
		{
			name: 'summery',
			maxCount: 1,
		},
		{
			name: 'form',
			maxCount: 1,
		},
	]),
	function(req, res, next) {
		if (req.body) {
			const Contact = require('../Model/contactmodel');
			var tdata = Contact.findOne()
				.sort({ _id: -1 })
				.select({ _id: 1 })
				.then(function(tdata) {
					if (tdata) {
						var countuser = tdata._id + 1;
					} else {
						var countuser = 1;
					}

					if (countuser == '') {
						var countuser = 1;
					}
					// req.body.user_id=countuser;
					req.body._id = countuser;
					console.log(req.body);
					Contact.create(req.body).then(function(newuser) {
						if (newuser) {
							var user_email = newuser.email;
							// lib to send email
							var text = '';
							var nodemailer = require('nodemailer');
							var transporter = nodemailer.createTransport({
								host: 'smtpauth.usm.edu',
								Port: 587,
								Security: 'STARTTLS',
								auth: {
									type: 'Plain',
									user: 'sciencefair',
									pass: 'e2jsnx1im3d%',
								},
								socketTimeout: 60 * 1000,
							});
							// setup email data with unicode symbols
							let mailOptions = {
								from: 'sciencefair.region1@gmail.com', // sender address
								to: user_email, // list of receivers
								subject: 'Queries related to upperfair Region1', // Subject line
								//text: 'Hello world?', // plain text body
								html:
									'<div>Hello ' +
									newuser.name +
									',</br><p> MSEF REGION-I Team has recieved your query , will get back to you soon<br/>Thank you for contacting us </p></div>', // html body
							};
							transporter.sendMail(mailOptions, function(
								error,
								info
							) {
								if (error) {
									console.log(error);
								} else {
									console.log('Email sent: ' + info.response);
								}
							});
							res.send({
								status: true,
								code: 200,
								message: 'Query is Posted',
							});
						} else {
							res.send({
								status: false,
								code: 404,
								message: 'Failed to create Contact',
							});
						}
					});
				});
		} else {
			res.send({
				status: false,
				code: 404,
				message: 'Required Data is missing',
			});
		}
	}
); //function closing



//#########################################################################################################

router.get(
	'/userlist',
	upload.fields([
		{
			name: 'summery',
			maxCount: 1,
		},
		{
			name: 'form',
			maxCount: 1,
		},
	]),
	function(req, res, next) {
		User.find({})
			.sort({ user_id: -1 })
			.then(function(userdata) {
				if (userdata) {
					res.send({
						status: true,
						code: 200,
						message: 'Data found',
						data: userdata,
					});
				} else {
					res.send({
						status: false,
						code: 404,
						message: 'No User Register Yet',
					});
				}
			});
	}
);
// email check
router.get(
	'/emailcheck',
	upload.fields([
		{
			name: 'summery',
			maxCount: 1,
		},
		{
			name: 'form',
			maxCount: 1,
		},
	]),
	function(req, res, next) {
		var user_email = req.query.email;
		if (req.body) {
			User.findOne({ email: user_email })
				.sort({ user_id: -1 })
				.then(function(userdata) {
					if (userdata) {
						res.send({
							status: true,
							code: 200,
							message: 'Email Address is already used',
							s_code: 201,
						});
					} else {
						res.send({
							status: true,
							code: 200,
							message: 'Email Not used',
							s_code: 200,
						});
					}
				});
		} else {
			res.send({
				status: false,
				code: 404,
				message: 'No User Register Yet',
			});
		}
	}
);


module.exports = router;
