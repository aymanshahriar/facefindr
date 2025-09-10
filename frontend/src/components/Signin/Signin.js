import React, {useState} from 'react';
import { API_URL, API_PORT } from '../../config.js';

function Signin({ changeRoute, loadUser }) {

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch(`${API_URL}:${API_PORT}/signin`, {
      method: 'post', 
      headers: {'Content-Type': 'application/json'},               // Content-Type is in quotes because it has a '-'
      body: JSON.stringify({email: signInEmail, password: signInPassword})
    })
      .then(response => response.json())    // The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. To extract the JSON body content from the Response object, we use the json() method, which returns a second promise whose fulfill value is the json object
      .then(user => {                       // For this endpoint, in the response body the server sends back details of the signed in user
        if (user.id) {
          loadUser(user);
          changeRoute('home');
        }
      })   
      .catch(error => console.log('error', error));
  };

  // This form was taken from material ui
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">     {/*If you get this error, just change the form tag to a div tag: react form submission is canceled because the form is not connected*/}
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address" 
                id="email-address" 
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password" onChange={onPasswordChange}>Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password" 
                id="password" 
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            value="Sign in" 
            onClick={onSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <p className="f6 link dim black db grow pointer" onClick={() => changeRoute('register')}>Register</p>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Signin;