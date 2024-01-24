import React, { useState } from 'react';
import plate from '../image/plate.png';
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

const suggestionButtonStyle = (isSelected) => ({
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

const suggestionContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  
};

const plateStyle = {
  position: 'fixed', // Position the image absolutely within its container
  top: '55.9%',          // Center vertically
  left: '230%',        // Center horizontally
  transform: 'translate(50%, -50%) scale(2)', // Offset by half the width and height of the image
  zIndex: 1, 
            // Set z-index to 1 to ensure it's above other content
};

const UserProfile2 = () => {
  const navigate = useNavigate();
  const [suggestion, setsuggestion] = useState('');


  const handlesuggestionChange = (suggestionType) => {
    setsuggestion(suggestionType);
    navigate('/dashboard')
  };


  return (
    <div style={userProfileStyle}>
      <img src={plate} alt="Plate" style={plateStyle} />
      <h2 style={headingStyle}></h2>
      
      <h2 style={headingStyle}>Suggestions(Near Home)</h2>
      <div style={suggestionContainerStyle}>
        {['Ahmed bhai', 'Nerul cafe', 'Shy cafe', 'BBQ Nation'].map((type) => (
          <button
            key={type}
            onClick={() => { handlesuggestionChange(type);  }}
            style={suggestionButtonStyle(suggestion === type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserProfile2;