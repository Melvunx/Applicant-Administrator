const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDb !"))
  .catch((err) => console.log(err));
