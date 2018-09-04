var app = angular.module('angular', ['ngRoute']);
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "nestegg"
// });

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	  // .when("/", {templateUrl: "./index.html", controller: "PageCtrl"})
	  .when("/", {controller: "PageCtrl"})
	  .when("/requests", {templateUrl: "./requests.html", controller: "TenantCtrl"});
}]);

app.controller('PageCtrl', ["$scope", function($scope, $location, $http) {
	// console.warn(`Now at ${location}`);
	// $scope.location = `Now at ${location}`;
	// $scope.title = $location;
}]);

app.controller('TenantCtrl', ["$scope", "$http", function($scope, $http) {
	console.warn("Starting...");
	$http.post("/tenantsql")
	.then(function (response) {
		console.warn(response.data);
		var requests = "List of current tenant issues: \n\n";
		if (response.data.length > 0) {
			for (var i = 0; i < response.data.length; i++) {
				requests += response.data[i]['issue'] + ' at ' + response.data[i]['address'] + '\n';
			}
			$scope.requests = requests;
		} else {
			$scope.requests = "There are no requests at this time. Please check back later.";
		}
	});
	console.warn("Finished!");
}]);

app.controller('ContractorCtrl', ["$scope", "$http", function($scope, $http) {
	console.warn("Starting...");
	$http.post("/contractorsql")
	.then(function (response) {
		console.warn(response.data);
		var contractors = "List of available contractors for hire: \n\n";
		if (response.data.length > 0) {
			for (var i = 0; i < response.data.length; i++) {
				var number = response.data[i]['number'];
				var formatNumber = number.substring(0, 3) + "-" + number.substring(3, number.length);
				contractors += response.data[i]['name'] + ', Phone: ' + formatNumber + '\n';
			}
			$scope.contractors = contractors;
		} else {
			$scope.contractors = "There are no contactors available at this time. Please check back later.";
		}
	});
	console.warn("Finished!");
}]);
