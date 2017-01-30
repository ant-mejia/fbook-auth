var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let user = null;
  if (req.user) {
    user = req.user.dataValues;
  }
  res.render('index', {
    user: user,
    title: 'Hello World'
  });
});

module.exports = router;
