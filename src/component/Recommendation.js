import React, { useState } from 'react';
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
import Modal from 'react-modal';
import Navbar from './NavBar';

const Recommendation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations || [];
  console.log(recommendations);

  const [modalIsOpen, setModalIsOpen] = useState(null);

  const openModal = (index) => {
    setModalIsOpen(index);
  };

  const closeModal = () => {
    setModalIsOpen(null);
  }

  const restaurants = [
    { id: '1', name: 'Barbeque Nation', ImageUrl: bn1, location: 'Vashi', dishes: 'Smoked Tandoori, Icecream', cusine: 'Non-Veg', cost: 'High' },
    { id: '2', name: 'Ahmed Bhais', ImageUrl: ahemd2, location: 'Nerul', dishes: 'Butterchicken, Mughali Chicken', cusine: 'Non-Veg', cost: 'Medium' },
    { id: '3', name: 'Shy Cafe And Bar', ImageUrl: shy1, location: 'Nerul', dishes: 'Cold Coffee, Pizza', cusine: 'Non-Veg', cost: 'High' },
    { id: '4', name: 'Shree Nerul Cafe', ImageUrl: shree1, location: 'Vashi', dishes: 'South Indian, Podi Idli', cusine: 'Veg', cost: 'Low' },
    // Add more restaurants as needed
  ];

  return (
    <div>
      <Navbar />
      <div className="recommendation-container">
        <h2 className="header">Our Top 5 Suggestions:</h2>
        <div className="restaurant-list">
          {restaurants.map((restaurant, index) => {
            const ImageUrl = restaurant.ImageUrl;
            const location = restaurant.location;
            const dishes = restaurant.dishes;
            const cusine = restaurant.cusine;
            const cost = restaurant.cost;
            return (
              <div className="restaurant-item" key={restaurant.id}>
                 <div className="restaurant-image-wrapper">
                  <img className="restaurant-image" src={ImageUrl} alt={restaurant["Restaurant Name"]} />
                </div>
                <div className="restaurant-details">
                  <h3 className="restaurant-name">{index + 1}. {restaurant.name}</h3>
                  <p className="restaurant-dishes">Recommended Dishes: {dishes}</p>
                </div>
               
                <div className="restaurant-cuisine-cost">
                  <p className="restaurant-cuisine">Similarity Index: {cusine}</p>
                  <p className="restaurant-cuisine">Rating: {cusine}</p>
                  <p className="restaurant-cuisine">Cuisine: {cusine}</p>
                  <p className="restaurant-cost">Budget: {cost}</p>
                </div>
                <button className="transparent-button" onClick={() => openModal(index)}>
                  <img src={downArrowImageUrl} alt="View Details" />
                </button>
                {/* Separate modal for each restaurant */}
                {modalIsOpen === index && (
                  <div className="modal">
                    <div className="image-row">
                      <div className="image-container">
                        <h3>Rating Analysis</h3>
                        <img src={ahemd3} alt="Image 1" />
                      </div>
                      <div className="image-container">
                        <h3>Review Analysis</h3>
                        <img src={ahemd3} alt="Image 2" />
                      </div>
                      <span className="close-btn" onClick={closeModal}>&times;</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
