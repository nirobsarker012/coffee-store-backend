const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("coffe-store-dev");
});

app.listen(port, () => {
  console.log(`Example app listening port ${port}`);
});
