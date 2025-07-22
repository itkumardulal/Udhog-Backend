
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretConfig } = require("../config/config");
const { users } = require("../database/connection");

const isLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const data = await users.findOne({ where: { email } });
  if (!data) {
    return res.status(400).json({ message: "No user with that email" });
  }

  const isAuthenticated = bcrypt.compareSync(password, data.password);
  if (!isAuthenticated) {
    return res.status(400).json({ message: "Incorrect email or password" });
  }

  const token = jwt.sign({ id: data.id }, secretConfig.secretKey, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 3600000, // 1 hour
  });

  return res.status(200).json({
    message: "Login successful",
  });
};

const verifyToken = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Token is valid",
  });
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { isLogin, verifyToken, logout };
