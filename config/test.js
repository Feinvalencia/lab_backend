const morgan = require("morgan");
const cors = require("cors");
const swagger = require("./swagger");


module.exports = async(app) => {
  let env ={SEED_AUTENTICACION : process.env.SEED_AUTENTICACION || 'este-es-el-seed-desarrollo'};

  //CORS Options
  app.use(cors({
    origin: true,
    credentials: true
  }));

  //HTTP request logger with Morgan
  app.use(morgan("dev"));

  swagger(app);

  return {
    PORT: 8001,
    env
  };
};