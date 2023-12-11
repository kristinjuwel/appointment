import React, { useState, useEffect } from 'react';
import "../../styles/Profile.css";
import PatientNavBar from '../../components/PatientNavBar';
import PatientFooter from '../../components/PatientFooter';
import AvatarSelectionPopup from '../../components/AvatarSelection';
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
import Popup from '../../components/Popup';

const EditPatientProfile = () => {
    const [user, setUser] = useState(null);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [seniorId, setSeniorId] = useState('');
    const [pwdId, setPwdId] = useState('');
    const [philhealthId, setPhilhealthId] = useState('');
    const [hmo, setHmo] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [editMessage, setEditMessage] = useState('');
    const [userType] = useState('patient');
    const [avatar, setAvatar] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');

    useEffect(() => {
        

    const fetchUser = async () => {
        try {
          const response = await fetch("http://localhost:8080/patientprofile");
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setUsername(data.user.username);
            setFirstName(data.user.firstName);
            setMiddleName(data.user.middleName);
            setLastName(data.user.lastName);
            setAge(data.user.age);
            setSex(data.user.sex);
            setBirthday(data.user.birthday);
            setAddress(data.user.address);
            setContactNumber(data.user.contactNumber);
            setEmail(data.user.email);
            setSeniorId(data.seniorId);
            setPwdId(data.pwdId);
            setPhilhealthId(data.philhealthId);
            setHmo(data.hmo);
            setAvatar(data.user.avatar);
            console.log(avatar);
          } else {
            setIsError(true);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          setIsError(true);
        }
        
    };
    fetchUser();
      }, []);


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
        'patavatar18': avatar18,
      };
  
      // Set selectedAvatar using the corresponding import
      setSelectedAvatar(avatarImports[avatar] || avatar00);
    };
    useEffect(() => {
      setDisplayedAvatars(avatar);
  
    }, [avatar]);  

    const handleEdit = async () => {
        // Check if any of the fields are empty
        if (
            !username ||
            !firstName ||
            !middleName ||
            !lastName ||
            !age ||
            !sex ||
            !birthday ||
            !address ||
            !contactNumber ||
            !email
        ) {
          setEditMessage('Please fill in all required fields.');
          return;
        }
      
        // Validate email format using regular expression
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
          setEditMessage('Invalid email format.');
          return;
        }
      
        try {
          const url = new URL('http://localhost:8080/editpatient');
          const userData = {
            user: {
            username,
            firstName,
            middleName,
            lastName,
            age,
            sex,
            birthday,
            address,
            contactNumber,
            email,
            avatar
          },
            patient: {
            seniorId,
            pwdId,
            philhealthId,
            hmo
            }
          };
      
          const response = await fetch(url, {
            method: 'PUT', // Use PUT method for editing
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
      
          if (response.ok) {
            // Edit successful
            setEditMessage('User details updated successfully');
            window.location.href = '/patprofile';

          } else {
            // Edit failed
            const errorMessage = await response.text();
            setEditMessage(errorMessage);
            // Handle the error or display an error message to the user
          }
        } catch (error) {
          console.error('Error during edit:', error);
          setEditMessage('Error during edit. Please try again later.');
          // Handle the error or display an error message to the user
        }
      };

      const [isAvatarSelectionOpen, setAvatarSelectionOpen] = useState(false);
    
      const handleAvatarSelection = (selectedAvatar) => {
        setSelectedAvatar(selectedAvatar);
        const match = selectedAvatar.match(/Avatar(\d+)\.\w+/);
      
        if (match) {
          const numericPart = match[1];
          const newAvatar = `patavatar${numericPart}`;
          setAvatar(newAvatar);
          console.log(newAvatar);
        } else {
          setAvatar(`patavatar00`);
        }
      
        setAvatarSelectionOpen(false);
      };
      
    const [isPopupVisible, setPopupVisibility] = useState(false);

      const closePopup = () => {
        // Close the popup
        setPopupVisibility(false);
      };
      
      const handleChangePassword = () => {
        setPopupVisibility(true);
      };

  return (
    <div className="profile-container" id="container">
        <PatientNavBar />
        <div className="editing-container" style={{height: "95vh"}}> 

          { <Popup trigger={isPopupVisible}>
                  <h3>Please enter your current password:</h3>
                  <div className="profile-infield">
                      <input type="text" placeholder="Enter password" style={{width: "550px"}}/>
                  </div>
                  <h3>Please enter your new password: </h3>
                  <div className="profile-infield">
                      <input type="text" placeholder="Change Password" style={{width: "550px"}}/>
                  </div>
                  <h3>Please re-enter your new password: </h3>
                  <div className="profile-infield">
                      <input type="text" placeholder="Confirm Password Change" style={{width: "550px"}}/>
                  </div>
                  
                <button style={{padding: 5, borderRadius: 0, width: "48.5%", textAlign: "center", marginTop: "10px", height: "40px", marginRight: "10px"}}>Submit Changes</button>
                <button className='cancel' onClick={closePopup} style={{padding: 5, borderRadius: 0, width: "48.5%", textAlign: "center", marginTop: "10px", height: "40px"}}>Discard Changes</button>
              </Popup>
          } 
          <div className="edit-steps">
            <div className="edit-card" style={{ marginTop: '-5%' }}>
              <h1>Edit Patient Profile</h1>
              <div style={{ display: 'flex' }}>
                <div className='container-card' style={{ marginRight: '20px' }}>
                  <b>Profile Picture:</b>
                  <div className="avatar-selection">
                    <div className="selected-avatar" onClick={() => setAvatarSelectionOpen(true)}>
                      {selectedAvatar && <img src={selectedAvatar} alt="Selected Avatar" />}
                      <br />
                      <button type="submit">Change Avatar</button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{display: "flex"}}>
                  <div className='container-card' >
                    <b style={{ marginRight: '10px' }}>Username:</b>
                    <div className="profile-infield" style={{width: "23vw", marginRight: "-40px"}}>
                      <input
                        type="text"
                        id="username"
                        placeholder="*Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='container-card' >
                    <b style={{ marginRight: '10px' }}>Email: </b>
                    <div className="profile-infield" style={{width: "22vw"}}>
                      <input type="text"
                      id="email"
                      placeholder="*Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                  </div>
                  </div>
                  

                  <div style={{ display: 'flex' }}>
                    <div className='container-card' style={{ marginRight: '-50px' }}>
                      <b>First name:</b>
                      <div className="profile-infield">
                        <input
                          type="text"
                          id="firstName"
                          placeholder="*First Name"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='container-card' style={{ marginRight: '-50px' }}>
                      <b>Middle name:</b>
                      <div className="profile-infield">
                        <input
                          type="text"
                          id="middleName"
                          placeholder="*Middle Name"
                          name="middleName"
                          value={middleName}
                          onChange={(e) => setMiddleName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='container-card'>
                      <b>Last name:</b>
                      <div className="profile-infield">
                        <input
                          type="text"
                          id="lastName"
                          placeholder="*Last Name"
                          name="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>


                  <div style={{ display: 'flex' }}>
                    <div className='container-card' style={{ marginRight: '-50px' }}>
                          <b>Contact number:</b>
                          <div className="profile-infield">
                              <input type="text"
                              id="contactNumber"
                              placeholder="*Contact Number"
                              name="contactNumber"
                              value={contactNumber}
                              onChange={(e) => setContactNumber(e.target.value)}/>
                          </div>
                      </div>

                    <div className='container-card' style={{ marginRight: '-50px' }}>
                      <b>Birthday:</b>
                        <div className="profile-infield">
                            <input type="text"
                            id="birthday"
                            placeholder="*Birthday"
                            name="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}/>
                        </div>
                      </div>

                      <div className='container-card'>
                        <b>Age:</b>
                        <div className="profile-infield">
                            <input type="text"
                            id="age"
                            placeholder="*Age"
                            name="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}/>
                        </div>
                      </div>
                  </div>
                </div>
              </div>

              <div style={{display: "flex"}}>
                <div className='container-card' style={{marginRight: "-16px"}}>
                  <b>Sex:</b>
                    <div className="profile-infield">
                      <input type="text"
                      id="sex"
                      placeholder="*Sex"
                      name="sex"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}/>
                    </div>
                </div>
                <div className='container-card'>
                        <b>Address:</b>
                        <div className="profile-infield" style={{width: "44vw"}}>
                            <input type="text"
                            id="address"
                            placeholder="*(House/Lot/Unit No., Street, Barangay, City/Town, Province)"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                      </div>
              </div>
  
              <div style={{display: "flex"}}>
                <div className='container-card' style={{marginRight: "-16px"}}>
                    <b>Senior Citizen ID:</b>
                    <div className="profile-infield">
                        <input
                          type="text"
                          placeholder="Senior Citizen ID Number"
                          id="seniorId"
                          name="seniorId"
                          value={seniorId}
                          onChange={(e) => setSeniorId(e.target.value)}
                        />
                    </div>
                </div>
                <div className='container-card'>
                  <b>Philhealth ID:</b>
                  <div className="profile-infield" style={{width: "22vw", marginRight: "-30px"}}>
                    <input
                      type="text"
                      placeholder="PhilHealth ID Number"
                      id="philhealthId"
                      name="philhealthId"
                      value={philhealthId}
                      onChange={(e) => setPhilhealthId(e.target.value)}
                    />
                  </div>
                  </div>
                <div className='container-card'>
                  <b>PWD ID:</b>
                  <div className="profile-infield" style={{width: "20.5vw"}}>
                    <input
                      type="text"
                      placeholder="PWD ID Number"
                      id="pwdId"
                      name="pwdId"
                      value={pwdId}
                      onChange={(e) => setPwdId(e.target.value)}
                    />
                 </div>
              </div>
              </div>
                      <br />
                        <br />
                        <button type="button" onClick={handleEdit} style={{marginLeft: "18%", borderRadius: 0, width: "300px"}}>Save Changes</button>
                        <button type="button" onClick={handleChangePassword} style={{marginLeft: "50px",borderRadius: 0, width: "300px", backgroundColor: "gray"}}>Change Password</button>
                        {editMessage && <p>{editMessage}</p>}
                        <br />
                        <br />
                        <br />

                    </div>
            </div>
        </div>
        <PatientFooter />
        {isAvatarSelectionOpen && (
        <AvatarSelectionPopup
          avatars={[avatar01, avatar02, avatar03, avatar04, avatar05,
            avatar06, avatar07, avatar08, avatar09, avatar10,
            avatar11, avatar12, avatar13, avatar14, avatar15,
            avatar16, avatar17, avatar18]}
            selectedAvatar={avatar}
            onSelectAvatar={(selectedAvatar) => handleAvatarSelection(selectedAvatar)}
          onClose={() => setAvatarSelectionOpen(false)}
        />
      )}
    </div>
  );
};

export default EditPatientProfile;