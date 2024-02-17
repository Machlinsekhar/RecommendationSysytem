import React, { useState } from 'react';
import './Profile.css';
import { useNavigate, useLocation } from 'react-router-dom';
import modal from '../image/modal.jpg';

const Profile = () => {
  const [loadingModalOpen, setLoadingModalOpen]= useState('False')
  const [restaurantType, setRestaurantType] = useState('');
  const [budget, setBudget] = useState('');
  const [place, setPlace] = useState('');
  const [cuisine, setCuisine] = useState('1');
  const navigate = useNavigate();   
  const [showModal, setShowModal] = useState(false);
  const location = useLocation().pathname.split('/').pop();

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

   const handleSubmit = async () => {
    if (!restaurantType) {
      alert('Please fill out the Type of Restaurant');
      return;
    }
    if (!budget) {
      alert('Please fill out the Budget');
      return;
    }
    if (!cuisine) {
      alert('Please fill out the Minimum Rating');
      return;
    }
    setShowModal(true); // Show the modal
    setTimeout(async () => {
      const data = await fetchRecommendations();
      navigate('/recommendation', { state: { recommendations: data } });
      console.log('Form submitted:', data);
    }, 3000); // Navigate after 5 seconds
  };

  const fetchRecommendations = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location: location, rating: cuisine, restaurant_type: restaurantType, max_cost: budget }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch recommendations:', error);
    }
};

const handleCollabClick = async () => {
  try {
      setLoadingModalOpen(true);

      setTimeout(async () => {
          const data = await fetchCollabRecommendations();
          setLoadingModalOpen(false);

          navigate('/recommendation', { state: { recommendations: data } });
          console.log('Form submitted:', data);
      }, 3000);
  } 
  catch (error) {
      console.error('Error fetching data:', error);
      setLoadingModalOpen(false); 
  }
};


const fetchCollabRecommendations = async () => {

  try {
      const response = await fetch('http://localhost:5000/collabrecommend', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }})
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Failed to fetch recommendations:', error);
  }
};

  return (
    <div className="profile-bg">
    <div className="profile-container">
      {/* <h1>Answer some Basic Questions:</h1> */}
     
      <div className="form-group">
        <label className='text-left'>Type of Restaurant</label>
        <div className="button-group">
          <button
            className={restaurantType === 'Indian' ? 'selected' : ''}
            onClick={() => handleRestaurantTypeChange('Indian')}
          >
            Indian
          </button>
          <button
            className={restaurantType === 'CHINESE' ? 'selected' : ''}
            onClick={() => handleRestaurantTypeChange('CHINESE')}
          >
            Chinese
          </button>
          <button
            className={restaurantType === 'Barbecue' ? 'selected' : ''}
            onClick={() => handleRestaurantTypeChange('Barbecue')}
          >
           Barbecue
          </button>
        </div>
      </div>
      <div className="form-group">
        <label>Budget</label>
        <div className="button-group">
          <button
            className={budget === 'Low' ? 'selected' : ''}
            onClick={() => handleBudgetChange('Low')}
          >
            Low
          </button>
          <button
            className={budget === 'Moderate' ? 'selected' : ''}
            onClick={() => handleBudgetChange('Moderate')}
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
      {/* <div className="form-group">
        <label>Place:</label>
        <select value={place} onChange={handlePlaceChange}>
          <option value="place1">Vashi</option>
          <option value="place2">Ne</option>
          <option value="place3">Thane</option>
        </select>
      </div> */}
      <div className="form-group">
        <label className='text-left font-bold'>Minimum Rating</label>
        <select value={cuisine} onChange={handleCuisineChange}  style={{ border: 'none' }}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
<div >
      <div >
      <button type="submit" onClick={handleSubmit}>Content Based Filtering</button>

        {/* Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <img src={modal} alt="Loading..." />
            </div>
          </div>
        )}
      </div>

      <button type="submit" onClick={handleCollabClick}>Collaborative Filtering</button>

        {/* Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <img src={modal} alt="Loading..." />
            </div>
          </div>
          
        )}
      </div>
      </div>
    </div>
  );
};

export default Profile;
