var http = require('http');
var mysql = require('mysql');
var express = require('express');
var app = express();
var actionToResponse = require('./actionLogic');
var craftFullResponse = require('./fullResponse');
var fs = require('fs');

# outdated
var con = mysql.createConnection({
  host: "justinnestegg.c9s5lsbaxpeu.us-west-2.rds.amazonaws.com",
  user: "justin",
  password: "", # secret
  database: "nestegg",
  port: 3306
});

fs.readFile("./index.html", function(err, html) {
	app.get("/", function(req, res) {
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});
});

fs.readFile("./requests.html", function(err, html) {
	app.get("/requests", function(req, res) {
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});
});

fs.readFile("./contractors.html", function(err, html) {
	app.get("/contractors", function(req, res) {
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});
});

fs.readFile("./contact.html", function(err, html) {
	app.get("/contact", function(req, res) {
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});
});

fs.readFile("./angular.js", function(err, js) {
	app.get("/angular.js", function(req, res) {
		res.writeHeader(200, {"Content-Type": "text/js"});
		res.write(js);
		res.end();
	});
});

fs.readFile("css/bootstrap.min.css", function(err, css) {
	app.get("/css/bootstrap.min.css", function(req, res) {
		res.writeHeader(200, {"Content-Type": "text/css"});
		res.write(css);
		res.end();
	})
})

fs.readFile("js/bootstrap.min.js", function(err, js) {
	app.get("/js/bootstrap.min.js", function(req, res) {
		res.writeHeader(200, {"Content-Type": "text/js"});
		res.write(js);
		res.end();
	});
});

app.post("/", function(req, res) {
	req.on('data', (chunk) => {
		res.writeHeader(200, {"Content-Type": "text/json"});
		// console.warn(JSON.parse(chunk.toString()));
		var timestamp = (new Date()).toUTCString();
		var incomingRequest = JSON.parse(chunk.toString());
		var queryResult = incomingRequest['queryResult'];
		var queryText = queryResult['queryText'];
		var action = queryResult['action'];
		var reply = actionToResponse(action, queryResult);
		var outputContexts = queryResult['outputContexts'];
		// console.warn(outputContexts);
		finalResponse = craftFullResponse(queryResult['fulfillmentText'], queryResult['fulfillmentMessages'], reply, queryResult['outputContexts']);
		// console.warn(JSON.stringify(finalResponse));
		con.connect(function(err) {
			if (err) {
				console.warn(`Error found in logs: ${err}`);
				// throw err;
			}
			var requests = `INSERT INTO logs VALUES ("${timestamp}", "${queryText}", "${action}", "${reply}")`;
			con.query(requests, function(err, result) {
				if (err) throw err;
				// answer = result;
				// console.warn(answer);
				// res.json(answer);
				// res.end();
			});
		});
		res.end(JSON.stringify(finalResponse));
	});
});

app.post("/tenantsql", function(req, res) {
	con.connect(function(err) {
		if (err) {
			console.warn(`Error found in requests: ${err}`);
			// throw err;
		}
		var requests = "SELECT * from requests";
		con.query(requests, function(err, result) {
			if (err) throw err;
			answer = result;
			// console.warn(answer);
			res.json(answer);
			res.end();
		});
	});
});

app.post("/contractorsql", function(req, res) {
	con.connect(function(err) {
		if (err) {
			console.warn(`Error found in contractors: ${err}`);
			// throw err;
		}
		var requests = "SELECT * from contractors";
		con.query(requests, function(err, result) {
			if (err) throw err;
			answer = result;
			// console.warn(answer);
			res.json(answer);
			res.end();
		});
	});
});

app.listen(8080);
