"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const passport_1 = __importDefault(require("../config/passport"));
require("dotenv").config();
// Pino logging
const logger_1 = __importDefault(require("../config/logger"));
// Declare models
const User = models_1.default.User;
const Favorite = models_1.default.Favorite;
function apiRoutes(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport_1.default.authenticate("local"), (req, res) => {
        logger_1.default.debug(req.url);
        // Sending back a password, even a hashed password, isn't a good idea
        let requser = req.user;
        res.json({
            email: requser.email,
            id: requser.id,
        });
    });
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", (req, res) => {
        logger_1.default.debug(req.url);
        logger_1.default.debug(req.body);
        User.create({
            email: req.body.email,
            password: req.body.password,
        })
            .then(() => {
            logger_1.default.trace('signup successful');
            res.redirect(307, "/api/login");
        })
            .catch((err) => {
            logger_1.default.error(err);
            res.status(401).json(err);
        });
    });
    // Route for logging user out
    app.get("/logout", (req, res) => __awaiter(this, void 0, void 0, function* () {
        logger_1.default.debug(req.url);
        try {
            let options = {};
            req.logout(options, (err) => {
                if (err) {
                    throw new Error(err.message);
                }
            });
            res.redirect("/");
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }));
    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", (req, res) => {
        logger_1.default.debug(req.url);
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            let requser = req.user;
            res.json({
                email: requser.email,
                id: requser.id,
            });
        }
    });
    app.post("/api/restaurants", (req, res) => {
        logger_1.default.debug(req.url);
        logger_1.default.debug(req.body);
        let reqUser = req.user;
        var newFavorite = {
            name: req.body.name,
            image: req.body.image,
            address: req.body.address,
            rating: req.body.rating,
            description: req.body.description,
            menuLink: req.body.menuLink,
            UserId: reqUser.id,
        };
        Favorite.create(newFavorite).then(function (data) {
            res.json(data);
        });
    });
    app.get("/api/restaurants", (req, res) => {
        logger_1.default.debug(req.url);
        let reqUser = req.user;
        Favorite.findAll({
            where: {
                UserId: reqUser.id,
            },
        }).then(function (data) {
            res.json(data);
        });
    });
    // app.delete("/api/restaurants", (req: Request, res: Response) => {
    //   db.Favorite.delete({
    //     where: {
    //       id: req.params.id,
    //     },
    //   }).then(function(deleterestaurant) {
    //     res.json(eleterestaurant);
    //   });
    // });
}
exports.default = apiRoutes;
;
