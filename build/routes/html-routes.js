"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Requiring path to so we can use relative routes to our HTML files
const path_1 = __importDefault(require("path"));
// const passport = require("../config/passport");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated_1 = __importDefault(require("../config/middleware/isAuthenticated"));
// Pino logger
const logger_1 = __importDefault(require("../config/logger"));
function htmlRoutes(app) {
    app.get("/", (req, res) => {
        logger_1.default.debug(req.url);
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path_1.default.join(__dirname, "../public/signup.html"));
    });
    app.get("/login", (req, res) => {
        logger_1.default.debug(req.url);
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path_1.default.join(__dirname, "../public/login.html"));
    });
    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated_1.default, (req, res) => {
        logger_1.default.debug(req.url);
        res.sendFile(path_1.default.join(__dirname, "../public/members.html"));
    });
    // app.get("/auth/facebook/secrets", passport.authenticate("facebook"));
    // app.get(
    //   "/auth/facebook/callback",
    //   passport.authenticate("facebook", { failureRedirect: "/login" }),
    //   function (req, res) {
    //     // Successful authentication, redirect home.
    //     res.redirect("/members");
    //   }
    // );
    app.get("/favorites", (req, res) => {
        logger_1.default.debug(req.url);
        // If the user already has an account send them to the members page
        // if (req.user) {
        //   res.redirect("/favorites");
        // }
        res.sendFile(path_1.default.join(__dirname, "../public/favorites.html"));
    });
}
;
exports.default = htmlRoutes;
