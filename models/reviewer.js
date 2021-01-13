const mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var ReviewerSchema = new mongoose.Schema({
	project   : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Project'
	},

	reviewers : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'User'
		}
	],
	createdAt : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Reviewer', ReviewerSchema);
