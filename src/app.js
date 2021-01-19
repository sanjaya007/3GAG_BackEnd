const express = require("express");
require("./db/conn");
const router = require("./routers/users");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log("I am live at " + port);
});
