const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send("this is main page");
});

router.get('/test', async (req, res) => {
  res.send("test page");
})

module.exports = router;