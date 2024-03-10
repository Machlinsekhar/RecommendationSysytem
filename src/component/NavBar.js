import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import recom from '../image/logo.png'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(""); // Initialize user based on auth.currentUser

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setUser(authUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  //   // Cleanup the listener when the component unmounts
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // const handleLogout = () => {
  //   auth.signOut();
  //   navigate('/login');
  // };

  return (
    <nav className="navbar font-header font-jost">
      <div className="logo"><Link to="/home">
        <img src={recom} alt="logo" className='logo-img'/></Link>
      </div>
      <ul className={`menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><Link to="/home"className='li' onClick={closeMobileMenu}>Home</Link></li>
        <li><Link to="/aboutus" className='li' onClick={closeMobileMenu}>About Us</Link></li>
       
          
          <li ><Link to="/"className='li' onClick={closeMobileMenu}>Log Out</Link></li>
         
      </ul>
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
      </div>
    </nav>
  );
}

export default Navbar;
