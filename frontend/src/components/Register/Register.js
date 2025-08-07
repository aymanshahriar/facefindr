import React, {useState} from 'react';

function Register({ changeRoute, loadUser }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onRegister = () => {
    fetch('https://image-face-recognition-app-api-8336e7c202ba.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},   // Content-Type is in quotes because it has a '-'
      body: JSON.stringify({name: name, email: email, password: password})
    })
      .then(response => response.json())      // The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. To extract the JSON body content from the Response object, we use the json() method, which returns a second promise whose fulfill value is the json object
      .then(user => {                         // For this endpoint, in the response body the server sends back details of the newly created user 
        if (user.id) {                        // It's possible that the server has sent back an error message in the response body instead of a user object. To check for this, check whether the response object has an id attribute, which will indicate that the response is a user object and not an error message
          loadUser(user);
          changeRoute('home');
        }
      });       
  
  }

  // This form was taken from material ui
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">    {/*If you get this error, just change the form tag to a div tag: react form submission is canceled because the form is not connected*/}
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 center">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="text" 
                name="name" 
                id="name"
                onChange={onNameChange} 
              />
            </div>
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
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
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
            value="Register" 
            onClick={onRegister}
            />
          </div>
          <div className="lh-copy mt3">
            <p className="f6 link dim black db grow pointer" onClick={() => changeRoute('signin')}>Back to Sign In</p>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Register;