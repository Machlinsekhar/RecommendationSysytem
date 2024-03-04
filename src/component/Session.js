import React, { useState, useEffect } from 'react';

const SessionChecker = () => {
  const [sessionStatus, setSessionStatus] = useState('');

  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/check_session',{
        method: 'GET',
        credentials: 'include'
        });
        const data = await response.text();
        setSessionStatus(data);
      } catch (error) {
        console.error('Error fetching session status:', error);
        setSessionStatus('Error fetching session status');
      }
    };

    fetchSessionStatus();
  }, []);

  return (
    <div>
      <h2>Session Status</h2>
      <p>{sessionStatus}</p>
    </div>
  );
};

export default SessionChecker;
