import React, { useState, useEffect } from 'react';
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
import Image from './Image';

const Recommendation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let details = location.state?.recommendations || [];
  const count = location.state?.count || 0;
  details = details.slice(0, count);
  console.log(details);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  if (count === 3) {
    details = shuffleArray(details);
}

  const [modalIsOpen, setModalIsOpen] = useState(null);

  const openModal = (index) => {
    setModalIsOpen(index);
  };

  const closeModal = () => {
    setModalIsOpen(null);
  }

  // const restaurants = [
  //   { id: '1', name: 'Barbeque Nation', ImageUrl: bn1, location: 'Vashi', dishes: 'Smoked Tandoori, Icecream', cusine: 'Non-Veg', cost: 'High' },
  //   { id: '2', name: 'Ahmed Bhais', ImageUrl: ahemd2, location: 'Nerul', dishes: 'Butterchicken, Mughali Chicken', cusine: 'Non-Veg', cost: 'Medium' },
  //   { id: '3', name: 'Shy Cafe And Bar', ImageUrl: shy1, location: 'Nerul', dishes: 'Cold Coffee, Pizza', cusine: 'Non-Veg', cost: 'High' },
  //   { id: '4', name: 'Shree Nerul Cafe', ImageUrl: shree1, location: 'Vashi', dishes: 'South Indian, Podi Idli', cusine: 'Veg', cost: 'Low' },
  // ];

  return (
    <div>
      <Navbar />
      <div className="recommendation-container">
        <h2 className="header">Our Top Suggestions:</h2>
        <div className="restaurant-list">
          {details.map((restaurant, index) => {
            // const ImageUrl = restaurant.ImageUrl;
            // const location = restaurant.location;
            // const dishes = restaurant.dishes;
            // const cusine = restaurant.cusine;
            // const cost = restaurant.cost; restaurant.img_file_path
            return (
              <div className="restaurant-item" key={index}>
                <div className="restaurant-image-wrapper">
                  <div className="restaurant-image">
                      <Image place={restaurant.location} filename={`${restaurant.img_name}.jpg`}/>
                  </div>
                </div>
                <div className="restaurant-details">
                  <h3 className="restaurant-name">{index + 1}. {restaurant.restaurant_name}</h3>  
                  <p className="restaurant-dishes">Recommended Dishes: {restaurant.rec_dishes}</p>
                </div>
               
                <div className="restaurant-cuisine-cost">
                  <p className="restaurant-cuisine">Similarity Rank: {index+1}</p>
                  <p className="restaurant-cuisine">Rating: {restaurant.rating}</p>
                  <p className="restaurant-cuisine">Cuisine: {restaurant.type}</p>
                  <p className="restaurant-cost">Budget: {restaurant.budget}</p>
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
                        <Image place={restaurant.location} filename={`${restaurant.restaurant_name}_rating_graph.jpg`}/>
                      </div>
                      <div className="image-container">
                        <h3>Review Analysis</h3>
                        <Image place={restaurant.location} filename={`${restaurant.restaurant_name}_sentiment_graph.jpg`}/>
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
