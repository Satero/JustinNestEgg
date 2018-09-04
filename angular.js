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
		var requests = "List of available contractors for hire: \n\n";
		if (response.data.length > 0) {
			for (var i = 0; i < response.data.length; i++) {
				requests += response.data[i]['name'] + ' at ' + response.data[i]['number'] + '\n';
			}
			$scope.requests = requests;
		} else {
			$scope.requests = "There are no contactors available at this time. Please check back later.";
		}
	});
	console.warn("Finished!");
}]);

// function mainController($scope, $http) {
// 	$http.get('/requests')
// 		.success(function(data) {
// 			console.warn(data);
// 			// con.connect(function(err) {
// 			//   if (err) throw err;
// 			//   console.warn("Connected!");
// 			//   var sql = "INSERT INTO requests (issue) VALUES (${data})";
// 			//   con.query(sql, function (err, result) {
// 			//     if (err) throw err;
// 			//     console.warn("1 record inserted");
// 			//   });
// 			// });
// 		})
// 		.error(function(data) {
// 			console.warn('Error in requests get: ' + data);
// 		});

// 	$scope.createRequest = function() {
// 		$http.post('/requests', $scope.requestForm)
// 			.success(function(data) {
// 				$scope.requestForm = {};
// 				$scope.requests = data;
// 			})
// 			.error(function(data) {
// 				console.warn('Error in requests post: ' + data);
// 			});
// 	};
// }