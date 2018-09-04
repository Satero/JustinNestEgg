var mysql = require('mysql');
var con = mysql.createConnection({
  host: "justinnestegg.c9s5lsbaxpeu.us-west-2.rds.amazonaws.com",
  user: "justin",
  password: "notrealpassword",
  database: "nestegg"
});

//aws rds details:
//user: "justin"
//password: "notrealpassword"

module.exports = function actionToResponse(action, queryResult) {
	if (action == 'input.welcome') {
		return "Welcome. To begin, are you a tenant, landlord, or contractor?";
	} else if (action == 'tenant') {
		return "Alright. And what problem can I help you with today?";
	} else if (action == 'tenantProblem') {
		return "Got it. And what is the address of the property you are renting at?";
	} else if (action == 'tenantAddress') {
		var tenantProblems = queryResult['parameters']['tenantProblems'];
		var tenantAddress = queryResult['parameters']['address'];
		con.connect(function(err) {
			if (err) {
				console.warn(`Error found in requests: ${err}`);
				//throw err;
			}
			var requests = `INSERT INTO requests (issue, address) VALUES ("${tenantProblems}", "${tenantAddress}")`;
			con.query(requests, function(err, result) {
				if (err) throw err;
				answer = result;
				console.warn(answer);
			});
		});
		return `To verify, you're having ${tenantProblems} problems at ${tenantAddress}. We'll notify your landlord right away. Thank you.`
	} else {
		return "My apologies, I didn't quite catch that. Once more?";
	}
}