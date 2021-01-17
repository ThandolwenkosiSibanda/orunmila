var mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var ProjectSchema = new mongoose.Schema({
	user      : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	title     : {
		type     : String,
		required : false
	},

	threshold : {
		type     : Number,
		required : false
	},

	status    : {
		type     : String,
		required : false
	},
	reviewers : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'User'
		}
	],
	votes     : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Vote'
		}
	],

	articles  : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Article'
		}
	],

	csv       : {
		type     : String,
		required : false
	},
	createdAt : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Project', ProjectSchema);
