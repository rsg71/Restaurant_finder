"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.js")[env];
var db = {};
const favorite_1 = __importDefault(require("./favorite"));
const user_1 = __importDefault(require("./user"));
if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
}
else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
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
db.Favorite = (0, favorite_1.default)(sequelize, Sequelize);
// User model
db.User = (0, user_1.default)(sequelize, Sequelize);
exports.default = db;
