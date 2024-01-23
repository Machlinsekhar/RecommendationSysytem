import React, { useState } from 'react';
import plate from '../image/plate2.png';
import { useNavigate } from 'react-router-dom';

const userProfileStyle = {
  position: 'relative',
  fontFamily: 'Arial',
  padding: '20px',
  maxWidth: '300px',
  paddingLeft:'5rem',
  paddingTop: '5rem',
  // margin: 'auto',
};

const headingStyle = {
  textAlign: 'left',
  marginBottom: '25px',
};

const buttonStyle = {
  padding: '12px 44px',
  marginLeft: '8.5rem',
  marginTop: '0.5rem',
  marginBottom: '1rem',
  color: 'black',
  backgroundColor: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  border: '2.3px solid black',
  fontSize: '21px' // Add a 1px solid black border
};

const locationContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

const cuisineButtonStyle = (isSelected) => ({
  paddingTop :'2rem',
  paddingBottom :'2rem',
  paddingLeft:'1.5rem',
  backgroundColor: isSelected ? '#ddd' :  '#f1f1f1',
  border: '1px solid #fff',
  borderRadius: '18px',
  cursor: 'pointer',
  textAlign: 'left',
  fontSize: '21px',
  width: '85rem',
});

const cuisineContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  
};

const plateStyle = {
  position: 'absolute', // Position the image absolutely within its container
  top: '55%',          // Center vertically
  left: '-15%',        // Center horizontally
  transform: 'translate(50%, -50%) ', // Offset by half the width and height of the image
  zIndex: 1, 
            // Set z-index to 1 to ensure it's above other content
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [locationSelected, setLocationSelected] = useState(false);
  const [cuisine, setCuisine] = useState('');

  const handleLocationChange = (location) => {
    setLocationSelected(location);
  };

  const handleCuisineChange = (cuisineType) => {
    setCuisine(cuisineType);
  };

  // Check if both a location and a cuisine have been selected and navigate to /home
  const checkAndNavigate = () => {
    if (locationSelected && cuisine) {
      navigate('/home');
    }
  };

  return (
    <div style={userProfileStyle}>
      <img src={plate} alt="Plate" style={plateStyle} />
      <h2 style={headingStyle}>Your Location</h2>
      <div style={locationContainerStyle}>
        <button
          onClick={() => { handleLocationChange('vashi'); checkAndNavigate(); }}
          style={buttonStyle}
        >
          Vashi
        </button>
        
        <button
          onClick={() => { handleLocationChange('nerul'); checkAndNavigate(); }}
          style={buttonStyle}
        >
          Nerul
        </button>
      </div>
      
      <h2 style={headingStyle}>Your Favorite Cuisine</h2>
      <div style={cuisineContainerStyle}>
        {['Veg', 'Non-Veg', 'Chinese'].map((type) => (
          <button
            key={type}
            onClick={() => { handleCuisineChange(type); checkAndNavigate(); }}
            style={cuisineButtonStyle(cuisine === type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;