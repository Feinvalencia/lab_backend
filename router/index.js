const path = require("path");
const jwt_config = require("./jwt_config");
const normalizedPath = path.join(__dirname);

module.exports = (app) => {

  app.use(require(path.join(__dirname, "auth")));
  app.use(require(path.join(__dirname, "activities")));
  app.use(require(path.join(__dirname, "teacher")));
  app.use(require(path.join(__dirname, "rooms")));
  app.use(require(path.join(__dirname, "users")));
  app.use(require(path.join(__dirname, "events")));

 /*  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    app.use(jwt_config);
    if (!(path.parse(file).name in ['index','jwt_config'])) {
      console.log(path.join(__dirname, file));
      app.use(require(path.join(__dirname, file)));
    }
  }); */
};