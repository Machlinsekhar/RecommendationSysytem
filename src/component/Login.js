import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import recom from '../image/recom-nobg.png';
import plate from '../image/recom.png';
import bg from '../image/bg.jpg';
import TitleBlock from './TitleBlock';

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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: bg,
  };

  const headingStyle = {
    color: 'black', // Set the color of the heading text
    fontSize: '7rem', // Adjust the font size to match the UI
    fontWeight: 'bold', // Make the font bold
    margin: '0.5rem 0', // Adjust the margin to match the UI
  };

  const descriptionStyle = {
    color: 'black', // Set the color of the description text
    fontSize: '2rem', // Adjust the font size to match the UI
    textAlign: 'left', // Center the text
    margin: '0', // Adjust the margin to match the UI
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
    backgroundColor: '#f5f5dc',
    boxShadow: '18px 18px 18px rgba(0.1, 0.1, 0.1, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '13px',
    width: '22rem',
    height: '25rem',
    padding: '2rem',
    alignItems: 'center', // ensure content is centered in the form container
    justifyContent: 'center', 
  };

  const inputStyle = {
    width: '91%',
    padding: '8px 16px',
    marginTop: '8px',
    marginBottom: '16px',
    border: '1px solid #E4E4E4',
    borderRadius: '12px',
    backgroundColor: '#D9D9D9'
  };

  const buttonStyle = {
    padding: '12px 24px',
    display: 'block', // Use block to allow the button to accept margin auto
    margin: '1rem auto 0 auto', // Top and bottom margin is 1rem, and auto margin for left and right to center the button
    color: '#f5f5dc',
    backgroundColor: 'black',
    borderRadius: '8px',
    cursor: 'pointer',
  border: 'none',
  transition: 'background-color 0.3s ease',
  };
  
  buttonStyle[':hover'] = {
    backgroundColor: '#FFD966', // Change the background color on hover
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
    bottom: '0',          // Center vertically
    right: '0',        // Center horizontally
    transform: ' scale(1) rotate(180deg)', // Offset by half the width and height of the image
    zIndex: 1, 
              // Set z-index to 1 to ensure it's above other content
  };

  const plate1Style = {
    position: 'fixed',
    top: -200,      // Set top to 0 to align with the top edge
    left: -120,     // Set left to 0 to align with the left edge
    transform: 'scale(0.81)', // Remove the translation to keep it at the top left corner
    zIndex: 1,
    opacity: 0.9,
};



  return (
    <div style={divStyle}>
      {/* <img src={recom} alt="Plate" style={plateStyle} /> */}
      <img src={plate} alt="Plate" style={plate1Style} />
      <div className="container">
        <div className="title">
          <h1>Food Easy</h1>
        </div>
        <div className="ghost">
        <div id="top-bun"></div>
    <div id="lettuce"></div>
    <div id="tomato"></div>
    <div id="onion"></div>
    <div id="cheese"></div>
    <div id="beef"></div>
    <div id="bottom-bun"></div>

        </div>
      </div>

      <div style={leftContainerStyle} className="frontDiv">
        {/* Content of the new div goes here */}
      </div>

      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap");
          
          body {
            min-height: 100vh;
            place-items: center;
          
            --bkg: #5eb3fd;
            --white: #e7e6e6;
          
            background-image: url(${bg}); // Use the imported bg image
            background-size: cover; 
          }
          
          .container {
            width: 100%;
            height: 100%;
            display: grid;
            place-items: center;
            overflow: hidden;
          }
          
          .title {
            position: absolute;
          }
          .title h1 {
            font-size: 14vmin;
            font-weight: 900;
            font-family: "Montserrat", sans-serif;
            color: #f5f5dc;
            display: flex;
            left: 0;
          }
          
          .ghost {
              width: 80px;
              height: 80px;

            // background-color: var(--white);
            // background-image: url("https://www.transparenttextures.com/patterns/concrete-wall.png");  
            border-radius: 100%;
            // transform: translateX(100em) rotateZ(-90deg);
            // position: flex;
            opacity:1;
            mix-blend-mode: exclusion;
            animation: ghostMove 3s ease-out infinite;
          }
          @keyframes ghostMove {
            0% {
              transform: translateX(-30em) ;
            }
            100% {
              transform: translateX(35em);
            }
          }
          .ghost div {
            position: absolute;
            width: 100%;
            background-color: var(--white);
            // background-image: url("https://www.transparenttextures.com/patterns/concrete-wall.png");
            margin-top: 20%;
          }
          .ghost #top-bun {
            margin-top: 25%;
            height: 26px;
            border-radius: 900px 900px 10px 10px;
            background-color: white;
            border-top: 9px solid white;
          }
          .ghost #lettuce {
            margin-top: 51%;
            border-radius: 18px;
            background-color: white;
            height: 9px;
            border-bottom: 3px solid white;
          }
          .ghost #tomato {
            margin-top: 45%;
            border-radius: 14px;
            background-color: black;
            height: 8px;
            border-bottom: 5px solid black;
          }
          .ghost #onion {
            margin-top: 41%;
            border-radius: 11px;
            background-color: black;
            height: 8px;
            border-bottom: 4px solid black;
          }
          .ghost #cheese {
            margin-top: 45%;
            background-color: white;
            border-radius: 10px;
            height: 2px;
            border-bottom: 5px solid white;
          }
          .ghost #beef {
            margin-top: 60%;
            border-radius: 8px;
            background-color: black;
            height: 3px;
            border-bottom: 16px solid black;
          }
          .ghost #bottom-bun {
            margin-top: 76%;
            background-color: white;
            border-radius: 10px 10px 50px 50px;
            height: 16px;
            border-bottom: 11px solid white;
          }

          .frontDiv {
            /* Styles for the new div in front of the ghost */
            position: absolute;
            /* Add any other styles as needed */
          }
        `}
      </style>

      <div  style={leftContainerStyle}>
     
   
      
    {/* <p style={descriptionStyle}>
      Your personal restaurant recommender powered by AI, google reviews, and your preferences!
    </p> */}
     <div style={formContainerStyle}>
        
         <TitleBlock
        
        title="Login"
      />
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
   
   
    </div>
  );
};

export default Login;
