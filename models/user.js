const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
	name         : {
		type      : String,
		required  : false,
		minlength : 1,
		maxlength : 100
	},
	surname      : {
		type      : String,
		required  : false,
		minlength : 1,
		maxlength : 100
	},
	googleId     : {
		type     : String,
		required : false
	},
	email        : {
		type      : String,
		required  : true,
		minlength : 5,
		maxlength : 255
	},
	phone        : {
		type      : String,
		required  : false,
		minlength : 3,
		maxlength : 100
	},
	nationalIdNo : {
		type      : String,
		required  : false,
		minlength : 3,
		maxlength : 100
	},
	address      : {
		type      : String,
		required  : false,
		minlength : 3,
		maxlength : 500
	},
	city         : {
		type      : String,
		required  : false,
		minlength : 3,
		maxlength : 500
	},
	country      : {
		type      : String,
		required  : false,
		minlength : 3,
		maxlength : 500
	},
	password     : {
		type      : String,
		required  : false,
		minlength : 1,
		maxlength : 255
	},
	status       : {
		type     : String,
		required : false
	},
	userType     : {
		type     : String,
		required : false
	},
	avatar       : {
		type : String
	},

	nationalID   : {
		type : String
	},
	reason       : {
		type     : String,
		required : false
	},
	ratings      : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Rating'
		}
	],
	projects     : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Project'
		}
	],
	isAdmin      : Boolean,
	createdAt    : {
		type    : Date,
		default : Date.now
	}
});

//======================================================================================================================================
//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.ACCESS_TOKEN_SECRET);
	return token;
};

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

//======================================================================================================================================
//function to validate user
function validateUser(user) {
	const schema = {
		name     : Joi.string().min(3).max(50).required(),
		surname  : Joi.string().min(3).max(50).required(),
		email    : Joi.string().min(5).max(255).required().email(),
		password : Joi.string().min(3).max(255).required()
	};

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
