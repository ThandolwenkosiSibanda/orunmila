const mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var CreditSchema = new mongoose.Schema({
	user    : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	amount    : {
		type     : Number,
		required : false
	},
	value     : {
		type     : Number,
		required : false
	},
	origin    : {
		type     : String,
		required : false
	},
	reference : {
		type     : String,
		required : false
	},
	createdAt : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Credit', CreditSchema);
