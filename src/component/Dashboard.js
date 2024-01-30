import React, { useState }  from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dashbg from '../image/background.png';
import content from '../image/content.jpg';
import collaborative from '../image/collaborative.jpg';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Dashboard = () => {
    const dashboardContainer = {
        height: '100vh', /* Set component height to cover the entire viewport */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', /* Align content at the top */
        alignItems: 'flex-start', /* Align content to the left */
        // paddingTop: '10px',
        backgroundColor: '#f2f2f2',
        backgroundImage: `url(${dashbg})`,  /* Replace "path/to/your/image.jpg" with the actual file path or URL of your background image */
    backgroundSize: 'cover', /* Cover the entire container */
    backgroundRepeat: 'no-repeat', 
    };
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loadingModalOpen, setLoadingModalOpen] = useState(false);

    const handleCardClick = () => {
        setLoadingModalOpen(true);
        // Simulate an API request or any loading operation here
        setTimeout(() => {
            setLoadingModalOpen(false);
            navigate('/profile');
        }, 2000); // Simulating a 2-second loading time
    };

    const [isSelected, setIsSelected] = useState(false);

    const ButtonStyle = () => ({
        padding: '12px 44px',
        marginLeft: '38rem',
        marginTop: '3.5rem',
        marginBottom: '1rem',
        color: 'black',
        backgroundColor: isSelected ? '#ddd' : 'white', // Change color if selected
        borderRadius: '8px',
        cursor: 'pointer',
        border: '2.3px solid black',
        fontSize: '21px',
      });

    const handleCollabClick = async () => {
        try {
            // Open the modal before making the asynchronous call
            setLoadingModalOpen(true);
    
            // Simulate an asynchronous operation with setTimeout
            setTimeout(async () => {
                // Perform the asynchronous operation (fetchCollabRecommendations)
                const data = await fetchCollabRecommendations();
    
                // After fetching data, close the modal
                setLoadingModalOpen(false);
    
                // Navigate to the recommendation page with the fetched data
                navigate('/recommendation', { state: { recommendations: data } });
                console.log('Form submitted:', data);
            }, 3000);
        } catch (error) {
            // Handle errors appropriately
            console.error('Error fetching data:', error);
            setLoadingModalOpen(false); // Close the modal in case of an error
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

    const importSection = {
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '600px'
    };

    const [uploadedFileName, setUploadedFileName] = useState('');
    const [showFileInput, setShowFileInput] = useState(false); // State to track visibility of file input

    const [uploadedData, setUploadedData] = useState(null); // State to store uploaded data

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();


        reader.onload = (e) => {
            const content = e.target.result;
            // Parse the content if it's a CSV file
            // For simplicity, let's assume it's CSV and parse it (you might want to use a CSV parsing library)
            // For example: const parsedData = parseCSV(content);
            setUploadedData(content);
        };

        reader.readAsText(file);
        const fileName = file.name;
        setUploadedFileName(fileName);
    };

    const handleUploadData = () => {
        // Show an alert with the uploaded file name
        if (uploadedFileName) {
            alert(`Uploaded File: ${uploadedFileName}`);
        } else {
            alert('No file uploaded.');
        }
    };

    const showFileInputElement = () => {
        setShowFileInput(true);
    };

    const fileInputStyle = {
        display: 'none',
        width: '200px',
        height: '200px', // Set display property based on showFileInput state
    };

    const dropArea = {
        width: '200px',
        height: '100px',
        border: '2px dashed #675d1a',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: '20px',
    };

    const buttonStyle = {
        backgroundColor: '#675d1a',
        borderRadius: '10px',
        fontSize: '18px',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    const buttonStyle1 = {
        backgroundColor: '#AD343E',
        borderRadius: '10px',
        fontSize: '18px',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
        marginLeft: '570px',
        marginTop: '70px'
    };

    const [showCards, setShowCards] = useState(false);

    const toggleCards = () => {
        setShowCards(!showCards);
        setIsSelected(!isSelected);
    };

    const recommendationCards = showCards && (
        <div style={{ display: 'flex', marginTop: '20px' }} >
            <Card sx={{ maxWidth: 345, marginLeft: 30, marginTop: 5 }} onClick={handleCardClick} >
                <CardMedia
                    sx={{ height: 140 }}
                    image= {content}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Content Based Filtering
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Suggests restaurants by analyzing their features, aligning with users' past preferences and profile characteristics.
                    </Typography>
                </CardContent>
                
            </Card>

            <Card sx={{ maxWidth: 345, marginLeft: 40, marginTop: 5 }} onClick={handleCollabClick}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={collaborative}
                    title="elephant"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Collaborative Filtering
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Recommends restaurants based on the preferences of similar users, leveraging collective user behavior.
                    </Typography>
                </CardContent>
                
            </Card>
            <Dialog
                open={loadingModalOpen}
                onClose={() => setLoadingModalOpen(false)}
                aria-labelledby="loading-modal-title"
            >
               
                    <CircularProgress style={{marginLeft: '15px'}}/>
                    <Typography variant="body2" color="text.secondary" style={{ marginLeft: '10px' }}>
                        Running...
                    </Typography>
                
            </Dialog>
        </div>
    );

    return (
        <div style={dashboardContainer}>
            <NavBar/>
            {/* <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', padding: '10px' }}>RECOMMENDATION SYSTEM</h1> */}
            {/* <h2 style={{ fontSize: '24px', margin: '0', paddingLeft: '150px', paddingBottom: '20px' }}>INPUT DATASET</h2> */}
            <div style={importSection}>
                 {/* <div style={dropArea} onClick={showFileInputElement}> */}
                {/* <label htmlFor="csvFile">
                    {uploadedFileName ? `File Uploaded: ${uploadedFileName}` : 'Drag & Drop or Choose File'}
                </label> */}
                {/* <input
                    type="file"
                    id="csvFile"
                    accept=".csv"
                    style={fileInputStyle} // Apply dynamic style based on showFileInput state
                    onChange={handleFileChange}
                /> */}
                    {/* <span style={{ paddingLeft: '8px' }}>Choose File</span> */}
                {/* </div> */}
               {/* <button onClick={handleUploadData} style={buttonStyle}>
                Upload Data
            </button> */}
            </div>
            <button onClick={toggleCards} style={ButtonStyle()}>
                Select one Algorithm
            </button>
            {recommendationCards}
        </div>
    );
};

export default Dashboard;
