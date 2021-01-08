const mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var MessageSchema = new mongoose.Schema({
	chatroom  : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Chatroom'
	},
	user      : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	content   : {
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

module.exports = mongoose.model('Message', MessageSchema);
