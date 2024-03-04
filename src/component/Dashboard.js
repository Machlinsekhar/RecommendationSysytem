import React, { useState }  from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import modal from '../image/modal.jpg';
import content from '../image/content.jpg';
import collaborative from '../image/collaborative.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const Dashboard = () => {
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [cuisine, setCuisine] = useState('');
  const [rating, setRating] = useState('1');
  const [budget, setBudget] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/').pop();

  const dashboardContainer = {
      height: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', 
      alignItems: 'flex-start', 
      paddingTop: '60px',
      paddingLeft:'8rem',
      backgroundColor: '#ffff',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat', 
  };
    
  const buttonStyleInline = {
    padding: '12px 20px',
    display: 'block',
    margin: 'auto auto 4px auto',
    color: 'black',
    borderRadius: '15px',
    cursor: 'pointer',
    border: '2px solid #EFBA55', 
    fontWeight: 'bold',
  };

  const handleRatingChange = (event) => {
    const { value } = event.target;
    setRating(value);
  };
  
  const lowButtonStyle = {
    ...buttonStyleInline,
    backgroundColor: budget === 'Moderate' ? '#EFBA55' : '#ffff',
  };
  
  const moderateButtonStyle = {
    ...buttonStyleInline,
    backgroundColor: budget === 'Expensive' ? '#EFBA55' : '#ffff',
  };
  
  const highButtonStyle = {
    ...buttonStyleInline,
    backgroundColor: budget === 'Very Expensive' ? '#EFBA55' : '#ffff',
  };

   
  const handleBudgetChange = (amount) => {
    console.log(amount)
    setBudget(amount);
  };

  const handleCardClick = async () => {
    if (!cuisine) {
      alert('Please fill out the Type of Restaurant');
      return;
    }
    if (!budget) {
      alert('Please fill out the Budget');
      return;
    }
    if (!rating) {
      alert('Please fill out the Minimum Rating');
      return;
    }
    setShowModal(true); 
    setTimeout(async () => {
      const data = await fetchRecommendations();
      const details = await fetchRestDetails(data);

      navigate('/recommendation', { state: { recommendations: details, count: 7 } });
      console.log('Form submitted');
    }, 10); 
  };
        
  const fetchRecommendations = async () => {
    try {
      const requestBody = {
          location: location,
          rating: rating,
          restaurant_type: cuisine,
          max_cost: budget,
      };

      console.log('in fetchrecommendations')
      console.log(requestBody)

      const response = await fetch('http://127.0.0.1:5000/recommend', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log('requestbody posted')
      console.log(data)
      return data;
    } 
    catch (error) {
      console.error('Failed to fetch recommendations:', error);
    }
  };

  const fetchRestDetails = async (data) => {
    try {
      const requestBody = {
          location: location,
          restaurant_names: data,
      };
      console.log(requestBody)

      const response = await fetch('http://127.0.0.1:5000/restaurant_details', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const details = await response.json();
      console.log(details)
      return details;
    } 
    catch (error) {
      console.error('Failed to fetch recommendations:', error);
    }
  };
        
  const toggleCuisine = (selectedCuisine) => {
    // setCuisine((prevCuisine) => {
    //   if (prevCuisine.includes(selectedCuisine)) {
    //     return prevCuisine.filter((c) => c !== selectedCuisine);
    //   } else {
    //     return [...prevCuisine, selectedCuisine];
    //   }
    // });
    setCuisine(selectedCuisine);
  };

  const handleCollabClick = async () => {
    try {
      setShowModal(true); 
      setTimeout(async () => {
        const data = await fetchRecommendations();
        const details = await fetchRestDetails(data);

        navigate('/recommendation', { state: { recommendations: details, count:3 } });
        console.log('Form submitted');
      }, 1000); 
      // setLoadingModalOpen(true);
      // setTimeout(async () => {
      //     const data = await fetchCollabRecommendations();
      //     setLoadingModalOpen(false);
      //     navigate('/recommendation', { state: { recommendations: data } });
      //     console.log('Form submitted:', data);
      // }, 3000);
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

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    gap: '0.5rem', 
    marginBottom: '0.4rem',
  };


  const buttonStyle = {
    backgroundColor: '#675d1a',
    borderRadius: '10px',
    fontSize: '18px',
    color: 'white',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  const labelStyle = {
    marginBottom: '2px',
    padding: '8px',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  };

  const buttonStyle2 = (currentCuisine) => ({
    padding: '12px 20px',
    display: 'block',
    margin: 'auto auto 4px auto',
    color: 'black',
    backgroundColor: cuisine.includes(currentCuisine) ? '#EFBA55' : '#ffff',
    borderRadius: '15px',
    cursor: 'pointer',
    fontWeight: 'bold',
    border:  '2px solid #EFBA55',
  });  
      
  const [showCards, setShowCards] = useState(false);

  const toggleCards = () => {
    setShowCards(!showCards);
    setIsSelected(!isSelected);
  };

  return (
    <div>
    <NavBar/>
    <div style={dashboardContainer}>  
    <h2 style={{ alignSelf: 'left', fontWeight: '900', fontSize: '2rem' }}>Query Parameters</h2>

    <label style={labelStyle}>1. Preferred Cuisine:</label>
    <div style={buttonGroupStyle}>
      <button style={buttonStyle2('Any')} onClick={() => toggleCuisine('Any')}>
        Any
      </button>
      <button style={buttonStyle2('Barbeque')} onClick={() => toggleCuisine('Barbeque')}>
        Barbeque
      </button>
      <button style={buttonStyle2('North Indian')} onClick={() => toggleCuisine('North Indian')}>
        North Indian
      </button>
      <button style={buttonStyle2('Chinese')} onClick={() => toggleCuisine('Chinese')}>
        Chinese
      </button>
      <button style={buttonStyle2('South Indian')} onClick={() => toggleCuisine('South Indian')}>
        South Indian
      </button>
    </div>

    <label style={labelStyle}>2. Budget:</label>
    <div style={buttonGroupStyle}>
      <button
        style={lowButtonStyle}
        onClick={() => handleBudgetChange('Moderate')}
      >
        Moderate
      </button>
      <button
        style={moderateButtonStyle}
        onClick={() => handleBudgetChange('Expensive')}
      >
        Expensive
      </button>
      <button
        style={highButtonStyle}
        onClick={() => handleBudgetChange('Very Expensive')}
      >
        Very Expensive
      </button>
    </div>

    <label style={labelStyle}>3. Minimum Rating:</label>
    <div>
      <select value={rating} onChange={handleRatingChange} style={{ ...buttonStyleInline, width: '80px', alignSelf: 'left' }}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
      
    <div style={{ display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap', 
    marginBottom: '0.4rem',
    }}>
    <label style={labelStyle}>4. Model:</label>
      <Card sx={{ maxWidth: 205, marginLeft: 0, marginTop: 5 , backgroundColor: '#f1f1f1'}} onClick={handleCardClick} >
        {/* <CardMedia
            sx={{ height: 140 }}
            image= {content}
            title="green iguana"
        /> */}
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{backgroundImage: content, textAlign: 'center', fontWeight:'600',}}>
                Content Based Filtering
            {/* </Typography>
            <Typography variant="body2" color="text.secondary">
            Suggests restaurants by analyzing their features, aligning with users' past preferences and profile characteristics.
          */}  </Typography> 
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 205, marginLeft: 40, marginTop: 5,  backgroundColor: '#f1f1f1' }} onClick={handleCollabClick}>
        {/* <CardMedia
            sx={{ height: 140 }}
            image={collaborative}
            title="elephant"
        /> */}
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{backgroundImage: collaborative,  textAlign: 'center', fontWeight:'600'}}>
                Collaborative Filtering
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
            Recommends restaurants based on the preferences of similar users, leveraging collective user behavior.
            </Typography> */}
        </CardContent>
      </Card>
    </div>

    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <img src={modal} alt="Loading..." />
        </div>
      </div>
    )}
    </div>
  </div>
  );
};

export default Dashboard;
