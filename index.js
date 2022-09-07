const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

//create app using express
const app = express();

//import config
const config = require("./config")(app);

//import router
const router = require("./router");

//Secure Express Apps
app.use(helmet());

app.use(express.urlencoded({ extended: true }));

//Parse the body request to json
app.use(express.json());

//Router
router(app);

//Listen server to the specific PORT
app.listen(config.PORT, () => {
  console.log(`listen port ${config.PORT}`);
});

module.exports = {app};
