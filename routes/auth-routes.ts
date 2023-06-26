// Requiring our models and passport as we've configured it
import express, { NextFunction, Request, Response } from 'express';
import db from "../models";
import passport from "../config/passport";
require("dotenv").config();
// Pino logging
import logger from '../config/logger';

// Declare models
const User = db.User;

const router = express.Router({ mergeParams: true });


// These routes start with "/api/auth"

router.get('/mango', (req: Request, res: Response) => {
  res.send("hello yall")
})






// ✅✅✅✅✅✅✅✅
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/login", passport.authenticate("local"), (req: Request, res: Response) => {
    logger.warn('attempting to log in...');
    // Sending back a password, even a hashed password, isn't a good idea
    let requser = req.user as any;
    console.log('req.user is', requser);
    logger.debug({ 'req.user': requser });
    res.status(200).json({
      email: requser.email,
      id: requser.id,
      msg: 'login successful'
    });
  });

// ✅✅✅✅✅✅✅✅
// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", async (req: Request, res: Response) => {
  try {

    console.log(req.body);
    logger.debug('WE ARE SIGNING UP')
    logger.debug(req.body);

    let { email, password } = req.body;

    await User.create({
      email: req.body.email,
      password: req.body.password,
    })
    logger.trace('signup successful');
    res.status(201).send({ msg: 'signup successful', email, password })

  } catch (err: any) {
    logger.error(err);
    return res.status(405).send(err.message);
  }
});

export default router;