const jwt = require("jsonwebtoken");
const { secretConfig } = require("../config/config");
const { users } = require("../database/connection");

const Roles = Object.freeze({
  Admin: "admin",
  User: "user",
});

const isAuthenticated = (req, res, next) => {
  const token = req.headers.Authorization;

  if (!token) {
    return res.status(400).json({
      message: "Token not verified",
    });
  }

  jwt.verify(token, secretConfig.secretKey, async (err, decoded) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    try {
      const userData = await users.findByPk(decoded.id);
      if (!userData) {
        return res.status(400).json({
          message: "No user with that id found",
        });
      }
      req.user = userData;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "something went wrong",
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
