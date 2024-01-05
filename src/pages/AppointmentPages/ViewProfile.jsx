import React, { useEffect, useState } from 'react';
import "../../styles/Profile.css";
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import { Link, useParams } from 'react-router-dom';
import avatar00 from '../../images/defaultIcon.png';
import avatar01 from '../../assets/PatientIcons/Avatar01.png';
import avatar02 from '../../assets/PatientIcons/Avatar02.png';
import avatar03 from '../../assets/PatientIcons/Avatar03.png';
import avatar04 from '../../assets/PatientIcons/Avatar04.png';
import avatar05 from '../../assets/PatientIcons/Avatar05.png';
import avatar06 from '../../assets/PatientIcons/Avatar06.png';
import avatar07 from '../../assets/PatientIcons/Avatar07.png';
import avatar08 from '../../assets/PatientIcons/Avatar08.png';
import avatar09 from '../../assets/PatientIcons/Avatar09.png';
import avatar10 from '../../assets/PatientIcons/Avatar10.png';
import avatar11 from '../../assets/PatientIcons/Avatar11.png';
import avatar12 from '../../assets/PatientIcons/Avatar12.png';
import avatar13 from '../../assets/PatientIcons/Avatar13.png';
import avatar14 from '../../assets/PatientIcons/Avatar14.png';
import avatar15 from '../../assets/PatientIcons/Avatar15.png';
import avatar16 from '../../assets/PatientIcons/Avatar16.png';
import avatar17 from '../../assets/PatientIcons/Avatar17.png';
import avatar18 from '../../assets/PatientIcons/Avatar18.png';
import HomeFooter from '../../components/HomeFooter';
import HomeNavbar from '../../components/HomeNavbar';


