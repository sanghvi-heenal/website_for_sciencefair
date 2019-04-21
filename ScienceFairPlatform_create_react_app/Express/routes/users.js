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
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		// var upload_path=req.upload_path;
		//cb-callback
		cb(null, './project_summery');
		// cb(null, upload_path);
	},
	filename: function(req, file, cb) {
		// console.log(file);
		// return false;
		cb(
			null,
			file.fieldname +
				'_' +
				Date.now() +
				'.' +
				file.originalname.split('.')[
					file.originalname.split('.').length - 1
				]
		);
		//cb(null, raw.toString('hex') + path.extname(file.originalname));
	},
});
//############################################## STUDENT REGISTRATION ##############################################

// var upload = multer({ storage: storage })
var upload = multer({ dest: 'uploads/' });
router.post(
	'/register',
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
	 async function(req, res, next) {
		// return false;

		if (req.body) {
			console.log("front end body", req.body);
			var tdata = await User.findOne()
				.sort({ user_id: -1 })
				.select({ _id: 1, user_id: 1 })
				.then( async function(tdata) {
					// console.log(tdata);
					if (tdata) {
						var countuser = tdata.user_id + 1;
					} else {
						var countuser = 1;
					}

					if (countuser == '') {
						var countuser = 1;
					}
					req.body.user_id = countuser;

					req.body._id = countuser;
					var project_id_value;

					console.log('sclass :' + req.body.s_class);
					 await User.find(
						{
							s_class: parseInt(req.body.s_class),
							category: parseInt(req.body.category),
						},
						{ project_id: 1, _id: 0 }
					)
						.sort({ project_id: -1 })
						.limit(1)
						.then( async function(maxid) {
							console.log('MaxId', maxid);
							var key , maximum_assign = 0;
							if (maxid.length > 0) {
								console.log('maxid: ' + maxid[0].project_id);
								project_id_value = maxid[0].project_id + 1;

								req.body.project_id = project_id_value;

								console.log('in !maxid' + project_id_value);
							} else {
								console.log('maxidinelse' + maxid);
								project_id_value =
									parseInt(req.body.s_class) * 10000 +
									parseInt(req.body.category) +
									1;
								console.log('entered' + project_id_value);
								req.body.project_id = project_id_value;
							}

							console.log(
								'Project ID value going to be stored is ',
								req.body.project_id
							);
//#################################### CREATE STUDENT TABLE ########################################
							await User.create(req.body).then( async function(newuser) {
								if (newuser) {
									console.log("in user body" , newuser);

									var user_email = newuser.teacher_email;
									// lib to send email
									var text = '';
									var nodemailer = require('nodemailer');
									//add unsecured email address
									var transporter =  await nodemailer.createTransport(
										{
											host: 'host name',
											Port:'port number',
											Security: '############',
											auth: {
												user: 'email address',
												pass: 'password',
											},
											socketTimeout: 60 * 1000,
										}
									);
									// setup email data with unicode symbols
									let mailOptions = {
										from: 'email address', // sender address
										to: user_email, // list of receivers
										subject: 'Registration Mail', // Subject line
										//text: 'Hello world?', // plain text body
										html:
											'<div>Hi ' +
											newuser.teacher_f_name +
											' ,<p>Thank you for registering in MSEF Region-I Lower Fair.<br/><br/> Below are registered Details:<br/>Project name  :' // html body
									};
									transporter.sendMail(mailOptions, function(
										error,
										info
									) {
										if (error) {
											console.log(error);
										} else {
											console.log(
												'Email sent: ' + info.response
											);
										}
									});
									
								} else {
									console.log("Email could not be sent");
								}
							});	
							var tdata = await  Project.findOne()
								.sort({_id: -1 })
								.select({ _id: 1})
								.then(async function(tdata) {
									console.log(tdata);
									var countproject =0;
									if (tdata) {
										countproject = tdata._id + 1;
									} else {
										 countproject = 1;
									}

									if (countproject == '') {
										countproject = 1;
									}

									key = countproject;

							//##########PROJECTS COLLECTION CREATED########################
							const project_array = {
								_id: key,
								project_id: req.body.project_id,
								project_title: req.body.project_title,
								category: req.body.category,
								class: req.body.s_class,
								judge_id_1: null,
								judge_id_2: null,
								score_1: 0,
								score_2: 0,
								assigned_count: 0,
								project_count: key,
							};
							console.log("project created" , project_array);

							await Project.create(project_array).catch(error => {
								console.log('error', error);
							});
							//##################### PROJECT SCORE COLLECTION CREATED########################
							const project_score = {
								_id: key,
								project_id: req.body.project_id,
								project_title: req.body.project_title,
								category: req.body.category,
								class: req.body.s_class,
								average_score:0.0,
								mean:0.0,
								std_deviation: 0.0,
								z_score: 0.0,
								rank:0,
								};
							console.log("project_score table default values" , project_score);
							await Project_Score.create(project_score).catch(error=>
								 { 
									 console.log("error in creating project score table");
								});
						});
						console.log("key and maxassign" , key , maximum_assign);
						const get_judge = await Judge.find(
							{
								j_assigned_count: { $lt: 5 } ,
									$or: [
										{
											category_1:  req.body.category,
										},
										{
											category_2:  req.body.category,
										},
									],
							
								},
								{
									_id: 1,
									j_assigned_count:1
								}
						)
						if(get_judge.length>0)
						{
							console.log("got judges" , get_judge);
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
							await asyncForEach(
								get_judge,
								async arrayItem => {
									try 
									{
										let updateProject , updateJudge;
										console.log("key for finding project" , key);
										console.log("arrayitem", arrayItem);
										if(maximum_assign<2)
											{
											const get_assigned = await Project.findOne(
												{
													_id: key,
												},
												{
													_id: 0,
													judge_id_1:1,
													judge_id_2:1
												}
												
											)
											console.log("get_assigned before if", get_assigned);
											if(get_assigned)
											{
												console.log("get  assigned project", get_assigned);
											if(maximum_assign<2)
													{
														if(get_assigned.judge_id_1 == null)
														{
															maximum_assign = maximum_assign +1 ;
															updateProject = {
																judge_id_1: arrayItem._id,
																assigned_count: maximum_assign,
															}
															updateJudge = {
																j_assigned_count: arrayItem.j_assigned_count+1 ,
															}
															
														}
														else
														{
															if(get_assigned.judge_id_2 == null)
															{
																maximum_assign = maximum_assign +1 ;
																updateProject = {
																	judge_id_2: arrayItem._id,
																	assigned_count: maximum_assign,
																}
																updateJudge = {
																	j_assigned_count: arrayItem.j_assigned_count+1 ,
																}
																
															
															}
														}
														console.log("maximum_assign after assigning", maximum_assign);
													}
												}
												console.log("update project" , updateProject);
												await Project.updateOne({ _id: key }, { $set: updateProject })
													.then(affected => {
														if (affected) 
														{
															console.log('Successfully updated project with judge assigning!');
														} else
															{
															console.log('Project could not be found!',error)
														}
													})
													.catch(error => {
														console.log('Failed to update database with judge id!', error)
													})

													console.log("update judge assigned count" , updateJudge);
													console.log("arrayitem.id" , arrayItem._id);
													await Judge.updateOne({ _id: arrayItem._id}, { $set: updateJudge })
													.then(affected => {
														if (affected) 
														{
															console.log('Successfully updated judge assigned count!');
														} else
															{
															console.log('judge could not be found!',error)
														}
													})
													.catch(error => {
														console.log('Failed to update database with judge assigned count!', error)
													})
										
											}
										
									}
									catch (err) {
										console.log(
											'failed to assign to existing judge' , err);
									}
								}
							)
						}
						else
						{
							console.log("no judge found with same category", get_judge);	
						}
//-------------------------------------- ASSIGN JUDGE RANDOMLY--------------------------------------------------------
						const get_random_judge = await Judge.find(
							{
								j_assigned_count: { $lt: 5 } ,
									$or: [
										{
											category_1: {
												$ne: req.body.category, 
											},
										},
										{
											category_2: {
												$ne: req.body.category,
											},
										},
									],
							
								},
								{
									_id: 1,
									j_assigned_count:1
								}
							)
							if(get_random_judge.length>0)
							{
								console.log("random judge list",get_random_judge);
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

								await asyncForEach(
									get_random_judge,
									async arrayItem => {
										try 
										{
											let updateProject , updateJudge;
											console.log("key for finding project" , key);
											console.log("arrayitem", arrayItem);
											if(maximum_assign<2)
											{
											const get_assigned = await Project.findOne(
												{
													_id: key,
												},
												{
													_id: 0,
													judge_id_1:1,
													judge_id_2:1
												}
												
											)
											console.log("get_assigned before if", get_assigned);
											if(get_assigned)
											{
												console.log("get  assigned project", get_assigned);
											if(maximum_assign<2)
													{
														if(get_assigned.judge_id_1 == null)
														{
															maximum_assign = maximum_assign +1 ;
															updateProject = {
																judge_id_1: arrayItem._id,
																assigned_count: maximum_assign,
															}
															updateJudge = {
																j_assigned_count: arrayItem.j_assigned_count+1 ,
															}
															
														}
														else
														{
															if(get_assigned.judge_id_2 == null)
															{
																maximum_assign = maximum_assign +1 ;
																updateProject = {
																	judge_id_2: arrayItem._id,
																	assigned_count: maximum_assign,
																}
																updateJudge = {
																	j_assigned_count: arrayItem.j_assigned_count+1 ,
																}
																
															
															}
														}
														console.log("maximum_assign after assigning", maximum_assign);
													}
											}
											console.log("update project" , updateProject);
											await Project.updateOne({ _id: key }, { $set: updateProject })
												.then(affected => {
													if (affected) 
													{
														console.log('Successfully updated project with judge assigning!');
													} else
														{
														console.log('Project could not be found!',error)
													}
												})
												.catch(error => {
													console.log('Failed to update database with judge id!', error)
												})
	
												console.log("update judge assigned count" , updateJudge);
												console.log("arrayitem.id" , arrayItem._id);
												await Judge.updateOne({ _id: arrayItem._id}, { $set: updateJudge })
												.then(affected => {
													if (affected) 
													{
														console.log('Successfully updated judge assigned count!');
													} else
														{
														console.log('judge could not be found!',error)
													}
												})
												.catch(error => {
													console.log('Failed to update database with judge assigned count!', error)
												})
											
	
											}	
											else{
												console.log("project assigned to judges", maximum_assign);
											}
										}
										catch (err) {
											console.log(
												'failed to assign to existing judge' , err);
										}
									}
								)


							}
							else
							{
									console.log("random judge not found", get_random_judge);
							}
							
							
//############################ CREATE USER BODY ###################################
						res.send({
							status: true,
							code: 200,
							message: 'Registration is Sucessfull',
						});
						});

				});

			// console.log("now assigning:"+req.body.project_id);
		} else {
			res.send({
				status: false,
				code: 404,
				message: 'Required Data is missing',
			});
		}
	}
);
//###############################PROJECT SUMMARY###################################################################

