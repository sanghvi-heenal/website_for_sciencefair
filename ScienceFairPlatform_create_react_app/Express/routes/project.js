var express = require('express')
const request = require('request')
const Project = require('../Model/projectmodel');
const Project_Score = require('../Model/project_scoremodel')
const router = express.Router()
const math = require('mathjs')

//################################################# SUBMIT SCORE ##########################################################

router.post('/score', async function(req, res) {
	console.log("got the body" , req.body);
	const { projectId, judgeNumber, scores } = req.body
	if (projectId && judgeNumber && scores) {
		const totalScore =
			scores.research +
			scores.design +
			scores.execution +
			scores.creativity +
			scores.presentation
		let updateValues
		if (judgeNumber === 1) {
			updateValues = {
				score_1: totalScore,
			}
		} else {
			updateValues = {
				score_2: totalScore,
			}
		}

		console.log('Got scores data from client!', req.body)
				Project.updateOne({ _id: projectId }, { $set: updateValues })
				.then(affected => {
					if (affected) {
						console.log('Successfully updated project with score!');
						startScoring(projectId)
						res.status(200).end()
					} else {
						console.log('Project could not be found!', error)
						//res.status(500).end()
						res.send({
							status: true,
							code: 200,
							message: 'Required Data sent',
						})
					}
				})
				.catch(error => {
					console.log('Failed to update database with score!', error)
					//res.status(500).end()
					res.send({
						status: false,
						code: 500,
						message: 'Required Data  not sent',
					})
				})
		} else {
			console.log('Bad request!', req.body)
			//res.status(400).end()
			res.send({
				status: false,
				code: 500,
				message: 'bad Request',
			})
		}

})
	
async  function startScoring(projectId){
	let totalscore ;
	let scoringClass;
	let scoringCategory;
	let project = await Project.findOne({_id: projectId})
		.select({ _id: 1, class:1 , category:1 , score_1: 1, score_2: 1 });
			console.log("id found" , project);
			if(project)
			{
				totalscore = project.score_1 + project.score_2;
				console.log("total score", totalscore);
				let average_score = (totalscore/2);
				console.log("average", average_score);
				scoringClass = project.class;
				scoringCategory = project.category;
				console.log("scoringclass and category" , scoringClass, scoringCategory);
				let updateValues = {
					average_score: average_score,
				}
				Project_Score.updateOne({ _id: project._id }, { $set: updateValues })
				.then(affected => {
					if (affected) {
						console.log('Successfully updated avegare score!');
					} else {
						console.log('avg score could not be found!');
					}
					});
				
			}
			else{
				console.log("cannot calculate score" , )
			}
	let array1 = await Project_Score.find({
		class: scoringClass, 
		category : scoringCategory
		}).select( { _id:1 ,average_score:1 , mean: 1});
	if(array1)
	{
		var x = 0;
		var std_cal =[];
		console.log("array1", array1);
		array1.forEach(function (arrayItem) {
			x = x + arrayItem.average_score;
			std_cal.push(arrayItem.average_score);

		});

		let meanScore = x/array1.length;
		console.log("meanScore", meanScore);

		let stdScore = math.std(std_cal);
		console.log("deviation", stdScore);

		array1.forEach(function (arrayItem1) {

		});


		// for(i= 0; i < array.length ; i++ ){
		// 	array[i].mean = meanScore;
		// 	array[i].std_deviation = stdScore;
		// }
		let updateValues = {
			mean : meanScore ,
			std_deviation : stdScore,
		};
			
		console.log("update", updateValues);
		// Just Define it
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
			array1,
			async item => {
				try {
					console.log("iteam id" , item);
					const zscore = ((item.average_score - meanScore)/stdScore);
					updateValues.z_score = zscore;
					console.log("update", updateValues);

					await Project_Score.updateOne(
						{
							_id:
								item._id,
						},
						{
							$set: updateValues,
						}
					).then(affected => {
						if (affected) {
							console.log('Successfully updated meand and std score!');
						} else {
							console.log('std and mean could not be found!');
						}
						});
					
				} catch (err) {
					console.log(
						'Failed to update project_score with mean and std');
				}
				
			});
		
		
	}
	else{
		console.log("error in calculating mean");
	}

	let rank = await Project_Score
		.find({
			class : scoringClass ,
			category: scoringCategory,
		}).select({ _id: 1})
	  	  .sort({z_score: -1});
	  //let updateRank={}	
	console.log("rank order" , rank);
	if (rank)
	{
		var values = [];
		// for(let i = 1; i<rank.length ; i++)
		// {
		// rank.forEach(function (rankItem)
		// {
		// 		values.push({
		// 			_id: rankItem._id,
		// 			rank: i ,		
		// 		});
		// });
		// }	
		
		Object.entries(rank).forEach(([key, value]) => { 
			values.push({
				_id: value._id,
				rank: parseInt(key)+1 ,
			});
		});

		// Just Define it
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
			values,
			async item => {
				try {
					console.log("item id and rank" , item._id , item.rank);
					console.log("whole item" , item);
					await Project_Score.updateOne(
						{
							_id:
								item._id,
						},
						{
							$set: item,
						}
					).then(affected => {
						if (affected) {
							console.log(' PROJECT IS RANKED!');
						} else {
							console.log('error in calculating rank');
						}
						});
					
					
				} catch (err) {
					console.log(
						'Failed to update project_score with mean and std');
				}
				
			});
		}

	
	else{
		console.log("error in calculating rank");
	}


}



module.exports = router
