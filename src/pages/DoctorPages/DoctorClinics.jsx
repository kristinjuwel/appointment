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


  const [schedules, setSchedules] = useState([
    {
      name: '',
      address: '',
      doctor: ''
    },
  ]);

  useEffect(() => {
      // Replace 'https://spring-render-qpn7.onrender.com/' with your actual API URL
      fetch(`https://spring-render-qpn7.onrender.com/getDoctorUserId?username=${username}`)
          .then((response) => {
          if (response.ok) {
            return response.json();
           
          }
          throw new Error('Network response was not ok');
        })
        .then((data) => {
          
          console.log({data});
          // Once you have the patientUserId, make another request to get appointments
          fetch(`https://spring-render-qpn7.onrender.com/docsched/${data}`)
            .then((clinicsResponse) => {
              if (clinicsResponse.ok) {

                return clinicsResponse.json();
              }
              
              throw new Error('Network response was not ok');

            })
            .then((scheduleData) => {
              console.log('scheduleData:', scheduleData);
            
              const formattedClinics = [];
              const clinicIdsAdded = []; // Track clinicIds that have been added to avoid duplicates
            
              scheduleData.forEach((schedule) => {
                const clinicId = schedule.clinic.clinicId;
            
                // Check if clinicId has already been added
                if (!clinicIdsAdded.includes(clinicId)) {
                  formattedClinics.push({
                    name: '' + schedule.clinic.name,
                    address: '' + schedule.clinic.address,
                    officeNumber:  '' + schedule.clinic.officeNumber,
                    officeEmail:  '' + schedule.clinic.officeEmail,
                    hospital: '' + schedule.clinic.hospital,
                  });
            
                  // Mark the clinicId as added to avoid duplicates
                  clinicIdsAdded.push(clinicId);
                }
              });
            
              setSchedules(formattedClinics);
              console.log(formattedClinics);
            })
            .catch((error) => {
              // Handle errors
              console.error(error);
            });
            
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [username]);

  const handleEdit = (schedule) => {
    setPopupVisibility(true);
    console.log('Edit clicked for clinic:', schedule);
    setName(schedule.name);
    setAddress(schedule.address);
    setOfficeNumber(schedule.officeNumber);
    setOfficeEmail(schedule.officeEmail);
    setHospital(schedule.hospital);

    console.log(name);
    
  };

  const closePopup = () => {
    // Close the popup
    setPopupVisibility(false);
  };

  const handleDelete = (schedule) => {
    console.log('Delete clicked for clinic:', schedule);
  };

  return (
    <div className="info-container" id="container" style={{height: "100vh"}}>
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
              onEdit={() => handleEdit(schedule[0])}
              onDelete={handleDelete}
            />
          ))}
        </div>
        </div>
      </div>
      <DoctorFooter />

      {/* Popup */}
      <Popup trigger={isPopupVisible}>
            <form action="#" id="signin-form">
              <div className="infield">
                <h1 style={{marginTop: "-10px"}}>Edit Clinic</h1>
                <div>
         
                  <h3>Clinic Name</h3>
                  <input value={name} type="text" name="clinic" placeholder="Clinic Name"></input>
                </div>
                <div>
                  <h3>Clinic Address</h3>
                  <input value={address}  type="text" name="clinicaddress" placeholder="Clinic Address"></input>
                </div>
                
               
                <div>
                  <h3>Office Number</h3>
                  <input value={officeNumber} type="text" name="clinic" placeholder="09991234567"></input>
                </div>
                <div>
                  <h3>Office Email</h3>
                  <input value={officeEmail} type="text" name="clinic" placeholder="clinic@gmail.com"></input>
                </div>

                <div>
                  <h3>Hospital Affiliation</h3>
                  <input value={hospital} type="text" name="clinic" placeholder="Hospital Affliation"></input>
                </div>

                <div>
                  <h3>Clinic Schedule</h3>
                  <input  type="text" name="docname" placeholder="11/06/23 MONDAY 2:00-5:00 PM"></input>
                </div>

                <Link to="/addremove"><button style={{padding: 5, borderRadius: 0, width: "100%", textAlign: "center", marginTop: "10px", height: "40px", marginRight: "10px"}}>Add/Remove Slots</button></Link>
                <button style={{padding: 5, borderRadius: 0, width: "48.7%", textAlign: "center", marginTop: "10px", height: "40px", marginRight: "10px"}}>Submit Changes</button>
                <button className='cancel' onClick={closePopup} style={{padding: 5, borderRadius: 0, width: "49%", textAlign: "center", marginTop: "10px", height: "40px"}}>Discard Changes</button>
              </div>
            </form>
          </Popup>
    </div>
  );
};

export default DoctorClinics;
