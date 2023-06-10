// Requiring necessary npm packages
import express from 'express';
import session from "express-session";
// Requiring passport as we've configured it
import passport from "./config/passport";
import apiRoutes from "./routes/api-routes";
import htmlRoutes from "./routes/html-routes";
// Pino logging
import logger from './config/logger';
import db from "./models";
// require dotenv
require('dotenv').config()


// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: process.env.SESSION_SECRET || "", resave: true, saveUninitialized: true })
);
// Log url with method (ex: GET /examples/123)
app.use((req, res, next) => {
  logger.trace(`${req.method} ${req.url}`);
  next();
})
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
htmlRoutes(app);
apiRoutes(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`\n==> App is listening on port ${PORT} in your browser.`);
  });
});
