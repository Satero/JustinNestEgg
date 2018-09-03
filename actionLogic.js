module.exports = function actionToResponse(action) {
	if (action == 'test') {
		return "Success!";
	}
	else {
		return "Failure...";
	}
}