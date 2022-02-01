const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json()); // express 4.16 버전부터는 body-parser가 내장되었음
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded 형태의 데이터 파싱 가능하게 설정
require('./config/database');

require('./config/routes')(app);

app.listen(5000, () => {
  console.log('5000 포트 실행');
});