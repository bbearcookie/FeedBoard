const router = require('express').Router();
const crypto = require('crypto');
const db = require('../config/database');
const { passport } = require('../config/passport');

router.post('/signin', async (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) console.error(err);
    console.log('inner authenticate');

    res.send(user);
  })(req, res); // authenticate 내부의 콜백 함수에 req, res 객체를 사용할수 있게 보냄.
});

router.post('/signup', async (req, res) => {
  const { username, password, passwordConfirm, nickname } = req.body;
  console.log(req.body);

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
    if (user) throw { statusCode: 409, message: '이미 존재하는 아이디에요.' };

  } catch (err) {
    con.release();
    return res.status(err.statusCode).send(err.message);
  }

  // 암호화 및 DB 저장
  try {
    const salt = crypto.randomBytes(32).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 51234, 32, "sha512").toString('hex');

    const sql = 'INSERT INTO user (username, password, salt) VALUES (?, ?, ?)';
    con.execute(sql, [username, hashedPassword, salt]);
  } catch (err) {
    console.error(err);
  }

  res.send('POST /signup');
});

router.get('/test', async (req, res) => {
  db.query('SELECT * FROM USER', (err, results, fields) => {
    if (err) console.log(err);

    console.log(results);
  });

  res.send("haha");
});

module.exports = router;