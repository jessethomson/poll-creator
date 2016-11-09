var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = Schema({

	text: {
		type: String,
		required: true
	},
	options: {
		type: [
			{
				text: {
					type: String
				},
				count: {
					type: Number,
					default: 0
				}
			}
		]
	}

});

module.exports = mongoose.model('Question', questionSchema);