const ViewProfile = () => {
    const { username, patientUserId } = useParams();
    const [user, setUser] = useState(null);
    const [isError, setIsError] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');

    useEffect(() => {
    const fetchUser = async () => {
        try {
          const response = await fetch(`https://railway-backend-production-a8c8.up.railway.app/patientview/${patientUserId}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setAvatar(data.user.avatar);
          } else {
            setIsError(true);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          setIsError(true);
        }
    };
    
    fetchUser();
  }, [patientUserId]);

    const setDisplayedAvatars = (avatar) => {
      const avatarImports = {
        'patavatar01': avatar01,
        'patavatar02': avatar02,
        'patavatar03': avatar03,
        'patavatar04': avatar04,
        'patavatar05': avatar05,
        'patavatar06': avatar06,
        'patavatar07': avatar07,
        'patavatar08': avatar08,
        'patavatar09': avatar09,
        'patavatar10': avatar10,
        'patavatar11': avatar11,
        'patavatar12': avatar12,
        'patavatar13': avatar13,
        'patavatar14': avatar14,
        'patavatar15': avatar15,
        'patavatar16': avatar16,
        'patavatar17': avatar17,
        'patavatar18': avatar18
      };
  
      // Set selectedAvatar using the corresponding import
      setSelectedAvatar(avatarImports[avatar] || avatar00);
    };
    useEffect(() => {
      setDisplayedAvatars(avatar);
  
    }, [avatar]);
    const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState('');

    useEffect( () => {
      const fetchUser = async () => {
        try {
          const response = await fetch(`https://railway-backend-production-a8c8.up.railway.app/doctordetails/${username}`);
          if (response.ok) {
           setIsDoctorLoggedIn(true);
   
          } else {
            setIsDoctorLoggedIn(false);
    
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          setIsDoctorLoggedIn(false);
    
        }
      };
      fetchUser();
    }, [username]);
    
    if (!isDoctorLoggedIn) {
      return (
        <div>
          <HomeNavbar />
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>No doctor is logged in.</h1>
            <Link to="/doclogin"><button>Login</button></Link>
          </div>
          <HomeFooter />
        </div>
    
      );
    }
   

  return (
    <div className="profile-container" id="container">
        <DoctorNavbar username={username} />
        <div className="doctorprofilecontainer" style={{marginTop: "1%", overflow: "hidden", height: "100%"}}>
        {user ? (
          <div className="parentelement" style={{overflow: "hidden", height: "1000px"}}>
            
            <div className="columns" id="columnprofileicon" style={{marginTop: '1%', height: "680px"}}>
              <div className="backgroundpop"></div>
              <div className="doctorprofileicon">
                {selectedAvatar && <img src={selectedAvatar} alt="Selected Avatar" />}
              </div>
              <div className="doctorprofilename">
                <p className="pn">
                  <b>{user.user.firstName} {user.user.middleName} {user.user.lastName}</b>
                </p>
              </div>
              <div className="doctorprofiletitle">
                <p className="pt">
                  <i>{user.credentials}</i>
                </p>
              </div>
              <div className="listofdocprofilecontent" >
                <ul className="profile-list">
                  <li><a href="#columnprofileinformation">Account Details</a></li>
                  <li><a href="#personal">Personal Information</a></li>
                  <li><a href="#additional">Additional Information</a></li>
                  <li><a href={`/manageappointments/${username}/${patientUserId}`}>Appointments</a></li>
                  
                </ul>
                         

              </div>
              <div className="columns" id="columnprofileicon1" style={{marginTop: '37%', height: "90px", zIndex: 1}}>
              <Link to={`/manageappointments/${username}/${patientUserId}`}><button>Back to Manage Appointments</button></Link>
                </div>

            </div>
           
            
            <div className="columns" id="columnprofiledoctor" style={{marginTop: '0%', overflowY: 'auto', maxHeight: '760px'}} >
              <div className="doctoruserprofilecontent">
                <div className="mydoctorprofileaccount" id="account">
                  <div className="backgroundpopuser">
                    <div className="doctorprofilecontenttitles">
                      <p><b>ACCOUNT</b></p>
                    </div>
                    <div className="contentcolumn">
                      <div className="contentcolumn1">
                        <div className="contentrow">
                          <div className="dataname">
                            <p>Username: </p>
                          </div>
                          <div className="datainfo">
                            {user.user.username}
                          </div>
                        </div>
                      </div>
                      <div className="contentcolumn2">
                        <div className="contentrow">
                          <div className="dataname">
                            <p>Email: </p>
                          </div>
                          <div className="datainfo">
                            {user.user.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mydoctorprofilepersonal" id="personal">
                  <div className="backgroundpopuser">
                    <div className="doctorprofilecontenttitles">
                      <p><b>PERSONAL INFORMATION</b></p>
                    </div>
                    <div className="contentcolumn">
                      <div className="contentcolumn1">
                        <div className="contentrow">
                          <div className="dataname">
                            <p>Sex: </p>
                          </div>
                          <div className="datainfo">
                            {user.user.sex}
                          </div>
                        </div>
                      </div>
                      <div className="contentcolumn2">
                        <div className="contentrow">
                          <div className="dataname">
                            <p>Age: </p>
                          </div>
                          <div className="datainfo">
                            {user.user.age}
                          </div>
                        </div>
                      </div>
                      <div className="contentcolumn2">
                        <div className="contentrow">
                          <div className="dataname">
                            <p>Birthday: </p>
                          </div>
                          <div className="datainfo">
                            {user.user.birthday}
                          </div>
                        </div>
                      </div>
                      <div className="contentcolumn2">
                        <div className="contentrow">
                          <div className="dataname">
                            <p>Contact Number: </p>
                          </div>
                          <div className="datainfo">
                            {user.user.contactNumber}
                          </div>
                        </div>
                      </div>
                      <div className="contentcolumn2">
                        <div className="contentrow">
                          <div className="dataname">
                            <p>Address: </p>
                          </div>
                          <div className="datainfo">
                            {user.user.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mydoctorprofilecredentials" id="additional">
                  <div className="backgroundpopuser">
                    <div className="doctorprofilecontenttitles">
                      <p><b>ADDITIONAL INFORMATION</b></p>
                    </div>
                    <div className="contentcolumn">
                      <div className="contentcolumn1">
                        <div className="contentrow">
                          <div className="dataname">
                            <p>Senior Citizen ID: </p>
                          </div>
                          <div className="datainfo">
                            {user.seniorId}
                          </div>
                        </div>
                      </div>
                      <div className="contentcolumn2">
                        <div className="contentrow">
                          <div className="dataname">
                            <p>Philhealth ID: </p>
                          </div>
                          <div className="datainfo">
                            {user.philhealthId}
                          </div>
                        </div>
                      </div>
                      <div className="contentcolumn2">
                        <div className="contentrow">
                          <div className="dataname">
                            <p>PWD ID No: </p>
                          </div>
                          <div className="datainfo">
                            {user.pwdId}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                  </div>
                            ) : (
                isError ? (
                  <p>Error fetching user profile</p>
                ) : (
                  <p>Loading user profile...</p>
                )
              )}
      
      
        </div>
        <DoctorFooter />
    </div>
  );
};

export default ViewProfile;
