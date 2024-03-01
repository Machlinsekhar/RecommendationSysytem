import React, { useState }  from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import modal from '../image/modal.jpg';
import content from '../image/content.jpg';
import collaborative from '../image/collaborative.jpg';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Home = () => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const dashboardContainer = {
        // height: '100vh', /* Set component height to cover the entire viewport */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', /* Align content at the top */
        alignItems: 'flex-start', /* Align content to the left */
        paddingTop: '120px',
        paddingLeft:'8rem',
        backgroundColor: '#ffff',
  backgroundSize: 'cover', /* Cover the entire container */
    backgroundRepeat: 'no-repeat', 
    };

      const buttonStyle2 = {
        padding: '12px 20px',
        display: 'block',
        margin: ' 4px auto',
        color: 'black',
        backgroundColor: '#EFBA55',
        borderRadius: '15px',
        cursor: 'pointer',
        fontWeight: 'bold',
        border: '2px solid #EFBA55',
      };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (e) => {
    setShowModal(true);
    e.preventDefault();
    console.log({searchTerm})
    const response = await fetch('http://127.0.0.1:5000/receive-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location: searchTerm }),
    });
    const data = await response.text();
    console.log(data);
    if (data.toLowerCase().trim() === 'true') {
      navigate(`/dashboard/${searchTerm}`);
    } 
  };
 
  const inputStyle = {
    width: '65rem',
    padding: '8px 16px',
    marginTop: '8px',
    marginBottom: '16px',
    border: '2px solid #EFBA55',
    borderRadius: '12px',
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    
  };

    return (
        <div>
        <NavBar/>
        <div style={dashboardContainer}>
            
            <h2 style={{ alignSelf: 'center', fontWeight: '900', fontSize: '2rem' }}>Enter location to get suggestions!</h2>
            
      <input
        type="text"
        placeholder="Enter your desired location..."
        value={searchTerm}
        onChange={handleInputChange}
        style={inputStyle}
      />
      
   
      <button onClick={handleSearch} style={{ ...buttonStyle2,  }}>
        Start
      </button>
      </div>

      {showModal && (
          <div className="modal">
            <div className="modal-content">
              <img src={modal} alt="Loading..." />
            </div>
          </div>
        )}
      </div>
    );
};

export default Home;
