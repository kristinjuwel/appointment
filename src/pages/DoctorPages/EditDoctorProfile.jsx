import React, { useState, useEffect } from 'react';
import "../../styles/Profile.css";
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import Popup from '../../components/Popup';
import AvatarSelectionPopup from '../../components/AvatarSelection';
import avatar00 from '../../images/defaultIcon.png';
import avatar01 from '../../assets/DoctorIcons/Icon01.png';
import avatar02 from '../../assets/DoctorIcons/Icon02.png';
import avatar03 from '../../assets/DoctorIcons/Icon03.png';
import avatar04 from '../../assets/DoctorIcons/Icon04.png';
import avatar05 from '../../assets/DoctorIcons/Icon05.png';
import avatar06 from '../../assets/DoctorIcons/Icon06.png';
import avatar07 from '../../assets/DoctorIcons/Icon07.png';
import avatar08 from '../../assets/DoctorIcons/Icon08.png';
import avatar09 from '../../assets/DoctorIcons/Icon09.png';
import avatar10 from '../../assets/DoctorIcons/Icon10.png';
import avatar11 from '../../assets/DoctorIcons/Icon11.png';
import avatar12 from '../../assets/DoctorIcons/Icon12.png';
import avatar13 from '../../assets/DoctorIcons/Icon13.png';
import avatar14 from '../../assets/DoctorIcons/Icon14.png';
import HomeNavbar from '../../components/HomeNavbar';
import HomeFooter from '../../components/HomeFooter';
import { Link, useParams } from 'react-router-dom';

