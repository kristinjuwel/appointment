import React, { useEffect, useState } from 'react';
import "../../styles/Profile.css";
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import { Link } from 'react-router-dom';


const ViewProfile = () => {
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
      

  return (
    <div className="profile-container" id="container">
        <DoctorNavbar />
        <div className="info-container"> 
            {user ? (
                 <div className="p-steps">
                    <div className="profile-card">
                        <br />
                        <br />
                        <br />
                        <h1>Patient Profile</h1>
                        <p><b>Username:</b><br /><h5>{user.user.username}</h5></p>
                        <p><b>Name:</b><br /><h5>{user.user.firstName} {user.user.middleName} {user.user.lastName}</h5></p>
                        <p><b>Contact Number:</b><br /><h5>{user.user.contactNumber}</h5></p>
                        <p><b>Email:</b><br /><h5>{user.user.email} </h5></p>
                    </div>
                    <div className="profile-card">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <p><b>Age:</b><br /><h5>{user.user.age}</h5></p>
                        <p><b>Sex:</b><br /><h5>{user.user.sex}</h5></p>
                        <p><b>Birthday:</b><br /><h5>{user.user.birthday}</h5></p>
                        <p><b>Address:</b><br /><h5>{user.user.address}</h5></p>
                    </div>
                    <div className="profile-card">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <p><b>PhilHealth ID no:</b><br /><h5>{user.philhealthId}</h5></p>
                        <p><b>PWD ID no:</b><br /><h5>{user.pwdId}</h5></p>

                    </div>
                    <div className="profile-card" style={{marginTop:'100px'}}>
                        <img
                            src={require('../../images/profilepic.jpg')}
                            alt='profilepic'
                            style={{ maxWidth: '80%', maxHeight: '80vh', margin: 0}}
                        />
                    </div>
                    </div>
                            ) : (
                isError ? (
                  <p>Error fetching user profile</p>
                ) : (
                  <p>Loading user profile...</p>
                )
              )}
              <Link to="/manageappointments"><button>Back to Manage Appointments</button></Link>
        </div>
        <DoctorFooter />
    </div>
  );
};

export default ViewProfile;