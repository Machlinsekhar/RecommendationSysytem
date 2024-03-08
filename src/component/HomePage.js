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

const Home = () => {

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
    paddingLeft: '8rem',

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

  const testimonials = [
    {
      id: 1,
      testimonialText: "Drive through, Super Fast Service, Nice Crowd, Pocket Friendly, Good Crowd, Low Price",
      tname: "Arya Bhavan",
      title: "Matunga",
      testimonialImage: arya,
    },
    {
      id: 2,
      testimonialText: "Drive through, Super Fast Service, Nice Crowd, Pocket Friendly, Good Crowd, Low Price",
      tname: "Arya Bhavan",
      title: "Matunga",
      testimonialImage: arya,
    },
    {
      id: 3,
      testimonialText: "Drive through, Super Fast Service, Nice Crowd, Pocket Friendly, Good Crowd, Low Price",
      tname: "Arya Bhavan",
      title: "Matunga",
      testimonialImage: arya,
    },
    {
      id: 4,
      testimonialText: "Drive through, Super Fast Service, Nice Crowd, Pocket Friendly, Good Crowd, Low Price",
      tname: "Arya Bhavan",
      title: "Matunga",
      testimonialImage: arya,
    },
    {
      id: 5,
      testimonialText: "Drive through, Super Fast Service, Nice Crowd, Pocket Friendly, Good Crowd, Low Price",
      tname: "Arya Bhavan",
      title: "Matunga",
      testimonialImage: arya,
    },
    {
      id: 6,
      testimonialText: "Drive through, Super Fast Service, Nice Crowd, Pocket Friendly, Good Crowd, Low Price",
      tname: "Arya Bhavan",
      title: "Matunga",
      testimonialImage: arya,
    },


  ];

  const why = [
    {
      id: 1,
      // image: rocket,
      title: 'SKYROCKET YOUR CAREER',
      description: 'Why settle for less when you can aim for the stars? Get mentored by industry leaders and secure placements at India\'s top companies.'
    },
    {
      id: 2,
      // image: coinbag,
      title: 'BUILD SKILLS THAT SHAPE TOMORROW',
      description: 'The world evolves, and so should your skills. Source Catalyst equips you with the tools of tomorrow, setting you on a path to conquer future challenges.'
    },
    {
      // id: 3, image: handshake,
      title: 'JOIN THE ELITE CIRCLE',
      description: 'Become a part of an exclusive community where you\'re not just a student; you\'re a future industry leader.'
    },
    {
      // id: 4, image: phone,
      title: 'IGNITE LEARNING',
      description: 'Education comes alive when knowledge meets action. Source Catalyst transforms learning with hands-on projects, letting you turn theory into real-world expertise'
    }
  ];

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
    <div style={{ height: '100vh' }}>
      <NavBar />
      <div style={dashboardContainer}>
        <TitleBlock

          title="Enter location to get suggestions!"
        />

        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
          <input
            type="text"
            placeholder="Enter your desired location..."
            value={searchTerm}
            onChange={handleInputChange}
            style={inputStyle}
          />


          <div onClick={handleSearch} style={buttonStyle}>
            Start
          </div>
        </div>
      </div>
      <div className=" py-8 md:ml-10">
      <TitleBlock

subtitle="You may also like"
/>
        <ScrollingCarousel>

          {testimonials.map((testimonials) => (
            <TestimonialBlock key={testimonials.id}
              testimonial={testimonials.testimonialText}
              testimonialImage={testimonials.testimonialImage}
              tname={testimonials.tname}
              title={testimonials.title} />
          ))}

        </ScrollingCarousel>

      </div>

      <TitleBlock
              title="Choose Food Easy Because..."
              subtitle="Get Exciting Food with Us" />

            <div className="container mx-auto py-8">
              <div className="flex flex-wrap justify-center">
                {why.map((item) => (
                  <Card key={item.id} data={item} />
                ))}
              </div>
            </div>
            <Foooter />
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
