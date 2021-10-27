const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.post = require("./post.model")(sequelize, Sequelize);

db.user.hasMany(db.post, { as: "posts" });
db.post.belongsTo(db.user, {
  foreignKey: "userId" // clé étrangère dans le modèle post -> la nommée dans ce sens
  // si cette ligne n'est pas là par défaut il la créera !
});

module.exports = db;
