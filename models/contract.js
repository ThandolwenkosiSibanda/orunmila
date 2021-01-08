var mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Proposal Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var ContractSchema = new mongoose.Schema({
	load              : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Load'
	},
	client            : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	transporter       : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	amount            : {
		type      : Number,
		required  : true,
		minlength : 1
	},
	currency          : {
		type     : Number,
		required : false
	},
	status            : {
		type     : String,
		required : false
	},
	rating            : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Rating'
	},
	createdAt         : {
		type    : Date,
		default : Date.now
	},
	clientStatus      : {
		type     : String,
		required : false
	},
	transporterStatus : {
		type     : String,
		required : false
	},
	createdAt     : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Contract', ContractSchema);
