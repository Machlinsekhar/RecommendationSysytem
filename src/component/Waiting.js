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
import ratting from '../image/ratting.jpg';
import one from '../image/1.png';
import two from '../image/2.png';
import three from '../image/3.png';
import four from '../image/4.png';
import Box from './Box.js';
// import sentiment from '../image/ratting.jpg';

const AboutUs = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const dashboardContainer = {
    // height: '100vh', /* Set component height to cover the entire viewport */
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', /* Align content at the top */
    alignItems: 'center', /* Align content to the left */
    paddingTop: '5px',
    paddingBottom: '8rem',
    backgroundColor: '#D9D9D9',
    backgroundSize: 'cover', /* Cover the entire container */
    backgroundRepeat: 'no-repeat',
  };

  const testimonials = [
    {
      id: 1,
      testimonialText: "Reviews are preprocessed to remove common stopwords, punctuation, and spaces, and words are lemmatized (converted to their base form). This step cleans the text, making it ready for the analytical models.",
      tname: "Text Normalization",
      title: "Cleaning",
      testimonialImage: one,
    },
    {
      id: 2,
      testimonialText: " Applies TF-IDF vectorization to the preprocessed reviews, extracting the top 5 keywords for each restaurant. These keywords represent significant themes or topics mentioned in the reviews, highlighting what stands out in the customer feedback.",
      tname: "TF-IDF",
      title: "Vectorization",
      testimonialImage: two,
    },
    {
      id: 3,
      testimonialText: "Performs Latent Dirichlet Allocation (LDA) on the preprocessed reviews to identify broad topics within them. This helps in understanding the general sentiment or themes being discussed across all reviews.",
      tname: "LDA",
      title: "Topic Modeling",
      testimonialImage: three,
    },
    
    {
      id: 5,
      testimonialText: " Extracts feature-opinion pairs from the reviews, identifying specific attributes of the restaurant (features) and the customer's sentiment about these attributes (opinions).",
      tname: "Feature Opinion Mining",
      title: "Opinion Extraction",
      testimonialImage: two,
    },
    {
      id: 6,
      testimonialText: "Counts the number of positive sentiments and the total number of reviews for each restaurant. This quantifies the volume and positivity of feedback, contributing to the restaurant's score.",
      tname: "Sentiment Analysis",
      title: "Review Count",
      testimonialImage: two,
    },
    {
      id: 7,
      testimonialText: " A score is computed for each restaurant based on the positive sentiment count and the total review count. This score is used to rank restaurants, aiming to recommend those with the most and best feedback.",
      tname: "Scoring Logic",
      title: "Ranking Algorithm",
      testimonialImage: two,
    },
  ];

  const container = {
    // height: '100vh', /* Set component height to cover the entire viewport */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', /* Align content at the top */
    alignItems: 'center', /* Align content to the left */
    paddingTop: '12px',
    backgroundColor: '#D9D9D9',
    backgroundSize: 'cover', /* Cover the entire container */
    backgroundRepeat: 'no-repeat',
  };

  const container2 = {
    // height: '100vh', /* Set component height to cover the entire viewport */
    // display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', /* Align content at the top */
    alignItems: 'center', /* Align content to the left */
    paddingTop: '12px',
    // paddingLeft: '8rem',
    backgroundColor: '#D9D9D9',
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
const content='A content-based restaurant recommendation system analyzes user preferences and recommends restaurants based on the characteristics of their past choices. By considering features like cuisine type, location, and user ratings, the system tailors suggestions to individual tastes. This personalized approach enhances user satisfaction and engagement, creating a more effective and enjoyable dining experience.';
const collab='A collaborative-based restaurant recommendation system involves analyzing user preferences and behaviors to identify patterns. By leveraging collaborative filtering algorithms, the system recommends restaurants based on similarities with other users\' preferences, enhancing personalized suggestions. User reviews and ratings play a crucial role in fine-tuning these recommendations, providing a dynamic and user-centric dining experience.';
  return (
    <div style={{ height: '100vh', backgroundColor: '#D9D9D9' }}>
      <NavBar />
      <div style={{display: 'flex', paddingTop:'120px', flexDirection: 'column',
    justifyContent: 'center', /* Align content at the top */
    alignItems: 'center',}}>
      <TitleBlock title='About our Two Models'/>

<div className="mb-20 " style={{display: 'flex', paddingTop:'12px', flexDirection: 'row'}}>
              <Box advice={content}   aname='Content Based Recommnedation' title='Personalized Picks' />
              <Box advice={collab}  aname='Collaborative Based Recommnedation' title='Team Taste Matcher' />
            </div>
</div>
     
      <div style={container2}>
      <TitleBlock title='Methods used for Preprossing'/>
<div className=" py-8 md:ml-10">

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
<div style={container}>


</div>
  <TitleBlock title='Graphs'/>
      <div style={dashboardContainer}>
        
        <div style={{display: 'flex',
    flexDirection: 'column',}} className='pr-20'>
        <TitleBlock

          subtitle="Rating Analysis"
        />
        
        <img src={ratting} alt="Description of the image" className='h-80' />
        </div>
        
        <div style={{display: 'flex',
    flexDirection: 'column',}}>
        <TitleBlock

          subtitle="Sentiment Analysis"
        />
        
        <img src={ratting} alt="Description of the image" className='h-80' />

      </div>

      </div>

      </div>

    </div>
  );
};

export default AboutUs;
