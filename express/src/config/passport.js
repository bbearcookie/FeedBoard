const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../config/database');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('serializeUser');
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser');
  });

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passportField: 'password'
  }, async (username, password, done) => {
    console.log('inner local strategy validation check and return user');

    try {
      const conn = await db.getConnection();
      const query = 'SELECT * FROM user WHERE USERNAME = ?';

      // query의 첫 번째 인자로 나온 결과는 배열 형태이기에 맨 처음꺼 가져오게 구조분해할당
      let [[user]] = await conn.query(query, [username]);

      // 없는 아이디
      if (!user) {
        return done(null, false);
      }

      // 비밀번호 비교
      if (user.password !== password) {
        return done(null, false);
      }

      conn.release();
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(null, false);
    }
  }));

  console.log('passport setup');
}

module.exports.passport = passport;