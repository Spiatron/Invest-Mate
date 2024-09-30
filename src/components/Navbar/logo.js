import React from 'react';

const Logo = () => {
  return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 975.79 1080"
        width="150" // Set your desired width here
        height="80" // Set your desired height here
        style={{ width: '150px', height: '80px', marginTop:"6px" }} // You can adjust these values as needed
      >
        <polygon
          points="975.78 101.42 859.12 827.37 623.42 827.37 718.88 238.12 975.78 101.42"
          style={{ fill: '#c33028' }}
        />
        <polygon
          points="631.67 285.26 543.28 829.72 309.94 829.72 373.58 421.97 631.67 285.26"
          style={{ fill: '#c33028' }}
        />
        <polygon
          points="292.26 466.75 228.63 829.72 0 829.72 35.35 608.17 292.26 466.75"
          style={{ fill: '#c33028' }}
        />
        <polygon
          points="631.67 285.26 695.61 381.76 623.42 827.37 559.74 728.37 631.67 285.26"
          style={{ fill: '#6e1b16' }}
        />
        <polygon
          points="292.26 466.75 351.53 563.25 309.94 829.72 246.59 727.25 292.26 466.75"
          style={{ fill: '#6e1b16' }}
        />
      </svg>
    </div>

  );
};

export default Logo;
