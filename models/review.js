var mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var ReviewSchema = new mongoose.Schema({
	user      : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	title     : {
		type     : String,
		required : false
	},
	journal   : {
		type     : String,
		required : false
	},
	refID     : {
		type     : String,
		required : false
	},
	Link      : {
		type     : String,
		required : false
	},
	reference : {
		type     : String,
		required : false
	},
	Abstract  : {
		type     : String,
		required : false
	},
	threshold : {
		type     : String,
		required : false
	},

	status    : {
		type     : String,
		required : false
	},
	ratings   : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Rating'
		}
	],
	reviewers : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'User'
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

module.exports = mongoose.model('Review', ReviewSchema);