router.post('/uploaddoc', function(req, res, next) {
	if (req.body) {
		console.log('in upload doc' + req.body);
		var upload = multer({
			storage: storage,
		}).single('summarydoc');
		upload(req, res, function(err, result) {
			//Append the file information to mongodb

			console.log('File Name of uploaded cfile is ', req.file.filename);

			res.send({ status: true, code: 200, file: req.file.filename });
			// res.end();
			// console.log(req.file.filename);
		});
	} else {
		res.send({
			status: false,
			code: 404,
			message: 'Required Data is missing',
		});
	}
});

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
								host: 'host name',
								Port:'port number',
								Security: '############',
								auth: {
									user: 'email address',
									pass: 'password',
								},
								socketTimeout: 60 * 1000,
							});
							// setup email data with unicode symbols
							let mailOptions = {
								from: 'email address', // sender address
								to: user_email, // list of receivers
								subject: 'Queries related to upperfair Region1', // Subject line
								//text: 'Hello world?', // plain text body
								html:
									'<div>Hello ' +
									newuser.name +
									',</br><p> MESSAGE</p></div>', // html body
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

//################################################JUDGE REGISTRATION#########################################################
router.post(
	'/judgeregister',
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
	(req, res) => {
		if (req.body) {
			var j_assigned_count = (req.body.j_assigned_count = 0);
			var login_email = req.body.login_email;
			// console.log(login_email);
			Judge.findOne({ login_email: login_email }).then(function(tdata) {
				if (tdata) {
					// console.log("requestbody"+req.body);
					res.send({
						status: false,
						code: 400,
						message: 'Email id already Exit',
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
											//--------------- Assign Random Projects ---------------
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
												'Could not assign 5 projects to judge because no more projects are available.'
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

										var admin_email = newuser.login_email;

										var nodemailer = require('nodemailer');
										var transporter = nodemailer.createTransport(
											{
												host: 'host name',
												Port:'port number',
												Security: '############',
												auth: {
													user: 'email address',
													pass: 'password',
												},
												socketTimeout: 60 * 1000,
											}
										);

										let mailOptions = {
											from:'email address', // sender address
											to: admin_email, // list of receivers
											subject: 'Registration Mail', // Subject line

											html:
												'<div><p>MESSAGE</p></div>', // html body
										};
										transporter.sendMail(
											mailOptions,
											function(error, info) {
												if (error) {
													console.log(error);
												} else {
													console.log(
														'Email sent: ' +
															info.response
													);
												}
											}
										);
										res.send({
											status: true,
											code: 200,
											message: 'Email fresh',
											user: newuser,
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
				code: 404,
				message: 'Required Data is missing',
			});
		}
	}
);

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

//############################ FORGOT PASSWORD####################################
router.post(
	'/judgeforgot',
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
			var login_email = req.body.email;
			Judge.findOne({ login_email: login_email }).then(function(tdata) {
				if (tdata) {
					var nodemailer = require('nodemailer');
					var transporter = nodemailer.createTransport({
						host: 'hostname',
						Port: 'port number',
						Security: '#########',
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
							'<div>HI,</br><p>MESSAGE</p></div>', // html body
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
						message: 'Detail are shared over email',
					});
				} else {
					res.send({
						status: false,
						code: 404,
						message: 'Email id not found',
					});
				}
			});
		} else {
			res.send({
				status: false,
				code: 404,
				message: 'Required Parameter missing',
			});
		}
	}
);

module.exports = router;
