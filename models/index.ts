"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config")[env];
var db = {} as any;
import favorite from "./favorite";
import user from "./user";

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// creating models for each model file in our /models folder
// fs.readdirSync(__dirname)
//   .filter(function(file: any) {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach(function(file: any) {
//     var model = sequelize["import"](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// associate each model with db
// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Favorite model
db.Favorite = favorite(sequelize, Sequelize);
// User model
db.User = user(sequelize, Sequelize);


export default db;