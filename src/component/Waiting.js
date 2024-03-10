import React, { useState } from 'react';
// import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import arya from '../image/shy1.png';
import modal from '../image/modal.jpg';
import TestimonialBlock from './TestimonialBlock';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import TitleBlock from './TitleBlock';
import Card from './Card';
import Foooter from './Foooter.js';
import bg from '../image/bg.jpg';

const Waiting = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const dashboardContainer = {
    // height: '100vh', /* Set component height to cover the entire viewport */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', /* Align content at the top */
    alignItems: 'center', /* Align content to the left */
    paddingTop: '120px',
    // paddingLeft: '8rem',

    backgroundSize: 'cover', /* Cover the entire container */
    backgroundRepeat: 'no-repeat',
  };

  const buttonStyle = {
    backgroundColor: 'black',
    marginLeft: '1rem',
    cursor: 'pointer',
    width: '5rem',
    height: '3.5rem',
    borderRadius: '0.625rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f5f5dc',
  };

  

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (e) => {
    setShowModal(true);
    e.preventDefault();
    console.log({ searchTerm })
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
    position: 'center',
    padding: '0.9375rem 1.5625rem',
    fontFamily: 'pop, sans-serif',
    fontWeight: 'bold',
    fontSize: '1.0625rem',
    border: '2px solid black',
    borderRadius: '0.625rem',
    backgroundColor: '#ffff',
    color: 'black',
    outline: 'none',
    width: '45rem',
  };

  inputStyle[':focus'] = {
    outline: 'none',
  };


  return (
    <div style={{ height: '100vh', backgroundColor: '#D9D9D9' }}>
      <NavBar />
      
       
        


         
     
    </div>
  );
};

export default Waiting;
