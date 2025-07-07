const express = require("express");
const adminSeeder = require("./adminSeeder");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

adminSeeder()

const authRoute = require("./src/routes/authRoutes");
const companyRoute = require("./src/routes/companyRoute");
const noticeRoute = require("./src/routes/noticeRoute");
const newsRoute = require("./src/routes/newsRoute");

app.use("/", authRoute);
app.use("/", companyRoute);
app.use("/", noticeRoute);
app.use("/", newsRoute);

module.exports = app;
