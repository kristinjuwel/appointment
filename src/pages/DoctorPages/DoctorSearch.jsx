import React, { useState, useEffect } from 'react';
import "../../styles/Search.css";
import PatientNavBar from '../../components/PatientNavBar';
import PatientFooter from '../../components/PatientFooter';
import DoctorCard from '../../components/Doctors'; // Import the DoctorCard component


const DoctorSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState([
    {
      doctorId: '',
      firstName: '',
      lastName: '',
      contactNumber: '',
      specialization: '',
      credentials: '',
      avatar:'',
      clinicName:'',
    }
  ]);
  const [schedules, setSchedules] = useState([
    {
      doctorUserId: '',
      clinicName: ''
    }
  ]);
  const [searchDoctors, setSearchDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
          clinicName: schedulesData.clinic.name ,
        }));

        setSchedules(formattedSchedules);
      } catch (error) {
        console.error('Error fetching schedules:', error.message);
      }
    };

    fetchSchedules();
  }, [schedules]);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/allusers');

        if (response.ok) {
          const data = await response.json();
          const formattedDoctors = data.map((doctorData) => {
            const doctorId = doctorData.userId;
          
            // Find the corresponding schedules for this doctorId
            const matchingSchedules = schedules.filter((schedule) => schedule.doctorUserId === doctorId);
          
            // Extract unique clinic names from the matching schedules
            const uniqueClinicNames = Array.from(new Set(matchingSchedules.map((schedule) => schedule.clinicName)));
          
            // Set the clinicName property in the formatted doctor object
            const formattedDoctor = {
              doctorId: doctorId,
              firstName: `Dr. ${doctorData.user.firstName}`,
              lastName: doctorData.user.lastName,
              contactNumber: doctorData.user.contactNumber,
              specialization: doctorData.specialization,
              credentials: doctorData.credentials,
              avatar: doctorData.user.avatar,
              clinicName: uniqueClinicNames.length > 0 ? uniqueClinicNames : [],
            };
          
            return formattedDoctor;
          });

          setDoctors(formattedDoctors);
          console.log(formattedDoctors);
          setSearchDoctors(formattedDoctors);
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

 

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }



  const handleSearchChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    if (inputValue === "") {
  setSearchDoctors(doctors);
} else {
  const normalizedInput = inputValue.toLowerCase();
  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
    const specialization = doctor.specialization.toLowerCase();
    const clinicNames = doctor.clinicName.map(name => name.toLowerCase()).join(' ');

    return (
      fullName.includes(normalizedInput) ||
      specialization.includes(normalizedInput) ||
      clinicNames.includes(normalizedInput)
    );
  });

  setSearchDoctors(filteredDoctors);
  console.log(searchDoctors);
}

  
    setSearchQuery(inputValue);

  };
  
  
  return (
    <div className='search-container' id="search-container" style={{overflow: "hidden"}}>
      <PatientNavBar />
      <div className="info-container" style={{overflow: "hidden"}}>
        <div className="search-box" style={{ position: 'sticky', marginTop: "5%" }}>
        <input
          type="text"
          className="search-input"
          placeholder="Find the doctor you need by name, specialization, clinic.."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* Render the filtered list or handle it in your main component */}
        <button className="search-button" >
          Search
        </button>
      </div>
        <br />
        <div style={{ display: "block", width: "90%", marginLeft: "8%", overflowX: "hidden", width: "80vw"}}>
          <div className="doctor-grid">
            {searchDoctors.map((doctor, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
      <PatientFooter />
    </div>
  );
};

export default DoctorSearch;