const EditDoctorProfile = () => {
  const { loggedInUsername } = useParams();
  const [avatar, setAvatar] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [isAvatarSelectionOpen, setAvatarSelectionOpen] = useState(false);
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
  const [credentials, setCredentials] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [prcId, setPrcId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');
  const [passwordsMatchError, setPasswordsMatchError] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [secretary, setSecretary] = useState('');
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState('');
  const [isPopupVisible, setPopupVisibility] = useState(false);

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

  const handleAvatarSelection = (selectedAvatar) => {
    setSelectedAvatar(selectedAvatar);
    const match = selectedAvatar.match(/Icon(\d+)/);

    if (match) {
      const numericPart = match[1];
      setAvatar(`avatar${numericPart}`);

      console.log(`avatar${numericPart}`);
    }
    else {
      setAvatar(`avatar00`);
    }

    setAvatarSelectionOpen(false);
  };

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://spring-render-qpn7.onrender.com/doctordetails/${loggedInUsername}`);
        if (response.ok) {
          const data = await response.json();
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
          setCredentials(data.credentials);
          setPrcId(data.prcId);
          setSpecialization(data.specialization);
          setSecretary(data.secretary);
          setAvatar(data.user.avatar);
          setIsDoctorLoggedIn(true);

        } else {
          setIsDoctorLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [loggedInUsername]);

  const handleEdit = async () => {
    // Check if any of the fields are empty
    if (
      !username ||
      !firstName ||
      !lastName ||
      !age ||
      !sex ||
      !birthday ||
      !address ||
      !contactNumber ||
      !email
      ||
      !prcId
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

    const secretaryRegex = /^([^ -]+) - (\d{10}) - (\S+@\S+\.\S+)$/;

    if (!secretaryRegex.test(secretary)) {
      // Handle invalid format
      setEditMessage('Invalid secretary format.');
      return false;
    }




    try {
      const url = new URL(`https://spring-render-qpn7.onrender.com/editdoctor/${loggedInUsername}`);
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
        doctor: {
          prcId,
          specialization,
          credentials,
          secretary
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
        window.location.href = `/docprofile/${loggedInUsername}`;

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
  useEffect(() => {
    setDisplayedAvatars(avatar);

  }, [avatar]);

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

  const closePopup = () => {
    // Close the popup
    setPopupVisibility(false);
  };

  const handleChangePassword = () => {
    setPopupVisibility(true);
  };

  const handleNewPassword = async () => {
    if (newPassword !== retypeNewPassword) {
      setPasswordsMatchError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('https://spring-render-qpn7.onrender.com/changePass/doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: username,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        setPopupVisibility(false);

      } else {
        console.error('Failed to change password:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
    setPasswordsMatchError('');
  };

  return (
    <div className="profile-container" id="container" style={{ overflow: "hidden" }}>
      <DoctorNavbar username={loggedInUsername} />
      <div className="editing-container">

        {<Popup trigger={isPopupVisible}>
          <h3>Please enter your current password:</h3>
          <div className="profile-infield">
            <input
              type="password"
              placeholder="Enter current password"
              style={{ width: '550px' }}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <h3>Please enter your new password: </h3>
          <div className="profile-infield">
            <input
              type="password"
              placeholder="Enter new password"
              style={{ width: '550px' }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <h3>Please re-enter your new password: </h3>
          <div className="profile-infield">
            <input
              type="password"
              placeholder="Confirm new password"
              style={{ width: '550px' }}
              value={retypeNewPassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
            />
          </div>

          {passwordsMatchError && <h4 style={{ justifyContent: "center", textAlign: "center", color: 'red' }}>{passwordsMatchError}</h4>}

          <button style={{ padding: 5, borderRadius: 0, width: "48.5%", textAlign: "center", marginTop: "10px", height: "40px", marginRight: "10px" }} onClick={handleNewPassword}>Submit Changes</button>
          <button className='cancel' onClick={closePopup} style={{ padding: 5, borderRadius: 0, width: "48.5%", textAlign: "center", marginTop: "10px", height: "40px" }}>Discard Changes</button>
        </Popup>
        }
        <div className="edit-steps">
          <div className="edit-card" style={{ marginTop: '-5%' }}>
            <h1>Edit Doctor Profile</h1>
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
                <div style={{ display: "flex" }}>
                  <div className='container-card' >
                    <b style={{ marginRight: '10px' }}>Username:</b>
                    <div className="profile-infield" style={{ width: "23vw", marginRight: "-40px" }}>
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
                    <div className="profile-infield" style={{ width: "22vw" }}>
                      <input type="text"
                        id="email"
                        placeholder="*Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
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
                        onChange={(e) => setContactNumber(e.target.value)} />
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
                        onChange={(e) => setBirthday(e.target.value)} />
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
                        onChange={(e) => setAge(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div className='container-card' style={{ marginRight: "-16px" }}>
                <b>Sex:</b>
                <div className="profile-infield">
                  <input type="text"
                    id="sex"
                    placeholder="*Sex"
                    name="sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)} />
                </div>
              </div>
              <div className='container-card'>
                <b>Address:</b>
                <div className="profile-infield" style={{ width: "18vw", marginRight: "-40px" }}>
                  <input type="text"
                    id="address"
                    placeholder="*(House/Lot/Unit No., Street, Barangay, City/Town, Province)"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
              <div className='container-card'>
                <b>Secretary: </b>
                <div className="profile-infield" style={{ width: "25vw" }}>
                  <input type="text"
                    id="secretary"
                    placeholder="Secretary Name - Contact Number - Email - Clinic Information"
                    name="secretary"
                    value={secretary}
                    onChange={(e) => setSecretary(e.target.value)} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div className='container-card' style={{ marginRight: "-16px" }}>
                <b>PRC ID No: </b>
                <div className="profile-infield" >
                  <input type="text"
                    id="prcId"
                    placeholder="Change PRC ID No."
                    name="prcId"
                    value={prcId}
                    onChange={(e) => setPrcId(e.target.value)} />
                </div>
              </div>
              <br />
              <div className='container-card'>
                <b>Specialization: </b>
                <div className="profile-infield" style={{ width: "18vw", marginRight: "-40px" }}>
                  <input type="text"
                    id="specialization"
                    placeholder="Change Specialization"
                    name="specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)} />
                </div>
              </div>
              <br />
              <div className='container-card'>
                <b>Credentials: </b>
                <div className="profile-infield" style={{ width: "25vw" }}>
                  <input type="text"
                    id="credentials"
                    placeholder="Change Credentials"
                    name="credentials"
                    value={credentials}
                    onChange={(e) => setCredentials(e.target.value)} />
                </div>
              </div>
              <br />
            </div>
            <br />
            <br />
            <button type="button" onClick={handleEdit} style={{ marginLeft: "18%", borderRadius: 0, width: "300px" }}>Save Changes</button>
            <button type="button" onClick={handleChangePassword} style={{ marginLeft: "50px", borderRadius: 0, width: "300px", backgroundColor: "gray" }}>Change Password</button>
            {editMessage && <p>{editMessage}</p>}
            <br />
            <br />
            <br />

          </div>
        </div>
      </div>
      <DoctorFooter />
      {isAvatarSelectionOpen && (
        <AvatarSelectionPopup
          avatars={[avatar01, avatar02, avatar03, avatar04, avatar05,
            avatar06, avatar07, avatar08, avatar09, avatar10,
            avatar11, avatar12, avatar13, avatar14]}
          selectedAvatar={avatar}
          onSelectAvatar={(selectedAvatar) => handleAvatarSelection(selectedAvatar)}
          onClose={() => setAvatarSelectionOpen(false)}
        />
      )}
    </div>
  );
};

export default EditDoctorProfile;