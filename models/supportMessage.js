var mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var SupportMessageSchema = new mongoose.Schema({
	email   : {
		type      : String,
		required  : true,
		minlength : 1,
		maxlength : 100
	},
	phone   : {
		type      : String,
		required  : true,
		minlength : 1,
		maxlength : 100
	},
	message : {
		type      : String,
		required  : true,
		minlength : 1,
		maxlength : 500
	}
});

module.exports = mongoose.model('SupportMessage', SupportMessageSchema);
