const PAT = 'e81c2b69730140d7bf12185a627d9a6c';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
//const IMAGE_URL = imageUrl; //'https://samples.clarifai.com/metro-north.jpg';

const getRequestOptions = (imageUrl) => {
  const requestBody = JSON.stringify({
    "user_app_id": { "user_id": USER_ID, "app_id": APP_ID },
    "inputs": [{ "data": { "image": { "url": imageUrl } } }]
  });
  const requestOptions = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Authorization': 'Key ' + PAT },
    body: requestBody
  };

  return requestOptions;
}

// Previously the frontend sent a request to the clarifai api. But now this is being done here, in the backend (specifically, in the api/server). This is because the request to the clarifai api has a request header that contains the api key. So if this request is being made in the frontend, any user using the frontend can see this api key using the dev tools of the browser (more specifically, the network section).
const handleClarifaiApiCall = (req, res) => {
  const imageUrl = req.body.imageUrl;
  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", getRequestOptions(imageUrl))      // fetch does not directly return the JSON response body, instead it returns a promise whose fulfill value is a Response object
    .then(clarifaiApiResponse => clarifaiApiResponse.json())                                               // The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. To extract the JSON body content from the Response object, we use the json() method, which returns a second promise whose fulfill value is the json object
    .then(clarifaiApiResponseBody => res.json(clarifaiApiResponseBody))
    .catch(err => res.status(400).json('Error while trying to send a request to clarifai api: ', err));
}


const handleImageCountIncrementRequest = (req, res, db) => {
  const id = req.body.id;
    
  db('users').increment('entries', 1).where('id', '=', id)                        // Increments the specified value in a column. we can also do .increment({'entries': 1}) and .where('id', id)
    .returning('entries')                                                                         // What returning does: after updating the user's entry (done in the above line), return this user's updated entry in the .then() below 
    .then(data => res.json(data[0].entries))                                                     // In the response to this endpoint request, return the incremented "entries" value. The data variable is an array containing an object {entries: <entries value of user>}
    .catch(err => res.status(400).json('Unable to update image count'));
};

// Thanks to ES6, we can also define the module.exports object as just {handleImageCountIncrementRequest}, which will be the same thing as {handleImageCountIncrementRequest: handleImageCountIncrementRequest}
module.exports = {
  handleImageCountIncrementRequest: handleImageCountIncrementRequest,
  handleClarifaiApiCall: handleClarifaiApiCall
};