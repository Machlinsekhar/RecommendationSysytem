import React from 'react';
import './Recommendation.css';
import './fonts.css';
import shy1 from '../image/shy1.png';
import shy2 from '../image/shy2.png';
import shy3 from '../image/shy3.png';
import bn1 from '../image/bn1.png';
import bn2 from '../image/bn2.png';
import bn3 from '../image/bn3.png';
import shree1 from '../image/shree1.png';
import shree2 from '../image/shree2.png';
import shree3 from '../image/shree3.png';
import ahemd1 from '../image/ahmed1.png';
import ahemd2 from '../image/ahmed2.png';
import ahemd3 from '../image/ahmed3.png';
import p1 from '../image/p2.png';
import recom from '../image/recom-nobg.png';
import downArrowImageUrl from '../image/downarraow.png'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';


const Recommendation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations || [];
  console.log(recommendations);

  const restaurants = [
    { id: '1', name: 'Barbeque Nation', ImageUrl: bn1, location: 'Vashi', dishes: 'Smoked Tandoori, Icecream', cusine: 'Non-Veg', cost: 'High' },
    { id: '2', name: 'Ahmed Bhais', ImageUrl: ahemd2, location: 'Nerul', dishes: 'Butterchicken, Mughali Chicken', cusine: 'Non-Veg', cost: 'Medium' },
    { id: '3', name: 'Shy Cafe And Bar', ImageUrl: shy1, location: 'Nerul', dishes: 'Cold Coffee, Pizza', cusine: 'Non-Veg', cost: 'High' },
    { id: '4', name: 'Shree Nerul Cafe', ImageUrl: shree1, location: 'Vashi', dishes: 'South Indian, Podi Idli', cusine: 'Veg', cost: 'Low' },
    // Add more restaurants as needed
  ];

  const plateStyle = {
    position: 'fixed', // Position the image absolutely within its container
    top: '59%',          // Center vertically
    left: '27.2%',        // Center horizontally
    transform: 'translate(50%, -50%) scale(1.5)', // Offset by half the width and height of the image
    zIndex: 1, 
              // Set z-index to 1 to ensure it's above other content
  };

  return (
    <div><Navbar/>
    <div className="recommendation-container" >
      
      <h2 className="header">Our Top 5 Suggestions:</h2>
      {/* <img src={recom} alt="Plate" style={plateStyle} /> */}
      <div className="restaurant-list">
      {recommendations?.length > 0 && recommendations?.map((restaurant, index) => {
          const matchedRestaurant = restaurants.find(r => r.name === restaurant["Restaurant Name"]);
          const ImageUrl = matchedRestaurant ? matchedRestaurant.ImageUrl : '';
          const location = matchedRestaurant ? matchedRestaurant.location : '';
          const dishes = matchedRestaurant ? matchedRestaurant.dishes : '';
          const cusine = matchedRestaurant ? matchedRestaurant.cusine : '';
          const cost = matchedRestaurant ? matchedRestaurant.cost : '';
          return (
            <div className="restaurant-item" >
              <div className="restaurant-image-wrapper">
                <img className="restaurant-image" src={ImageUrl} alt={restaurant["Restaurant Name"]} />
              </div>
              <div className="restaurant-details">
                <h3 className="restaurant-name">{index + 1}. {restaurant["Restaurant Name"]}</h3>
                <p className="restaurant-location">Location: {location}</p>
                <p className="restaurant-dishes">Recommended Dishes: {dishes}</p>
              </div>
              <div className="restaurant-cuisine-cost">
                <p className="restaurant-cuisine">Cuisine: {cusine}</p>
                <p className="restaurant-cost">Cost: {cost}</p>
              </div>
            </div>
          );
        })}
        {!recommendations.length && <p className="no-recommendations">No recommendations available</p>}
      </div>
      {/* <button onClick={() => navigate('/dashboard')} className="go-back-button">
        Go Back
      </button> */}
    </div>
    </div>
  );
};

export default Recommendation;