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