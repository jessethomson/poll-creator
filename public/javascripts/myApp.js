var app = angular.module("myApp", []);

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {

	function reset() {
		$scope.question = "";
		$scope.options = [{},{}];
	}

	reset();

	$scope.incrementOptions = function() {
		$scope.options.push({});
	}

	$scope.decrementOptions = function() {
		if($scope.options.length > 1) {
			$scope.options.pop();
		}
	}

	$scope.createPoll = function() {
		
		if($scope.question) {

			var url = "/questions";
			var data = {
				text: $scope.question,
				options: $scope.options
			};

			$http.post(url, data)
				.then(function(response) {
					reset();
					$scope.shareableUrl = window.location.origin + "/poll/" + response.data._id;
				}, function(error) {
					console.log(error);
				});
		}
	}

}]);

app.controller("PollCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

	$scope.url = $location.absUrl();
	var urlArray = $scope.url.split("/").slice(-1);
	var questionId = urlArray[urlArray.length-1];

	function loadQuestion() {
		var url = "/questions/" + questionId;
		$http.get(url)
			.then(function(response) {
				$scope.question = response.data;
			}, function(error) {
				console.log(error);
			});

	}

	loadQuestion();

	$scope.optionSelected = function(option) {
		$scope.selectedOptionId = option._id;
	}

	$scope.submitSurvey = function() {
		if($scope.selectedOptionId) {

			var url = "/questions/" + questionId + "/options/" + $scope.selectedOptionId + "/increment";
			$http.get(url)
				.then(function(response) {
					$scope.surveySubmitted = true;
				}, function(error) {
					console.log(error);
				});
		}
	}

}]);

app.controller("ResultsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

	var urlArray = $location.absUrl().split("/").slice(-2, -1);
	var questionId = urlArray[urlArray.length-1];

	function loadQuestion() {
		var url = "/questions/" + questionId;
		$http.get(url)
			.then(function(response) {
				$scope.question = response.data;

				var options = $scope.question.options;
				var barData = ['data1'];
				var pieData = [];
				var categories = [];
				for(var i=0; i<options.length; i++) {
					barData.push(options[i].count);
					categories.push(options[i].text);
					pieData.push([options[i].text, options[i].count]);
				}
				renderBarChart(barData, categories);
				renderPieChart(pieData);
			}, function(error) {
				console.log(error);
			});

	}
	loadQuestion();

	function renderPieChart(data) {
		console.log(data);
		var chart = c3.generate({
		bindto: "#pollResultsPieChart",
		   data: {
		       // iris data from R
		       columns: data,
		       type : 'pie'
		   },
		   interaction: {
		       enabled: false
		   },
		   legend: {
		       item: {
		           onclick: function() {}
		       }
		   }
		});
	}

	function renderBarChart(data, categories) {

		var chart = c3.generate({
			bindto: "#pollResultsBarChart",
			data: {
				columns: [
					data
				],
				type: 'bar',
				labels: true
			},
			axis: {
				x: {
					type: 'category',
					categories: categories
				}
			},
			bar: {
				width: {
					ratio: 0.5
				}
			},
			legend: {
				show: false
			},
			interaction: {
				enabled: false
			}
		});
		
	}


}]);