const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const crypto = require('crypto');
const db = require('../config/database');

// salt 만드는 함수
function makeSalt() {
  return crypto.randomBytes(32).toString('hex');
}

// 암호화 하는 함수
function encrypt(salt, plainText) {
  const hashedText = crypto.pbkdf2Sync(plainText, salt, 51234, 32, "sha512").toString('hex');
  return hashedText;
}

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // LocalStrategy
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passportField: 'password',
    session: true,
  }, async (username, password, done) => {
    const conn = await db.getConnection();
    try {
      const query = 'SELECT * FROM user WHERE USERNAME = ? AND provider = "local"';

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

      // 세션에 저장이 필요한 사용자 정보들만 추출
      user = {
        provider: 'local',
        username: user.username,
        nickname: user.nickname,
        imgFileName: user.imgFileName
      };

      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(null, false, { message: '시스템 에러' });
    } finally {
      conn.release();
    }
  }));

  // KakaoStrategy
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_RESTAPI_KEY,
    callbackURL: '/auth/signin/kakao'
  }, async (accessToken, refreshToken, profile, done) => {
    const conn = await db.getConnection();
    try {
      let query = `
      SELECT * FROM USER
      WHERE USERNAME='${profile.id}_kakao'
      AND provider='kakao'
      `;

      let [[user]] = await conn.query(query);

      // 처음 가입하는 계정이면 DB에 등록
      if (!user) {
        const username = profile.id + "_kakao";
        const nickname = profile.username;
        query = 'INSERT INTO user (provider, username, nickname) VALUES (?, ?, ?)';
        await conn.execute(query, ['kakao', username, nickname]);
        user = { username, nickname, imgFileName: '' };
      }
      
      user = {
        provider: 'kakao',
        accessToken,
        refreshToken,
        username: user.username,
        nickname: user.nickname,
        imgFileName: user.imgFileName
      };

      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(null, false, { message: '시스템 에러' });
    } finally {
      conn.release();
    }
  }));
};

module.exports.passport = passport;
module.exports.encrypt = encrypt;
module.exports.makeSalt = makeSalt;