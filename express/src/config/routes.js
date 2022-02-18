const authCtrl = require('../controllers/authCtrl');
const postCtrl = require('../controllers/postCtrl');
const userCtrl = require('../controllers/userCtrl');

module.exports = (app) => {
  app.use('/test', require('../controllers/testCtrl'));

  app.post('/auth/signin', authCtrl.signin);
  app.post('/auth/signup', authCtrl.signup);
  app.post('/auth/logout', authCtrl.logout);
  app.get('/auth/check', authCtrl.check);

  app.post('/writer', postCtrl.writePost);
  app.get('/post', postCtrl.getPosts); // 전체 게시글 반환
  app.get('/post/:postNo', postCtrl.getPost); // 특정 게시글 반환
  app.patch('/favorite/:postNo', postCtrl.patchFavorite); // 특정 게시글의 좋아요 처리
  app.post('/comment', postCtrl.writeComment); // 댓글 등록 처리
  
  app.get('/nickname/:username', userCtrl.getNickname); // 해당 계정의 닉네임을 반환
}