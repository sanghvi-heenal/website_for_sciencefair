var express = require('express')
var multer = require('multer')
const Judge = require('../Model/judgemodel')
const Project = require('../Model/projectmodel')
const Project_Score = require('../Model/project_scoremodel')
const router = express.Router()
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
	function(req, res, next) {
		if (req.body) {
			console.log(req.body)
			var login_email = req.body.login_email
			var login_password = req.body.login_password
			Judge.find(
				{ login_email: login_email, password: login_password },
				{ login_email: 1, _id: 1, name: 1 }
			).then(function(tdata) {
				console.log('tdata', tdata)
				if (tdata.length>0) {

					console.log('tdata', tdata[0].login_email)
					console.log("sending to front end" , tdata[0]);
					//console.log('Response Email', tdata[0].project_title)
					//res.send({status:true,"code":200,"message":"Login Done","email":login_email});
					res.json({
						status: true,
						code: 200,
						message: 'Login Done',
						judgedetails: tdata[0],
					})
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
router.get('/projects', (req, res) => {
	const { judgeId } = req.query
	console.log('Judge ID: ', judgeId)
	const mockProjects = [
		// {
		// 	_id: 20502,
		// 	project_title: `Where Does Methane Come From`,
		// 	class: 2,
		// 	category: 500,
		// 	score_1: null,
		// 	score_2: null,
		// 	judge_id_1: null,
		// 	judge_id_2: null,
		// 	assigned_count: 0,
		// },
		// {
		// 	_id: 20504,
		// 	project_title: `Minecraft, Crystals, and Me`,
		// 	class: 2,
		// 	category: 500,
		// 	score_1: null,
		// 	score_2: null,
		// 	judge_id_1: null,
		// 	judge_id_2: null,
		// 	assigned_count: 0,
		// },
		// {
		// 	_id: 30602,
		// 	project_title: `Video Games and Health`,
		// 	class: 3,
		// 	category: 600,
		// 	score_1: null,
		// 	score_2: null,
		// 	judge_id_1: null,
		// 	judge_id_2: null,
		// 	assigned_count: 0,
		// },
		// {
		// 	_id: 30503,
		// 	project_title: `Lava Volcano`,
		// 	class: 3,
		// 	category: 500,
		// 	score_1: null,
		// 	score_2: null,
		// 	judge_id_1: null,
		// 	judge_id_2: null,
		// 	assigned_count: 0,
		// },
		// {
		// 	_id: 30102,
		// 	project_title: `Which Paper Towel Brand is Best`,
		// 	class: 3,
		// 	category: 100,
		// 	score_1: null,
		// 	score_2: null,
		// 	judge_id_1: null,
		// 	judge_id_2: null,
		// 	assigned_count: 0,
		// },
		// {
		// 	_id: 30701,
		// 	project_title: `Classical Conditioning in Dogs`,
		// 	class: 3,
		// 	category: 700,
		// 	score_1: null,
		// 	score_2: null,
		// 	judge_id_1: null,
		// 	judge_id_2: null,
		// 	assigned_count: 0,
		// },
	]
;
	if (judgeId) {
		Project.find(
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
			.then(data => {
				//console.log('Data:', data)
				if (data && data.length > 0) {
					res.status(200)
					res.json({ projects: data })
				} else {
					res.status(200)
					res.json({ projects: mockProjects })
				}
			})
			.catch(error => {
				console.log(error)
				res.status(404)
				res.end()
			})
	}
})

module.exports = router
