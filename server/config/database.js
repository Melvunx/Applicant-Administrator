const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 20000,
  })
  .then(() => console.log("Connected to MongoDb !"))
  .catch((err) => console.log(err));
