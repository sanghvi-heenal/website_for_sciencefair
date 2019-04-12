var express = require('express'),
	bodyParser = require('body-parser');
var multer = require('multer');
const request = require('request');
const util = require('util');
const User = require('../Model/usermodel');
const Judge = require('../Model/judgemodel')
const Project = require('../Model/projectmodel')
const Project_Score = require('../Model/project_scoremodel')
const router = express.Router()
const { check, validationResult } = require('express-validator/check');



//################################################JUDGE REGISTRATION#########################################################
router.post(
    '/judgeregister',
    [check('login_email').isEmail()],
    async (req, res) => 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty())
         {
             console.log("errros" , errors);
            return res.status(422)
                        .json({ errors: errors.array() });
         }
		if (req.body) {
            console.log("body", req.body);
			var j_assigned_count = (req.body.j_assigned_count = 0);
			const { login_email , password} = req.body;
			
//############### Password Encryption#########################################

			const argon2 = require("argon2");
			const hash = await argon2.hash(password);
			console.log("hash", hash);
			req.body.password = hash;
			Judge.findOne({ login_email: login_email }).then(function(tdata) {
				if (tdata) {
					// console.log("requestbody"+req.body);
					res.send({
						status: false,
						code: 400,
                        message: 'Email id already Exit',
                        errors:null,
					});
				} else {
					var tdata = Judge.findOne()
						.sort({ _id: -1 })
						.select({ _id: 1 })
						.then(tdata => {
							// console.log(tdata);
							if (tdata) {
								var countuser = tdata._id + 1;
							} else {
								var countuser = 1;
							}

							if (countuser == '') {
								var countuser = 1;
							}

							req.body._id = countuser;
							Judge.create(req.body)
								.then(async newuser => {
									if (newuser) {
										console.log('new entry' + newuser);
										//------------------------------------------- ASSIGN PROJECTS -------------------------------------------------------

										let count = 0;
										let error = 0; // To prevent infinite loop, only allow error 3 times before quitting
										let noCategory1Found = false;
										let done = false;
										while (
											count < 5 &&
											error <= 3 &&
											!done
										) {
											if (!noCategory1Found) {
												try {
													let project = await Project.findOne(
														{
															category:
																newuser.category_1,
															$or: [
																{
																	assigned_count: 0,
																},
																{
																	assigned_count: 1,
																},
															],
															judge_id_1: {
																$ne:
																	newuser._id,
															},
															judge_id_2: {
																$ne:
																	newuser._id,
															},
														}
													);

													if (project) {
														// console.log(
														// 	'Found project to assign:',
														// 	project
														// );
														let update = {};
														if (
															project.judge_id_1 ===
															null
														) {
															update.judge_id_1 =
																newuser._id;
															update.assigned_count =
																project.assigned_count +
																1;
														} else {
															update.judge_id_2 =
																newuser._id;
															update.assigned_count =
																project.assigned_count +
																1;
														}
														console.log("cat 1 matched showing project_id and judge id" , project._id ,update); 
														try {
															let updateSuccess = await Project.updateOne(
																{
																	_id:
																		project._id,
																},
																{ $set: update }
															);

															count++;
															console.log(
																'Project assigned. Count increased to:',
																count
															);
															continue;
														} catch (err) {
															console.log(
																'Error updating project with assigned judge!',
																err
															);
															error++;
														}
													} else {
														console.log(
															'No more projects in category 1 found.'
														);
														noCategory1Found = true;
													}
												} catch (err) {
													console.log(
														'Error finding project to assign to judge',
														err
													);
													error++;
												}
											}

											if (noCategory1Found) {
												console.log(
													'Looking for projects in category 2.'
												);
												try {
													let project = await Project.findOne(
														{
															category:
																newuser.category_2,
															$or: [
																{
																	assigned_count: 0,
																},
																{
																	assigned_count: 1,
																},
															],
															judge_id_1: {
																$ne:
																	newuser._id,
															},
															judge_id_2: {
																$ne:
																	newuser._id,
															},
														}
													);

													if (project) {
														// console.log(
														// 	'Found project to assign:',
														// 	project
														// );
														let update = {};
														if (
															project.judge_id_1 ===
															null
														) {
															update.judge_id_1 =
																newuser._id;
															update.assigned_count =
																project.assigned_count +
																1;
														} else {
															update.judge_id_2 =
																newuser._id;
															update.assigned_count =
																project.assigned_count +
																1;
														}
														console.log("cat 2 matched showing project_id and judge id" , project._id ,update); 
														try {
															let updateSuccess = await Project.updateOne(
																{
																	_id:
																		project._id,
																},
																{ $set: update }
															);

															count++;
															console.log(
																'Project assigned. Count increased to:',
																count
															);
															continue;
														} catch (err) {
															console.log(
																'Error updating project with assigned judge!',
																err
															);
															error++;
														}
													} else {
														console.log(
															'No more projects in category 2 found.'
														);
														error++;
													}
												} catch (err) {
													console.log(
														'Error finding project to assign to judge',
														err
													);
													error++;
												}
											}

											console.log(
												'No more projects available to assign in either of the two categories.'
											);
											break;
										}

										if (count < 5) {
//----------------------------------------- Assign Random Projects ---------------
											console.log(
												'Trying to find other projects to assign.'
											);
											try {
												let projects = await Project.find(
													{
														$or: [
															{
																assigned_count: 0,
															},
															{
																assigned_count: 1,
															},
														],
														judge_id_1: {
															$ne: newuser._id,
														},
														judge_id_2: {
															$ne: newuser._id,
														},
													}
												).sort({ _id: 1 });

												console.log(
													'Number of available projects found:',
													projects.length || '0'
												);

												if (
													projects &&
													projects.length
												) {
													// Create an async-await-friendly version of the forEach method
													async function asyncForEach(
														array,
														callback
													) {
														for (
															let index = 0;
															index <
															array.length;
															index++
														) {
															await callback(
																array[index],
																index,
																array
															);
														}
													}

													// Iterate through projects and wait until all projects are done.
													await asyncForEach(
														projects,
														async project => {
															// Only do this until count reaches 5
															if (count < 5) {
																let update = {};
																if (
																	project.judge_id_1 ===
																	null
																) {
																	update.judge_id_1 =
																		newuser._id;
																	update.assigned_count =
																		project.assigned_count +
																		1;
																} else {
																	update.judge_id_2 =
																		newuser._id;
																	update.assigned_count =
																		project.assigned_count +
																		1;
																}
																console.log("random matched showing project_id and judge id" , project._id ,update); 

																try {
																	let updateSuccess = await Project.updateOne(
																		{
																			_id:
																				project._id,
																		},
																		{
																			$set: update,
																		}
																	);

																	count++;

																	console.log(
																		'Project assigned. Count increased to:',
																		count
																	);
																} catch (err) {
																	console.log(
																		'Failed to update project with assignment:',
																		err
																	);
																}
															}
														}
													);
												}
											} catch (err) {
												console.log(
													'Failed to find random projects to assign:',
													err
												);
											}
										}

										if (count < 5) {
											console.log(
												'Could not assign 10 projects to judge because no more projects are available.'
											);
										}

										if (count > 0) {
											try {
												let updateSuccess = await Judge.updateOne(
													{ _id: newuser._id },
													{
														$set: {
															j_assigned_count: count,
														},
													}
												);

												console.log(
													updateSuccess,
													`Updated judge project count to ${count}.`
												);
											} catch (err) {
												console.log(
													'Failed to update judge assigned project count: ',
													err
												);
											}
										}
										console.log(
											'Done adding judge and assigning projects.'
										);

										// var admin_email = newuser.login_email;

										// var nodemailer = require('nodemailer');
										// var transporter = nodemailer.createTransport(
										// 	{
										// 		host: 'smtpauth.usm.edu',
										// 		Port: 587,
										// 		Security: 'STARTTLS',
										// 		auth: {
										// 			type: 'Plain',
										// 			user: 'sciencefair',
										// 			pass: 'e2jsnx1im3d%',
										// 		},
										// 		socketTimeout: 60 * 1000,
										// 	}
										// );

										// let mailOptions = {
										// 	from:
										// 		'sciencefair.region1@gmail.com', // sender address
										// 	to: admin_email, // list of receivers
										// 	subject: 'Registration Mail', // Subject line

										// 	html:
										// 		'<div>Thank you again for signing up with Upper Fair<br/>Projects have now been assigned  to Judge , please login and confirm<p> Your Login Details are as below <br/> <br/>JUDGE NAME : ' +
										// 		newuser.name +
										// 		'<br/> <br/> EMAIL: ' +
										// 		newuser.login_email +
										// 		'<br/><br/>Please save this message as it contains you username and password for the judging platform.<br/>A separate email will be sent at a later day with more information.</br></br> Feel free to contact us at<b> region1msef@gmail.com </b> with any additional questions.<br/> please Infrom the team if you have registered but cannot attend the fair </p></div>', // html body
										// };
										// transporter.sendMail(
										// 	mailOptions,
										// 	function(error, info) {
										// 		if (error) {
										// 			console.log(error);
										// 		} else {
										// 			console.log(
										// 				'Email sent: ' +
										// 					info.response
										// 			);
										// 		}
										// 	}
                                        // );
										res.json({
											status: true,
											code: 200,
                                            message: 'Email fresh',
                                            errors:null,
										});
									}
								})
								.catch(error => {
									console.log(
										'Error adding judge to database and assigning projects:',
										error,
										error.lineNumber
									);
								});
						});
				}
			});
		} else {
			res.send({
				status: false,
				code: 400,
				message: 'Required Data is missing',
			});
		}
	}
);
module.exports = router;
