import React from 'react';
import './Recommendation.css'; // Import your CSS file for recommendation styling
import navaratna from '../image/navaratna.jpg';
import mcd from '../image/mcd.jpeg';
import dominos from '../image/dominos.jpeg';

const restaurants = [
    { id:'1', name: 'Navaratna', imageUrl: navaratna, map: 'link_to_navaratna_map' },
    { id:'2', name: 'Mcd', imageUrl: mcd, map: 'link_to_mcd_map' },
    { id:'3', name: 'Dominos', imageUrl: dominos, map: 'link_to_dominos_map' },
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
