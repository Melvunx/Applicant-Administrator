const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("Connected to MongoDb !"))
  .catch((err) => console.log(err));
