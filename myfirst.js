var http = require('http');
var mysql = require('mysql');
var actionToResponse = require('./actionLogic');
var craftFullResponse = require('./fullResponse');
var fs = require('fs');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "nestegg"
// });

fs.readFile("./index.html", function(err, html) {
	http.createServer(function (req, res) {
		// con.connect(function(err) {
		//   if (err) throw err;
		//   console.warn("Connected!");
		//   var sql = "INSERT INTO test (input) VALUES ('Hello world')";
		//   con.query(sql, function (err, result) {
		//     if (err) throw err;
		//     console.warn("1 record inserted");
		//   });
		// });

		var finalResponse = "Hello world?";
		console.warn(req.headers);
		console.warn(req.method);
		// console.warn(req.data);

		req.on('data', (chunk) => {
		  // console.warn("Uh yeah");
		  // console.warn(`Received ${chunk.length} bytes of data.`);
		  try {
			  // console.warn(chunk.toString());
			  var queryResult = JSON.parse(chunk.toString())['queryResult']
			  var action = queryResult['action'];
			  var reply = actionToResponse(action);
			  // console.warn(reply);
			  finalResponse = craftFullResponse(queryResult['fulfillmentText'], queryResult['fulfillmentMessages'], reply, queryResult['outputContexts']);
			  // console.warn("Testing...");
			  // console.warn(JSON.stringify(finalResponse));
			  res.end(JSON.stringify(finalResponse));
			  console.warn(res.finished);
		  } catch(err) {
		  	res.write("Hello world!");
		  	res.end();
		  }
		});

		if (req.method == "GET") {
			res.writeHeader(200, {"Content-Type": "text/html"});
			res.write(html);
			res.end();
		}
	}).listen(8080);
});
// var app = angular.module('JustinNestEgg', []);

// app.config(['$routes', function ($routes) {
// 	$routes.when("/", {url: "./home.html", controller: "mainCtrl"})
// }]);

// app.use(bodyParser.urlencoded({
// 	extended: true
// }));

// app.use(bodyParser.json());
// app.
