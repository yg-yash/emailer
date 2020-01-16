const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./db/mongoose");
require("./models/User");
require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys");

const app = express();

//cookie middleware
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//routers
app.use("/", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
