const express = require('./config/express');
const app = express.app;
express.config();

require('./config/database');
require('./config/passport')(app);
require('./config/routes')(app);

app.listen(5000, () => {
  console.log('5000 포트 실행');
});