var mongoose = require('mongoose');
var schema=mongoose.Schema;
var ObjectIdSchema = schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
var ProjectSchema = new mongoose.Schema({
	 _id:{type:Number},
    project_id: {index: false, type: Number, sparse: true},
    project_title: {index: false, type: String, sparse: true},
    category: {index: false, type: Number, sparse: true},
    judge_id: {index: false, type: String, sparse: true} ,
    score : {index : false , type:Number, sparse:true}
}, {timestamps: true});

var Project=mongoose.model('project',ProjectSchema);
module.exports=Project;   