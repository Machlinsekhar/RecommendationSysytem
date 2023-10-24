import React from 'react';
import bg from '../image/loginbg.jpg'
const Home = () => {

    const divStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '98.9vw', // Optional: Set width and height according to your needs
        height: '100vh', // Optional
        textAlign: 'left',
        backgroundColor: 'rgba(0, 0, 255, 0.9)',
        color: 'white',
      };

      const innerDivStyle = {
        padding: '100px', // Add 'px' to specify the unit for padding
        fontSize: '34px',
        lineHeight: '0.3',
        color: '#fffff'
    };

  return (
    <div style={divStyle}>
        <div style={innerDivStyle}>
      <h1 style={{paddingRight:'250px'}} >RESTAURANT </h1>
      <h1>RECOMMENDATION</h1>
     <h1>SYSTEM</h1>
     </div>
    </div>
  );
};

export default Home;
