const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database.js");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const bodyParser = require("body-parser");
require("./controllers/Auth.js");
const { createServer } = require("cors-anywhere");
const UserRoute = require("./routes/UserRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");

require('./models/userModel.js')
require('./models/pekerjaanModel.js')
require('./models/pelatihanModel.js')
require('./models/pendidikanModel.js')

dotenv.config();

const app = express();
app.disable("x-powered-by");
const sessionStore = new SequelizeStore({
  db: db,
  expiration: process.env.SESSION_EXPIRED * 60 * 60 * 1000,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: "auto",
      maxAge: process.env.SESSION_EXPIRED * 60 * 60 * 1000,
    },
  })
);

sessionStore.sync();

db.authenticate()
  .then(() => {
    console.log("Database has been connected...");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

// Configure CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.URL_ORIGIN,
  })
);

app.use(express.json());
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db.sync()
//   .then(() => {
//     console.log("Registered models:", Object.keys(db.models));
//     console.log("Models have been synchronized with the database...");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing models with the database:", error);
//   });


// Start the server
app.listen(process.env.APP_PORT || 5173, () =>
  console.log(`Server started on PORT ${process.env.APP_PORT}`)
);
