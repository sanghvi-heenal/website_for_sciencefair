var mongoose = require('mongoose')
var schema = mongoose.Schema
var ObjectIdSchema = schema.ObjectId
var ObjectId = mongoose.Types.ObjectId
var ProjectScoreSchema = new mongoose.Schema(
	{
		_id: { type: Number },
		project_id: { index: false, type: Number, sparse: true },
		project_title: { index: false, type: String, sparse: true },
        category: { index: false, type: Number, sparse: true },
        class: { index: false, type: Number, sparse: true },
		average_score: { index: false, type: Number, sparse: true },
        mean: { index: false, type: Number,sparse: true },
        std_deviation: { index: false, type: Number,sparse: true },
        z_score: { index: false, type: Number,sparse: true },
        rank:{ index: false, type:Number,sparse: true },
    },
    { timestamps: false }
)

var Project_Score = mongoose.model('project_score', ProjectScoreSchema)
module.exports = Project_Score