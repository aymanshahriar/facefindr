import React from "react";
import '../../App.js';   // styles the center className
import './FaceRecognition.css';
import {nanoid} from 'nanoid';

function FaceRecognition({ imageUrl, faceBoundaries }) {
  const faceBoundariesInDivs = faceBoundaries.map(faceBoundary => {
    return <div className="face-boundary"
      key={nanoid()}                                                                             // A key needs to be included for every div because otherwise the console will throw a this warning: Each child in a list should have a unique "key" prop.
      style={{top: faceBoundary.topBoundary, 
              right: faceBoundary.rightBoundary,
              bottom: faceBoundary.bottomBoundary,
              left: faceBoundary.leftBoundary}}>
    </div>
  })

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageUrl} alt="" width='500px' height='auto'></img>
        {faceBoundariesInDivs.length > 0 && faceBoundariesInDivs}                               {/* If faceBoundariesInDivs is not empty, then the divs inside faceBoundariesInDivs will be rendered */}
      </div>

    </div>
  );
}

export default FaceRecognition;