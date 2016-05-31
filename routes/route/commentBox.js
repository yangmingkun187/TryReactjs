var express = require('express');
var router = express.Router();
var data = [
  {"userName": "jason:", "text": "this is awesome!"},
  {"userName": "杨明昆:", "text": "碉堡了!"},
  {"userName": "john snow:", "text": "I'm not *dead*"}
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile("commentBox.html");
});
router.get('/user', function(req, res, next) {
  res.send(data);
});
router.post('/add', function(req, res, next) {
    data = data.concat(req.body);
  res.send(data);
});
module.exports = router;
