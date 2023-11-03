import React from 'react';
import bg from '../image/loginbg.jpg';
import Button from './Button';

const Home = () => {
    const divStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '98.9vw',
        height: '100vh',
        textAlign: 'left',
        backgroundColor: 'rgba(0, 0, 255, 0.9)',
        color: 'white',
        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.5)' // Add this line for the black shadow effect
    };

    const innerDivStyle = {
        padding: '100px',
        fontSize: '34px',
        lineHeight: '0.3',
        color: '#fffff'
    };

    return (
        <div style={divStyle}>
            <div style={innerDivStyle}>
                <h1 style={{ paddingRight: '250px',  }}>RESTAURANT </h1>
                <h1>RECOMMENDATION</h1>
                <h1>SYSTEM</h1>
                <Button />
            </div>
        </div>
    );
};

export default Home;
