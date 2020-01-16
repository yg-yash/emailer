const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String
  }
});

//defining users model
mongoose.model("users", userSchema);
