var mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var LoadSchema = new mongoose.Schema({
	user         : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	to           : {
		type      : String,
		required  : true,
		minlength : 1,
		maxlength : 100
	},
	from         : {
		type      : String,
		required  : true,
		minlength : 1,
		maxlength : 100
	},
	weight       : {
		type      : String,
		required  : true,
		minlength : 1,
		maxlength : 100
	},
	weightUnit   : {
		type      : String,
		required  : false,
		minlength : 1,
		maxlength : 100
	},
	budget       : {
		type      : Number,
		required  : true,
		minlength : 1,
		maxlength : 100
	},
	currency     : {
		type      : String,
		required  : false,
		minlength : 1,
		maxlength : 100
	},
	description  : {
		type      : String,
		required  : false,
		minlength : 1,
		maxlength : 100
	},
	city         : {
		type     : String,
		required : false
	},
	status       : {
		type     : String,
		required : false
	},
	proposals    : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Proposal'
		}
	],
	rating       : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Rating'
	},
	transporter  : {
		type : String
	},
	contractType : {
		type     : String,
		required : false
	},
	createdAt    : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Load', LoadSchema);
