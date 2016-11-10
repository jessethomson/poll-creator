console.log("asdfasdf")
var app = angular.module("resultsApp", []);

app.controller("ResultsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

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


	$scope.submitSurvey = function() {
		if($scope.selectedOptionId) {

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