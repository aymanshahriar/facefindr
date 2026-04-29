import React from "react";
import 'tachyons';
import { useNavigate } from 'react-router-dom';

function Navigation({ isSignedIn, signOut }) {
  const navigate = useNavigate();
  
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='f3 link dim black underline pa3 pointer' onClick={signOut}> Sign Out </p>
      </nav>
    );
  }
  else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => navigate('/signin')}> Sign In </p>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => navigate('/register')}> Register </p>
      </nav>
    );

  }

}

export default Navigation;