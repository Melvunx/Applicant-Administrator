const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("./middleware/local-stategy");
const session = require("express-session");

require("dotenv").config({ path: "./.env" });
require("./config/database");

const { PORT, SECRET_SESSION } = process.env;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: SECRET_SESSION || "Melvunx",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const offerRoutes = require("./routes/applicant.routes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/offers", offerRoutes);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.error("Failed to start the server:", err);
  } else {
    console.log(`Server is listening on port ${PORT || 3000}`);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World !");
});
