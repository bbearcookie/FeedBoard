const router = require('express').Router();
const db = require('../config/database');

// db.query는 select문 조회만 가능. 기타 쿼리문은 db.execute로 가능.
router.get('/', async (req, res) => {
  try {
    const conn = await db.getConnection();
  
    let [result] = await conn.query('SELECT * FROM user');
    console.log(result);
  
    await conn.release();
  } catch (err) {
    console.error(err);
  }

  res.send("this is main page");
});

router.get('/test', async (req, res) => {
  res.send("test page");
});

router.get('/test/user', async (req, res) => {
  console.log(req.user);

  res.json({message: 'haha'});
});

module.exports = router;