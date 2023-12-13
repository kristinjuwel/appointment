import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PatientLogin from './pages/PatientPages/PatientLogin';
import PatientRegister from './pages/PatientPages/PatientRegister';
import DoctorLogin from './pages/DoctorPages/DoctorLogin';
import DoctorRegister from './pages/DoctorPages/DoctorRegister';
import AddClinic from './pages/AppointmentPages/AddClinic';
import AdminLogin from './pages/AdminLogin';
import PatientProfile from './pages/PatientPages/PatientProfile';
import DoctorProfile from './pages/DoctorPages/DoctorProfile';
import FAQs from './pages/FAQs';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import EditPatientProfile from './pages/PatientPages/EditPatientProfile';
import EditDoctorProfile from './pages/DoctorPages/EditDoctorProfile';
import DoctorSearch from './pages/DoctorPages/DoctorSearch';
import PatientAppointment from './pages/PatientPages/PatientAppointment';
import DoctorAppointment from './pages/DoctorPages/DoctorAppointment';
import ManageAppointments from './pages/AppointmentPages/ManageAppointments';
import PatientResched from './pages/AppointmentPages/PatientResched';
import DoctorResched from './pages/AppointmentPages/DoctorResched';
import ViewProfile from './pages/AppointmentPages/ViewProfile';
import AddRemoveSlots from './pages/AppointmentPages/AddRemoveSlots';
import SetAppointment from './pages/AppointmentPages/SetAppointment';
import DoctorClinics from './pages/DoctorPages/DoctorClinics';
import DoctorAddClinic from './pages/DoctorPages/DoctorAddClinic';
import DoctorEditClinic from './pages/DoctorPages/DoctorEditClinic';
import AdminHome from './pages/AdminHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="patlogin" element={<PatientLogin />} />
        <Route path="patreg" element={<PatientRegister />} />
        <Route path="patprofile/:username" element={<PatientProfile />} />
        <Route path="patappointments" element={<PatientAppointment />} />
        <Route path="editpatprofile" element={<EditPatientProfile />} />
        <Route path="patresched/:appointmentId" element={<PatientResched />}/>
        <Route path="setappointment/:doctorId" element={<SetAppointment />}/>
        <Route path="docappointments" element={<DoctorAppointment />} />
        <Route path="editdocprofile" element={<EditDoctorProfile />} />
        <Route path="docsearch" element={<DoctorSearch />} />
        <Route path="doclogin" element={<DoctorLogin />} />
        <Route path="docreg" element={<DoctorRegister />} />
        <Route path="docprofile" element={<DoctorProfile />} />
        <Route path="docclinic" element={<DoctorClinics />} />
        <Route path="docaddclinic" element={<DoctorAddClinic />} />
        <Route path="doceditclinic" element={<DoctorEditClinic />} />
        <Route path="addclinic/:doctorUserId" element={<AddClinic />} />
        <Route path="manageappointments/:patientUserId" element={<ManageAppointments />} />
        <Route path="docresched/:appointmentId" element={<DoctorResched />} />
        <Route path="viewprofile/:patientUserId" element={<ViewProfile />} />
        <Route path="addremove" element={<AddRemoveSlots />} />
        <Route path="adminlog" element={<AdminLogin />} />
        <Route path="adminhome" element={<AdminHome />} />
        <Route path="*" element={<PatientLogin />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;