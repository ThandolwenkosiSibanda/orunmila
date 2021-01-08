var mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Proposal Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var ProposalSchema = new mongoose.Schema({
	load          : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Load'
	},
	user          : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	amount        : {
		type      : Number,
		required  : true,
		minlength : 1
	},
	currency      : {
		type      : String,
		required  : false,
		minlength : 1,
		maxlength : 500
	},
	message       : {
		type      : String,
		required  : true,
		minlength : 1,
		maxlength : 500
	},

	eta           : {
		type      : String,
		required  : false,
		minlength : 1,
		maxlength : 100
	},
	status        : {
		type     : String,
		required : false
	},
	statusMessage : {
		type     : String,
		required : false
	},
	createdAt     : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Proposal', ProposalSchema);
