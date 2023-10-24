import React, { useState }  from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import content from '../image/content.jpg';
import collaborative from '../image/collaborative.jpg';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';


const Dashboard = () => {
    const dashboardContainer = {
        height: '100vh', /* Set component height to cover the entire viewport */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', /* Align content at the top */
        alignItems: 'flex-start', /* Align content to the left */
        padding: '20px',
        backgroundColor: '#f2f2f2', /* Set background color */
    };

    const [loadingModalOpen, setLoadingModalOpen] = useState(false);

    const handleCardClick = () => {
        setLoadingModalOpen(true);
        // Simulate an API request or any loading operation here
        setTimeout(() => {
            setLoadingModalOpen(false);
        }, 2000); // Simulating a 2-second loading time
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
        display: 'none', // Set display property based on showFileInput state
    };

    const dropArea = {
        width: '200px',
        height: '100px',
        border: '2px dashed #002080',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: '20px',
    };

    const buttonStyle = {
        backgroundColor: '#002080',
        borderRadius: '10px',
        fontSize: '18px',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    const buttonStyle1 = {
        backgroundColor: '#002080',
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
    };

    const recommendationCards = showCards && (
        <div style={{ display: 'flex', marginTop: '20px' }}>
            <Card sx={{ maxWidth: 345, marginLeft: 30, marginTop: 5 }} onClick={handleCardClick}>
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

            <Card sx={{ maxWidth: 345, marginLeft: 40, marginTop: 5 }} onClick={handleCardClick}>
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
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', padding: '20px' }}>RECOMMENDATION SYSTEM</h1>
            <h2 style={{ fontSize: '24px', margin: '0', paddingLeft: '150px', paddingBottom: '20px' }}>INPUT DATASET</h2>
            <div style={importSection}>
                 <div style={dropArea} onClick={showFileInputElement}>
                <label htmlFor="csvFile">
                    {uploadedFileName ? `File Uploaded: ${uploadedFileName}` : 'Drag & Drop or Choose File'}
                </label>
                <input
                    type="file"
                    id="csvFile"
                    accept=".csv"
                    style={fileInputStyle} // Apply dynamic style based on showFileInput state
                    onChange={handleFileChange}
                />
                    {/* <span style={{ paddingLeft: '8px' }}>Choose File</span> */}
                </div>
               <button onClick={handleUploadData} style={buttonStyle}>
                Upload Data
            </button>
            </div>
            <button onClick={toggleCards} style={buttonStyle1}>
                CHECK YOUR RECOMMENDATION
            </button>
            {recommendationCards}
        </div>
    );
};

export default Dashboard;
