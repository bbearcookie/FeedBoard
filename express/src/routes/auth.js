const router = require('express').Router();
const crypto = require('crypto');
const db = require('../config/database');
const { encrypt, passport } = require('../config/passport');

router.post('/signin', async (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) console.error(err);
    if (user) {
      req.login(user, (err) => {
        if (err) console.error(err);
        console.log('로그인 성공');
        res.status(200).json({ message: '로그인 성공' });
      })
    } else {
      console.log(info);
      console.log('로그인 실패 이유: ' + info.message);
      res.status(401).json(info);
    }

  })(req, res); // authenticate 내부의 콜백 함수에 req, res 객체를 사용할수 있게 보냄.
});

router.post('/signup', async (req, res) => {
  const { username, password, passwordConfirm, nickname } = req.body;

  // 유효성 및 중복 검사
  const con = await db.getConnection();
  try {
    if (!username || username === '' || /[^a-zA-Z0-9]/.exec(username) || username.length > 20)
      throw { statusCode: 400, message: '아이디 유효성 검사 실패' };

    if (!password || password === '' || passwordConfirm === '')
      throw { statusCode: 400, message: '비밀번호 유효성 검사 실패' };

    if (!nickname || nickname === '' || /[^a-zA-Z0-9가-힣]/.exec(nickname) || nickname.length > 20)
      throw { statusCode: 400, message: '닉네임 유효성 검사 실패' };

    // 아이디 중복 검사
    const sql = 'SELECT * FROM user WHERE username = ?';
    const [[user]] = await con.query(sql, [username]);
    if (user) throw { statusCode: 409, message: '이미 존재하는 아이디에요.', field: 'username' };

  } catch (err) {
    con.release();
    return res.status(err.statusCode).json({ message: err.message, field: err.field });
  }

  // 암호화 및 DB 저장
  try {
    const salt = crypto.randomBytes(32).toString('hex');
    const hashedPassword = encrypt(salt, password);
    const sql = 'INSERT INTO user (username, password, salt) VALUES (?, ?, ?)';
    con.execute(sql, [username, hashedPassword, salt]);
  } catch (err) {
    console.error(err);
  }

  res.status(200).json({ message: '회원가입 성공' });
});

// 아래는 테스트용 ---
router.get('/test/signin', async (req, res) => {
  let html = 
  `
  <html>
    <head>
      <title>haha</title>
    </head>
    <body>
    <form method="post" action="http://localhost:5000/auth/test/signin">
      <input type="text" name="username" placeholder="아이디" />
      <input type="password" name="password" placeholder="비밀번호" />
      <button type="submit">전송</button>
    </form>
    </body>
  </html>
  `
  res.send(html);
});

router.post('/test/signin', async (req, res, next) => {
  console.log(req.body);

  passport.authenticate('local', (err, user, info) => {
    if (err) console.error(err);
    if (user) {
      req.login(user, (err) => {
        if (err) console.error(err);
        console.log('로그인 성공');
        res.send('로그인 성공');
      })
    } else {
      console.log('로그인 실패 이유: ' + info.message);
      res.send('실패');
    }

  })(req, res, next); // authenticate 내부의 콜백 함수에 req, res 객체를 사용할수 있게 보냄.

  // res.redirect('http://localhost:5000/auth/test/signin');
});

router.get('/test', async (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send("로그인 안한 상태");
  };
});

router.get('/test/logout', async (req, res) => {
  req.logout();
  res.send('bye');
});

module.exports = router;