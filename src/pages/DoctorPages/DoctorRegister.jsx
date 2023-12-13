import React, { useState, useEffect } from 'react';
import "../../styles/Register.css";
import Popup from '../../components/Popup';
import HomeNavbar from '../../components/HomeNavbar';
import HomeFooter from '../../components/HomeFooter';

const DoctorRegister = () => {
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
  const [prcId, setPrcId] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [credentials, setCredentials] = useState('');
  const [approvalStatus] = useState('not yet verified');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [userType] = useState('doctor');
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [doctorUserId, setDoctorUserId] = useState('');
  
  const handleSignup = async () => {
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
      !email ||
      !prcId ||
      !password ||
      !retypePassword
    ) {
      setSignupMessage('Please fill in all required fields.');
      return;
    }
    if (password !== retypePassword) {
      setSignupMessage('Passwords do not match.');
      return;
    }

    // Validate password length
    if (password.length < 7 || !/\d/.test(password)) {
      setSignupMessage('Password should be at least 7 characters long and must contain at least 1 number.');
      return;
    }

    const contactNumberRegex = /^\d{11}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      setSignupMessage('Contact number should be exactly 11 digits and contain only numbers (0-9).');
      return;
    }

    // Validate email format using regular expression
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setSignupMessage('Invalid email format.');
      return;
    }

    try {
      const url = new URL('https://spring-render-qpn7.onrender.com/doctors');
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
        password,
        userType
      },
        doctor: {
        prcId,
        specialization,
        credentials,
        approvalStatus
        }
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
        setSignupMessage('User added successfully');
        setRegistrationSuccessful(true);

 
      } else {
        // Signup failed
        const errorMessage = await response.text();
        setSignupMessage(`Signup failed`);
        // Handle the error or display an error message to the user
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSignupMessage('Error during signup. Please try again later.');
      // Handle the error or display an error message to the user
    }
  }

  const handleVerification = async () => {
    try {
      const response = await fetch(`https://spring-render-qpn7.onrender.com/doctorverify?email=${email}&otp=${otp}`, {
        method: 'GET',
      });

      if (response.ok) {
        const verificationResult = await response.text();
        setMessage(verificationResult);
        if (verificationResult === 'Successful verification.') {
          // Now, get the doctor's user ID
          const response = await fetch(`https://spring-render-qpn7.onrender.com/getDoctorUserId?username=${username}`);
          if (response.ok) {
            const data = await response.json();
            const doctorUserId = data;
            window.location.href = `/addclinic/${doctorUserId}`; // Redirect to the /addclinic page with the doctor's user ID
          } else {
            setMessage('Doctor not found');
          }
        } else {
          setMessage('Unsuccessful verification.');
        }
      } else {
        setMessage('Unsuccessful verification.');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };
  
  const handleOtpChange = (e) => {
    const inputOtp = e.target.value;
    setOtp(inputOtp);
  };



  useEffect(() => {
    calculateAge();
  }, [birthday]);

  const calculateAge = () => {
    // Ensure the birthday is not empty
    if (birthday) {
      const birthDate = new Date(birthday);
      const currentDate = new Date();

      let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();

      // Adjust age if birthday hasn't occurred yet this year
      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }

      setAge(calculatedAge);
    }
  };

  const handleClick = () => {
    if (!contactNumber.startsWith('+63 ')) {
      setContactNumber('+63 ');
    }
  };

  const handleChange = (e) => {
    setContactNumber(e.target.value);
  };

  return (
    <div>
    <div className="reg-container" id="reg-container">
      <HomeNavbar/>
    <div className="register">
      <h1 style={{ color: '#0094d4' }}>Doctor Register</h1>
      <form action="#" id="register-form">
        <div className="reg-row">
          <div className="reg-infield">
            <input 
              type="text"
              id="username"
              placeholder="*Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '690px' }} />
          </div>
        </div>
        <div className="reg-row">
          <div className="reg-infield">
            <input type="text"
              id="lastName"
              placeholder="*Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}/>
          </div>
          <div className="reg-infield">
            <input  type="text"
              id="firstName"
              placeholder="*First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="reg-infield">
            <input type="text"
              id="middleName"
              placeholder="Middle Name"
              name="middleName"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)} />
          </div>
        </div>
          <div className="reg-row">
          <div className="reg-infield" style={{ width: "50px", marginRight: "-10"}}> 
              <p style={{margin: "0", padding: "10px 0", color: "grey", fontSize: "12px"}}>*Age</p>
            </div>
            <div className="reg-infield" style={{ width: "275px"}}>
              <input
                  readOnly="readOnly"
                  id="age"
                  placeholder={age}
                  name="age"
                  min="1"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div className="reg-infield">
              <select 
                id="sex"
                placeholder="*Sex"
                name="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}>
                  <option value="" disabled>Sex</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="prefer not to say">Prefer Not To Say</option>
              </select>
              </div>
          </div>
          <div className="reg-row">
            <div className="reg-infield" style={{ width: "50px", marginRight: "-10"}}> 
              <p style={{margin: "0", padding: "10px 0", color: "grey", fontSize: "12px"}}>*Birthdate</p>
            </div>
            <div className="reg-infield" style={{ width: "150px"}}>
              <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={birthday}
                  style={{padding: "8px 8px"}}
                  onChange={(e) => setBirthday(e.target.value)}
                />
            </div>
            <div className="reg-infield" style={{ width: "500px"}}>
              <input
                  type="text"
                  id="address"
                  placeholder="*(House/Lot/Unit No., Street, Barangay, City/Town, Province)"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
            </div>
          </div>
          <div className="reg-row">
          <div className="reg-infield" style={{marginRight: "-300px"}}>
              <input
                type="text"
                placeholder="+63 "
                name="+63"
                readOnly
                style={{width: "50px"}}
              />
            </div>
            <div className="reg-infield" style={{width: "290px"}}>
              <input
                type="text"
                id="contactNumber"
                placeholder="9999999999"
                name="contactNumber"
                value={contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="reg-infield">
              <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>
          </div>
          <div className="reg-row">
          <div className="reg-infield" style={{ width: "250px", marginRight: "-125px"}}> 
              <p style={{margin: "0", padding: "10px 0", color: "grey", fontSize: "12px"}}>*PRC ID</p>
            </div>
            <div className="reg-infield" style={{ width: "200px"}}>
              <input
                type="text"
                placeholder="0000000"
                id="prcId"
                name="prcId"
                value={prcId}
                onChange={(e) => setPrcId(e.target.value.replace(/\D/g, '').slice(0, 7))}
              />
            </div>
            <div className="reg-infield" >
              <input
                type="text"
                placeholder="Specialization"
                id="specialization"
                name="specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
          </div>
          <div className="reg-row">
          <div className="reg-infield" style={{ width: "250px", marginRight: "-125px"}}> 
              <p style={{margin: "0", padding: "10px 0", color: "grey", fontSize: "12px"}}>*License Number</p>
            </div>
            <div className="reg-infield" style={{ width: "200px"}}>
              <input
                id="licenseNumber"
                placeholder="00000"
                name="licenseNumber"
                // value={licenseNumber}
                // onChange={(e) => setlicenseNumber(e.target.value.replace(/\D/g, '').slice(0, 5))}
              />
            </div>
            <div className="reg-infield" style={{ width: "250px", marginRight: "-155px"}}> 
              <p style={{margin: "0", padding: "10px 0", color: "grey", fontSize: "12px"}}>*PTR Number</p>
            </div>
            <div className="reg-infield" style={{ width: "230px"}}>
              <input
                id="ptrNumber"
                placeholder="0000000"
                name="ptrNumber"
                // value={ptrNumber}
                // onChange={(e) => setptrNumber(e.target.value.replace(/\D/g, '').slice(0, 7))}
              />
            </div>
          </div>
          <div className="reg-row">
          <div className="reg-infield">
            <input 
              type="text"
              id="credentials"
              placeholder="Credentials"
              name="credentials"
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '690px' }} />
          </div>
        </div>
          <div className="reg-row">
            <div className="reg-infield">
              <input
                type="password"
                placeholder="*Password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="reg-infield">
              <input
                type="password"
                placeholder="*Re-enter Password"
                id="retypePassword"
                name="retypePassword"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
              />
            </div>
          </div>
        </form>
        <button type="button" onClick={handleSignup}>Add Clinic</button>
        {signupMessage && <p className="signup-message">{signupMessage}</p>}
        {registrationSuccessful && (
          <Popup trigger={true}>
            <form action="#" id="signin-form">
              <div className="infield">
                <h1 style={{ textAlign: 'center' }}>Verification</h1>
                <input
                  type="code"
                  placeholder="Verification Code"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>
              <button type="button" onClick={handleVerification}>Submit Code</button>
              {message && <p>{message}</p>}
              <p style={{ color: '#0094d4', marginTop: '0', marginBottom: '0' }}>Did not receive it? <a href='/'>Resend Code</a></p>
            </form>
          </Popup>
          )} 
      </div>
    </div>
    <HomeFooter />
    </div>
  );
};

export default DoctorRegister;