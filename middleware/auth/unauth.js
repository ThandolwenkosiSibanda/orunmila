module.exports = async (req, res, next) => {
	
	if (req.user) {
	  console.log('user  is already registed in the system')
	  res.status(401).json({
		authenticated: false,
		message: "user  is already registed in the system"
	  });
	} else {
	  next();
	}
  
};