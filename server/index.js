const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./.env" });

require("./config/database");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", require("./routes/applicant.routes"));

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.error("Failed to start the server:", err);
  } else {
    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World !");
});

