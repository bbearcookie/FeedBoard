const authCtrl = require('../controllers/authCtrl');
const postCtrl = require('../controllers/postCtrl');
const userCtrl = require('../controllers/userCtrl');
const { userImageUpload } = require('../config/multer');

module.exports = (app) => {
  app.use('/test', require('../controllers/testCtrl'));

  app.post('/auth/signin', authCtrl.signin);
  app.post('/auth/signup', authCtrl.signup);
  app.post('/auth/logout', authCtrl.logout);
  app.get('/auth/check', authCtrl.check);
  app.get('/auth/user', authCtrl.getLoggedUser); // 로그인된 사용자의 정보를 반환함.
  app.put('/auth/user', userImageUpload.single('image'), authCtrl.putLoggedUser); // 로그인된 사용자의 정보를 수정함.

  app.get('/post', postCtrl.getPosts); // 전체 게시글 반환
  app.get('/post/:postNo', postCtrl.getPost); // 특정 게시글 반환
  app.patch('/favorite/:postNo', postCtrl.patchFavorite); // 특정 게시글의 좋아요 처리
  app.post('/writer', postCtrl.writePost); // 게시글 등록 처리
  app.post('/comment', postCtrl.writeComment); // 댓글 등록 처리
  
  app.get('/user/:username', userCtrl.getUser); // 해당 사용자의 정보를 반환
}