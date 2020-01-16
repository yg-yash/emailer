const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("error in mongodb");
  });
