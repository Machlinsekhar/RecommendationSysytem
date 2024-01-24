import React, { useState } from 'react';
import background from "../image/signup-bg.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Sign up successful');
        navigate('/userprofile');
      } else {
        // Handle errors
        console.error('Sign up failed');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }

    // console.log('Logging in with:', username, password);
    // if(username!=='' && password!==''){
    // navigate('/userprofile');}
    // else {
    //   // If either field is empty, alert the user
    //   alert('Username and password fields cannot be empty.');
    // }
  };

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Arial',
  };

  const formContainerStyle = {
    paddingTop: '24px',
    backgroundColor: '#f1f1f1',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    width: '23rem',
    height: '20rem'
  };

  const inputStyle = {
    width: '91%',
    padding: '8px 16px',
    marginTop: '8px',
    marginBottom: '16px',
    border: '1px solid #ffff',
    // borderRadius: '8px',
  };

  const buttonStyle = {
    padding: '12px 24px',
    marginLeft: '8.5rem',
    marginTop: '2rem',
    color: 'black',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    cursor: 'pointer',
    border: '1px solid black' // Add a 1px solid black border
  };

  const linkStyle = {
    color: 'blue', // Set the color of the link text
    textDecoration: 'none', // Remove the underline from the link text
    fontSize: '0.81rem',
    paddingLeft: '17rem',
    // Add any additional styles you need for the link text
  };

  const labelStyle = {
    marginBottom: '4px',
  };

  return (
    <div style={divStyle}>
      <div style={formContainerStyle}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>
          SIGNUP
        </h3>
        <form onSubmit={handleLogin}>
          <div>
            {/* <label style={labelStyle} htmlFor="username">Username</label> */}
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              style={inputStyle}
            />
          </div>
          <div>
            {/* <label style={labelStyle} htmlFor="password">Password</label> */}
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          <Link to={'/'} style={linkStyle}>back to login? </Link>
          <button type="submit" style={buttonStyle}>Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
