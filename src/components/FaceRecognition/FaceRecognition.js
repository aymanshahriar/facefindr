import React from "react";
import '../../App.js';   // styles the center className
import './FaceRecognition.css';

function FaceRecognition({ imageUrl, faceBoundary }) {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageUrl} alt="" width='500px' height='auto'></img>
        <div className="face-boundary"
          style={{top: faceBoundary.topBoundary, 
            right: faceBoundary.rightBoundary,
            bottom: faceBoundary.bottomBoundary,
            left: faceBoundary.leftBoundary}}>
        </div>
      </div>

    </div>
  );
}

export default FaceRecognition;