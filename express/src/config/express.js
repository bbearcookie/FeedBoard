const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const cors = require('cors');
const path = require('path');
const app = express();

module.exports.config = () => {
  // 세션 설정 (redis를 3.1.2 버전으로 해야 동작했음. 최신버전 오류)
  const redisClient = redis.createClient();
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient })
  }));

  // cors 설정
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  }
  app.use(cors(corsOptions));

  // 기타 설정
  app.use(express.json()); // express 4.16 버전부터는 body-parser가 내장되었음
  app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded 형태의 데이터 파싱 가능하게 설정
  app.use(express.static(path.join(process.env.INIT_CWD, "/public"))); // 정적 파일들 기본 폴더 설정
}

module.exports.app = app;