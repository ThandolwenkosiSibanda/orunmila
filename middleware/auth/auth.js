
module.exports = async (req, res, next) => {
	
	if (!req.user) {
	  res.status(401).json({
		authenticated: false,
		message: "This page is only available to logged in Users"
	  });
	} else {
	  next();
	}
  
};