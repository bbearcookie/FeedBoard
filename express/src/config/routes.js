const authCtrl = require('../controllers/authCtrl');
const postCtrl = require('../controllers/postCtrl');

module.exports = (app) => {
  app.use('/test', require('../controllers/testCtrl'));
  app.post('/auth/signin', authCtrl.signin);
  app.post('/auth/signup', authCtrl.signup);
  app.post('/auth/logout', authCtrl.logout);
  app.get('/auth/check', authCtrl.check);
  app.post('/writer', postCtrl.writePost);
  app.get('/post', () => {}); // 전체 게시글 반환
  app.get('/post/:postNo', () => {}); // 특정 게시글 반환
  
}