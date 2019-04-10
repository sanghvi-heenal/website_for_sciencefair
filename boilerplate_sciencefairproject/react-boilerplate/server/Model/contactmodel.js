var mongoose = require('mongoose');
var schema=mongoose.Schema;
var ObjectIdSchema = schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
var Contactschema = new mongoose.Schema({

    _id:{type:Number},
    name: {index: false, type: String, sparse: true},
    email: {index: false, type: String, sparse: true},
    query: {index: false, type: String, sparse: true},
   
  
}, {timestamps: true});

var Contact=mongoose.model('contact',Contactschema);
module.exports=Contact;
