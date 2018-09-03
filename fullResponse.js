function craftGoogleResponse(reply) {
  var googleResponse = {};
  googleResponse['expectUserResponse'] = true;
  var textToSpeech = {"textToSpeech": reply};
  var items = [{"simpleResponse": {"textToSpeech": reply}}];
  googleResponse.richResponse = {"items": items}
  // console.warn(JSON.stringify(googleResponse));
  return googleResponse;
}

module.exports = function craftFullResponse(fulfillmentText, fulfillmentMessages, reply, outputContexts) {
  var fullResponse = {};
  fullResponse['fulfillmentText'] = fulfillmentText;
  fullResponse['fulfillmentMessages'] = fulfillmentMessages;
  fullResponse['source'] = 'google';
  fullResponse['payload'] = {'google': craftGoogleResponse(reply)};
  fullResponse['outputContexts'] = outputContexts;
  return fullResponse;
}
