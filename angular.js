var nestWeb = angular.module('bread', []);
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "nestegg"
});

function mainController($scope, $http) {
	$http.get('/requests')
		.success(function(data) {
			console.warn(data);
			// con.connect(function(err) {
			//   if (err) throw err;
			//   console.warn("Connected!");
			//   var sql = "INSERT INTO requests (issue) VALUES (${data})";
			//   con.query(sql, function (err, result) {
			//     if (err) throw err;
			//     console.warn("1 record inserted");
			//   });
			// });
		})
		.error(function(data) {
			console.warn('Error in requests get: ' + data);
		});

	$scope.createRequest = function() {
		$http.post('/requests', $scope.requestForm)
			.success(function(data) {
				$scope.requestForm = {};
				$scope.requests = data;
			})
			.error(function(data) {
				console.warn('Error in requests post: ' + data);
			});
	};
}