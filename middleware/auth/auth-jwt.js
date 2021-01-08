const jwt = require('jsonwebtoken');

const jwtkey = process.env.ACCESS_TOKEN_SECRET;

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({ message: 'No token provided!' });
	}

	jwt.verify(token, jwtkey, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: 'Unauthorized!' });
		}
		req.userId = decoded.id;
		next();
	});
};
