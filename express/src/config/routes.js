const root = require('../routes/root');

module.exports = (app) => {
  app.use("/", root);
}