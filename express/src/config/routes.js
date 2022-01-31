module.exports = (app) => {
  app.use('/', require('../routes/root'));
  app.use('/auth', require('../routes/auth'));
}