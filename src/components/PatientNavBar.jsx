import React, { useEffect, useState } from 'react';
import "../styles/Profile.css";
import { Link } from 'react-router-dom';

const PatientNavBar = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
        fetchUser();
      }, []);

  const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/patientprofile");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsError(true);
      }
  };
  
  const handleLogout = async () => {
    try {
        const response = await fetch("http://localhost:8080/patientlogout", {
        method: 'POST',
        });

        if (response.status === 200) {
        setMessage('Logged out successfully');
        window.location.href = '/patlogin';
        } else if (response.status === 401) {
        setMessage('No user is currently logged in');
        } else {
        setMessage('An error occurred');
        }
    } catch (error) {
        setMessage('An error occurred');
    }
  };




  return (
    <div id="navbar">
    <nav>
      <ul>
        <li style={{ float: 'left' }}>
            <Link to="/patprofile">
            <img
              src={require('../images/DOC LOGO.png')}
              alt="Doc Click Connect"
              style={{ maxWidth: '100px', maxHeight: '40px', marginRight: '20px', marginLeft: '-50px' }}
            /></Link>
        </li>
      </ul>
      <ul>
        <li><Link to="/patprofile">My Profile</Link></li>
        <li><Link to="/editpatprofile">Edit Profile</Link></li>
        <li><Link to="/patappointments">My Appointments</Link></li>
        <li><Link to="/docsearch">Search Doctors</Link></li>
        <li style={{ float: 'right' }}>
          {user ? (
            <span style={{ color: "white", fontSize: "15px" }}>Hello, {user.user.firstName}! </span>
          ) : (
            isError ? (
              <p>Error fetching user profile</p>
            ) : (
              <p>Loading user profile...</p>
            )
          )}
          <button onClick={handleLogout}>Log Out</button>
          <p>{message}</p>
        </li>
      </ul>
    </nav>
  </div>
  )
}

export default PatientNavBar
