const router = require('express').Router();
const passport = require('passport');
const CLIENT_HOME_PAGE_URL = '/';
const redirUrl = '';

// when login is successful, retrieve user info
router.get('/auth/login/success', (req, res) => {
	if (req.user) {
		res.json({
			success : true,
			message : 'user has successfully authenticated',
			user    : req.user,
			cookies : req.cookies
		});
	}
});

// when login failed, send failed msg
router.get('/auth/login/failed', (req, res) => {
	console.log('login failed');
	res.status(401).json({
		success : false,
		message : 'user failed to authenticate.'
	});
});

// When logout, redirect to client
router.get('/auth/logout', (req, res) => {
	req.logout();
	res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with google
router.get(
	'/auth/google',
	function(req, res, next) {
		req.session.return_url = req.query.return_url;

		next();
	},
	passport.authenticate('google', {
		scope : [ 'profile', 'email' ]
	})
);

router.get(
	'/auth/google/redirect',
	passport.authenticate('google', {
		failureRedirect : CLIENT_HOME_PAGE_URL
	}),
	function(req, res) {
		var url = req.session.return_url;

		delete req.session.return_url;
		// redirects to /#/returnHash
		res.redirect(url);
	}
);

module.exports = router;
