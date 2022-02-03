const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

module.exports.config = () => {
  // 세션 설정
  app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false,
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
}

module.exports.app = app;