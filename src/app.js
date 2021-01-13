const express = require("express");
require("./db/conn");
const router = require("./routers/users");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log("I am live at " + port);
});
