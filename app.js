const express = require("express");
const adminSeeder = require("./adminSeeder");
const app = express();
const cors = require("cors");

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5174", 
  "https://udhogwebsite-production.up.railway.app" ,
  "https://udhog-admin-client-production.up.railway.app",
  "https://www.sindhulicci.com",
  "https://sindhulicci.com",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// adminSeeder() 

const authRoute = require("./src/routes/authRoutes");
const companyRoute = require("./src/routes/companyRoute");
const noticeRoute = require("./src/routes/noticeRoute");
const newsRoute = require("./src/routes/newsRoute");

app.use("/", authRoute);
app.use("/", companyRoute);
app.use("/", noticeRoute);
app.use("/", newsRoute);

module.exports = app;
