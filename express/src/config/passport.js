const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const db = require('../config/database');

// 암호화 하는 함수
function encrypt(salt, plainText) {
  const hashedText = crypto.pbkdf2Sync(plainText, salt, 51234, 32, "sha512").toString('hex');
  return hashedText;
}

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log('deserializeUser');
    done(null, user);
  });

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passportField: 'password',
    session: true,
  }, async (username, password, done) => {
    try {
      const conn = await db.getConnection();
      const query = 'SELECT * FROM user WHERE USERNAME = ?';

      // query의 첫 번째 인자로 나온 결과는 배열 형태이기에 맨 처음꺼 가져오게 구조분해할당
      let [[user]] = await conn.query(query, [username]);

      // 없는 아이디
      if (!user) {
        return done(null, false, { message: '가입 되어있지 않은 아이디에요.', field: 'username' } );
      }

      // 비밀번호 비교
      if (user.password !== encrypt(user.salt, password)) {
        return done(null, false, { message: '비밀번호가 달라요.', field: 'password' });
      }

      conn.release();
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(null, false, { message: '시스템 에러' });
    }
  }));
};

module.exports.passport = passport;
module.exports.encrypt = encrypt;