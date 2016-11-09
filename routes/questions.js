var express = require('express');

module.exports = function(Model) {
	var router = express.Router();

	router.route("/")
		.get(function(req,res) {
			var query = {};
			for(var key in req.query) {
				query[key] = req.query[key];
			}
			// pass query straight in
			Model.find(req.query, function(err, items) {
				if(err) {
					res.status(500).send(err);
				}
				else {
					res.json(items);
				}
			});
		})
		.post(function(req,res) {
			var newItem = new Model(req.body);
			newItem.save(function (err, item, numAffected) {
  				if (err) {
  					res.status(400).send(err);
  				}
  				else {
  					res.status(201).send(item);
  				}
			})

		});

	router.route("/:pollId")
		.all(function(req,res,next) {
			Model.findById(req.params.pollId, function(err, item) {
				if(err) {
					res.status(500).send(err);
				}
				else if (item) {
					req.item = item;
					next();
				}
				else {
					res.status(404).send("no item found");
				}
			});
		})
		.get(function(req,res) {
			res.json(req.item);
		})
		.put(function(req,res) {

			for(var key in req.item) {
				if(req.body[key]) {
					req.item[key] = req.body[key];
				}
			}

			req.item.save(function(err) {
				if(err) {
					res.status(500).send(err);
				}
				else {
					res.json(req.item);
				}
			});
		})
		.patch(function(req,res) {
			if(req.body._id) {
				delete req.body._id;
			}
			for(var p in req.body) {
				req.item[p] = req.body[p];
			}
			req.item.save(function(err) {
				if(err) {
					res.send(500).send(err);
				}
				else {
					res.json(req.item);
				}
			});

		})
		.delete(function(req,res) {
			req.item.remove(function(err) {
				if(err) {
					res.status(500).send(err);
				}
				else {
					res.status(204).send("item deleted");
				}
			})
		});

	router.route("/:pollId/options/:optionId")
		.get(function(req,res) {

			Model.findById(req.params.pollId, function(err, item) {
				if(err) {
					res.status(500).send(err);
				}
				else if (item) {
					var option = item.options.id(req.params.optionId);
					if(option) {
						res.send(option);
					}
					else {
						res.status(404).send("no item found");
					}
				}
				else {
					res.status(404).send("no item found");
				}
			});
		})

	router.route("/:pollId/options/:optionId/increment")
		.get(function(req,res) {

			Model.findOneAndUpdate({"_id":req.params.pollId, "options._id":req.params.optionId}, 
				{ $inc: {"options.$.count": 1}},
				function(err, item) {
				if(err) {
					res.status(500).send(err);
				}
				else if (item) {
					res.status(200).send("option incremented");
				}
				else {
					res.status(404).send("no item found");
				}
			});
		})

	return router;
}