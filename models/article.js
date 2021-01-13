const mongoose = require('mongoose');

// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var ArticleSchema = new mongoose.Schema({
	project           : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'Project'
	},
	Title             : {
		type     : String,
		required : false
	},
	'Source title'    : {
		type     : String,
		required : false
	},
	Link              : {
		type     : String,
		required : false
	},
	Abstract          : {
		type     : String,
		required : false
	},
	'Author Keywords' : {
		type     : String,
		required : false
	},
	'Index Keywords'  : {
		type : String
	},
	Year              : {
		type     : String,
		required : false
	},

	status            : {
		type     : String,
		required : false
	},

	threshold         : {
		type     : Number,
		required : false
	},
	votes             : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Vote'
		}
	],

	createdAt         : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Article', ArticleSchema);
