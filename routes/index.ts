// Requiring our models and passport as we've configured it
import express, { Request, Response } from 'express';
import db from "../models";
import passport from "../config/passport";
require("dotenv").config();
// Pino logging
import logger from '../config/logger';
import authRoutes from './auth-routes';
import { join } from 'path';

// Declare models
const User = db.User;
const Favorite = db.Favorite;

const router = express.Router({ mergeParams: true });


// --------------------------
// Routes below are prefixed with '/api'
// --------------------------


// ✅✅✅✅✅✅✅✅
router.get("/status", async (req: Request, res: Response) => {
  try {
    const date = new Date();
    res.send(`status: UP on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});


router.use('/auth', authRoutes);


// 🟡🟡🟡🟡🟡🟡🟡🟡🟡
// Route for logging user out
router.get("/logout", async (req: Request, res: Response) => {

  try {
    let options = {}
    req.logout(options, (err: any) => {
      if (err) {
        throw new Error(err.message)
      }
    });
    res.status(200).send('logout successful')

  } catch (err: any) {
    res.status(500).send(err.message);
  }
});


// 🟡🟡🟡🟡🟡🟡🟡🟡🟡
// Route for getting some data about our user to be used client side
router.get("/user_data", (req: Request, res: Response) => {

  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.status(401).json({});
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

router.get("/test_data", (req: Request, res: Response) => {
  Favorite.findAll({}).then(function (data: any) {
    res.json(data);
  });
});

// 🟡🟡🟡🟡🟡🟡🟡🟡🟡
router.post("/restaurants", (req: Request, res: Response) => {
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


// 🟡🟡🟡🟡🟡🟡🟡🟡🟡
router.get("/restaurants", (req: Request, res: Response) => {
  let reqUser = req.user as any;


  Favorite.findAll({
    where: {
      UserId: reqUser.id,
    },
  }).then(function (data: any) {
    res.json(data);
  });
});

// router.delete("/restaurants", (req: Request, res: Response) => {
//   db.Favorite.delete({
//     where: {
//       id: req.params.id,
//     },
//   }).then(function(deleterestaurant) {
//     res.json(eleterestaurant);
//   });
// });





export default router;