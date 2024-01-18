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
import downArrowImageUrl from '../image/downarraow.png'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const restaurants = [
  { id: '1', name: 'Barbeque Nation', verticalImageUrl: bn1, topImageUrl: bn2, bottomImageUrl: bn3, des: 'Barbeque Nation is a culinary haven for barbecue enthusiasts, renowned for its delectable and interactive dining experience.', point1: 'No home delivery', point2: 'Best Offer & Prices', point3: 'Online Table Bookings Available' },
  { id: '2', name: 'Ahmed Bhais', verticalImageUrl: ahemd1, topImageUrl: ahemd2, bottomImageUrl: ahemd3, des: 'A casual dining restaurant that serves delicious North Indian and Mughlai cuisine. The food is cooked to perfection and is reasonably priced.', point1: 'On time Delivery', point2: 'Reasonable Prices', point3: 'Online Services Available' },
  { id: '3', name: 'Shy Cafe And Bar', verticalImageUrl: shy1, topImageUrl: shy2, bottomImageUrl: shy3, des: 'A vintage escape from your everyday bustle paired with artisanal coffee, wood-fired pizzas & craft cocktails.', point1: 'Delivery on time', point2: 'Excellent Ambience', point3: 'Online Services Available ' },
  { id: '4', name: 'Shree Nerul Cafe', verticalImageUrl: shree1, topImageUrl: shree2, bottomImageUrl: shree3, des: 'It offers a wide range of delicious cuisines from North Indian, Chinese, and Continental.', point1: 'Pure Veg Restaurant', point2: 'Best Offer & Prices', point3: 'Cozy and Comfortable Ambience' },
  // Add more restaurants as needed
];

const Recommendation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations || [];
  console.log(recommendations);

  const buttonStyle = {
    backgroundColor: '#AD343E',
    borderRadius: '10px',
    fontSize: '18px',
    color: 'white',
    padding: '10px 20px',
    cursor: 'pointer',
    marginLeft:'650px',
    marginBottom:'100px',
    marginTop: '50px',
  };
  const handleGoBack = () => {
    navigate('/dashboard');
  }

  return (
    <div className="recommendation-container PlayfairDisplay-Regular" >
      <h2 className='header'>RECOMMENDED RESTAURANTS</h2>
      <div className="restaurant-list">
        {recommendations?.length > 0 && recommendations?.map((restaurant, index) => {
          const matchedRestaurant = restaurants.find(r => r.name === restaurant["Restaurant Name"]);
          const verticalImageUrl = matchedRestaurant ? matchedRestaurant.verticalImageUrl : '';
          const topImageUrl = matchedRestaurant ? matchedRestaurant.topImageUrl : '';
          const bottomImageUrl = matchedRestaurant ? matchedRestaurant.bottomImageUrl : '';
          const des = matchedRestaurant ? matchedRestaurant.des : '';
          const point1 = matchedRestaurant ? matchedRestaurant.point1 : '';
          const point2 = matchedRestaurant ? matchedRestaurant.point2 : '';
          const point3 = matchedRestaurant ? matchedRestaurant.point3 : '';
           // Get the corresponding image URL

          return (
            <div  key={index}>
              {/* <div className="rank-circle">{index + 1}</div> */}
              {/* <img className="restaurant-image" src={imageUrl} alt={restaurant["Restaurant Name"]} />
              <p className="restaurant-name">{index + 1}{restaurant["Restaurant Name"]}</p>
              <p className="similarity-score">Similarity: {restaurant.similarity}</p> */}
              <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', paddingBottom:'100px', paddingRight: '100px' }}>
  <div style={{ height: '500px', marginRight: '10px', marginLeft:'100px' }}>
    <img src={verticalImageUrl} alt="Image 1" style={{ height: '100%' }} />
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', paddingTop:'20px' }}>
    <img src={topImageUrl} alt="Image 2" style={{ height: '300px', marginBottom: '10px' }} />
    <img src={bottomImageUrl} alt="Image 3" style={{ height: '200px' }} />
  </div>
</div>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '54px', fontWeight: 'bold' }}>
         {index + 1}. <span style={{ fontSize: '54px' }}>{restaurant["Restaurant Name"]}</span>
        </h1>
        <p  style={{ fontSize: '17px' ,fontWeight:'inherit', lineHeight:'28px', paddingRight:'100px'}}>{des} </p>
        
        <ul className="no-bullets" style={{paddingTop:'30px'}}>
          <li style={{ fontSize: '18px' ,fontWeight:'inherit', paddingBottom: '5px'}}>
            <img src={p1} alt="Point 1" style={{ height: '20px' , paddingRight:'10px'}} />{point1}
          </li>
          <li style={{ fontSize: '18px' ,fontWeight:'inherit', paddingBottom: '5px'}}>
            <img src={p1} alt="Point 2" style={{ height: '20px', paddingRight:'10px' }} />{point2}
          </li>
          <li style={{ fontSize: '18px' ,fontWeight:'inherit', paddingBottom: '5px'}}>
            <img src={p1} alt="Point 3" style={{ height: '20px', paddingRight:'10px', }} />{point3}
          </li>
        </ul>
        <div >
      <img src={downArrowImageUrl} alt="Down Arrow" style={{ width: '25px', height: '30px', paddingTop:'200px',  paddingLeft:'650px' }} />
    </div>
      </div>
    </div>
   
            </div>


          );
        })}
        {!Boolean(recommendations?.length) && JSON.stringify(recommendations)}
      </div>
      <button onClick={handleGoBack} style={buttonStyle} >
        Go Back
      </button>
    </div>
  );
};

export default Recommendation;
