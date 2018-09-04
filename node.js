var http = require('http');
var mysql = require('mysql');
var express = require('express');
var app = express();
var actionToResponse = require('./actionLogic');
var craftFullResponse = require('./fullResponse');
var fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "nestegg"
});

app.get("/requests", function(req, res) {
	app.controller('myCtrl', function($scope) {
		$scope.
	}
	var answer = "Hello world";
	con.connect(function(err) {
		if (err) throw err;
		var requests = "SELECT * from requests";
		con.query(requests, function(err, result) {
			if (err) throw err;
			answer = result;
			res.write(answer);
			res.end();
		});
	});
	// res.write(answer);
	// res.end();
});

fs.readFile("./index.html", function(err, html) {
	app.get("/", function(req, res) {
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});
});

app.post("/", function(req, res) {
	req.on('data', (chunk) => {
		// console.warn(JSON.parse(chunk.toString()));
		var queryResult = JSON.parse(chunk.toString())['queryResult']
		var action = queryResult['action'];
		var reply = actionToResponse(action);
		var outputContexts = queryResult['outputContexts'];
		console.warn(outputContexts);
		finalResponse = craftFullResponse(queryResult['fulfillmentText'], queryResult['fulfillmentMessages'], reply, queryResult['outputContexts']);
		console.warn(JSON.stringify(finalResponse));
		res.end(JSON.stringify(finalResponse));
	});
});



fs.readFile("./contractor.html", function(err, html) {
	app.get("/contractor", function(req, res) {
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	})
})

//My idea: if a person fills out a form to be a contractor, add them to a list of available contractors
app.post("/contractor", function(req, res) {
	req.on('data', (chunk) => {
		console.warn(chunk);
	});
});

app.listen(8080);

// fs.readFile("./index.html", function(err, html) {
// 	http.createServer(function (req, res) {
// 		// con.connect(function(err) {
// 		//   if (err) throw err;
// 		//   console.warn("Connected!");
// 		//   var sql = "INSERT INTO test (input) VALUES ('Hello world')";
// 		//   con.query(sql, function (err, result) {
// 		//     if (err) throw err;
// 		//     console.warn("1 record inserted");
// 		//   });
// 		// });

// 		var finalResponse = "Hello world?";
// 		console.warn(req.headers);
// 		console.warn(req.method);
// 		// console.warn(req.data);

// 		req.on('data', (chunk) => {
// 		  // console.warn("Uh yeah");
// 		  // console.warn(`Received ${chunk.length} bytes of data.`);
// 		  try {
// 			  // console.warn(chunk.toString());
// 			  var queryResult = JSON.parse(chunk.toString())['queryResult']
// 			  var action = queryResult['action'];
// 			  var reply = actionToResponse(action);
// 			  // console.warn(reply);
// 			  finalResponse = craftFullResponse(queryResult['fulfillmentText'], queryResult['fulfillmentMessages'], reply, queryResult['outputContexts']);
// 			  // console.warn("Testing...");
// 			  // console.warn(JSON.stringify(finalResponse));
// 			  res.end(JSON.stringify(finalResponse));
// 			  console.warn(res.finished);
// 		  } catch(err) {
// 		  	res.write("Hello world!");
// 		  	res.end();
// 		  }
// 		});

// 		if (req.method == "GET") {
// 			res.writeHeader(200, {"Content-Type": "text/html"});
// 			res.write(html);
// 			res.end();
// 		}
// 	}).listen(8080);
// });
// var app = angular.module('JustinNestEgg', []);

// app.config(['$routes', function ($routes) {
// 	$routes.when("/", {url: "./home.html", controller: "mainCtrl"})
// }]);

// app.use(bodyParser.urlencoded({
// 	extended: true
// }));

// app.use(bodyParser.json());
// app.
