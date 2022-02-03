const router = require('express').Router();
const crypto = require('crypto');
const db = require('../config/database');
const { makeSalt, encrypt, passport } = require('../config/passport');

router.post('/signin', async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(400).json({message: '이미 로그인 되어있어요.'});
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) console.error(err);
    if (user) {
      req.login(user, (err) => {
        if (err) console.error(err);
        console.log('로그인 성공');
        console.log(user);
        res.status(200).json({ message: '로그인 성공', nickname: user.nickname });
      })
    } else {
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
    const salt = makeSalt();
    const hashedPassword = encrypt(salt, password);
    const sql = 'INSERT INTO user (username, password, salt, nickname) VALUES (?, ?, ?, ?)';
    await con.execute(sql, [username, hashedPassword, salt, nickname]);

    res.status(200).json({ message: '회원가입 성공', nickname });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '데이터베이스 문제 발생' });
  }
});

router.post('/logout', async (req, res) => {
  req.logout();
  res.send();
});

router.get("/check", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: '로그인이 되어있는 상태에요.', username: req.user.username });
  } else {
    res.status(401).json({ message: '로그인이 되어있지 않은 상태에요.' });
  }
});

module.exports = router;