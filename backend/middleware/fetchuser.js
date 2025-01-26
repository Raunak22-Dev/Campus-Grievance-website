const jwt = require('jsonwebtoken');
const secret = "14adef4dsd4f4dd4dsfe7f7"; // Replace with your secret key

// Middleware to fetch user details from the authentication token
const fetchuser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }

  try {
    const data = jwt.verify(token, secret); // Replace JWT_SECRET with your secret
    req.user = data.user;
    console.log(data)
    next();
    
} catch (error) {
    return res.status(401).json({ message: "Invalid token" });
}
};

module.exports = fetchuser;
