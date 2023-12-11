import React, { useEffect, useState } from 'react';
import "../styles/Profile.css";
import { Link } from 'react-router-dom';

const DoctorNavbar = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
        fetchUser();
      }, []);

  const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/doctorprofile");
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
        const response = await fetch("http://localhost:8080/doctorlogout", {
        method: 'POST',
        });

        if (response.status === 200) {
        setMessage('Logged out successfully');
        window.location.href = '/doclogin';
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
                    <Link to="/docprofile">
                    <img
                    src={require('../images/DOC LOGO.png')}
                    alt="Doc Click Connect"
                    style={{ maxWidth: '100px', maxHeight: '40px', marginRight: '20px', marginLeft: '-50px' }}
                    /></Link>
                </li>
            </ul>
            <ul>
                <li><Link to="/docprofile">My Profile</Link></li>
                <li><Link to="/editdocprofile">Edit Profile</Link></li>
                <li><Link to="/docappointments">My Appointments</Link></li>
                <li><Link to="/docaddclinic">Add Clinic</Link></li>
                <li><Link to="/docclinic">My Clinics</Link></li>
                <li style={{ float: 'right' }}>
                {user ? (
                <li style={{color: "white", fontSize: "15px"}}>Hello, {user.user.firstName}! </li>
                ) : (
                  (
                    <p></p>
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

export default DoctorNavbar
