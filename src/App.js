import React, { useState } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';

function App() {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [faceBoundary, setFaceBoundary] = useState({});
  const [route, setRoute] = useState('signin');   // route state keeps track of which page the user is on
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({id: '', name: '', email: '', entries: 0, joined: ''});     // This state was added when connecting the frontend to the backend
          
  const calculateFaceBoundary = (responseBody) => {
    console.log(responseBody);
    const boundingBox = responseBody.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftBoundary: boundingBox.left_col * width,
      topBoundary: boundingBox.top_row * height,
      rightBoundary: width * (1 - boundingBox.right_col),
      bottomBoundary: height * (1 - boundingBox.bottom_row)
    }
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onPictureSubmit = () => {
    setImageUrl(input);                             // for some reason, even after setting the imageUrl, the imageUrl will be unchanged if used in the subsequent lines.
    fetch("https://image-face-recognition-app-api-8336e7c202ba.herokuapp.com/image-url", {   // fetch does not directly return the JSON response body, instead it returns a promise whose fulfill value is a Response object
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body:  JSON.stringify({ imageUrl: input })
    })
      .then(response => response.json())            // The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. To extract the JSON body content from the Response object, we use the json() method, which returns a second promise whose fulfill value is the json object
      .then(responseBody => {
        if (responseBody) {
          fetch('https://image-face-recognition-app-api-8336e7c202ba.herokuapp.com:/image-count', {                    // This was added when connecting the frontend to the backend. // Note: fetch does not directly return the JSON response body, instead it returns a promise whose fulfill value is a Response object
            method: 'put',
            headers: {'Content-Type': 'application/json'},                // Content-Type is in quotes because it has a '-'
            body: JSON.stringify({id: user.id})
          })
            .then(response => response.json())                            // The Response object does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. To extract the JSON body content from the Response object, we use the json() method, which returns a second promise whose fulfill value is the json object
            .then(count => {
              setUser(prevUser => ({...prevUser, entries: count}))        // This technique is from: https://www.codecademy.com/courses/react-101/lessons/the-state-hook/exercises/objects-in-state (you can also use Object.assign as shown by andrei in the video called 'User Profile Update')
            })
            .catch(error => console.log('error', error));                      
          setFaceBoundary(calculateFaceBoundary(responseBody));
        }
      })
      .catch(error => console.log('error', error));
  }

  const changeRoute = (newRoute) => {
    if (newRoute === 'signout') {
      setIsSignedIn(false);
      setInput('');                                // This and the bottom three lines were added when connecting the frontend to the backend
      setImageUrl('');                                      
      setFaceBoundary({});
      setUser({id: '', name: '', email: '', entries: 0, joined: ''});

    } else if (newRoute === 'home'){
      setIsSignedIn(true);
    }

    setRoute(newRoute);
  }

  const loadUser = (newUser) => {
    setUser({
      id: newUser.id, 
      name: newUser.name, 
      email: newUser.email, 
      entries: newUser.entries, 
      joined: newUser.joined
    });                                                
  };                                                

  return (
    <div className="App">
      <ParticlesBg bg={true} type='cobweb' num='100' color="#FFFFFF" />   {/*num set from 230 to 100 to prevent distraction during development*/}
      <Navigation changeRoute={changeRoute} isSignedIn={isSignedIn}/>
      {route === 'home' ?
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries}/>
          <ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onPictureSubmit} />
          <FaceRecognition imageUrl={imageUrl} faceBoundary={faceBoundary} />
        </div>
        :
        (route === 'signin' ?
          <Signin changeRoute={changeRoute} loadUser={loadUser}/>
          :
          <Register changeRoute={changeRoute} loadUser={loadUser}/>
        )

      }

    </div>
  );
}

export default App;
