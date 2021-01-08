var mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Proposal Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var OfferSchema = new mongoose.Schema({
	load        : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Load'
	},
	proposal    : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Proposal'
	},
	client      : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	transporter : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	chatroom    : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Chatroom'
	},
	amount      : {
		type      : Number,
		required  : true,
		minlength : 1
	},
	currency    : {
		type      : String,
		required  : true,
		minlength : 1
	},
	message     : {
		type      : String,
		required  : true,
		minlength : 1
	},
	status      : {
		type     : String,
		required : false
	},
	createdAt   : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Offer', OfferSchema);
