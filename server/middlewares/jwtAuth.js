const jwt = require("jsonwebtoken");
const jwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
  console.log('vvvv',authHeader);
      
      return res
        .status(403)
        .json({ status: 403, message: "No token provided" });
    } else {
      if (authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
      } else {
        return res.status(401).json({
          status: 401,
          message: "Invalid token format. Authorization failed.",
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({
        status: 500,
        message: "Internal server error.",
      });
  }
};

module.exports = jwtAuth;
