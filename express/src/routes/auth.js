const router = require('express').Router();
const db = require('../config/database');

router.post('/signup', async (req, res) => {
  console.log(req.body);
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