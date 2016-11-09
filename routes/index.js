var express = require('express');
var router = express.Router();
//Pretty sure we will need these
// var mongoose = require('mongoose');
// var Comment = mongoose.model('Comment');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/poll',function(req,res,next) {
	// Comment.find(function(err, comments){
 //    if(err){ return next(err); }
 //    res.json(comments);
 //  });
	res.render('poll', { title: 'Express' });
});


module.exports = router;
