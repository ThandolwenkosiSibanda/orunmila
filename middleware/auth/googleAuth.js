
module.exports = async (req, res, next) => {
	
		if (!req.user) {
		  console.log('user not authenticated')
		  res.status(401).json({
			authenticated: false,
			message: "user has not been authenticated"
		  });
		} else {
		  next();
		}
	  
};
