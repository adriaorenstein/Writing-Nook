//LOAD THE EXPRESS MODULE
const express = require("express");
const path = require("path");
const app = express();

const session = require("express-session");

const db = require("./db");

//load passport
const passport = require("passport");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({ db });
//performs the routing func of the app, add HTTP method routes to this obj to handle requests
const router = express.Router();

const { User } = require("./db/models");

module.exports = app;

//defines the base directory (the client subdirectory)
const public_path = path.resolve(__dirname + "/../public/") + "/";
//tells app to listen on and bind to port 8080
const port = 8080;

if (process.env.NODE_ENV !== "production") require("../secrets");

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//integrate passport into our middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "not a secure secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//SET THE ROUTES USING THE ROUTER OBJ

//loads a middleware func that will log the router's requests and pass them to the app's routes
router.use(function (req, res, next) {
  console.log(`/ ${req.method}`);
  next();
});

router.get("/", function (req, res) {
  res.sendFile(public_path + "index.html");
});

//mount router middleware and app's static assets and tell app to listen on port 8080
app.use(express.static(public_path));
app.use("/", router);

// static file-serving middleware
app.use(express.static(public_path));

//use api routes
app.use("/api", require("./api"));

//GET SUCCESS REDIRECT PAGE
router.get("/home", function (req, res) {
  console.log("getting home");
  res.sendFile(public_path + "index.html");
});

//GET FAILURE REDIRECT PAGE
router.get("/loginFailure", function (req, res) {
  res.sendFile(public_path + "index.html");
});

db.sync().then(() => {
  console.log("Database synced");
  app.listen(port, function () {
    console.log("Example app listening on port 8080!");
  });
});
