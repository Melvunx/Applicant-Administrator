require("dotenv").config();
import cookieParser from "cookie-parser";
import express from "express";
import colors from "./schema/colors.schema";
const cors = require("cors");
const bodyParser = require("body-parser");

const { PORT } = process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", require("@routes/auth.routes"));
app.use("/api/offers", require("@routes/offer.routes"));

app.listen(PORT, () => {
  console.log(
    colors.info(`\nServer running on port http://localhost:${Number(PORT)}`)
  );
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
