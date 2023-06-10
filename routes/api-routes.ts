// Requiring our models and passport as we've configured it
import { Request, Response } from 'express';
import db from "../models";
import passport from "../config/passport";
require("dotenv").config();
// Pino logging
import logger from '../config/logger';

// Declare models
const User = db.User;
const Favorite = db.Favorite;

export default function apiRoutes(app: any) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req: Request, res: Response) => {
    logger.debug(req.url);
    // Sending back a password, even a hashed password, isn't a good idea
    let requser = req.user as any;
    res.json({
      email: requser.email,
      id: requser.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req: Request, res: Response) => {
    logger.debug(req.url);
    logger.debug(req.body);

    User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        logger.trace('signup successful');
        res.redirect(307, "/api/login");
      })
      .catch((err: any) => {
        logger.error(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", async (req: Request, res: Response) => {
    logger.debug(req.url);

    try {
      let options = {}
      req.logout(options, (err: any) => {
        if (err) {
          throw new Error(err.message)
        }
      });
      res.redirect("/");

    } catch (err: any) {
      res.status(500).send(err.message);
    }
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req: Request, res: Response) => {
    logger.debug(req.url);

    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      let requser = req.user as any;

      res.json({
        email: requser.email,
        id: requser.id,
      });
    }
  });
  app.post("/api/restaurants", (req: Request, res: Response) => {
    logger.debug(req.url);
    logger.debug(req.body);
    let reqUser = req.user as any;


    var newFavorite = {
      name: req.body.name,
      image: req.body.image,
      address: req.body.address,
      rating: req.body.rating,
      description: req.body.description,
      menuLink: req.body.menuLink,
      UserId: reqUser.id,
    };

    Favorite.create(newFavorite).then(function (data: any) {
      res.json(data);
    });
  });

  app.get("/api/restaurants", (req: Request, res: Response) => {
    logger.debug(req.url);
    let reqUser = req.user as any;


    Favorite.findAll({
      where: {
        UserId: reqUser.id,
      },
    }).then(function (data: any) {
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
};
