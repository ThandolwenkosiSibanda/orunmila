const mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var ChatroomSchema = new mongoose.Schema({
	load        : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Load'
	},
	proposal    : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Proposal'
	},
	transporter : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	client      : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	messages    : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Message'
		}
	],
	createdAt   : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Chatroom', ChatroomSchema);
