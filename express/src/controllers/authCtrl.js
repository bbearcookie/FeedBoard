const db = require('../config/database');
const { makeSalt, encrypt, passport } = require('../config/passport');

/** @type {import("express").RequestHandler} */
module.exports.signin = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(400).json({message: '이미 로그인 되어있어요.', nickname: req.user.nickname});
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) console.error(err);
    if (user) {
      req.login(user, (err) => {
        if (err) console.error(err);
        res.status(200).json({
          message: '로그인 성공',
          username: user.username,
          nickname: user.nickname,
          imgFileName: user.imgFileName
        });
      })
    } else {
      console.log('로그인 실패: ' + info.message);
      res.status(401).json(info);
    }

  })(req, res); // authenticate 내부의 콜백 함수에 req, res 객체를 사용할수 있게 보냄.
}

/** @type {import("express").RequestHandler} */
module.exports.signup = async (req, res) => {
  const { username, password, passwordConfirm, nickname } = req.body;

  if (req.isAuthenticated()) {
    return res.status(400).json({message: '로그인이 되어있는 상태에는 가입할 수 없어요.'});
  }

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
    return res.status(err.statusCode).json({ message: err.message, field: err.field });
  } finally {
    con.release();
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
  } finally {
    con.release();
  }
};

/** @type {import("express").RequestHandler} */
module.exports.logout = async (req, res) => {
  req.logout();
  res.send();
}

/** @type {import("express").RequestHandler} */
module.exports.check = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: '로그인이 되어있는 상태에요.',
      username: req.user.username,
      nickname: req.user.nickname,
      imgFileName: req.user.imgFileName
    });
  } else {
    res.status(401).json({ message: '로그인이 되어있지 않은 상태에요.' });
  }
}

/** @type {import("express").RequestHandler} */
module.exports.getLoggedUser = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: '로그인 상태가 아니에요.' });
  }

  const con = await db.getConnection();
  try {
    const sql =
    `SELECT username, nickname, introduce, imgFileName, registeredTime
    FROM user
    WHERE username = ?`;
    const [[user]] = await con.query(sql, req.user.username);

    return res.status(200).json({ message: '하하', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }
}

/** @type {import("express").RequestHandler} */
module.exports.putLoggedUser = async (req, res) => {
  const { nickname, introduce, imageReset } = req.body;

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: '로그인 상태가 아니에요.' });
  }

  const con = await db.getConnection();
  try {
    let sql =
    `UPDATE user SET nickname='${nickname}', introduce='${introduce}'`;

    // 다운로드된 프로필 이미지 파일 있으면 파일 경로 수정
    if (req.file) {
      sql += `, imgFileName='${req.file.filename}'`;
    // 프로필 이미지의 초기화를 원하면 초기화
    } else if (imageReset) {
      sql += `, imgFileName=NULL `;
    }
    
    sql += `WHERE username='${req.user.username}'`;

    await con.execute(sql);

    return res.status(200).json({ message: '하하' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }
}