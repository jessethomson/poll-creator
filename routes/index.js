var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/poll/:questionId',function(req,res) {
	res.render('poll',{question: "hello there,,,?"});
});

module.exports = router;
