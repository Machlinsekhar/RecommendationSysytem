import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import plateBig from '../image/plate2.png';
import plate from '../image/plate3.png';

const UserProfile = () => {
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const navigate = useNavigate();

  const handleProfileCompletion = (e) => {
    e.preventDefault();
    if (location !== '' && cuisine !== '') {
      navigate('/userprofile2');
    } else {
      alert('Enter your preferences.');
    }
  };

  // Updated divStyle to align items in a column
    const divStyle = {
      display: 'flex',
      flexDirection: 'row', // Added for column layout
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#EFBA55',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'Arial',
    };

  const headingStyle = {
    color: 'black', // Set the color of the heading text
    fontSize: '4rem', // Adjust the font size to match the UI
    fontWeight: 'bold', // Make the font bold
    margin: '0.5rem 0', // Adjust the margin to match the UI
  };

  const descriptionStyle = {
    color: 'black', // Set the color of the description text
    fontSize: '1.2rem', // Adjust the font size to match the UI
    textAlign: 'left', // Center the text
    margin: '0.5rem 0', // Adjust the margin to match the UI
    maxWidth: '65%', // Set a max-width to match the form container width
    fontWeight: '600',
  };

  const leftContainerStyle = {
    width: '50%', // New style for left container
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#E4E4E4', // Adjust the background color to match the UI
    borderRadius: '20px', // Adjust border radius to match the UI
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adjust box-shadow to match the UI
    width: '22%', // Adjust width as necessary
    margin: '2rem', // Add margin to center the form on the page
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap', // Allow buttons to wrap
    gap: '0.5rem', // Add gap between buttons
  };

  const buttonStyle = {
    padding: '12px 24px',
    display: 'block', // Use block to allow the button to accept margin auto
    margin: '1rem auto 0 auto', // Top and bottom margin is 1rem, and auto margin for left and right to center the button
    color: 'black',
    backgroundColor: '#EFBA55',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bold'
  };

  const buttonStyle2 = (currentCuisine) => ({
    padding: '12px 20px',
    display: 'block',
    margin: '1rem auto 0 auto',
    color: 'black',
    backgroundColor: cuisine.includes(currentCuisine) ? '#EFBA55' : '#E4E4E4',
    borderRadius: '15px',
    cursor: 'pointer',
    fontWeight: 'bold',
    border:  '2px solid #EFBA55',
  });

  const inputStyle = {
    width: '91%',
    padding: '8px 16px',
    marginTop: '8px',
    marginBottom: '16px',
    border: '2px solid #EFBA55',
    borderRadius: '12px',
    backgroundColor: '#D9D9D9'
  };

  // const buttonStyle = {
  //   padding: '12px 24px',
  //   display: 'block', // Use block to allow the button to accept margin auto
  //   margin: '1rem auto 0 auto', // Top and bottom margin is 1rem, and auto margin for left and right to center the button
  //   color: 'black',
  //   backgroundColor: '#EFBA55',
  //   borderRadius: '8px',
  //   cursor: 'pointer',
  //   border: 'none'
  // };


  const linkStyle = {
    color: 'black', // Set the color of the link text
    // textDecoration: 'none', // Remove the underline from the link text
    fontSize: '0.81rem',
    textAlign: 'center',
    padding: '1.3rem',
    fontWeight: 'bold'
    // Add any additional styles you need for the link text
  };

  const labelStyle = {
    marginBottom: '4px',
    fontWeight: 'bold'
  };

  const plateStyle = {
    position: 'fixed', // Position the image absolutely within its container
    top: '49%',          // Center vertically
    left: '60%',        // Center horizontally
    transform: 'translate(50%, -50%) ', // Offset by half the width and height of the image
    zIndex: 1, // Set z-index to 1 to ensure it's above other content
  };

  const plate1Style = {
    position: 'fixed', // Position the image absolutely within its container
    bottom: '31.9%',          // Center vertically
    right: '92%',        // Center horizontally
    transform: 'translate(50%, -50%) ', // Offset by half the width and height of the image
    zIndex: 1,
    // Set z-index to 1 to ensure it's above other content
  };

  const toggleCuisine = (selectedCuisine) => {
    setCuisine((prevCuisine) => {
      if (prevCuisine.includes(selectedCuisine)) {
        return prevCuisine.filter((c) => c !== selectedCuisine);
      } else {
        return [...prevCuisine, selectedCuisine];
      }
    });
  };

  
  return (
    <div style={divStyle}>
      {/* ... other content ... */}
      <img src={plateBig} alt="Plate" style={plateStyle} />
      <img src={plate} alt="Plate" style={plate1Style} />
      <div style={formContainerStyle}>
        <h2 style={{ alignSelf: 'center' }}>Complete your profile!</h2>
        <label htmlFor="home-location" style={labelStyle}>Enter your home location:</label>
        <input
          type="text"
          id="home-location"
          placeholder="Home..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
          autoComplete="off"
        />
        <label style={labelStyle}>Choose your favourite cuisine:</label>
        <div style={buttonGroupStyle}>
        <button style={buttonStyle2('Chinese')} onClick={() => toggleCuisine('Chinese')}>
  Chinese
</button>
<button style={buttonStyle2('Barbeque')} onClick={() => toggleCuisine('Barbeque')}>
  Barbeque
</button>
<button style={buttonStyle2('North Indian')} onClick={() => toggleCuisine('North Indian')}>
  North Indian
</button>
<button style={buttonStyle2('Fast Food')} onClick={() => toggleCuisine('Fast Food')}>
  Fast Food
</button>
<button style={buttonStyle2('South Indian')} onClick={() => toggleCuisine('South Indian')}>
  South Indian
</button>
        </div>
        <button style={buttonStyle} onClick={handleProfileCompletion}>Continue</button>
      </div>
    </div>
  );
};

export default UserProfile;