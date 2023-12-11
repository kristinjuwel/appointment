import React, { useState, useEffect } from 'react';
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import { Link, useParams } from 'react-router-dom';
import DoctorCalendar from '../../components/DoctorCalendar';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

const ManageAppointments = () => {
  const { patientUserId } = useParams();

  const [appointments, setAppointments] = useState([
    {
      title: '',
      clinic: '',
      address: '',
      patientUserId: '',
      start: new Date(),
      end: new Date(),  // 5:00 PM
      appointmentId: '',
      appointmentStatus: '',
      slots: ''
    },
  ]);

  const locales = {
    "en-US": require("date-fns/locale/en-US")
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  })
  const getBorderColor = (status) => {
    switch (status) {
      case 'Cancelled':
        return '#FCA694';
      case 'Rescheduled':
        return '#FFB97F';
      case 'Scheduled by Patient':
        return '#FFFFDC';
      case 'Approved by Doctor':
        return '#BAFFC4';
      default:
        return 'lightgray';
    }
  };
  const CustomEvent = ({ event }) => (
    <div style={{ margin: '5px 0', whiteSpace: 'nowrap', overflowY: 'auto', maxHeight: "55px", textOverflow: 'ellipsis' }}>
      <strong style={{ margin: '0px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
        {event.clinic}
      </strong>
      <p style={{ margin: '0px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
        {event.title}
      </p>
      <p style={{ margin: '0px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', backgroundColor: getBorderColor(event.appointmentStatus)  }}>
        {event.appointmentStatus}
      </p>
      <p style={{ margin: '0px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
        {event.slots}
      </p>
    </div>
   
  );


  useEffect(() => {
    // Replace 'http://localhost:8080' with your actual API URL
    fetch(`http://localhost:8080/appointments?patientUserId=${patientUserId}`)  // Assuming you already have the patientUserId
      .then((appointmentsResponse) => {
        if (appointmentsResponse.ok) {
          return appointmentsResponse.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((appointmentsData) => {
        const formattedAppointments = appointmentsData.map((appointment) => {
          // Extract date and time components
          const [year, month, day] = appointment.scheduleDate.split('-').map(Number);
          const [hours, minutes] = appointment.startTime.split(':').map(Number);
          const [hours2, minutes2] = appointment.endTime.split(':').map(Number);
  
          // Create Date objects for start and end times
          const startDate = new Date(year, month - 1, day, hours, minutes);
          const endDate = new Date(year, month - 1, day, hours2, minutes2);
  
          // Create an appointment object
          return {
            title: appointment.patientName,
            clinic: appointment.clinicName,
            address: appointment.address,
            patientUserId: appointment.patientUserId,
            start: startDate,
            end: endDate,
            appointmentId: appointment.transactionNo,
            appointmentStatus: appointment.status,
            slots: appointment.slots


          };
        });
  
        setAppointments(formattedAppointments);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }, [patientUserId]);

  const handleCancel = async (appointmentId) => {
    try {
      // Find the appointment with the provided appointmentId
      const appointmentToCancel = appointments.find(appointment => appointment.appointmentId === appointmentId);
  
      if (!appointmentToCancel) {
        // Handle the case where the appointment with the given ID is not found
        console.error('Appointment not found');
        return;
      }
  
      // Check if the appointment is already cancelled
      if (appointmentToCancel.appointmentStatus === 'Cancelled') {
        // Display error message as a pop-up
        window.alert('Appointment is already cancelled');
        return;
      }
  
      // Proceed with the request to cancel the appointment
      const response = await fetch(`http://localhost:8080/appointmentChange/${appointmentId}?newStatus=Cancelled`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        console.log('Appointment cancelled successfully');
        window.location.reload();
      } else {
        console.error('Error cancelling appointment');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };
  
  

  const handleReschedule = async (appointmentId) => {
    const appointmentToCancel = appointments.find(appointment => appointment.appointmentId === appointmentId);
  
    if (!appointmentToCancel) {
      // Handle the case where the appointment with the given ID is not found
      console.error('Appointment not found');
      return;
    }

    // Check if the appointment is already cancelled
    if (appointmentToCancel.appointmentStatus === 'Cancelled') {
      // Display error message as a pop-up
      window.alert('Appointment is already cancelled. It cannot be rescheduled.');
      return;
    }
    window.location.href = `/docresched/${appointmentId}`;
  };

  const handleApprove = async (appointmentId) => {
    try {
      // Find the appointment with the provided appointmentId
      const appointmentToCancel = appointments.find(appointment => appointment.appointmentId === appointmentId);
  
      if (!appointmentToCancel) {
        // Handle the case where the appointment with the given ID is not found
        console.error('Appointment not found');
        return;
      }
  
      // Check if the appointment is already cancelled
      if (appointmentToCancel.appointmentStatus === 'Cancelled') {
        // Display error message as a pop-up
        window.alert('Appointment is already cancelled');
        return;
      }
  
      // Proceed with the request to cancel the appointment
      const response = await fetch(`http://localhost:8080/appointmentChange/${appointmentId}?newStatus=Approved by Doctor`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Error cancelling appointment');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };
  
  appointments.sort((a, b) => {
    const statusOrder = {
      'Cancelled': 4,
      'Rescheduled': 3,
      'Scheduled by Patient': 2,
      'Approved by Doctor': 1,
    };
  
    return statusOrder[a.appointmentStatus] - statusOrder[b.appointmentStatus];
  });
  
  return (
    <div>
    <DoctorNavbar />
    <div style={{ display: "flex", margin: "auto", width: "100vw", justifyContent: "center" }}>
    <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700, width: "70%" }}
          components={{
            event: CustomEvent, // Use the custom Event component
          }}
        />

        <div style={{ marginLeft: "30px" }}>
    <h1 style={{marginTop: "0"}}>My Clinic</h1>
    <table style={{width: "500px"}}>
          <tr>
            <td style={{ width: "600", marginRight: "10px", fontSize: "20px" }}>
              <b>{appointments[0].title}</b>
            </td>
            <td>
              <Link to="/viewprofile">
                <button style={{ borderRadius: 0, padding: 10, width: "200px" }}>
                  View Profile
                </button>
              </Link>
            </td>
          </tr>
    </table>
    <div style={{ overflowY: 'auto', maxHeight: '500px'}}>
    {appointments.map((appointment, index) => (
        <table key={index} style={{width: "480px"}}>
          <br />
          <tr>
            <td rowSpan={2} width={200}>
                      {appointment.clinic} <br />
                      {appointment.address} <br />
                      {format(appointment.start, 'MM/dd/yyyy EEEE')} <br />
                      {format(appointment.start, 'h:mm a')} - {format(appointment.end, 'h:mm a')} <br />
                      <div style={{borderColor: getBorderColor(appointment.appointmentStatus)}}>{appointment.appointmentStatus}</div> <br />
            </td>
            
            <td colSpan={2}>
                <button style={{ borderRadius: 0, padding: 10, marginLeft: "10px", width: "100%", height: "65px" }} onClick={() => handleReschedule(appointment.appointmentId)}>
                  Reschedule Appointment
                </button>
            </td>
          </tr>
          <tr>
            <td>
              <button style={{ padding: 10, marginLeft: "10px", height: "65px", borderRadius: 0, width: "100%", backgroundColor: "#005C29" }} onClick={() => handleApprove(appointment.appointmentId)}  type='submit'>
                Approve Appointment
              </button>
            </td>
            <td>
              <button className='cancel' style={{ padding: 0, marginLeft: "10px", height: "65px", width: "100%" }} onClick={() => handleCancel(appointment.appointmentId)}  type='submit'>
                Cancel Appointment
              </button>
            </td>
          </tr>
          <br />
          <tr>
            <td colSpan={2}>
              <Link to="/appointmenthistory" style={{ fontSize: "18px" }}>
                <i>View Appointment History</i>
              </Link>
            </td>
          </tr>
        </table>
        ))}
      </div>
    
  </div>
      </div>
    <DoctorFooter />
    </div>
  )
};

export default ManageAppointments