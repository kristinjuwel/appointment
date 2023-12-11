import React from 'react';
import "../styles/Profile.css";
import {Link} from "react-router-dom";
import HomeNavbar from '../components/HomeNavbar';
import HomeFooter from '../components/HomeFooter';

function AboutUs() {

  return (
    <div >
        <HomeNavbar />
        <div className="info-container">
            <div style={{marginTop:'10%'}}>
                <h1 style={{ color: '#ffffff', background: '#0094d4', width: '100vw', height: '50px', textAlign: 'center', margin: 0, padding: '10px'}}>ABOUT US</h1>
                <p style={{ color: '#ffffff', background: '#0094d4', padding: '10px', textAlign: 'center', margin: 0 }}>Welcome to Doc Click Connect, an innovative platform designed to simplify the appointment scheduling process for both patients and doctors.</p>
                </div>
            <div className="steps">
                <div className="step-card">
                    <br />
                    <br />
                    <br />
                    <h3>OUR MISSION</h3>
                     <p>We aim to bridge the gap between patients and doctors, <br/>making it easier to schedule and coordinate medical appointments.  </p>
                </div>
                <div className="step-card">
                        <img
                            src={require('../images/mission.png')}
                            alt="mission"
                            style={{ maxWidth: '100%', maxHeight: '100hw', margin: 0}}
                        />
                    </div>
                </div>
                <div className="steps"  style={{marginTop:'-10px'}}>
                    <div className="step-card">
                        <img
                            src={require('../images/vision.png')}
                            alt='vision'
                            style={{ maxWidth: '100%', maxHeight: '100hw', margin: 0}}
                        />
                    </div>
                    <div className="step-card">
                        <br />
                        <br />
                        <br />
                        <h3>OUR VISION</h3>
                        <p>We envision a world where scheduling medical appointments is convenient and <br/>accessible for everyone. We aim to optimize this process by providing a seamless <br/>and intuitive platform that empowers patients to take control of their health.</p>
                    </div>
                </div>
        </div>
    
        <HomeFooter />
    </div>
  );
}

export default AboutUs;