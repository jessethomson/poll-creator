var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/poll/:questionId',function(req,res) {
	res.render('poll');
});

router.get('/poll/:questionId/results',function(req,res) {
	res.render('results');
});

module.exports = router;
