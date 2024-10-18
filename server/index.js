const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./.env" });

require("./config/database");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routes/applicant.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT} !`);
});
