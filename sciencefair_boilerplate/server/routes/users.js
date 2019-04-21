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
//##############################################STUDENT REGISTRATION ##############################################

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



							User.create(req.body).then(function(newuser) {
								if (newuser) {

									var user_email = newuser.teacher_email;
									// lib to send email
									var text = '';
									var nodemailer = require('nodemailer');
									//add unsecured email address
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
									// setup email data with unicode symbols
									let mailOptions = {
										from: 'email address', // sender address
										to: user_email, // list of receivers
										subject: 'Registration Mail', // Subject line
										//text: 'Hello world?', // plain text body
										html:
											'<div>Hi ' +
											newuser.teacher_f_name +
											' ,<p>MESSAGE</p></div>', // html body
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
									res.send({
										status: true,
										code: 200,
										message: 'Registration is Sucessfull',
									});
								} else {
									res.send({
										status: false,
										code: 404,
										message:
											'Failed to Register User Try Again',
									});
								}
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




module.exports = router;
