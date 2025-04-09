import React from 'react';
//import './OfferAd.css'; // Import your CSS file for animations

const OfferAd = () => {
  return (    
    <div className="offer-ad ">
      <h3>Special Offer!</h3>
      <p>Get 20% off on your first purchase.</p>        
  </div>
  );
};

export default OfferAd;

/* import React from 'react';
import { useSpring, animated } from 'react-spring';
import './OfferAd.css'; // Import your CSS file for styling

const OfferAd = () => {
  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateX(0%)',
    from: { opacity: 0, transform: 'translateX(-50%)' },
    config: { duration: 1000 },
  });

  return (
    <animated.div className="offer-ad" style={animationProps}>
      <h3>Special Offer!</h3>
      <p>Get 20% off on your first purchase. Use code: OFFER20</p>
    </animated.div>
  );
};

export default OfferAd; */


