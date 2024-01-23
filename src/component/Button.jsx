import React from 'react';
import './Button.css'; // Import your CSS file for button styling
import { Link } from 'react-router-dom';

function WoodButton() {
  return (
    <Link to="/dashboard" className="wood-button" style={{textDecoration: 'none'}}>
    Get Started
  </Link>
  );
}

export default WoodButton;
