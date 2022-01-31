const router = require('express').Router();

router.post('/signup', async (req, res) => {
  console.log(req.body);
  res.send('POST /signup');
});

module.exports = router;