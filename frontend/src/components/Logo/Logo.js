import React from "react";
import 'tachyons';
import Tilt from 'react-parallax-tilt';
import './Logo.css';  // contains the tilt class
import brain from './brain.png';

function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" options={{ max: 100 }} style={{ height: 150, width: 150 }}>
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: '7px' }} src={brain} alt="logo"></img>
        </div>

      </Tilt>
    </div>
  );
}

export default Logo;