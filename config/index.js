//config.js
const dev = require("./dev");
const prod = require("./prod");
const test = require("./test");
//logic config for development or production

// ===========================
// Vencimiento de token
// ===========================

process.env.CADUCIDAD_TOKEN = '48h';

// ===========================
// SEED de autenticación
// ===========================

process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION || 'este-es-el-seed-desarrollo';

module.exports = (app) => {
  let config;
  switch (process.env.NODE_ENV) {
    case 'prod':
      config = prod(app);
      break;
    case 'test':
      config = test(app);
      break;
    case 'dev':
    default:
      config = dev(app);
      break;
  }
  Object.assign(process.env, config.env);
  return config;
};

