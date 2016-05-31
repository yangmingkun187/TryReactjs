var express = require('express');
var router = express.Router();
var data = [
  {"userName": "jason:", "text": "this is awesome!"},
  {"userName": "杨明昆:", "text": "碉堡了!"},
  {"userName": "john snow:", "text": "I'm not *dead*"}
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('commentBox', { title: 'commentBox' });
});
router.get('/user', function(req, res, next) {
  res.send(data);
});
router.post('/user', function(req, res, next) {
  data.concat(req);
  res.send(data);
});
module.exports = router;
