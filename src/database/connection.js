const { Sequelize, DataTypes } = require("sequelize");
const { dbConfig } = require("../config/config");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
    pool: dbConfig.pool,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED !");
  })
  .catch((err) => {
    console.log("error", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./model/userModel")(sequelize, DataTypes);
db.companies = require("./model/companyModel")(sequelize, DataTypes);
db.notices = require("./model/noticesModel")(sequelize, DataTypes);
db.news = require("./model/newsModel")(sequelize, DataTypes);

// db.sequelize.sync({ force: false }).then(() => {
//   console.log("migrated successfully");
// });

module.exports = db;
  