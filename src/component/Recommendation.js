import React from 'react';
import './Recommendation.css';
import barbeque from '../image/barbeque.jpeg';
import ahmed from '../image/ahmed.jpeg';
import shy from '../image/shy.jpeg';
import shree from '../image/shree.jpeg';
import { useLocation } from 'react-router-dom';

const restaurants = [
  { id: '1', name: 'Barbeque Nation', imageUrl: barbeque, map: 'link_to_navaratna_map' },
  { id: '2', name: 'Ahmed Bhais', imageUrl: ahmed, map: 'link_to_mcd_map' },
  { id: '3', name: 'Shy Cafe And Bar', imageUrl: shy, map: 'link_to_dominos_map' },
  { id: '4', name: 'Shree Nerul Cafe', imageUrl: shree, map: 'link_to_dominos_map' },
  // Add more restaurants as needed
];

const Recommendation = () => {
  const location = useLocation();
  const recommendations = location.state?.recommendations || [];
  console.log(recommendations);

  return (
    <div className="recommendation-container">
      <h2>Recommended Restaurants:</h2>
      <div className="restaurant-list">
        {recommendations.map((restaurant, index) => {
          const matchedRestaurant = restaurants.find(r => r.name === restaurant["Restaurant Name"]);
          const imageUrl = matchedRestaurant ? matchedRestaurant.imageUrl : ''; // Get the corresponding image URL

          return (
            <div className="restaurant-card" key={index}>
              <div className="rank-circle">{index + 1}</div>
              <img className="restaurant-image" src={imageUrl} alt={restaurant["Restaurant Name"]} />
              <p className="restaurant-name">{restaurant["Restaurant Name"]}</p>
              <p className="similarity-score">Similarity: {restaurant.similarity}</p>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendation;
