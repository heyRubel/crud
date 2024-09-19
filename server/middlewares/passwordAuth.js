const jwt = require("jsonwebtoken");

const passwordAuth = (req, res, next) => {
  const headerToken = req.headers['authorization']
  console.log(headerToken);
  


  // Check if the headerToken exists
  if (!headerToken) {
    return res.status(401).json({
      status: 401,
      message: "No token provided. Authorization failed.",
    });
  }

  console.log(headerToken);
  

  try {
    if (headerToken.startsWith("Bearer")) {
      let token = headerToken.split(" ")[1];
      let decoded = jwt.verify(token, process.env.FORGET_SECRET_KEY);
      console.log("2 payload", decoded);
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "Invalid token format. Authorization failed.",
      });
    }
  } catch (error) {
  return  res.status(500).json({ status: 500, message: "Internal server errorrr" });
  }
};

module.exports = passwordAuth;
