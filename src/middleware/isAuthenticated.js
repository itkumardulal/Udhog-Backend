// middlewares/isAuthenticated.js
const jwt = require("jsonwebtoken");
const { secretConfig } = require("../config/config");
const { users } = require("../database/connection");

const Roles = Object.freeze({
  Admin: "admin",
  User: "user",
});

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token not verified",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretConfig.secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    try {
      const userData = await users.findByPk(decoded.id);
      if (!userData) {
        return res.status(404).json({
          message: "No user with that ID found",
        });
      }
      req.user = userData;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  });
};

const restrictedTo = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "You don't have Permission",
      });
    }
    next();
  };
};

module.exports = { isAuthenticated, restrictedTo, Roles };
