var mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Proposal Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var VoteSchema = new mongoose.Schema({
	reviewer  : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	project   : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Project'
	},
	article   : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Article'
	},

	score     : {
		type     : Number,
		required : false
	},
	reason    : {
		type     : String,
		required : false
	},
	status    : {
		type     : String,
		required : false
	},
	createdAt : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Vote', VoteSchema);
