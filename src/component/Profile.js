import React, { useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [restaurantType, setRestaurantType] = useState('');
  const [budget, setBudget] = useState('');
  const [place, setPlace] = useState('');
  const [cuisine, setCuisine] = useState('');
  const navigate = useNavigate(); 

  const handleRestaurantTypeChange = (type) => {
    setRestaurantType(type);
  };

  const handleBudgetChange = (amount) => {
    setBudget(amount);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setCuisine(event.target.value);
  };

  const handleSubmit = () => {
    navigate('/dashboard');
    console.log('Form submitted:', { restaurantType, budget, place, cuisine });
  };

  return (
    <div className="profile-bg">
    <div className="profile-container">
      <h1>Answer some Basic Questions:</h1>
     
      <div className="form-group">
        <label>Type of Restaurant:</label>
        <div className="button-group">
          <button
            className={restaurantType === 'VEG' ? 'selected' : ''}
            onClick={() => handleRestaurantTypeChange('VEG')}
          >
            VEG
          </button>
          <button
            className={restaurantType === 'NON-VEG' ? 'selected' : ''}
            onClick={() => handleRestaurantTypeChange('NON-VEG')}
          >
            NON-VEG
          </button>
        </div>
      </div>
      <div className="form-group">
        <label>Budget:</label>
        <div className="button-group">
          <button
            className={budget === 'Low' ? 'selected' : ''}
            onClick={() => handleBudgetChange('Low')}
          >
            Low
          </button>
          <button
            className={budget === 'Medium' ? 'selected' : ''}
            onClick={() => handleBudgetChange('Medium')}
          >
            Medium
          </button>
          <button
            className={budget === 'High' ? 'selected' : ''}
            onClick={() => handleBudgetChange('High')}
          >
            High
          </button>
        </div>
      </div>
      <div className="form-group">
        <label>Place:</label>
        <select value={place} onChange={handlePlaceChange}>
          <option value="place1">Vashi</option>
          <option value="place2">Mumbai</option>
          <option value="place3">Thane</option>
        </select>
      </div>
      <div className="form-group">
        <label>Cuisine:</label>
        <select value={cuisine} onChange={handleCuisineChange}>
          <option value="chinese">Chinese</option>
          <option value="indian">Indian</option>
          <option value="fast-food">Fast Food</option>
        </select>
      </div>
      <button type="submit" onClick={handleSubmit}>Proceed</button>
    </div>
    </div>
  );
};

export default Profile;
