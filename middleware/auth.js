const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) {
    return res.status(401).send({ auth: false, message: "No Token Provided" });
  }

  const jwtToken = token.split("Bearer ")[1];

  if (!jwtToken) {
    return res.status(401).send({ auth: false, message: "Invalid Token" });
  }

  try {
    //verify token
    const decode = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decode || !decode.user || !decode.user.user_id) {
      return res.status(401).send({ auth: false, message: "Invalid Token" });
    }

    const { user } = decode;

    await User.findOne({
      where: {
        user_id: user.user_id,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication failed:", error);
    return res
      .status(500)
      .send({ auth: false, message: "Authentication failed" });
  }
};

exports.isAdmin = (req, res, next) => {
  const { user } = req;
  if (user.role !== "admin") {
    return res.status(404).json({
      success: false,
      message: "Unauthorized access!",
    });
  }

  next();
};
