import "../../styles/Search.css";
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import React, { useState, useEffect } from 'react';
import ClinicCard from "../../components/Clinics";
import Popup from '../../components/Popup'
import { Link, useParams } from 'react-router-dom';
import HomeFooter from "../../components/HomeFooter";
import HomeNavbar from "../../components/HomeNavbar";

const DoctorClinics = () => {
  const { username } = useParams();
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [name, setName] = useState(false);
  const [address, setAddress] = useState(false);
  const [officeNumber, setOfficeNumber] = useState(false);
  const [officeEmail, setOfficeEmail] = useState(false);
  const [hospital, setHospital] = useState(false);
  const [allSchedules, setAllSchedules] = useState([]);
  const [clinicId, setClinicId] = useState(null);
  const [scheduleDay, setScheduleDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [slots, setSlots] = useState('');
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState('');
  const [showAddNewClinicSched, setShowAddNewClinicSched] = useState(false);
  
  const toggleAddNewClinicSched = () => {
    setShowAddNewClinicSched(!showAddNewClinicSched);
  };

  const [schedules, setSchedules] = useState([
    {
      name: '',
      address: '',
      doctor: '',
      officeNumber: '',
      officeEmail: '',
      hospital: '',
      clinicId: ''
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctor's user ID
        const userResponse = await fetch(`http://localhost:8080/getDoctorUserId?username=${username}`);

        if (!userResponse.ok) {
          throw new Error('Failed to fetch doctor user ID');
        }

        const userData = await userResponse.json();

        // Fetch doctor's schedule and clinics
        const clinicsResponse = await fetch(`http://localhost:8080/docsched/${userData}`);

        if (!clinicsResponse.ok) {
          throw new Error('Failed to fetch doctor schedule and clinics');
        }

        const scheduleData = await clinicsResponse.json();

        const formattedClinics = [];
        const clinicIdsAdded = [];

        scheduleData.forEach((schedule) => {
          const clinicId = schedule.clinic.clinicId;

          if (!clinicIdsAdded.includes(clinicId)) {
            formattedClinics.push({
              name: '' + schedule.clinic.name,
              address: '' + schedule.clinic.address,
              officeNumber: '' + schedule.clinic.officeNumber,
              officeEmail: '' + schedule.clinic.officeEmail,
              hospital: '' + schedule.clinic.hospital,
              clinicId: '' + schedule.clinic.clinicId,
            });

            clinicIdsAdded.push(clinicId);
          }
        });

        setSchedules(formattedClinics);
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };

    fetchData(); // Call the async function

  }, [username]);

  const handleEdit = (clinic) => {
    setPopupVisibility(true);
    // Extract necessary properties from the clinic object

    setName(clinic.name);
    setAddress(clinic.address);
    setOfficeNumber(clinic.officeNumber);
    setOfficeEmail(clinic.officeEmail);
    setHospital(clinic.hospital);
    setClinicId(clinic.clinicId);  // Assuming clinicId is part of your clinic object
    fetchScheduleByClinicId(clinic.clinicId);
    setShowAddNewClinicSched(false);

  };

  const handleSubmit = async () => {
    try {
      if (clinicId) {
        const response = await fetch(`http://localhost:8080/clinic/${clinicId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            address,
            officeNumber,
            officeEmail,
            hospital,
          }),
        });

        if (response.ok) {
          // Handle success
          console.log('Clinic updated successfully');
          setPopupVisibility(false);
          window.location.reload();

        } else {
          // Handle error
          console.error('Failed to update clinic');
        }
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error:', error);
    }
  };

  const handleDelete = async (clinic) => {
    const response = await fetch(`http://localhost:8080/clinic/${clinic.clinicId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete clinic');
    }

  };

  const closePopup = () => {
    // Close the popup
    setPopupVisibility(false);
  };

  const fetchScheduleByClinicId = async (clinicId) => {
    try {
      const response = await fetch(`http://localhost:8080/searchByClinicId/${clinicId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch schedule data');
      }

      const scheduleData = await response.json();
      setAllSchedules(scheduleData);
      

    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  const updateSchedule = async (scheduleId, updatedScheduleDay, updatedStartTime, updatedEndTime, updatedSlots) => {
    try {
      const url = `http://localhost:8080/schedule/${scheduleId}?scheduleDay=${updatedScheduleDay}&startTime=${updatedStartTime}&endTime=${updatedEndTime}&slots=${updatedSlots}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Handle success
        console.log('Schedule updated successfully');
        closePopup();
        // Add any additional logic after successful update
      } else {
        // Handle error
        console.error('Failed to update schedule');
        // Add any additional error handling logic
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error:', error);
    }
  };




  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/doctordetails/${username}`);
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
  const handleDayChange = (index, value) => {
    const updatedSchedules = [...allSchedules];
    updatedSchedules[index].scheduleDay = value;
    setAllSchedules(updatedSchedules);
  };

  const handleStartTimeChange = (index, value) => {
    const updatedSchedules = [...allSchedules];
    updatedSchedules[index].startTime = value;
    setAllSchedules(updatedSchedules);
  };

  const handleEndTimeChange = (index, value) => {
    const updatedSchedules = [...allSchedules];
    updatedSchedules[index].endTime = value;
    setAllSchedules(updatedSchedules);
  };

  const handleSlotsChange = (index, value) => {
    const updatedSchedules = [...allSchedules];
    updatedSchedules[index].slots = value;
    setAllSchedules(updatedSchedules);
  };

  const addSchedule = async () => {
    try {
      const url = `http://localhost:8080/schedule?name=${allSchedules[0].clinic.name}&doctorUserId=${allSchedules[0].doctorUserId}&scheduleDay=${scheduleDay}&startTime=${startTime}&endTime=${endTime}&slots=${slots}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        await response.json();
      } else {
        await response.text();
        // Handle non-JSON responses differently
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="info-container" id="container" style={{ height: "100vh" }}>
      <DoctorNavbar username={username} />
      <div className="info-container">
        <h1>All My Clinics</h1>
        <br />
        <div style={{ display: "block", marginLeft: "6%", marginRight: "auto", width: "90%" }}>
          <div className="doctor-grid">
            {schedules.map((schedule, index) => (
              <ClinicCard
                key={index}
                clinic={schedule}
                onEdit={() => handleEdit(schedule)}
                onDelete={() => handleDelete(schedule)}  // Pass the entire schedule object
              />
            ))}
          </div>
        </div>
      </div>
      <DoctorFooter />

      {/* Popup */}
      <Popup trigger={isPopupVisible}>
        <form action="#" id="signin-form" onSubmit={(e) => e.preventDefault()}>
          <div className="infield" style={{ maxHeight: "300px", overflowY: "auto", overflowX: "hidden" }}>
            <h1 style={{ marginTop: "-10px" }}>Edit Clinic</h1>
            <div>
              <h3>Clinic Name</h3>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="clinic"
                placeholder="Clinic Name"
              />
            </div>
            <div>
              <h3>Clinic Address</h3>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                name="clinicaddress"
                placeholder="Clinic Address"
              />
            </div>

            <div>
              <h3>Office Number</h3>
              <input
                value={officeNumber}
                onChange={(e) => setOfficeNumber(e.target.value)}
                type="text"
                name="clinic"
                placeholder="09991234567"
              />
            </div>
            <div>
              <h3>Office Email</h3>
              <input
                value={officeEmail}
                onChange={(e) => setOfficeEmail(e.target.value)}
                type="text"
                name="clinic"
                placeholder="clinic@gmail.com"
              />
            </div>

            <div>
              <h3>Hospital Affiliation</h3>
              <input
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                type="text"
                name="clinic"
                placeholder="Hospital Affiliation"
              />
            </div>

            <div>
              <br></br>
              <h3>Clinic Schedule</h3>
              {allSchedules.map((schedule, index) => (
                <div key={index}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
                        <h5>Day</h5>
                        <input
                          type="text"
                          placeholder={schedule.scheduleDay}
                          onChange={(e) => handleDayChange(index, e.target.value)}
                          style={{ width: "255px" }}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <h5>Slots</h5>
                        <input
                          type="text"
                          placeholder={schedule.slots}
                          onChange={(e) => handleSlotsChange(index, e.target.value)}
                          style={{ width: "255px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
                        <h5>Start Time</h5>
                        <input
                          type="text"
                          placeholder={schedule.startTime}
                          onChange={(e) => handleStartTimeChange(index, e.target.value)}
                          style={{ width: "255px" }}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <h5>End Time</h5>
                        <input
                          type="text"
                          placeholder={schedule.endTime}
                          onChange={(e) => handleEndTimeChange(index, e.target.value)}
                          style={{ width: "255px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => updateSchedule(schedule.scheduleId, schedule.scheduleDay, schedule.startTime, schedule.endTime, schedule.slots)} style={{ justifyContent: 'center', padding: 5, borderRadius: 0, width: "100%", textAlign: "center", marginTop: "10px", height: "40px", marginRight: "10px" }}>
                    Edit Clinic Schedule
                  </button>

                </div>
              ))}
            </div>
                <button onClick={toggleAddNewClinicSched} className="addSched" style={{ justifyContent: 'center', padding: 5, borderRadius: 0, width: "100%", textAlign: "center", marginTop: "15px", height: "40px", marginRight: "10px"}}>
                    Add New Clinic Schedule
                </button>
                {showAddNewClinicSched && (
                <div className="addNewClinicSched">
                  <br></br>
                <h3>New Clinic Schedule</h3>
                <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
                          <h5>Day</h5>
                          <input
                            type="text"
                            placeholder= "Monday"
                            onChange={(e) => setScheduleDay(e.target.value)}
                            style={{ width: "255px" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <h5>Slots</h5>
                            <input
                              type="text"
                              placeholder= "10"
                              onChange={(e) => setSlots(e.target.value)}
                              style={{ width: "255px" }}
                            />
                        </div>
                      </div>
                    </div>         
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
                        <h5>Start Time</h5>
                          <input
                            type="text"
                            placeholder= "09:00:00"
                            onChange={(e) => setStartTime(e.target.value)}
                            style={{ width: "255px" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <h5>End Time</h5>
                            <input
                              type="text"
                              placeholder= "12:00:00"
                              onChange={(e) => setEndTime(e.target.value)}
                              style={{ width: "255px" }}
                            />
                        </div>
                      </div>
                    </div>    
                    <button onClick={() => addSchedule()} style={{ justifyContent: 'center', padding: 5, borderRadius: 0, width: "100%", textAlign: "center", marginTop: "10px", height: "40px", marginRight: "10px" }}>
                    Save Clinic Schedule
                  </button>
    
                </div>
                 )}

                <button style={{padding: 5, borderRadius: 0, width: "48.7%", textAlign: "center", marginTop: "15px", height: "40px", marginRight: "10px"}} onClick={handleSubmit}>Submit Changes</button>
                <button className='cancel' onClick={closePopup} style={{padding: 5, borderRadius: 0, width: "49%", textAlign: "center", marginTop: "15px", height: "40px"}}>Discard Changes</button>
              </div>
            </form>
          </Popup>
    </div>
  );
};

export default DoctorClinics
