const express = require('express');
const app = express();

require('./config/routes')(app);

app.listen(5000, () => {
  console.log('5000 포트 실행');
});