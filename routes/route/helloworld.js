var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('is here');
  res.sendfile("helloworld.html");
});

module.exports = router;
