import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import recom from '../image/recom-nobg.png';
import plate from '../image/plate3.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    if(username!=='' && password!==''){
      try {
        const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Login successful');
          console.log('Logging in with:', username, password);
          navigate('/home');
        } 
        else {
          setUsername('');
          setPassword('');
          alert(data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
      else {
        alert('Username and password fields cannot be empty.');
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
    paddingTop: '24px',
    backgroundColor: '#E4E4E4',
    boxShadow: '8px 8px 8px rgba(0.1, 0.1, 0.1, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '13px',
    width: '20rem',
    height: '21rem',
    padding: '1rem',
    alignItems: 'center', // ensure content is centered in the form container
    justifyContent: 'center', 
  };

  const inputStyle = {
    width: '91%',
    padding: '8px 16px',
    marginTop: '8px',
    marginBottom: '16px',
    border: '1px solid #EFBA55',
    borderRadius: '12px',
    backgroundColor: '#D9D9D9'
  };

  const buttonStyle = {
    padding: '12px 24px',
    display: 'block', // Use block to allow the button to accept margin auto
    margin: '1rem auto 0 auto', // Top and bottom margin is 1rem, and auto margin for left and right to center the button
    color: 'black',
    backgroundColor: '#EFBA55',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none'
  };
  
  
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
    top: '88%',          // Center vertically
    left: '80.4%',        // Center horizontally
    transform: 'translate(50%, -50%) scale(1.5)', // Offset by half the width and height of the image
    zIndex: 1, 
              // Set z-index to 1 to ensure it's above other content
  };

  const plate1Style = {
    position: 'fixed', // Position the image absolutely within its container
    bottom: '31.9%',          // Center vertically
    right: '92%',        // Center horizontally
    transform: 'translate(50%, -50%) ', // Offset by half the width and height of the image
    zIndex: 1, 
              // Set z-index to 1 to ensure it's above other content
  };
  return (
    <div style={divStyle}>
      <img src={recom} alt="Plate" style={plateStyle} />
      <img src={plate} alt="Plate" style={plate1Style} />
      <div  style={leftContainerStyle}>
    <h1 style={headingStyle}>Foodeasy</h1>
    <p style={descriptionStyle}>
      Your personal restaurant recommender powered by AI, google reviews, and your preferences!
    </p>
    </div>
    <div style={formContainerStyle}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>
          Login
        </h3>
        <form onSubmit={handleLogin}>
          <div>
            <label style={labelStyle} htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              style={inputStyle}
              autoComplete="off"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={inputStyle}
            />
          </div>
         
          <button type="submit" style={buttonStyle}>Submit</button>
         
        </form>
        <Link to={'/signup'} style={linkStyle}>New user? Click here! </Link>
      </div>
    </div>
  );
};

export default Login;
