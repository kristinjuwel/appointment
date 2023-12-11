import React, { useState, useEffect } from 'react';
import "../styles/Search.css";
import { Link } from 'react-router-dom';
import HomeFooter from '../components/HomeFooter';
import HomeNavbar from '../components/HomeNavbar';
import DoctorForApproval from '../components/DoctorsForApproval';
import Popup from '../components/Popup'
import avatar00 from '../images/defaultIcon.png';
import avatar01 from '../assets/DoctorIcons/Icon01.png';
import avatar02 from '../assets/DoctorIcons/Icon02.png';
import avatar03 from '../assets/DoctorIcons/Icon03.png';
import avatar04 from '../assets/DoctorIcons/Icon04.png';
import avatar05 from '../assets/DoctorIcons/Icon05.png';
import avatar06 from '../assets/DoctorIcons/Icon06.png';
import avatar07 from '../assets/DoctorIcons/Icon07.png';
import avatar08 from '../assets/DoctorIcons/Icon08.png';
import avatar09 from '../assets/DoctorIcons/Icon09.png';
import avatar10 from '../assets/DoctorIcons/Icon10.png';
import avatar11 from '../assets/DoctorIcons/Icon11.png';
import avatar12 from '../assets/DoctorIcons/Icon12.png';
import avatar13 from '../assets/DoctorIcons/Icon13.png';
import avatar14 from '../assets/DoctorIcons/Icon14.png';

