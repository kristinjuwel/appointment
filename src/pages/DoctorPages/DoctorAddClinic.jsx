import "../../styles/Register.css";
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter'
import React, { useState, useEffect }  from 'react';

const DoctorAddClinic = () => {
  const [doctorUserId, setDoctorUserId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [officeNumber, setOfficeNumber] = useState('');
  const [officeEmail, setOfficeEmail] = useState('');
  const [hospital, setHospital] = useState('');
  const [addClinicMessage, setAddClinicMessage] = useState('');
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [slots, setSlots] = useState(''); //needs to be not hardcoded zzz
  const [checkedDays, setCheckedDays] = useState([]);

  useEffect(() => {
    // Replace 'http://localhost:8080' with your actual API URL
    fetch('http://localhost:8080/checkLoggedInDoctor')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        // Assuming setDoctorUserId is a state setter function
        setDoctorUserId(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
      });
  }, []); 
  
  
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
          window.location.href = '/docclinic'
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

  const [showMondayAddTimeSlot, setShowMondayAddTimeSlot] = useState(false);
  const handleMondayAddTimeSlotClick = () => {
    setShowMondayAddTimeSlot(!showMondayAddTimeSlot);
  };

  const [showTuesdayAddTimeSlot, setShowTuesdayAddTimeSlot] = useState(false);
  const handleTuesdayAddTimeSlotClick = () => {
    setShowTuesdayAddTimeSlot(!showTuesdayAddTimeSlot);
  };

  const [showWednesdayAddTimeSlot, setShowWednesdayAddTimeSlot] = useState(false);
  const handleWednesdayAddTimeSlotClick = () => {
    setShowWednesdayAddTimeSlot(!showWednesdayAddTimeSlot);
  };

  const [showThursdayAddTimeSlot, setShowThursdayAddTimeSlot] = useState(false);
  const handleThursdayAddTimeSlotClick = () => {
    setShowThursdayAddTimeSlot(!showThursdayAddTimeSlot);
  };

  const [showFridayAddTimeSlot, setShowFridayAddTimeSlot] = useState(false);
  const handleFridayAddTimeSlotClick = () => {
    setShowFridayAddTimeSlot(!showFridayAddTimeSlot);
  };

  const [showSaturdayAddTimeSlot, setShowSaturdayAddTimeSlot] = useState(false);
  const handleSaturdayAddTimeSlotClick = () => {
    setShowSaturdayAddTimeSlot(!showSaturdayAddTimeSlot);
  };

  const [showSundayAddTimeSlot, setShowSundayAddTimeSlot] = useState(false);
  const handleSundayAddTimeSlotClick = () => {
    setShowSundayAddTimeSlot(!showSundayAddTimeSlot);
  };

  // useEffect(() => {
  //   console.log('Checked Days:', checkedDays.join(', '));
  // }, [checkedDays]);


  return (
    <div>
    <DoctorNavbar/>
    <div className="reg-container" id="reg-container">
      
      <div className="register">
        <h1 style={{ color: '#0094d4'}}>Add Clinic</h1>
        <form action="#" id="register-form" >
            <div className="reg-infield">              
                <input type="text"
                  id="name"
                  placeholder="*Clinic Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="reg-infield">          
                <input type="text"
                  id="address"
                  placeholder="*(House/Lot/Unit No., Street, Barangay, City/Town, Province)"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
          </div>
            <div className="reg-infield">
              <input type="text"
                  id="officeNumber"
                  placeholder="*Office Number"
                  name="officeNumber"
                  value={officeNumber}
                  onChange={(e) => setOfficeNumber(e.target.value)}
                />
            </div>
            <div className="reg-infield">
              <input type="text"
                  id="officeEmail"
                  placeholder="*Office Email"
                  name="officeEmail"
                  value={officeEmail}
                  onChange={(e) => setOfficeEmail(e.target.value)}
                />
          </div>
          <div className="reg-infield">              
              <input type="text"
                  id="hospital"
                  placeholder="Hospital Affiliation"
                  name="hospital"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                />
            </div>
            <div className='reg-row'>
                <div className='reg-infield'>
                    <h4 style={{ marginBottom: '-30px' }}>Schedule: </h4>
                    <p style={{ marginBottom: '-5px' }}>Select all that applies</p>
                </div>
              </div>
              <div className='reg-row' style={{ overflowY: 'auto', maxHeight: '200px'}}>
                <div className='reg-infield'>
                  <table width={650}>
                    <tr name='mondayRow'>
                      <td width={25}><input type='checkbox' name='mondayCheckbox' onChange={handleMondayCheckboxChange}/></td>
                      <td width={0}>Monday</td>
                      {showMondayTableData && (<>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='MondayStartTime' placeholder='08:00' style={{paddingRight: "0px"}}/></td>
                        <td width={85}><select name="MondayStartTime" id="MondayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='MondayEndTime' placeholder='12:00'style={{paddingRight: "0px"}}/></td>
                        <td width={85}><select name="MondayEndTime" id="MondayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>                      
                        <td width={40}><input type='text' placeholder='0'   onChange={(e) => setSlots(e.target.value)}/></td>
                        <td style={{paddingLeft: "10px", verticalAlign: "middle", width: "150px"}}><a href='#' onClick={handleMondayAddTimeSlotClick}><u>Add Time Slot</u></a></td>
                      </>)}
                    </tr>
                    {showMondayTableData && showMondayAddTimeSlot && (<>
                    <tr>
                        <td width={25}></td>
                        <td width={0}></td>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='MondayStartTime' placeholder='08:00' style={{paddingRight: "0px"}}/></td>
                        <td width={85}><select name="MondayStartTime" id="MondayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='MondayEndTime' placeholder='12:00'style={{paddingRight: "0px"}}/></td>
                        <td width={85}><select name="MondayEndTime" id="MondayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                        <td width={40}><input type='text' placeholder='0'  onChange={(e) => setSlots(e.target.value)}/></td>
                    </tr>
                    </>)}
                    <tr name='tuesdayRow'>
                      <td width={25}><input type='checkbox' name='tuesdayCheckbox' onChange={handleTuesdayCheckboxChange}/></td>
                      <td width={0}>Tuesday</td>
                      {showTuesdayTableData && (<>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='TuesdayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="TuesdayStartTime" id="TuesdayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='TuesdayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="TuesdayEndTime" id="TuesdayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                          <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                          <td width={40}><input type='text' placeholder='0' onChange={(e) => setSlots(e.target.value)}/></td>
                          <td style={{verticalAlign: "middle", paddingLeft: "10px", paddingTop: "2px", width: "150px"}}><a href='#' onClick={handleTuesdayAddTimeSlotClick}><u>Add Time Slot</u></a></td>
                      </>)}
                    </tr>
                    {showTuesdayTableData && showTuesdayAddTimeSlot && (<>
                    <tr>
                        <td width={25}></td>
                        <td width={0}></td>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='TuesdayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="TuesdayStartTime" id="TuesdayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='TuesdayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="TuesdayEndTime" id="TuesdayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                        <td width={40}><input type='text' placeholder='0'  onChange={(e) => setSlots(e.target.value)} /></td>
                    </tr>
                    </>)}
                    <tr name='wednesdayRow'>
                      <td width={25}><input type='checkbox' name='wednesdayCheckbox' onChange={handleWednesdayCheckboxChange}/></td>
                      <td width={0}>Wednesday</td>
                      {showWednesdayTableData && (<>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='WednesdayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="WednesdayStartTime" id="WednesdayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='WednesdayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="WednesdayEndTime" id="WednesdayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                          <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                          <td width={40}><input type='text' placeholder='0' onChange={(e) => setSlots(e.target.value)}/></td>
                          <td style={{verticalAlign: "middle", paddingLeft: "10px", paddingTop: "2px"}}><a href='#' onClick={handleWednesdayAddTimeSlotClick}><u>Add Time Slot</u></a></td>
                      </>)}
                    </tr>
                    {showWednesdayTableData && showWednesdayAddTimeSlot && (<>
                    <tr>
                        <td width={25}></td>
                        <td width={0}></td>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='WednesdayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="WednesdayStartTime" id="WednesdayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='WednesdayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="WednesdayEndTime" id="WednesdayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                        <td width={40}><input type='text' placeholder='0'  onChange={(e) => setSlots(e.target.value)}/></td>
                    </tr>
                    </>)}
                    <tr name='thursdayRow'>
                      <td width={25}><input type='checkbox' name='thursdayCheckbox' onChange={handleThursdayCheckboxChange}/></td>
                      <td width={0}>Thursday</td>
                      {showThursdayTableData && (<>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='ThursdayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="ThursdayStartTime" id="ThursdayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='ThursdayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="ThursdayEndTime" id="ThursdayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                          <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                          <td width={40}><input type='text' placeholder='0' onChange={(e) => setSlots(e.target.value)}/></td>
                          <td style={{verticalAlign: "middle", paddingLeft: "10px", paddingTop: "2px"}}><a href='#' onClick={handleThursdayAddTimeSlotClick}><u>Add Time Slot</u></a></td>
                      </>)}
                    </tr>
                    {showThursdayTableData && showThursdayAddTimeSlot && (<>
                    <tr>
                        <td width={25}></td>
                        <td width={0}></td>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='ThursdayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="ThursdayStartTime" id="ThursdayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='ThursdayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="ThursdayEndTime" id="ThursdayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                        <td width={40}><input type='text' placeholder='0'  onChange={(e) => setSlots(e.target.value)}/></td>
                    </tr>
                    </>)}
                    <tr name='fridayRow'>
                      <td width={25}><input type='checkbox' name='fridayCheckbox' onChange={handleFridayCheckboxChange}/></td>
                      <td width={0}>Friday</td>
                      {showFridayTableData && (<>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='FridayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="FridayStartTime" id="FridayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='FridayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="FridayEndTime" id="FridayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                          <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                          <td width={40}><input type='text' placeholder='0'  onChange={(e) => setSlots(e.target.value)}/></td>
                          <td style={{verticalAlign: "middle", paddingLeft: "10px", paddingTop: "2px"}}><a href='#' onClick={handleFridayAddTimeSlotClick}><u>Add Time Slot</u></a></td>
                      </>)}
                    </tr>
                    {showFridayTableData && showFridayAddTimeSlot && (<>
                    <tr>
                        <td width={25}></td>
                        <td width={0}></td>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='FridayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="FridayStartTime" id="FridayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='FridayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="FridayEndTime" id="FridayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                        <td width={40}><input type='text' placeholder='0'  onChange={(e) => setSlots(e.target.value)}/></td>
                    </tr>
                    </>)}
                    <tr name='saturdayRow'>
                      <td width={25}><input type='checkbox' name='saturdayCheckbox' onChange={handleSaturdayCheckboxChange}/></td>
                      <td width={0}>Saturday</td>
                      {showSaturdayTableData && (<>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='SaturdayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="SaturdayStartTime" id="SaturdayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='SaturdayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="SaturdayEndTime" id="SaturdayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                          <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                          <td width={40}><input type='text' placeholder='0' onChange={(e) => setSlots(e.target.value)}/></td>
                          <td style={{verticalAlign: "middle", paddingLeft: "10px", paddingTop: "2px"}}><a href='#' onClick={handleSaturdayAddTimeSlotClick}><u>Add Time Slot</u></a></td>
                      </>)}
                    </tr>
                    {showSaturdayTableData && showSaturdayAddTimeSlot && (<>
                    <tr>
                        <td width={25}></td>
                        <td width={0}></td>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='SaturdayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="SaturdayStartTime" id="SaturdayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='SaturdayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="SaturdayEndTime" id="SaturdayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                        <td width={40}><input type='text' placeholder='0'  onChange={(e) => setSlots(e.target.value)}/></td>
                    </tr>
                    </>)}
                    <tr name='sundayRow'>
                      <td width={25}><input type='checkbox' name='sundayCheckbox' onChange={handleSundayCheckboxChange}/></td>
                      <td width={0}>Sunday</td>
                      {showSundayTableData && (<>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='SundayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="SundayStartTime" id="SundayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='SundayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="SundayEndTime" id="SundayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                          <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                          <td width={40}><input type='text' placeholder='0'  onChange={(e) => setSlots(e.target.value)}/></td>
                          <td style={{verticalAlign: "middle", paddingLeft: "10px", paddingTop: "2px"}}><a href='#' onClick={handleSundayAddTimeSlotClick}><u>Add Time Slot</u></a></td>
                      </>)}
                    </tr>
                    {showSundayTableData && showSundayAddTimeSlot && (<>
                    <tr>
                        <td width={25}></td>
                        <td width={0}></td>
                        <td width={50}>Time: </td>
                        <td width={85}><input type="text" id='SundayStartTime'  placeholder='08:00'/></td>
                        <td width={85}><select name="SundayStartTime" id="SundayStartTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={20}>to</td>
                        <td width={85}><input type="text" id='SundayEndTime'  placeholder='12:00'/></td>
                        <td width={85}><select name="SundayEndTime" id="SundayEndTime">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                          </select></td>
                        <td width={60} style={{paddingBottom: "0px", paddingLeft: "5px"}}>Slots: </td>
                        <td width={40}><input type='text' placeholder='0'  onChange={(e) => setSlots(e.target.value)}/></td>
                    </tr>
                    </>)}
                  </table> 
                </div>
            </div>
        </form>
        <button type="button" onClick={handleAddClinic}>Register</button>
      </div>
      
    </div>
    <DoctorFooter/>
    </div>
  );
};
export default DoctorAddClinic;
