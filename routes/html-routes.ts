import { Request, Response } from 'express';

// Requiring path to so we can use relative routes to our HTML files
import path from "path";
// const passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
import isAuthenticated from "../config/middleware/isAuthenticated";

// Pino logger
import logger from '../config/logger';


// Helper for Heroku. In production
function routeHelper(route: string) {
  let routePath = '';

  if (process.env.NODE_ENV === 'production') {
    routePath = path.join(__dirname, '../' + route)
  } else {
    routePath = path.join(__dirname, route)
  }

  return routePath;
}


logger.debug(`html routes __dirname: ${__dirname}`)

function htmlRoutes(app: any) {
  app.get("/", (req: Request, res: Response) => {
    logger.debug(req.url);

    // If the user already has an account send them to the members page

    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(routeHelper("../public/signup.html"));
  });

  app.get("/login", (req: Request, res: Response) => {
    logger.debug(req.url);

    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(routeHelper("../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req: Request, res: Response) => {
    logger.debug(req.url);

    res.sendFile(routeHelper("../public/members.html"));
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

  app.get("/favorites", (req: Request, res: Response) => {
    logger.debug(req.url);
    // If the user already has an account send them to the members page

    // if (req.user) {
    //   res.redirect("/favorites");
    // }
    res.sendFile(routeHelper("../public/favorites.html"));
  });
};

export default htmlRoutes;