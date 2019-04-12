var mongoose = require('mongoose')
var schema = mongoose.Schema
var ObjectIdSchema = schema.ObjectId
var ObjectId = mongoose.Types.ObjectId
var AdminSchema = new mongoose.Schema(
	{
		admin_email: { index: false, type: String, sparse: true },
		admin_password: { index: false, type: String, sparse: true },
		name: { index: false, type: String, sparse: true },
	},
	{ timestamps: false }
)

var Admin = mongoose.model('admin', AdminSchema)
module.exports = Admin
