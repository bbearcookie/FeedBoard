const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send("this is main page");
});

module.exports = router;