//========================================================================================================================================
// Required modules
//========================================================================================================================================
const cookieParser = require('cookie-parser'),
	passport = require('passport'),
	express = require('express'),
	router = express.Router();

const CLIENT_HOME_PAGE_URL = '';

//========================================================================================================================================
// Required Models
//========================================================================================================================================

const User = require('../models/user');

// when login is successful, retrieve user info
router.get('/api/login/success', (req, res) => {
	if (req.user) {
		console.log('user has been succefully authenticated');
		res.json({
			success : true,
			message : 'user has successfully authenticated',
			user    : req.user,
			cookies : req.cookies
		});
	}
});

// When logout, redirect to client
router.get('/api/logout', (req, res) => {
	req.logout();
	return res.json({});
});

router.get('/api/login', passport.authenticate('local'));

module.exports = router;
