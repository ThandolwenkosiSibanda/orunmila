const mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var RatingSchema = new mongoose.Schema({
	load                           : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Load'
	},
	transporter                    : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	client                         : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	transporterCommunication       : {
		type     : Number,
		required : false
	},
	transporterAdherenceToSchedule : {
		type     : Number,
		required : false
	},
	transporterCooperation         : {
		type     : Number,
		required : false
	},
	transporterAvailability        : {
		type     : Number,
		required : false
	},
	transporterQualityOfService    : {
		type     : Number,
		required : false
	},
	transporterComment             : {
		type : String
	},
	clientCommunication            : {
		type     : Number,
		required : false
	},
	clientAdherenceToSchedule      : {
		type     : Number,
		required : false
	},
	clientCooperation              : {
		type     : Number,
		required : false
	},
	clientAvailability             : {
		type     : Number,
		required : false
	},
	clientQualityOfService         : {
		type     : Number,
		required : false
	},
	clientComment                  : {
		type : String
	},
	contract                       : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Contract'
	},
	createdAt     : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Rating', RatingSchema);
