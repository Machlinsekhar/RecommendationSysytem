import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const navBarStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  zIndex: 20,
  position: 'fixed',
  top: 0,
  alignItems: 'center',
  height: '4.375rem',
  fontFamily: 'Lexend',
  color: 'var(--heading-text)',
};

const buttonStyle = {
  background: 'linear-gradient(to top, #322E78, #918DFC)',
  width: 'fit-content',
  padding: '1rem 2rem',
  borderRadius: '1.5625rem',
  marginLeft: 'auto',
  marginRight: '1rem',
  cursor: 'pointer',
};

const iconStyle = {
  width: '1.25rem',
  height: '1.25rem',
  fill: 'white',
};

const textStyle = {
  color: 'white',
  fontSize: '0.875rem',
  fontFamily: 'Work Sans',
};

// Adjust other styles as per your requirements

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // Handle logout logic
  };

  return (
    <div style={navBarStyle}>
      <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={buttonStyle} onClick={handleLogout}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={iconStyle}
            >
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                clipRule="evenodd"
              />
            </svg>
            <p style={textStyle}>Logout</p>
          </div>
        </div>
        {/* Add conditional rendering for user's profile image if needed */}
      </div>
    </div>
  );
}

export default NavBar;
