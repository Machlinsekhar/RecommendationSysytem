import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import plateBig from '../image/plate2.png';
import plate from '../image/plate3.png';

const UserProfile2 = () => {
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({
    r1: '',
    r2: '',
    r3: '',
    r4: '',
    r5: '',
  });

  // Generate a random array of 5 restaurants
  const restaurants = [
    { id: 1, name: 'Shree Cafe' },
    { id: 2, name: 'Barbeque' },
    { id: 3, name: 'Ahemed Bhai' },
    { id: 4, name: 'Mosho' },
    { id: 5, name: 'Manis Cafe' },
  ];

  const handleProfileCompletion = (e) => {
    e.preventDefault();
    if (Object.values(ratings).some((rating) => rating !== '')) {
      navigate('/home');
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
    border: '2px solid #EFBA55',
  });

  const inputStyle = {
    // width: '51%',
    padding: '8px 16px',
    marginBottom: '16px',
    marginLeft: 'auto',
    border: '2px solid #EFBA55',
    borderRadius: '12px',
    backgroundColor: '#D9D9D9',
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
    fontWeight: 'bold',
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

  const boxcontainer = {
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #EFBA55',
    borderRadius: '12px',
    padding: '12px',
    overflowY: 'auto', // Add overflowY to enable vertical scrollbar
    maxHeight: '200px', // Set a maximum height for the container
  };

  const handleRatingChange = (restaurantId, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [`r${restaurantId}`]: value,
    }));
  };


  return (
    <div style={divStyle}>
      {/* ... other content ... */}
      <img src={plateBig} alt="Plate" style={plateStyle} />
      <img src={plate} alt="Plate" style={plate1Style} />
      <div style={formContainerStyle}>
        <h2 style={{ alignSelf: 'center' }}>Complete your profile!</h2>
        <h3 htmlFor="restaurants-visited" style={labelStyle}>Which restaurants have you visited?</h3>
        <div style={boxcontainer}>
          {restaurants.map((restaurant) => (
            <div key={restaurant.id}>
              <label>
              {restaurant.id}. {restaurant.name}
                <input
                  type="text"
                  placeholder="Rating out of 5"
                  value={ratings[`r${restaurant.id}`]}
                  onChange={(e) => handleRatingChange(restaurant.id, e.target.value)}
                  style={inputStyle}
                  autoComplete="off"
                />
              </label>
            </div>
          ))}
        </div>
        <button style={buttonStyle} onClick={handleProfileCompletion}>Continue</button>
      </div>
    </div>
  );
};

export default UserProfile2;