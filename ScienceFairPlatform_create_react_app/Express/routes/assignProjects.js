var express = require('express')
var multer = require('multer')
const Judge = require('../Model/judgemodel')
const Project = require('../Model/projectmodel')
const Project_Score = require('../Model/project_scoremodel')
const router = express.Router()

router.post('/assign', async (req, res) => 
{
    console.log("got the body" , req.body);
    const { name, login_email } = req.body
    console.log("name and email", name ,login_email);
    
    const newuser = await Judge.findOne(
        { $and: [{ name: name }, { login_email: login_email }] },
        //{_id: 1,}
    );
    console.log("judgeId",newuser)
    if(newuser)
    {
										let count = 0;
										let error = 0; // To prevent infinite loop, only allow error 3 times before quitting
                                        let IncreaseCount=0;
                                        let noCategory1Found = false;
										let done = false;
										while (
											count < 5 &&
											error <= 3 &&
											!done
										) {
											if (!noCategory1Found) {
												try {
//############################# CATEGORY 1 ################################################################
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
//###################################### CATEFGORY II ######################################################
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
                                            IncreaseCount = newuser.j_assigned_count + count;
												let updateSuccess = await Judge.updateOne(
													{ _id: newuser._id },
													{
														$set: {
															j_assigned_count: IncreaseCount,
														},
													}
												);

												console.log(
													updateSuccess,
													`Updated judge project count to ${IncreaseCount}.`
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
										res.send({
											status: true,
											code: 200,
											message: 'Email fresh',
											count: IncreaseCount,
										});
									
    }
    else{
        console.log("No Such Entry Found");
        res.send({
            status: false,
            code: 404,
            message: 'Required Data is missing',
        });
    }


});







module.exports = router