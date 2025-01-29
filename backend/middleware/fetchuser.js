const jwt = require("jsonwebtoken");
const secret = "14adef4dsd4f4dd4dsfe7f7"; // Replace with your secret key

const fetchuser = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Authentication token required" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    const data = jwt.verify(token, secret);

    if (!data.user) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    req.user = data.user;
    next();
  } catch (error) {
    const errorMessages = {
      TokenExpiredError: "Token expired",
      JsonWebTokenError: "Invalid token signature",
      NotBeforeError: "Token not active yet",
    };

    return res.status(401).json({
      success: false,
      message: errorMessages[error.name] || "Invalid token",
    });
  }
};

module.exports = fetchuser;
