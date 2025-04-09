/* Dummy Qr code */

import React, { useState } from 'react';
import Image from '../../images/qr-code.png'; // Import your image

const ImageDisplay = () => {
  const [showImage, setShowImage] = useState(false);

  const handleButtonClick = () => {
    setShowImage(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'30px' }}>
      <button onClick={handleButtonClick} 
      style={{ 
      marginBottom: '20px', 
      background: 'rgb(127,160,138)',
      border: '1px solid #ccc', /* Add a border */
      borderRadius: '5px', /* Rounded corners */
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', /* Optional shadow */ 
      }}>
        Get QR Code here.
      </button>
      {showImage && (
        <div>
          <img
            src={Image} // Replace with the actual URL of your image
            alt=" "
            style={{ height: '450px', width: '100%', maxWidth: '400px', marginTop: '20px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;



