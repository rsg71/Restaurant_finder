"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Requiring necessary npm packages
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
// Requiring passport as we've configured it
const passport_1 = __importDefault(require("./config/passport"));
const api_routes_1 = __importDefault(require("./routes/api-routes"));
const html_routes_1 = __importDefault(require("./routes/html-routes"));
// require dotenv
require('dotenv').config();
// Pino logging
const logger = require('pino')();
logger.info('hello world');
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const models_1 = __importDefault(require("./models"));
// Creating express app and configuring middleware needed for authentication
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
// We need to use sessions to keep track of our user's login status
app.use((0, express_session_1.default)({ secret: process.env.SESSION_SECRET || "", resave: true, saveUninitialized: true }));
// Log url with method (ex: GET /examples/123)
app.use((req, res, next) => {
    console.log(`${req.url} ${req.method}`);
    next();
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Requiring our routes
(0, html_routes_1.default)(app);
(0, api_routes_1.default)(app);
// Syncing our database and logging a message to the user upon success
models_1.default.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`==> Listening on port ${PORT}. in your browser.`);
    });
});
