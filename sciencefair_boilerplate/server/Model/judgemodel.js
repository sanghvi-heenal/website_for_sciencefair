var mongoose = require('mongoose')
var schema = mongoose.Schema
var ObjectIdSchema = schema.ObjectId
var ObjectId = mongoose.Types.ObjectId
var JudgeSchema = new mongoose.Schema(
	{
		_id: { type: Number },
		login_email: { index: false, type: String, sparse: true },
		password: { index: false, type: String, sparse: true },
		name: { index: false, type: String, sparse: true },
		category_1: { index: false, type: String, sparse: true },
		category_2: { index: false, type: String, sparse: true },
		j_assigned_count: { index: false, type: Number, sparse: true },
	},
	{ timestamps: true }
)

var Judge = mongoose.model('judge', JudgeSchema)
module.exports = Judge
