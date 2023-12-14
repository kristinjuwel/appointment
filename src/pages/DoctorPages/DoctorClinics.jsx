import "../../styles/Search.css";
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import React, { useState, useEffect } from 'react';
import ClinicCard from "../../components/Clinics";
import Popup from '../../components/Popup'
import { Link, useParams } from 'react-router-dom';

const DoctorClinics= () => {
  const {username} = useParams();
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



  const [schedules, setSchedules] = useState([
    {
      name: '',
      address: '',
      doctor: ''
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctor's user ID
        const userResponse = await fetch(`https://spring-render-qpn7.onrender.com/getDoctorUserId?username=${username}`);
  
        if (!userResponse.ok) {
          throw new Error('Failed to fetch doctor user ID');
        }
  
        const userData = await userResponse.json();
        console.log({ userData });
  
        // Fetch doctor's schedule and clinics
        const clinicsResponse = await fetch(`https://spring-render-qpn7.onrender.com/docsched/${userData}`);
  
        if (!clinicsResponse.ok) {
          throw new Error('Failed to fetch doctor schedule and clinics');
        }
  
        const scheduleData = await clinicsResponse.json();
        console.log('scheduleData:', scheduleData);
  
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
        console.log(formattedClinics);
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };
  
    fetchData(); // Call the async function
  
  }, [username]);

    const handleEdit = (clinic) => {
      setPopupVisibility(true);
      console.log('Edit clicked for clinic:', clinic);
  
      // Extract necessary properties from the clinic object
  
      setName(clinic.name);
      setAddress(clinic.address);
      setOfficeNumber(clinic.officeNumber);
      setOfficeEmail(clinic.officeEmail);
      setHospital(clinic.hospital);
      setClinicId(clinic.clinicId);  // Assuming clinicId is part of your clinic object
      fetchScheduleByClinicId(clinic.clinicId);

    };
  
    const handleSubmit = async () => {
      try {
        if (clinicId) {
          const response = await fetch(`https://spring-render-qpn7.onrender.com/clinic/${clinicId}`, {
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


  const handleDelete = (schedule) => {
    console.log('Delete clicked for clinic:', schedule);
  };

  const closePopup = () => {
    // Close the popup
    setPopupVisibility(false);
  };

  const fetchScheduleByClinicId = async () => {
    try {
      const response = await fetch(`https://spring-render-qpn7.onrender.com/searchByClinicId/${clinicId}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch schedule data');
      }
  
      const scheduleData = await response.json();
      setAllSchedules(scheduleData);
      console.log(allSchedules);

      // Process the schedule data as needed
  
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };
  const updateSchedule = async (scheduleId) => {
    try {
      const response = await fetch(`https://spring-render-qpn7.onrender.com/schedule/${scheduleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scheduleDay,
          startTime,
          endTime,
          slots,
        }),
      });
  
      if (response.ok) {
        // Handle success
        console.log('Schedule updated successfully');
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
  

  return (
    <div className="info-container" id="container" style={{height: "100vh"}}>
      <DoctorNavbar username={username} />
      <div className="info-container">
        <h1>All My Clinics</h1>
        <br />
        <div style={{ display: "block", marginLeft: "6%", marginRight: "auto", width: "90%" }}>
        <div className="doctor-grid">
        { schedules.map((schedule, index) => (
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
              <div className="infield">
                <h1 style={{marginTop: "-10px"}}>Edit Clinic</h1>
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
                <h3>Clinic Schedule</h3>
                {allSchedules.map((schedule, index) => (
        <div key={index}>
          <h5>Day</h5>
          <input
            type="text"
            name={`scheduleDay${index}`}
            placeholder={schedule.scheduleDay}
            onChange={(e) => setScheduleDay(e.target.value)}
          />
          <h5>Start Time</h5>
          <input
            type="text"
            name={`scheduleTime${index}`}
            placeholder={`${schedule.startTime}`}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <h5>End Time</h5>
          <input
            type="text"
            name={`scheduleTime${index}`}
            placeholder={`${schedule.endTime}`}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <h5>Slots</h5>
          <input
            type="text"
            name={`scheduleSlots${index}`}
            placeholder={schedule.slots}
            onChange={(e) => setSlots(e.target.value)}
          />
          <button onClick={() => updateSchedule(schedule.scheduleId)}>
            Edit Schedule
          </button>
        </div>
      ))}
              </div>


                <button style={{padding: 5, borderRadius: 0, width: "48.7%", textAlign: "center", marginTop: "10px", height: "40px", marginRight: "10px"}} onClick={handleSubmit}>Submit Changes</button>
                <button className='cancel' onClick={closePopup} style={{padding: 5, borderRadius: 0, width: "49%", textAlign: "center", marginTop: "10px", height: "40px"}}>Discard Changes</button>
              </div>
            </form>
          </Popup>
    </div>
  );
};

export default DoctorClinics