function AdminHome() {
  const [message, setMessage] = useState('');
  const [approved] = useState('Verified by Admin')
  const [reject] = useState('Rejected by Admin')
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [doctors, setDoctors] = useState([
    {
      doctorId: '',
      firstName: '',
      lastName: '',
      contactNumber: '',
      specialization: '',
      credentials: '',
      profilePicture: '',
    }]);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDoctor, setCurrentDoctor] = useState('');
  const [avatar] = useState(currentDoctor.profilePicture ||'');
  const [schedules, setSchedules] = useState([
    {
      doctorUserId: '',
      clinicId: '',
      clinicName: '',
      clinicAddress: '',
      clinicNumber: '',
      scheduleDay: '',
      slots: '',
    }
  ]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState('')
  useEffect(() => {
    const fetchLoggedInPatientId = async () => {
      try {
        const response = await fetch('http://localhost:8080/checkLoggedInAdmin');
        if (response.ok) {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
        }
      } catch (error) {
        setIsAdminLoggedIn(false);
        // Handle the error or provide feedback to the user
      }
    };

    fetchLoggedInPatientId();
  }, []); // 
    useEffect(() => {
      const fetchSchedules = async () => {
        try {
          const response = await fetch('http://localhost:8080/schedules');
          
          if (!response.ok) {
            throw new Error('Failed to fetch schedules');
          }
  
          const schedulesData = await response.json();
          const formattedSchedules = schedulesData.map((schedulesData) => ({
            doctorUserId: schedulesData.doctorUserId,
            clinicId: schedulesData.clinicId,
            clinicName: schedulesData.clinic.name ,
            clinicAddress: schedulesData.clinic.address,
            clinicNumber: schedulesData.clinic.officeNumber,
            scheduleDay: schedulesData.scheduleDay,
            slots: schedulesData.slots,
          }));
  
          setSchedules(formattedSchedules);
          console.log("nakuha q sched hehe");
  
        } catch (error) {
          console.error('Error fetching schedules:', error.message);
        }
      };
  
      fetchSchedules();
    }, []);
  
  
    useEffect(() => {
      const fetchAllDoctors = async () => {
        try {
          const response = await fetch('http://localhost:8080/allusers');
  
          if (response.ok) {
            const data = await response.json();
            const formattedDoctors = data.map((doctorData) => ({
              doctorId: doctorData.userId,
              firstName: `Dr. ${doctorData.user.firstName}`,
              lastName: doctorData.user.lastName,
              contactNumber: doctorData.user.contactNumber,
              specialization: doctorData.specialization,
              credentials: doctorData.credentials,
              profilePicture: doctorData.user.avatar
            }));
  
            setDoctors(formattedDoctors);
          } else {
            setError('Failed to fetch doctors');
          }
        } catch (error) {
          setError('Error while fetching doctors');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchAllDoctors();
    }, []);
  
    const setDisplayedAvatars = (avatar) => {
      const avatarImports = {
      'avatar01': avatar01,
      'avatar02': avatar02,
      'avatar03': avatar03,
      'avatar04': avatar04,
      'avatar05': avatar05,
      'avatar06': avatar06,
      'avatar07': avatar07,
      'avatar08': avatar08,
      'avatar09': avatar09,
      'avatar10': avatar10,
      'avatar11': avatar11,
      'avatar12': avatar12,
      'avatar13': avatar13,
      'avatar14': avatar14,
    };
  
      // Set selectedAvatar using the corresponding import
      setSelectedAvatar(avatarImports[avatar] || avatar00);
    };
  
  
    useEffect(() => {
      // Set displayed avatars based on the doctor's avatar value
      setDisplayedAvatars(currentDoctor.profilePicture);
    }, [currentDoctor.profilePicture]);

    const [uniqueClinics, setUniqueClinics] = useState([]);

    const getDoctorClinics = (doctorId) => {
      // Filter schedules based on the doctorId
      const doctorSchedules = schedules.filter((schedule) => schedule.doctorUserId === doctorId);

      // Extract unique clinic IDs
      const uniqueClinicIds = Array.from(new Set(doctorSchedules.map((schedule) => schedule.clinicId)));

      // Create an array of objects for each unique clinic ID
      const uniqueClinicInfo = uniqueClinicIds.map((clinicId) => {
        const clinicSchedules = doctorSchedules.filter((schedule) => schedule.clinicId === clinicId);
        const clinicName = clinicSchedules[0]?.clinicName || ''; // Get the clinic name from the first schedule
        const clinicAddress = clinicSchedules[0]?.clinicAddress || '';
        const clinicNumber = clinicSchedules[0]?.clinicNumber || '';
        const scheduleDays = Array.from(new Set(clinicSchedules.map((schedule) => schedule.scheduleDay)));

        return {
          clinicId,
          clinicName,
          clinicAddress,
          clinicNumber,
          scheduleDays,
        };
      });

      // Set the extracted information in the component state
      setUniqueClinics(uniqueClinicInfo);
      console.log(uniqueClinics);
    };
  


    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  const handleLogout = async () => {
    try {
        const response = await fetch("http://localhost:8080/adminlogout", {
        method: 'POST',
        });

        if (response.status === 200) {
        setMessage('Logged out successfully');
        window.location.href = '/';
        } else if (response.status === 401) {
        setMessage('No user is currently logged in');
        } else {
        setMessage('An error occurred');
        }
    } catch (error) {
        setMessage('An error occurred');
    }
  };

  const handleApprovalSubmit = async (doctorId) => {
    try {
      const url = `http://localhost:8080/approval?userId=${doctorId}&approvalStatus=${approved}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        const data = await response.text();
        setResult(data);
      } else {
        setResult('Error submitting approval');
      }
    } catch (error) {
      console.error('Error submitting approval:', error);
      setResult('Error submitting approval');
    }
  };

  const handleRejectSubmit = async (doctorId) => {
    try {
      const url = `http://localhost:8080/approval?userId=${doctorId}&approvalStatus=${reject}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        const data = await response.text();
        setResult(data);
      } else {
        setResult('Error submitting approval');
      }
    } catch (error) {
      console.error('Error submitting approval:', error);
      setResult('Error submitting approval');
    }
  };


  const closePopup = () => {
    // Close the popup
    setPopupVisibility(false);
  };

  const handleReview = (doctorId) => {
    // Set the currentDoctor state based on the doctorId
    setCurrentDoctor(doctors.find((doctor) => doctor.doctorId === doctorId) || {});
    try {
      // Call getDoctorClinics with the currentDoctor's doctorId
      getDoctorClinics(doctorId);
  
      // If getDoctorClinics was successful, set the Popup visibility to true
      setPopupVisibility(true);
      setResult('');
    } catch (error) {
      // Handle the error as needed
      console.error('Error fetching doctor clinics:', error);
    }
  };
  
  if (!isAdminLoggedIn) {
    return (
    <div>
      <HomeNavbar/>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Admin is not logged in.</h1>
        <Link to="/adminlog"><button>Login</button></Link>
      </div>
      <HomeFooter/>
    </div>
      
    );
  }

  return (
    <div className="search-container" id="container">
        <div id="navbar">
        <nav>
            <ul>
                <li style={{ float: 'left' }}>
                    <Link to="/">
                    <img
                    src={require('../images/DOC LOGO.png')}
                    alt="Doc Click Connect"
                    style={{ maxWidth: '100px', maxHeight: '40px', marginRight: '20px', marginLeft: '-50px' }}
                    /></Link>
                </li>
                <li style={{ float: 'right' }}>
                <button onClick={handleLogout}>Log Out</button>
                <p>{message}</p>
              </li>
            </ul>
        </nav>
    </div>
    <div style={{ display: "block", width: "100%", marginTop: "10%"}}>
          <h1 style={{textAlign: "center"}}>Doctor Profiles to Review</h1>
          <div className="doctor-grid" style={{marginLeft: "7%"}}>
            {doctors.map((doctor, index) => (
              <DoctorForApproval 
                key={index} 
                doctor={doctor} 
                onReview= {() => handleReview(doctor.doctorId)}/>
            ))}
          </div>
      </div>
      <HomeFooter />

    {/* Popup */}
    <Popup trigger={isPopupVisible}>
            <form action="#" id="signin-form">
              <div>
                <h1 style={{float: "left", marginRight: "225px"}}>Doctor Details</h1>
                <h1 style={{float: "right", fontSize: "25px", color: "gray", cursor: "pointer"}} onClick={closePopup}>x</h1>
              </div>
              <div className="infield" style={{overflowY: 'auto', maxHeight: '500px' }}>
              <div>
                    {selectedAvatar && (
                      <img
                        src={selectedAvatar}
                        alt="Selected Avatar"
                        style={{float:"left", marginRight:"5%", width:"120px"}}
                      />
                    )}
                </div>
                <div>
                  <h3>Doctor Name</h3>
                  <input
                      type="text"
                      name="docName"
                      placeholder="Doctor Name"
                      style={{ width: "280px", marginBottom: "0px" }}
                      value={`${currentDoctor.firstName} ${currentDoctor.lastName}`}
                      readOnly
                    />                
                    </div>
                <div>
                  <h3>Doctor Credentials</h3>
                  <input type="text" name="credentials" placeholder="Doctor Credentials" style={{width: "280px", marginBottom: "10px", padding: "15px"}} value={currentDoctor.credentials} readOnly></input>
                </div>
                <div>
                  <h3>Specialization</h3>
                  <input type="text" name="specialization" placeholder="Specialization" style={{padding: "15px"}} value={currentDoctor.specialization} readOnly></input>
                </div>
                <div>
                  <h3>Email Address</h3>
                  <input type="text" name="emailAddress" placeholder="Email Address" style={{padding: "15px"}} value={currentDoctor.contactNumber} readOnly></input>
                </div>
                <div>
                  <h3>Contact Number</h3>
                  <input type="text" name="contactNumber" placeholder="Contact Number" style={{padding: "15px"}} value={currentDoctor.contactNumber} readOnly></input>
                </div>
             
                <br></br>
                {uniqueClinics.map((clinic, index) => (
                <ul key={clinic.clinicId}>
                  <div>
                    <h2>{`Clinic ${String(index + 1).padStart(2, '0')}`}</h2>
                  </div>
                  <div>
                    <h3>Clinic or Hospital Affiliation</h3>
                    <input
                      type="text"
                      name="clinicName"
                      placeholder="Clinic or Hospital Affiliation"
                      style={{ padding: "15px" }}
                      value={clinic.clinicName}
                      readOnly
                    ></input>
                  </div>
                  <div>
                    <h3>Clinic Address</h3>
                    <input
                      type="text"
                      name="clinicSched"
                      placeholder="Clinic Schedule"
                      style={{ padding: "15px" }}
                      value={clinic.clinicAddress}
                      readOnly
                    ></input>
                  </div>
                  <div>
                    <h3>Clinic Schedule</h3>
                    <input
                      type="text"
                      name="clinicSched"
                      placeholder="Clinic Schedule"
                      style={{ padding: "15px" }}
                      value={clinic.scheduleDays}
                      readOnly
                    ></input>
                  </div>
                  <br></br>
                </ul>
              ))}

                <button type='button' style={{padding: 5, borderRadius: 0, width: "48.8%", textAlign: "center", marginTop: "20px", height: "40px", marginRight: "10px"}} onClick={() => { 
  handleApprovalSubmit(currentDoctor.doctorId);
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}}>Approve Profile</button>
                <button  type='button' className='cancel' style={{padding: 5, borderRadius: 0, width: "48.9%", textAlign: "center", marginTop: "20px", height: "40px"}} onClick={() => { 
  handleRejectSubmit(currentDoctor.doctorId);
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}}>Reject Profile</button>
                <h4>{result}</h4>
              </div>
              
            </form>
          </Popup>
    </div>
  );
};


export default AdminHome;
