var app = angular.module("myApp", []);

app.controller("PollCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

	var urlArray = $location.absUrl().split("/").slice(-1);
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
		console.log($scope.selectedOptionId);
	}

	$scope.submitSurvey = function() {
		console.log("here")
		if($scope.selectedOptionId) {
		console.log("here11")

			var url = "/questions/" + questionId + "/options/" + $scope.selectedOptionId + "/increment";
			$http.get(url)
				.then(function(response) {
					console.log(response)
					$scope.surveySubmitted = true;
				}, function(error) {
					console.log(error);
				});
		}
	}

}]);