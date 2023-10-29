import React from 'react';
import './Recommendation.css'; // Import your CSS file for recommendation styling
import barbeque from '../image/barbeque.jpeg';
import ahmed from '../image/ahmed.jpeg';
import shy from '../image/shy.jpeg';
import shree from '../image/shree.jpeg';

const restaurants = [
    { id:'1', name: 'Barbeque Nation', imageUrl: barbeque, map: 'link_to_navaratna_map' },
    { id:'2', name: 'Ahmed Bhai\'s', imageUrl: ahmed, map: 'link_to_mcd_map' },
    { id:'3', name: 'Shy Cafe And Bar', imageUrl: shy, map: 'link_to_dominos_map' },
    { id:'4', name: 'Shree Nerul Cafe', imageUrl: shree, map: 'link_to_dominos_map' },
    // { id:'5', name: 'Shy Cafe And Bar', imageUrl: dominos, map: 'link_to_dominos_map' },
  // Add more restaurants as needed
];

const Recommendation = () => {
  return (
    <div className="recommendation-container">
      <h2>Recommended Restaurants:</h2>
      <div className="restaurant-list">
        {restaurants.map((restaurant, index) => (
          <div className="restaurant-card" key={index}>
            <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-image" />
            <p className="restaurant-name">{restaurant.id}</p>
            <p className="restaurant-name">{restaurant.name}</p>    
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
