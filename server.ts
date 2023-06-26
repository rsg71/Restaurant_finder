// Requiring necessary npm packages
import express, { Request, Response, urlencoded } from 'express';
import session from "express-session";
// Requiring passport as we've configured it
import passport from "./config/passport";
import apiRoutes from "./routes";
// import htmlRoutes from "./routes/html-routes";
// Pino logging
import logger from './config/logger';
import db from "./models";
import { join } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// require dotenv
require('dotenv').config()


// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

logger.warn(process.env.SESSION_SECRET)
// app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: true,
    saveUninitialized: true,
  })
);

// Allow reequests from all origins
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
//   next();
// })

app.use(cors({
  origin: process.env.FRONT_END_ORIGIN_URL, // <-- location of the react app we're connecting to
}))


// Log url with method (ex: GET /examples/123)
app.use((req, res, next) => {
  logger.trace(`${req.method} ${req.url}`);
  console.log('here is session id: ', req.sessionID);
  logger.trace({ 'req.body': req.body })
  next();
})


app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());



// Requiring our routes
// htmlRoutes(app);
app.use('/api', apiRoutes);

// If no API routes are hit, send the React app
app.use(function (req: Request, res: Response) {
  if (process.env.NODE_ENV === 'production') {
    // in production, we're already in app/dist/routes/index.js. We need to go outside of app/build/routes/index.js all the way back into app/ and then from there into frontend/
    // this will be in /app/dist/frontend/build/index.html
    res.sendFile(join(__dirname, "../../frontend/build/index.html"));
  } else {
    res.sendFile(join(__dirname, "./frontend/build/index.html"));
  }
});


// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`\n==> App is listening on port ${PORT}.`);
    logger.debug(`NODE_ENV: ${process.env.NODE_ENV}`);
  });
});
