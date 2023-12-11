import "../../styles/Profile.css";
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import React, { useState }  from 'react';
import { useParams } from 'react-router-dom';


function  DoctorEditClinic() {

    const {doctorUserId} = useParams();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [officeNumber, setOfficeNumber] = useState('');
    const [officeEmail, setOfficeEmail] = useState('');
    const [hospital, setHospital] = useState('');
    const [addClinicMessage, setAddClinicMessage] = useState('');
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
    const [slots, setSlots] = useState('5'); //needs to be not hardcoded zzz
    const [checkedDays, setCheckedDays] = useState([]);
  
  
    
    const handleAddClinic = async () => {
      // Check if any of the fields are empty
      if (
        !name ||
        !address ||
        !officeNumber ||
        !officeEmail
      ) {
        setAddClinicMessage('Please fill in all required fields.');
        return;
      }
  
      const officeNumberRegex = /^\d{11}$/;
      if (!officeNumberRegex.test(officeNumber)) {
        setAddClinicMessage('Contact number should be exactly 11 digits and contain only numbers (0-9).');
        return;
      }
  
      // Validate email format using regular expression
      const officeEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!officeEmailRegex.test(officeEmail)) {
        setAddClinicMessage('Invalid email format.');
        return;
      }
  
      try {
        const url = new URL('http://localhost:8080/clinic');
        const userData = {
          name,
          address,
          officeNumber,
          officeEmail,
          hospital,
        };
  
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          // Signup successful
          setAddClinicMessage('Clinic added successfully');
          setRegistrationSuccessful(true);
          handleAddSchedule();
   
        } else {
          // Signup failed
          const errorMessage = await response.text();
          setAddClinicMessage(errorMessage);
          setAddClinicMessage(`Signup failed`);
          // Handle the error or display an error message to the user
        }
      } catch (error) {
        console.error('Error during signup:', error);
        setAddClinicMessage('Error during signup. Please try again later.');
        // Handle the error or display an error message to the user
      }
    }
    const handleDayCheckboxChange = (day, isChecked) => {
      if (isChecked) {
        // Add the day to the list of checked days
        setCheckedDays((prevCheckedDays) => [...prevCheckedDays, day]);
      } else {
        // Remove the day from the list of checked days
        setCheckedDays((prevCheckedDays) => prevCheckedDays.filter((d) => d !== day));
      }
    };
    
    const handleAddSchedule = async () => {
      if (checkedDays.length === 0) {
        console.error('No days selected for schedule.');
        return;
      }
    
      // Iterate through the list of checked days and make API calls for each day
      checkedDays.forEach(async (day) => {
        // Construct the query string for the specific day
        const queryString = `name=${name}&doctorUserId=${doctorUserId}&scheduleDay=${day}&startTime=${document.getElementById(`${day}StartTime`).value}&endTime=${document.getElementById(`${day}EndTime`).value}&slots=${slots}`;
        
        try {
          const response = await fetch(`http://localhost:8080/schedule?${queryString}`, {
            method: 'POST',
          });
    
          if (response.ok) {
            // Schedule added successfully for the current day
            window.location.href = '/doclogin'
          } else {
            // Schedule addition failed for the current day
            const errorMessage = await response.text();
            console.error(`Schedule addition failed for ${day}: ${errorMessage}`);
            
          }
        } catch (error) {
          console.error(`Error during schedule addition for ${day}:`, error);
          
        }
      });
    };
    
    
  
    const [showMondayTableData, setShowMondayTableData] = useState(false);
    const handleMondayCheckboxChange = (event) => {
      setShowMondayTableData(event.target.checked);
      if (event.target.checked) {
        handleDayCheckboxChange('Monday', true);
      } else {
        handleDayCheckboxChange('Monday', false);
      }
    };
  
    const [showTuesdayTableData, setShowTuesdayTableData] = useState(false);
    const handleTuesdayCheckboxChange = (event) => {
      setShowTuesdayTableData(event.target.checked);
      if (event.target.checked) {
        handleDayCheckboxChange('Tuesday', true);
      } else {
        handleDayCheckboxChange('Tuesday', false);
      }
    };
  
    const [showWednesdayTableData, setShowWednesdayTableData] = useState(false);
    const handleWednesdayCheckboxChange = (event) => {
      setShowWednesdayTableData(event.target.checked);
      if (event.target.checked) {
        handleDayCheckboxChange('Wednesday', true);
      } else {
        handleDayCheckboxChange('Wednesday', false);
      }
    };
  
    const [showThursdayTableData, setShowThursdayTableData] = useState(false);
    const handleThursdayCheckboxChange = (event) => {
      setShowThursdayTableData(event.target.checked);
      if (event.target.checked) {
        handleDayCheckboxChange('Thursday', true);
      } else {
        handleDayCheckboxChange('Thursday', false);
      }
    };
  
    const [showFridayTableData, setShowFridayTableData] = useState(false);
    const handleFridayCheckboxChange = (event) => {
      setShowFridayTableData(event.target.checked);
      if (event.target.checked) {
        handleDayCheckboxChange('Friday', true);
      } else {
        handleDayCheckboxChange('Friday', false);
      }
    };
  
    const [showSaturdayTableData, setShowSaturdayTableData] = useState(false);
    const handleSaturdayCheckboxChange = (event) => {
      setShowSaturdayTableData(event.target.checked);
      if (event.target.checked) {
        handleDayCheckboxChange('Saturday', true);
      } else {
        handleDayCheckboxChange('Saturday', false);
      }
    };
  
  
    const [showSundayTableData, setShowSundayTableData] = useState(false);
    const handleSundayCheckboxChange = (event) => {
      setShowSundayTableData(event.target.checked);
      if (event.target.checked) {
        handleDayCheckboxChange('Sunday', true);
      } else {
        handleDayCheckboxChange('Sunday', false);
      }
    };



  return (
    <div className="profile-container" id="container">
        <DoctorNavbar />
        <div className="info-container"> 
            <div className="p-steps">
                    <div className="profile-card">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <h1>Edit Clinic Information</h1>
                        <br />
                        <b>Clinic Name:</b>
                        <div className="profile-infield">
                            <input type="text" placeholder="Change Clinic Name" />
                        </div>
                        <br />
                        <b>Address: </b>
                        <div className="profile-infield">
                            <input type="text" id="address" placeholder="*(House/Lot/Unit No., Street, Barangay, City/Town, Province)" name="address"/>
                        </div>
                        <br />
                        <b>Office Number:</b>
                        <div className="profile-infield">
                            <input type="text" placeholder="Change Office Number" />
                        </div>
                        <br />
                        <b>Office Email:</b>
                        <div className="profile-infield">
                            <input type="text" placeholder="Change Office Email" />
                        </div>
                        <br />
                        <b>Hospital Affiliation:</b>
                        <div className="profile-infield">
                            <input type="text" placeholder="Change Office Affiliation" />
                        </div>
                    </div>
                    <div className="profile-card" style={{marginTop:'330px'}}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className='reg-infield'>
                  <table width={500}>
                    <tr name='mondayRow'>
                      <td width={25}><input type='checkbox' name='mondayCheckbox' onChange={handleMondayCheckboxChange}/></td>
                      <td width={200}>Monday</td>
                      {showMondayTableData && (<>
                        <td width={50}>Time: </td>
                        <td><select name="time" id="MondayStartTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                        <td width={0}>to</td>
                        <td><select name="time" id="MondayEndTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                      </>)}
                    </tr>
                    <tr name='tuesdayRow'>
                      <td width={25}><input type='checkbox' name='tuesdayCheckbox' onChange={handleTuesdayCheckboxChange}/></td>
                      <td width={200}>Tuesday</td>
                      {showTuesdayTableData && (<>
                        <td width={50}>Time: </td>
                        <td><select name="time" id="TuesdayStartTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                        <td width={0}>to</td>
                        <td><select name="time" id="TuesdayEndTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                      </>)}
                    </tr>
                    <tr name='wednesdayRow'>
                      <td width={25}><input type='checkbox' name='wednesdayCheckbox' onChange={handleWednesdayCheckboxChange}/></td>
                      <td width={200}>Wednesday</td>
                      {showWednesdayTableData && (<>
                        <td width={50}>Time: </td>
                        <td><select name="time" id="WednesdayStartTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                        <td width={0}>to</td>
                        <td><select name="time" id="WednesdayEndTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                      </>)}
                    </tr>
                    <tr name='thursdayRow'>
                      <td width={25}><input type='checkbox' name='thursdayCheckbox' onChange={handleThursdayCheckboxChange}/></td>
                      <td width={200}>Thursday</td>
                      {showThursdayTableData && (<>
                        <td width={50}>Time: </td>
                        <td><select name="time" id="ThursdayStartTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                        <td width={0}>to</td>
                        <td><select name="time" id="ThursdayEndTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                      </>)}
                    </tr>
                    <tr name='fridayRow'>
                      <td width={25}><input type='checkbox' name='fridayCheckbox' onChange={handleFridayCheckboxChange}/></td>
                      <td width={200}>Friday</td>
                      {showFridayTableData && (<>
                        <td width={50}>Time: </td>
                        <td><select name="time" id="FridayStartTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                        <td width={0}>to</td>
                        <td><select name="time" id="FridayEndTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                      </>)}
                    </tr>
                    <tr name='saturdayRow'>
                      <td width={25}><input type='checkbox' name='saturdayCheckbox' onChange={handleSaturdayCheckboxChange}/></td>
                      <td width={200}>Saturday</td>
                      {showSaturdayTableData && (<>
                        <td width={50}>Time: </td>
                        <td><select name="time" id="SaturdayStartTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                        <td width={0}>to</td>
                        <td><select name="time" id="SaturdayEndTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                      </>)}
                    </tr>
                    <tr name='sundayRow'>
                      <td width={25}><input type='checkbox' name='sundayCheckbox' onChange={handleSundayCheckboxChange}/></td>
                      <td width={200}>Sunday</td>
                      {showSundayTableData && (<>
                        <td width={50}>Time: </td>
                        <td><select name="time" id="SundayStartTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                        <td width={0}>to</td>
                        <td><select name="time" id="SundayEndTime">
                          <option value="08:00:00">8:00 AM</option>
                          <option value="09:00:00">9:00 AM</option>
                          <option value="10:00:00">10:00 AM</option>
                          <option value="11:00:00">11:00 AM</option>
                          <option value="12:00:00">12:00 PM</option>
                          <option value="13:00:00">1:00 PM</option>
                          <option value="14:00:00">2:00 PM</option>
                          <option value="15:00:00">3:00 PM</option>
                          <option value="16:00:00">4:00 PM</option>
                          <option value="17:00:00">5:00 PM</option>
                          </select></td>
                      </>)}
                    </tr>
                  </table>
                </div>
                <br />
                <button type="submit">Save Changes</button>
                    </div>
                    
                    <div className="profile-card" style={{marginTop:'150px'}}>
                
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <img
                            src={require('../../images/docpic.png')}
                            alt='profilepic'
                            style={{ maxWidth: '80%', maxHeight: '80vh', margin: 0}}
                        />
                    </div>
            </div>
            <div className="steps"  style={{marginTop:'-10px'}}>
                <div className="step-card">

                    <img
                        src={require('../../images/docprofile.png')}
                        alt='vision'
                        style={{ maxWidth: '100%', maxHeight: '100hw', margin: 0}}
                    />
                </div>
                <div className="step-card" >
                <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <p>At 'Doc Click Connect,' we're committed to empowering healthcare providers like you to 
                    <br/>connect with patients more efficiently and effectively. Our platform is designed to streamline 
                    <br/>the process of reaching, engaging, and caring for your patients, so you can focus on what 
                    <br/>you do best - providing exceptional medical care.
                    <br/>
                    <br />
                    <br />As a dedicated healthcare professional, your expertise is crucial to the well-being of your 
                    <br />patients. We're here to help you expand your reach and provide the best care possible. With 
                    <br />our platform, you can create an informative and engaging profile, showcasing your 
                    <br/>qualifications, specialties, and a personal introduction.</p>
                </div>
            </div>
        </div>
        <DoctorFooter />
    </div>
  );
}

export default DoctorEditClinic;