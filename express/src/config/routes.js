const authCtrl = require('../controllers/authCtrl');
const postCtrl = require('../controllers/postCtrl');

module.exports = (app) => {
  app.use('/test', require('../controllers/testCtrl'));
  app.post('/auth/signin', authCtrl.signin);
  app.post('/auth/signup', authCtrl.signup);
  app.post('/auth/logout', authCtrl.logout);
  app.get('/auth/check', authCtrl.check);
}