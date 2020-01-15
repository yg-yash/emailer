const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ bye: "buddy" });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
