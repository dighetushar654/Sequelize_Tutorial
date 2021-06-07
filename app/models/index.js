const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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

db.movies = require("./movie.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.movies.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.movies, {
  foreignKey: "movieId",
  as: "movie",
});

module.exports = db;
